import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_700Bold,
  useFonts,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthContextProvider } from '@contexts/AuthContext';
import { OnboardingContextProvider } from '@contexts/OnboardingContext';
import { Routes } from '@routes/index';

SplashScreen.preventAutoHideAsync();

export function App() {
  const [hasFontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (hasFontsLoaded) {
      hideSplashScreen();
    }
  }, [hasFontsLoaded]);

  if (!hasFontsLoaded) {
    return null;
  }

  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <OnboardingContextProvider>
            <Routes />
          </OnboardingContextProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
    </>
  );
}
