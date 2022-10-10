import React from 'react';

import {
  createStackNavigator, StackScreenProps
} from "@react-navigation/stack";

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import { StudyTabsRoutes } from './study.tabs.routes';
import { Confirmation } from '../pages/Confirmation';

export type AppStackParamList = {
  Landing: undefined;
  GiveClasses: undefined;
  Study: undefined;
  Confirmation: {
    title: string;
    description: string;
    buttonTitle: string;
    nextScreenName: keyof AppStackParamList;
  }
}

export type AppStackScreenProp<T extends keyof AppStackParamList>
  = StackScreenProps<AppStackParamList, T>;

const { Navigator, Screen } = createStackNavigator<AppStackParamList>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Landing" component={Landing} />
      <Screen name="GiveClasses" component={GiveClasses} />
      <Screen name="Study" component={StudyTabsRoutes} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  )
}