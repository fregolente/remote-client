import { all, put, takeLatest, call } from 'redux-saga/effects';

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
  EDIT_USER_CASE,
  editUserCaseError,
  editUserCaseSuccess,
  GET_APPLIED_LAWYERS,
  getAppliedLawyersError,
  getAppliedLawyersSuccess,
} from './actions';

function* createNewCase(action) {
  try {
    const { newCase } = action;
    const response = yield call(casesAPI.createNewCase, newCase);
    const { success, error, cases } = response;

    if (success === false && error) {
      yield put(createCaseError(error));
    }

    yield put(createCaseSuccess(cases));
  } catch (error) {
    yield put(createCaseError(error));
  }
}

function* watchCreateNewCase() {
  yield takeLatest(CREATE_CASE, createNewCase);
}

function* getUserCases() {
  try {
    const response = yield call(casesAPI.listUserCases);
    const { success, error, cases } = response;

    if (success === false && error) {
      yield put(getUserCasesError(error));
    }

    yield put(getUserCasesSuccess(cases));
  } catch (error) {
    yield put(getUserCasesError(error));
  }
}

function* watchGetUserCases() {
  yield takeLatest(GET_USER_CASES, getUserCases);
}

function* editUserCases(action) {
  try {
    const { userCase } = action;
    const response = yield call(casesAPI.editCaseById, userCase);
    const { success, error, case: editedCase } = response;

    if (success === false && error) {
      yield put(editUserCaseError(error));
    }

    yield put(editUserCaseSuccess(editedCase));
  } catch (error) {
    yield put(editUserCaseError(error));
  }
}

function* watchEditUserCases() {
  yield takeLatest(EDIT_USER_CASE, editUserCases);
}

function* getAppliedLawyers(action) {
  try {
    const { caseId } = action;
    const response = yield call(casesAPI.getAppliedLawyers, caseId);
    const { success, error, lawyers } = response;

    if (success === false && error) {
      yield put(getAppliedLawyersError(error));
    }

    yield put(getAppliedLawyersSuccess(lawyers));
  } catch (error) {
    yield put(getAppliedLawyersError(error));
  }
}

function* watchGetAppliedLawyers() {
  yield takeLatest(GET_APPLIED_LAWYERS, getAppliedLawyers);
}

export default function* watchCasesSagas() {
  yield all([
    watchCreateNewCase(),
    watchGetUserCases(),
    watchEditUserCases(),
    watchGetAppliedLawyers(),
  ]);
}