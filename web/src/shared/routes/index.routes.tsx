import { useEffect } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '@contexts/AuthContext';

import { Authentication } from '@pages/Authentication';
import { Confirmation } from '@pages/Confirmation';
import { GiveClasses } from '@pages/GiveClasses';
import { Landing } from '@pages/Landing';
import { MyProfile } from '@pages/MyProfile';
import { PageLoader } from '@pages/PageLoader';
import { ResetPassword } from '@pages/ResetPassword';
import { Study } from '@pages/Study';

import { ProtectedRoutes } from './ProtectedRoutes';

export function Routes() {
  const history = useHistory();
  const location = useLocation();
  const { user, isFetchingAuthData } = useAuth();

  useEffect(() => {
    if (isFetchingAuthData === false) {
      if (user === null && location.pathname === '/landing') {
        history.push('/');
      } else if (user !== null && location.pathname === '/') {
        history.push('/landing');
      }
    }
  }, [user, location.pathname]);

  return (
    isFetchingAuthData ? (
      <Route path="/" component={PageLoader} />
    ) : (
      <>
        <Route path="/" exact component={Authentication} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/confirmation" component={Confirmation} />
        <ProtectedRoutes isAllowed={user !== null}>
          <Route path="/landing" component={Landing} />
          <Route path="/study" component={Study} />
          <Route path="/give-classes" component={GiveClasses} />
          <Route path="/my-profile" component={MyProfile} />
        </ProtectedRoutes>
      </>
    )
  );
}
