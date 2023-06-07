import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { useAuth } from '@contexts/AuthContext';

import { AppRoutes } from './app.stack.routes';
import { NonAuthRoutes } from './nonAuth.stack.routes';

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      { user === null ? <NonAuthRoutes /> : <AppRoutes /> }
    </NavigationContainer>
  );
}
