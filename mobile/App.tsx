import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Archivo_400Regular,
  Archivo_600SemiBold,
  Archivo_700Bold,
  useFonts
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';

import { AuthContextProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';

SplashScreen.preventAutoHideAsync();

export function App() {
  let [ hasFontsLoaded ] = useFonts({
    Archivo_400Regular,
    Archivo_600SemiBold,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  })

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (hasFontsLoaded) {
      hideSplashScreen();
    }
  }, [hasFontsLoaded])

  if (!hasFontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </GestureHandlerRootView>
    </>
  );
}
