import { LOCATION_CHANGE } from 'react-router-redux';

// Actions
import { ACTIVITY_DETECT, ACTIVITY_TIMER_START } from './actions';
import { LOGIN_REQUESTED, LOGOUT, refreshTokenStop } from '../authorization/actions';
import {
  FETCH_TIMELINE_DATA,
  TOGGLE_LIKE,
  POST,
  POST_COMMENT,
  FETCH_COMMENT_DATA,
  CLOSE_NOTIF,
} from '../timeline/actions';
import {
  TOGGLE_SIDEBAR,
  OPEN_SUBMENU,
  CHANGE_THEME,
  LOAD_PAGE,
  SET_LOADING_PAGE,
} from '../uiActions/actions';

// Constants
const LOGOUT_INTERVAL = 2.4E6; // 40 min

// Variables
let logoutTimer = null;

const clearAll = () => {
  localStorage.removeItem('token');
  // localStorage.removeItem('activeTabs');
  clearInterval(logoutTimer);
};

const detectActivityMW = store => next => (action) => {
  function logoutTimeout() {
    if (localStorage.getItem('activeTabs') !== '1' &&
      localStorage.getItem('activity') === 'true') {
      clearInterval(logoutTimer);
      logoutTimer = setTimeout(logoutTimeout, LOGOUT_INTERVAL);
      localStorage.setItem('activity', false);
    } else {
      clearAll();
      store.dispatch(refreshTokenStop());
      // store.dispatch(showDialogByNameRequested('Login', { priority: 10 }));
    }
  }

  switch (action.type) {
    case ACTIVITY_TIMER_START:
    case LOCATION_CHANGE:
    case LOGIN_REQUESTED:
    case ACTIVITY_DETECT:
    case FETCH_TIMELINE_DATA:
    case TOGGLE_LIKE:
    case POST:
    case POST_COMMENT:
    case FETCH_COMMENT_DATA:
    case CLOSE_NOTIF:
    case TOGGLE_SIDEBAR:
    case OPEN_SUBMENU:
    case CHANGE_THEME:
    case LOAD_PAGE:
    case SET_LOADING_PAGE:
    // Check if user is logged out
      if (localStorage.getItem('token')) {
        localStorage.setItem('activity', true);
        clearInterval(logoutTimer);
        logoutTimer = setTimeout(logoutTimeout, LOGOUT_INTERVAL);
      }
      break;
    case LOGOUT:
      clearAll();
      break;
    default:
      break;
  }
  next(action);
};

export default detectActivityMW;
