import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';
import { routerReducer as router } from 'react-router-redux';

import ui from './modules/ui';
import initval from './modules/initForm';
import login from './modules/login';

export default function createReducer() {
  return combineReducers({
    form,
    router,
    ui,
    initval,
    login,
  });
}
