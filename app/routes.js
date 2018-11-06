import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Constants
import * as routes from '~/constants/routes';

// Components
import Container from './pages';
import Login from './pages/login';
import Register from './pages/register';

export default (
  <Switch>
    {/* Tokenless routes */}
    <Route path={routes.LOGIN} component={Login} exact />
    <Route path={routes.REGISTER} component={Register} exact />
    <Route path="/" component={Container} />
  </Switch>
);
