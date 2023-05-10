/* eslint-disable react/no-unstable-nested-components */
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';

import { StudyBottomTab } from '@components/StudyBottomTab';
import { Favorites } from '@screens/Favorites';
import { TeacherList } from '@screens/TeacherList';

export type StudyTabsParamList = {
  TeacherList: undefined;
  Favorites: undefined;
}

export type StudyTabsScreenProp<T extends keyof StudyTabsParamList>
  = BottomTabScreenProps<StudyTabsParamList, T>;

const { Navigator, Screen } =
  createBottomTabNavigator<StudyTabsParamList>();

export function StudyTabsRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#32264d',
        tabBarInactiveTintColor: '#c1bccc',
        tabBarShowLabel: false,
        tabBarStyle: {
          // elevation: 0,       // Android
          // shadowOpacity: 0,   // iOS
          height: 62,
          paddingVertical: 0,
          paddingHorizontal: 0,
        },
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <StudyBottomTab
              label="Proffys"
              iconName="ios-easel"
              color={color}
              focused={focused}
            />
          ),

        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <StudyBottomTab
              label="Favoritos"
              iconName="ios-heart"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Navigator>
  );
}
