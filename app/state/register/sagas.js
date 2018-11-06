import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import userAPI from '~/apis/user';

import {
  CREATE_USER_REQUESTED,
  createUserSuccess,
  createUserError,
} from './actions';

// Get User Regions
function* createUser(action) {
  try {
    const { user } = action
    const response = yield call(userAPI.createUser, user);
    yield put(createUserSuccess(response));
  } catch (error) {
    yield put(createUserError(error));
  }
}

function* watchCreateUser() {
  yield takeLatest(CREATE_USER_REQUESTED, createUser);
}

export default function* watchRegisterSagas() {
  yield all([
    watchCreateUser(),
  ]);
}