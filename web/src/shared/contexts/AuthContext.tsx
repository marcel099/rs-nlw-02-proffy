import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { SIGNED_IN_USER_TOKEN } from '@configs/storage';
import api from '@services/api';
import { isTokenExpiredError } from '@utils/errors';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  whatsapp: string | null;
  bio: string | null;
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
  signOut: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isFetchingAuthData, setIsFetchingAuthData] = useState(true);

  function setAxiosDefaultAuthorization(token: string) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  async function fetchUser() {
    try {
      const response = await api.get('/users/me');

      if (response.status === 200) {
        const {
          email, first_name, last_name, avatar, bio, whatsapp,
        } = response.data;

        const userData = {
          email,
          firstName: first_name,
          lastName: last_name,
          avatar,
          bio,
          whatsapp,
        };

        setUser(userData);
      }
    } catch (error) {
      if (isTokenExpiredError(error)) {
        return;
      }

      toast.error('Erro ao buscar dados do usuário');
    }
  }

  async function signIn({
    email,
    password,
    rememberMe,
  }: SignInDTO) {
    const sessionResponse =
      await api.post('/sessions', { email, password });

    if (sessionResponse.status !== 200) {
      throw new Error('');
    }

    const { token } = sessionResponse.data;
    setAxiosDefaultAuthorization(token);

    if (rememberMe) {
      window.localStorage.setItem(SIGNED_IN_USER_TOKEN, token);
    }

    await fetchUser();
  }

  async function signOut() {
    try {
      window.localStorage.removeItem(SIGNED_IN_USER_TOKEN);
      setUser(null);
    } catch (error) {
      toast.error('Não foi possível sair');
    }
  }

  function setAxiosInterceptorInvalidToken() {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isTokenExpiredError(error)) {
          toast.warning(
            'Sua sessão está expirada. Por favor, faça login novamente.',
            { toastId: -1, autoClose: false }
          );
        }

        return Promise.reject(error);
      }
    );

    toast.onChange((payload) => {
      if (payload.status === 'removed' &&
        payload.id === -1) {
        signOut();
      }
    });
  }

  useEffect(() => {
    async function loadTokenAndFetchUser() {
      const token = window.localStorage.getItem(SIGNED_IN_USER_TOKEN);

      if (token !== null) {
        setAxiosDefaultAuthorization(token);
        await fetchUser();
      }

      setIsFetchingAuthData(false);
    }

    loadTokenAndFetchUser();
    setAxiosInterceptorInvalidToken();
  }, []);

  const value = useMemo(() => ({
    user,
    isFetchingAuthData,
    signIn,
    signOut,
    fetchUser,
  }), [user, isFetchingAuthData]);

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
