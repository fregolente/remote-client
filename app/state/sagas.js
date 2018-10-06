import { all } from 'redux-saga/effects';

// Sagas
// import watchCurrentUserSagas from './currentUser/sagas';
//import watchAuthorizationSagas from './authorization/sagas';

export default function* rootSaga() {
  yield all([
    // watchCurrentUserSagas(),
    // watchAuthorizationSagas(),
  ]);
}
