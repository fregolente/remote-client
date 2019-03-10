import { all, put, takeLatest, call, select } from 'redux-saga/effects';

// API
import casesAPI from '~/apis/cases';

// Actions
import {
  CREATE_CASE,
  createCaseSuccess,
  createCaseError,
  GET_USER_CASES,
  getUserCasesSuccess,
  getUserCasesError,
} from './actions';

function* createNewCase(action) {
  try {
    const { newCase } = action
    const response = yield call(casesAPI.createNewCase, newCase);
    const { success, error } = response;

    if (success === false && error) {
      yield put(createCaseError(error));
    }

    yield put(createCaseSuccess());
  } catch (error) {
    yield put(createCaseError(error));
  }
}

function* watchCreateNewCase() {
  yield takeLatest(CREATE_CASE, createNewCase);
}

function* getUserCases(action) {
  try {
    const response = yield call(casesAPI.listUserCases);
    const { success, error } = response;

    if (success === false && error) {
      yield put(getUserCasesError(error));
    }

    console.log('getUserCases', response);

    yield put(getUserCasesSuccess());
  } catch (error) {
    yield put(getUserCasesError(error));
  }
}

function* watchGetUserCases() {
  yield takeLatest(GET_USER_CASES, getUserCases);
}

export default function* watchCasesSagas() {
  yield all([
    watchCreateNewCase(),
    watchGetUserCases(),
  ]);
}