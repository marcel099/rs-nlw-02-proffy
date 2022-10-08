import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps
} from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';
import { SignUp } from '../pages/SignUp';
import { Confirmation } from '../pages/Confirmation';

export type AppStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
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

const { Navigator, Screen } =
  createStackNavigator<AppStackParamList>();

function AppStack() {

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false}}>
        <Screen name="SignUp" component={SignUp} />
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StudyTabs} />
        <Screen name="Confirmation" component={Confirmation} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack;