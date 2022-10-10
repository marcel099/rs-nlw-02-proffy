import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

import { SIGNED_IN_USER_TOKEN } from "../configs/storage";
import api from "../services/api";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
}

interface SignInDTO {
  email: string,
  password: string,
  rememberMe: boolean,
}

interface AuthContextData {
  user: User | null;
  isFetchingAuthData: boolean;
  signIn: (data: SignInDTO) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({
  children
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isFetchingAuthData, setIsFetchingAuthData] = useState(true);

  async function fetchUser() {
    try {
      const response = await api.get('/users/me');

      if (response.status === 200) {
        const { email, first_name, last_name, avatar } = response.data;

        setUser({
          email,
          firstName: first_name,
          lastName: last_name,
          avatar,
        });

        // redirects user to dashboard
      }

      if (response.status === 401) {
        window.localStorage.removeItem(SIGNED_IN_USER_TOKEN);
        // redirects user to sign in page
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function signIn({
    email,
    password,
    rememberMe,
  }: SignInDTO) {
    try {
      const sessionResponse = await api.post('/sessions', { email, password });

      if (sessionResponse.status !== 200) {
        throw new Error('');
      }

      const { token } = sessionResponse.data;
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      if (rememberMe) {
        window.localStorage.setItem(
          SIGNED_IN_USER_TOKEN,
          token
        );
      }

      await fetchUser();
    } catch (error) {
      throw new Error(error as any);
    }
  }

  useEffect(() => {
    async function loadTokenAndFetchUser() {
      const token = window.localStorage.getItem(SIGNED_IN_USER_TOKEN);
  
      if (token !== null) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        await fetchUser();
      }

      setIsFetchingAuthData(false);
    }

    loadTokenAndFetchUser();
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isFetchingAuthData,
      signIn,
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
