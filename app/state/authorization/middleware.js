import { REHYDRATE } from 'redux-persist/lib/constants';

// Actions
import {
  LOGIN_SUCCEEDED,
  LOGOUT,
  REFRESH_TOKEN_STOP,
  refreshToken,
  logout,
} from './actions';
import { activityTimerStart } from '../activity/actions';

// Constants
const REFRESH_TOKEN_INTERVAL = 3E5; // 5 min

// Variables
let REFRESH_TOKEN_TIMER_ID = null;

const refreshTokenMW = store => next => (action) => {
  // This function will be used for logout from multiple tabs
  function logoutOnTokenRemove(event) {
    if (event.key === 'token' && !localStorage.getItem('token')) {
      window.removeEventListener('storage', logoutOnTokenRemove, false);
      store.dispatch(logout());
    }
  }

  // This function will be used for decrement tabs everytime a tab is closed
  function decrementTabsCounter() {
    window.removeEventListener('beforeunload', decrementTabsCounter, false);
    localStorage.setItem('activeTabs', parseInt(
      localStorage.getItem('activeTabs'), 10) - 1);
  }

  // Check for login, refresh and open new tab
  if (action.type === LOGIN_SUCCEEDED || (action.type === REHYDRATE && localStorage.getItem('token'))) {
    window.addEventListener('beforeunload', decrementTabsCounter);
    window.addEventListener('storage', logoutOnTokenRemove);

    if (!localStorage.getItem('activeTabs')) {
      localStorage.setItem('activeTabs', 1);
    } else {
      localStorage.setItem('activeTabs', parseInt(
        localStorage.getItem('activeTabs'), 10) + 1);
    }

    store.dispatch(activityTimerStart());

    if (!REFRESH_TOKEN_TIMER_ID) {
      REFRESH_TOKEN_TIMER_ID = setInterval(() => {
        store.dispatch(refreshToken());
      }, REFRESH_TOKEN_INTERVAL);
    }
  }

  if (action.type === LOGOUT || action.type === REFRESH_TOKEN_STOP) {
    window.removeEventListener('storage', logoutOnTokenRemove, false);
    window.removeEventListener('beforeunload', decrementTabsCounter, false);

    clearInterval(REFRESH_TOKEN_TIMER_ID);
    REFRESH_TOKEN_TIMER_ID = null;
  }

  next(action);
};

export default refreshTokenMW;
