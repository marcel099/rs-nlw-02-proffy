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

export type AppStackParamList = {
  SignUp: undefined;
  Landing: undefined;
  GiveClasses: undefined;
  Study: undefined;
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
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack;