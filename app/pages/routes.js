/* eslint-disable max-len */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Constants
import * as routes from '~/constants/routes';
import { Container } from '~/pages';
import { LandingPage } from '~/pages/landingPage';
import { Login } from '~/pages/login';

const RemoteLegalRoutes = () => (
  <Switch>
    <Route path={routes.LANDING_PAGE} component={LandingPage} exact />
  </Switch>
);

export default RemoteLegalRoutes;
