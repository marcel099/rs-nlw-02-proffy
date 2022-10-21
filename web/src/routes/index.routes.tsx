import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '@pages/Landing';
import TeacherList from '@pages/TeacherList';
import TeacherForm from '@pages/TeacherForm';
import { Authentication } from '@pages/Authentication';
import { Confirmation } from '@pages/Confirmation';
import { PageLoader } from '@pages/PageLoader';
import { ProtectedRoutes } from './ProtectedRoutes';
  
import { useAuth } from '../contexts/AuthContext';

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
            <ProtectedRoutes isAllowed={user !== null} >
              <Route path="/landing" component={Landing} />
              <Route path="/study" component={TeacherList} />
              <Route path="/give-classes" component={TeacherForm} />
            </ProtectedRoutes>
          </>
        )
      }
    </BrowserRouter>
  )
}
