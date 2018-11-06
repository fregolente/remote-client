import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { persistStore, autoRehydrate } from 'redux-persist';
import { compose, createStore, applyMiddleware } from 'redux';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import 'babel-polyfill';

// Middleware
import refreshTokenMW from '~/state/authorization/middleware';
import detectActivityMW from '~/state/activity/middleware';

// Reducers
import rootReducer from '~/state/reducers';

// Sagas
import rootSaga from '~/state/sagas';

// Routes
import mainRoutes from './routes';

// Components
import MainContainer from './components/mainContainer';

// react-loading-bar CSS file
import '~/styles/components/vendors/react-loading-bar/index.css';

import { } from '~/styles/components/Typography.scss';
import { } from '~/styles/normalize.scss';
import { } from '~/styles/layout/_base.scss'; // eslint-disable-line

if (!window.fetch) {
  require('whatwg-fetch'); // eslint-disable-line global-require
}

const history = createHistory();
const routerMW = routerMiddleware(history);
const sagaMW = createSagaMiddleware();

function configureStore() {
  return new Promise((resolve, reject) => {
    try {
      const store = createStore(
        connectRouter(history)(rootReducer),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        compose(
          applyMiddleware(routerMW, sagaMW, refreshTokenMW, detectActivityMW),
          autoRehydrate(),
        ),
      );
      /* eslint-enable */
      persistStore(store, {
        blacklist: [],
        transforms: [createBlacklistFilter('login', ['error'])],
      }, () => resolve(store));

      sagaMW.run(rootSaga);
    } catch (e) {
      reject(e);
    }
  });
}

// This is necessary to wait store being hydrated by redux-persist
// before re-render components
async function init() {
  const store = await configureStore();
  

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MainContainer>
          {mainRoutes}
        </MainContainer>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
  );
}

init();