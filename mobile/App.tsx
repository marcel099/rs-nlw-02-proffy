import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

export function App() {
  let [ fontsLoaded ] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  })

  if ( !fontsLoaded )
    return <AppLoading />
  else {
    return (
      <>
        <StatusBar style="light" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppStack />
        </GestureHandlerRootView>
      </>
    );
  }
}
