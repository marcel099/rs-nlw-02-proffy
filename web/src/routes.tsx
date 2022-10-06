import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import { Authentication } from './pages/Authentication';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/authentication" component={Authentication} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      <Route path="/" component={Landing} exact />
    </BrowserRouter>
  )
}

export default Routes;