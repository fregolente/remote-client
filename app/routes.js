import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Constants
import * as routes from '~/constants/routes';

// Components
import LoginDedicated from './pages/login';

export default (
  <Switch>
    <Route path={routes.LOGIN} component={LoginDedicated} exact />
    <Redirect from="/" to={routes.LOGIN} />
  </Switch>
);