import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import { Authentication } from './pages/Authentication';
import { Confirmation } from './pages/Confirmation';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact>
        <Redirect to="/authentication" />
      </Route>
      <Route path="/authentication" component={Authentication} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      <Route path="/dashboard" component={Landing} />
      <Route path="/confirmation" component={Confirmation} />
    </BrowserRouter>
  )
}

export default Routes;