import { all } from 'redux-saga/effects';

// Sagas
import watchAuthorizationSagas from './authorization/sagas';
import watchRegisterSagas from './register/sagas';
import watchUtilitiesSagas from './utilities/sagas';
import watchCurrentUserSagas from './currentUser/sagas';

export default function* rootSaga() {
  yield all([
    watchCurrentUserSagas(),
    watchAuthorizationSagas(),
    watchRegisterSagas(),
    watchUtilitiesSagas(),
  ]);
}
