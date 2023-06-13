import {
  createStackNavigator, StackScreenProps,
} from '@react-navigation/stack';
import React from 'react';

import { Confirmation } from '@screens/Confirmation';
import { GiveClasses } from '@screens/GiveClasses';
import { Landing } from '@screens/Landing';
import { MyProfile } from '@screens/MyProfile';

import { StudyTabsRoutes } from './study.tabs.routes';

export type AppStackParamList = {
  Landing: undefined;
  MyProfile: undefined;
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
      <Screen name="MyProfile" component={MyProfile} />
      <Screen name="GiveClasses" component={GiveClasses} />
      <Screen name="Study" component={StudyTabsRoutes} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
