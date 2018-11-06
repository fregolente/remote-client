/* eslint-disable max-len */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Constants
import * as routes from '~/constants/routes';
import ProfilePage from '~/pages/profilePage'
import Explorer from '~/pages/explorer'

const RemoteLegalRoutes = () => (
  <Switch>
    <Route path={routes.PROFILE_PAGE} component={ProfilePage} exact />
    <Route path={routes.EXPLORER} component={Explorer} exact />
  </Switch>
);

export default RemoteLegalRoutes;
