import { all, put, takeLatest, call } from 'redux-saga/effects';

import userAPI from '~/apis/user';

import {
  LOGIN_REQUESTED,
  loginSuccess,
  loginFailure,
} from './actions';

// Get User Regions
function* loginUser(action) {
  const { callback } = action;
  try {
    const user = { email: action.email, password: action.password };
    const response = yield call(userAPI.loginUser, user);
    if (callback) callback(response);
    yield put(loginSuccess(response));
  } catch (error) {
    if (callback) callback(error);
    yield put(loginFailure(error));
  }
}

function* watchLoginUser() {
  yield takeLatest(LOGIN_REQUESTED, loginUser);
}

export default function* watchAuthorizationSagas() {
  yield all([
    watchLoginUser(),
  ]);
}