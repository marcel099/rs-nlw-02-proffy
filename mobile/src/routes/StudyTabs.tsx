import React from 'react';
import {
  BottomTabScreenProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

export type StudyTabsParamList = {
  TeacherList: undefined;
  Favorites: undefined;
}

export type StudyTabsScreenProp<T extends keyof StudyTabsParamList>
  = BottomTabScreenProps<StudyTabsParamList, T>;

const { Navigator, Screen } =
  createBottomTabNavigator<StudyTabsParamList>();

function StudyTabs() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#32264d',
        tabBarInactiveTintColor: '#c1bccc',
        tabBarStyle: {
          // elevation: 0,       // Android
          // shadowOpacity: 0,   // iOS
          height: 64,
        },
      }}
      // tabBarOptions={{
      //   tabStyle: {
      //     flexDirection: 'row',
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //   },
      //   iconStyle: {
      //     flex: 0,
      //     width: 20,
      //     height: 20,
      //   },
      //   labelStyle: {
      //     fontFamily: 'Archivo_700Bold',
      //     fontSize: 13,
      //     marginLeft: 16,
      //   },
      // }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {    // Envia algumas propriedades
            return (
              <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color} />
            )
          }
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {    // Envia algumas propriedades
            return (
              <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color} />
            )
          }
        }}
      />
    </Navigator>
  )
}

export default StudyTabs;
