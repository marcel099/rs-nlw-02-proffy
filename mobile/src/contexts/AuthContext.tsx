import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SIGNED_IN_USER,
  SIGNED_IN_USER_TOKEN,
} from "../configs/storage";

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
  // isFetchingAuthData: boolean;
  signIn: (data: SignInDTO) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({
  children
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  // const [isFetchingAuthData, setIsFetchingAuthData] = useState(true);

  async function fetchUserSession({
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
        AsyncStorage.setItem(
          SIGNED_IN_USER_TOKEN,
          token
        );
      }
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async function fetchUser() {
    try {
      const response = await api.get('/users/me');

      if (response.status === 200) {
        const { email, first_name, last_name, avatar } = response.data;

        const userData = {
          email,
          firstName: first_name,
          lastName: last_name,
          avatar,
        };

        setUser(userData);
        await AsyncStorage.setItem(
          SIGNED_IN_USER,
          JSON.stringify(userData)
        );
      }

      if (response.status === 401) {
        await AsyncStorage.removeItem(SIGNED_IN_USER);
        await AsyncStorage.removeItem(SIGNED_IN_USER_TOKEN);

        if (user !== null) {
          setUser(null);
        }
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
      await fetchUserSession({ email, password, rememberMe });
      await fetchUser();
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem(SIGNED_IN_USER_TOKEN);
    setUser(null);
  }


  useEffect(() => {
    async function loadTokenAndUser() {
      const loadedUser = await AsyncStorage.getItem(SIGNED_IN_USER);
      const token = await AsyncStorage.getItem(SIGNED_IN_USER_TOKEN);
  
      if (token !== null && loadedUser !== null) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        setUser(JSON.parse(loadedUser));
      }

      // setIsFetchingAuthData(false);
    }

    loadTokenAndUser();
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      // isFetchingAuthData,
      signIn,
      signOut,
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
