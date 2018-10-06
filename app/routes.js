import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Constants
import * as routes from '~/constants/routes';

// Components
// import Container from './pages';
import Login from './pages/login';
import LandingPage from './pages/landingPage';

export default (
  <Switch>
    <Route path={routes.LOGIN} component={Login} exact />
    <Route path="/" component={LandingPage} />
  </Switch>
);