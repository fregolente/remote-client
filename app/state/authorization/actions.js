// Login actions
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const NEW_LOGIN = 'NEW_LOGIN';

export function loginRequested(email, password, callback) {
  return {
    type: LOGIN_REQUESTED,
    email,
    password,
    callback,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCEEDED,
    user,
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}

export function newLogin() {
  return {
    type: NEW_LOGIN,
  };
}

// Refresh token actions
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';
export const REFRESH_TOKEN_STOP = 'REFRESH_TOKEN_STOP';

export function refreshToken() {
  return {
    type: REFRESH_TOKEN,
  };
}

export function refreshTokenSuccess() {
  return {
    type: REFRESH_TOKEN_SUCCESS,
  };
}

export function refreshTokenFailure() {
  return {
    type: REFRESH_TOKEN_FAILED,
  };
}

export function refreshTokenStop() {
  return {
    type: REFRESH_TOKEN_STOP,
  };
}

// Logout actions
export const LOGOUT = 'LOGOUT';

export function logout() {
  return {
    type: LOGOUT,
  };
}
