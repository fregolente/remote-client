import { App, Dashboard, Outer } from './../components';
import withTracker from './withTracker';
// import * as page from './pageListAsync';
/* Code Splitting (Disabled by default) */
/*
  Use pageListAsync to split javascript request.
  Just uncomment the line code above, then comment/remove import * as page from './pageList';.
  It will load only necessary script by routing request.
  The page will load Asynchronously.
  Suitable for handle slow internet connection in client.
  --------
  NOTE: We recommend to use it in production only,
  because will make development slower. especially when HMR re-build.
*/
import * as page from './pageList';
// Pages
const { Login } = page;
const { Register } = page;
const { BlankPage } = page;
const { ResetPassword } = page;
const { LockScreen } = page;
const { LoginDedicated } = page;
// Other
const { NotFound } = page;
const { NotFoundDedicated } = page;
const { Error } = page;
const { Maintenance } = page;
const { Builtin } = page;

export default (store) => { // eslint-disable-line
  // we can get an access to store
  return [{
    component: withTracker(App),
    routes: [
      {
        component: withTracker(LoginDedicated),
        path: '/',
        exact: true,
      },
      {
        component: withTracker(Outer),
        path: '/login',
        routes: [
          {
            path: '/login',
            component: withTracker(Login),
            exact: true,
          },
          {
            path: '*',
            component: withTracker(NotFound)
          }
        ]
      },
      {
        component: withTracker(Outer),
        path: '/register',
        routes: [
          {
            path: '/register',
            component: withTracker(Register),
            exact: true,
          },
          {
            path: '*',
            component: withTracker(NotFound)
          }
        ]
      },
      {
        component: withTracker(Outer),
        path: '/reset-password',
        routes: [
          {
            path: '/reset-password',
            component: withTracker(ResetPassword),
            exact: true,
          },
          {
            path: '*',
            component: withTracker(NotFound)
          }
        ]
      },
      {
        component: withTracker(Outer),
        path: '/lock-screen',
        routes: [
          {
            path: '/lock-screen',
            component: withTracker(LockScreen),
            exact: true,
          },
          {
            path: '*',
            component: withTracker(NotFound)
          }
        ]
      },
      {
        component: withTracker(Outer),
        path: '/maintenance',
        routes: [
          {
            path: '/maintenance',
            component: withTracker(Maintenance),
            exact: true,
          },
          {
            path: '*',
            component: withTracker(NotFound)
          }
        ]
      },
      {
        component: withTracker(Dashboard),
        path: '/app',
        routes: [
          {
            path: '/app',
            component: withTracker(BlankPage),
            exact: true,
          },
          {
            path: '/app/built-in-pages',
            component: withTracker(Builtin),
            exact: true,
          },
          {
            path: '/app/pages/not-found',
            component: withTracker(NotFound),
          },
          {
            path: '/app/pages/error',
            component: withTracker(Error),
          },
          {
            path: '*',
            component: withTracker(NotFound)
          }
        ]
      },
      {
        path: '*',
        component: withTracker(NotFoundDedicated)
      }
    ]
  }];
};
