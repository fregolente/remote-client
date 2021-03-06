import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import authorizationReducer from './authorization/reducers';
import uiActionsReducer from './uiActions/reducers';
import timelineReducer from './timeline/reducers';
import utilitiesReducer from './utilities/reducers';
import currentUserReducer from './currentUser/reducers';
import casesReducer from './cases/reducers';
import lawyersReducer from './lawyers/reducers';
import chatsReducer from './chats/reducers';

export default combineReducers({
  router: routerReducer,
  uiActions: uiActionsReducer,
  authorization: authorizationReducer,
  timeline: timelineReducer,
  utilities: utilitiesReducer,
  user: currentUserReducer,
  cases: casesReducer,
  lawyer: lawyersReducer,
  chats: chatsReducer,
});

