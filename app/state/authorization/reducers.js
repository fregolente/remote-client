// Actions
import {
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  NEW_LOGIN,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_STOP,
} from './actions';

const initialState = {};

export default function autorizationReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        email: action.email,
        password: action.password,
        logginIn: true,
      };
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        password: '',
        email: '',
        logginIn: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        logginIn: false,
        password: '',
        email: '',
      };
    default:
      return state;
  }
};