import { all, put, takeLatest, call } from 'redux-saga/effects';

import { addToLocalStorage } from '~/utilities/localStorage';

import utilitiesAPI from '~/apis/utilities';

import {
  GET_UTILITIES_REQUESTED,
  getUtilitiesSuccess,
  getUtilitiesError,
} from './actions';

function* getUtilities(action) {
  const { callback } = action;
  try {
    const utilities = yield call(utilitiesAPI.getUtilities, null);

    addToLocalStorage('utilities', utilities);
    if (callback) callback(utilities);

    yield put(getUtilitiesSuccess(utilities));
  } catch (error) {
    yield put(getUtilitiesError(error));
  }
}

function* watchUtilities() {
  yield takeLatest(GET_UTILITIES_REQUESTED, getUtilities);
}

export default function* watchUtilitiesSagas() {
  yield all([
    watchUtilities(),
  ]);
}