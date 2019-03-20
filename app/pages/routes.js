/* eslint-disable max-len */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Constants
import * as routes from '~/constants/routes';
import ProfilePage from '~/pages/profilePage';
import Explorer from '~/pages/explorer';
import Case from '~/pages/case';
import MyCases from '~/pages/myCases';
import MyChats from '~/pages/chats';
import FullCase from '~/pages/fullCase';
import FavoriteCases from '~/pages/favoriteCases';

const RemoteLegalRoutes = () => (
  <Switch>
    <Route path={routes.PROFILE_PAGE} component={ProfilePage} exact />
    <Route path={routes.EXPLORER} component={Explorer} exact />
    <Route path={routes.FAVORITE_CASE_URL} component={FavoriteCases} exact />
    <Route path={routes.CHAT} component={MyChats} exact />
    <Route path={routes.MY_CASES} component={MyCases} exact />
    <Route path={routes.FULL_CASE} component={FullCase} exact />
    <Route path={routes.CASES_URL} component={Case} exact />
  </Switch>
);

export default RemoteLegalRoutes;
