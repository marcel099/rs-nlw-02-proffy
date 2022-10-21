import { BrowserRouter, Route } from 'react-router-dom';

import { useAuth } from '@contexts/AuthContext';

import { Authentication } from '@pages/Authentication';
import { Confirmation } from '@pages/Confirmation';
import { Landing } from '@pages/Landing';
import { MyProfile } from '@pages/MyProfile';
import { PageLoader } from '@pages/PageLoader';
import { TeacherForm } from '@pages/TeacherForm';
import { TeacherList } from '@pages/TeacherList';

import { ProtectedRoutes } from './ProtectedRoutes';

export function Routes() {
  const { user, isFetchingAuthData } = useAuth();

  return (
    <BrowserRouter>
      {
        isFetchingAuthData ? (
          <Route path="/" component={PageLoader} />
        ) : (
          <>
            <ProtectedRoutes
              isAllowed={user === null}
              redirectPath="/landing"
            >
              <Route path="/" exact component={Authentication} />
            </ProtectedRoutes>
            <Route path="/confirmation" component={Confirmation} />
            <ProtectedRoutes isAllowed={user !== null}>
              <Route path="/landing" component={Landing} />
              <Route path="/study" component={TeacherList} />
              <Route path="/give-classes" component={TeacherForm} />
              <Route path="/my-profile" component={MyProfile} />
            </ProtectedRoutes>
          </>
        )
      }
    </BrowserRouter>
  );
}
