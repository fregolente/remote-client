/* eslint-disable max-len */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Constants
import {
  PROFILE_PAGE,
  EXPLORER,
  FAVORITE_CASE_URL,
  APPLIED_CASE_URL,
  CHAT,
  FULL_CASE_URL,
  CASE_URL,
  MY_CASES,
} from '~/constants/routes';
import ProfilePage from '~/pages/profilePage';
import Explorer from '~/pages/explorer';
import Case from '~/pages/case';
import MyCases from '~/pages/myCases';
import MyChats from '~/pages/chats';
import FullCase from '~/pages/fullCase';
import FavoriteCases from '~/pages/favoriteCases';
import AppliedCases from '~/pages/appliedCases';

const RemoteLegalRoutes = () => (
  <Switch>
    <Route path={PROFILE_PAGE} component={ProfilePage} />
    <Route path={EXPLORER} component={Explorer} />
    <Route path={FAVORITE_CASE_URL} component={FavoriteCases} />
    <Route path={APPLIED_CASE_URL} component={AppliedCases} />
    <Route path={CHAT} component={MyChats} />
    <Route path={FULL_CASE_URL} component={FullCase} exact />
    <Route path={CASE_URL} component={Case} exact />
    <Route path={MY_CASES} component={MyCases} exact />
  </Switch>
);

export default RemoteLegalRoutes;
