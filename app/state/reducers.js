import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import authorizationReducer from './authorization/reducers';
import uiActionsReducer from './uiActions/reducers';
import timelineReducer from './timeline/reducers';

export default combineReducers({
  router: routerReducer,
  uiActions: uiActionsReducer,
  authorization: authorizationReducer,
  timeline: timelineReducer,
});

