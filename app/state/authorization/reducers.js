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
    default:
      return state;
  }
};