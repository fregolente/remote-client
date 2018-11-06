import { all } from 'redux-saga/effects';

// Sagas
// import watchCurrentUserSagas from './currentUser/sagas';
//import watchAuthorizationSagas from './authorization/sagas';
import watchRegisterSagas from './register/sagas';
import watchUtilitiesSagas from './utilities/sagas';

export default function* rootSaga() {
  yield all([
    // watchCurrentUserSagas(),
    // watchAuthorizationSagas(),
    watchRegisterSagas(),
    watchUtilitiesSagas(),
  ]);
}
