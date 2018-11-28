import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import userAPI from '~/apis/user';

import {
  GET_USER_BY_ID_REQUEST,
  EDIT_USER_REQUEST,
  updateUser,
  getUserByIdError,
  editUserError,
} from './actions';


function* getUserById(action) {
  try {
    const { userId } = action
    const response = yield call(userAPI.getUserById, userId);
    yield put(updateUser(response));
  } catch (error) {
    yield put(getUserByIdError(error));
  }
}

function* watchGetUserById() {
  yield takeLatest(GET_USER_BY_ID_REQUEST, getUserById);
}

function* editUser(action) {
  try {
    const { user } = action
    const response = yield call(userAPI.updateUser, user);
    yield put(updateUser(response.user));
  } catch (error) {
    yield put(editUserError(error));
  }
}

function* watchEditUser() {
  yield takeLatest(EDIT_USER_REQUEST, editUser);
}

export default function* watchCurrentUserSagas() {
  yield all([
    watchGetUserById(),
    watchEditUser(),
  ]);
}