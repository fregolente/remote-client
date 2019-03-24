import { all, put, takeLatest, call } from 'redux-saga/effects';

// API
import lawyersAPI from '~/apis/lawyers';

// Actions
import {
  GET_FAVORITE_CASES,
  getFavoriteCases,
  getFavoriteCasesError,
  getFavoriteCasesSuccess,
  FAVORITE_A_CASE,
  favoriteACaseError,
  UNFAVORITE_A_CASE,
  APPLY_TO_A_CASE,
  applyToACaseError,
  GET_APPLIED_CASES,
  getAppliedCasesError,
  getAppliedCasesSuccess,
} from './actions';

import { updateUserLawyerInfo } from '../currentUser/actions';

function* getLawyerFavoriteCases() {
  try {
    const response = yield call(lawyersAPI.getFavoriteCases);
    const { message, case: cases } = response;

    if (message) {
      yield put(getFavoriteCasesError(message));
    }

    const { favoriteCases } = cases;

    yield put(getFavoriteCasesSuccess(favoriteCases));
  } catch (error) {
    yield put(getFavoriteCasesError(error));
  }
}

function* watchFavoriteCases() {
  yield takeLatest(GET_FAVORITE_CASES, getLawyerFavoriteCases);
}

function* favoriteACase(action) {
  try {
    const { caseId, lawyerId } = action;
    const response = yield call(lawyersAPI.favoriteACase, caseId, lawyerId);
    const { message, success, lawyer } = response;

    if (message) {
      yield put(favoriteACaseError(message));
    }

    if (success === true && lawyer) {
      yield put(updateUserLawyerInfo(lawyer));
      yield put(getFavoriteCases());
    }
  } catch (error) {
    yield put(favoriteACaseError(error));
  }
}

function* watchFavoriteACase() {
  yield takeLatest(FAVORITE_A_CASE, favoriteACase);
}

function* unfavoriteACase(action) {
  try {
    const { caseId, lawyerId } = action;
    const response = yield call(lawyersAPI.unfavoriteACase, caseId, lawyerId);
    const { message, success, lawyer } = response;

    if (message) {
      yield put(favoriteACaseError(message));
    }

    if (success === true && lawyer) {
      yield put(updateUserLawyerInfo(lawyer));
      yield put(getFavoriteCases());
    }
  } catch (error) {
    yield put(favoriteACaseError(error));
  }
}

function* watchUnfavoriteACase() {
  yield takeLatest(UNFAVORITE_A_CASE, unfavoriteACase);
}

function* getLawyerAppliedCases() {
  try {
    const response = yield call(lawyersAPI.getLawyerApplications);
    const { message, case: cases } = response;

    if (message) {
      yield put(getAppliedCasesError(message));
    }

    const { casesApplied } = cases;

    yield put(getAppliedCasesSuccess(casesApplied));
  } catch (error) {
    yield put(getAppliedCasesError(error));
  }
}

function* watchLawyerAppliedCases() {
  yield takeLatest(GET_APPLIED_CASES, getLawyerAppliedCases);
}

function* applyToACase(action) {
  try {
    const { caseId, lawyerId } = action;
    const response = yield call(lawyersAPI.applyToACase, caseId, lawyerId);
    const { message, success, lawyer } = response;

    if (message) {
      yield put(applyToACaseError(message));
    }

    if (success === true && lawyer) {
      yield put(updateUserLawyerInfo(lawyer));
      yield put(getFavoriteCases());
    }
  } catch (error) {
    yield put(favoriteACaseError(error));
  }
}

function* watchApplyToACase() {
  yield takeLatest(APPLY_TO_A_CASE, applyToACase);
}

export default function* watchLawyersSagas() {
  yield all([
    watchFavoriteCases(),
    watchFavoriteACase(),
    watchUnfavoriteACase(),
    watchApplyToACase(),
    watchLawyerAppliedCases(),
  ]);
}
