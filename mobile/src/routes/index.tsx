import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/AuthContext';
import { NonAuthRoutes } from './nonAuth.stack.routes';
import { AppRoutes } from './app.stack.routes';

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      { user === null ? <NonAuthRoutes /> : <AppRoutes /> }
    </NavigationContainer>
  )
}
