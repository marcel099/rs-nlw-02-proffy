import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert } from 'react-native';

import {
  SIGNED_IN_USER,
  SIGNED_IN_USER_TOKEN,
} from '@configs/storage';
import api from '@services/api';

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
  isLoadingAuthData: boolean;
  signIn: (data: SignInDTO) => Promise<void>;
  signOut: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuthData, setIsLoadingAuthData] = useState(true);

  function setAxiosDefaultAuthorization(token: string) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  async function signOut() {
    await AsyncStorage.removeItem(SIGNED_IN_USER);
    await AsyncStorage.removeItem(SIGNED_IN_USER_TOKEN);

    if (user !== null) {
      setUser(null);
    }
  }

  async function fetchUserSession({
    email,
    password,
    rememberMe,
  }: SignInDTO) {
    const sessionResponse = await api.post('/sessions', { email, password });

    if (sessionResponse.status !== 200) {
      throw new Error('');
    }

    const { token } = sessionResponse.data;
    setAxiosDefaultAuthorization(token);

    if (rememberMe) {
      await AsyncStorage.setItem(
        SIGNED_IN_USER_TOKEN,
        token
      );
    }
  }

  async function fetchUser() {
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
      await AsyncStorage.setItem(
        SIGNED_IN_USER,
        JSON.stringify(userData)
      );
    }

    if (response.status === 401) {
      await signOut();
    }
  }

  async function signIn({
    email,
    password,
    rememberMe,
  }: SignInDTO) {
    await fetchUserSession({ email, password, rememberMe });
    await fetchUser();
  }

  function setAxiosInterceptorInvalidToken() {
    api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error?.response?.status === 401 &&
            error?.response.data.message === 'Token inválido') {
          Alert.alert(
            'Sessão expirada',
            'Sua sessão está expirada. Por favor, faça login novamente.',
            [{ text: 'Ok', onPress: () => signOut() }]
          );
        }

        return Promise.reject(error);
      }
    );
  }

  useEffect(() => {
    async function loadTokenAndUser() {
      const loadedUser = await AsyncStorage.getItem(SIGNED_IN_USER);
      const token = await AsyncStorage.getItem(SIGNED_IN_USER_TOKEN);

      if (token !== null && loadedUser !== null) {
        setAxiosDefaultAuthorization(token);
        setUser(JSON.parse(loadedUser));
      }

      setIsLoadingAuthData(false);
    }

    loadTokenAndUser();
    setAxiosInterceptorInvalidToken();
  }, []);

  const value = useMemo(() => ({
    user,
    isLoadingAuthData,
    signIn,
    signOut,
    fetchUser,
  }), [user, isLoadingAuthData]);

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
