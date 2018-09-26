import asyncComponent from './../components/AsyncComponent';
// Pages
export const Login = asyncComponent(() => import('./Pages/Users/Login'));
export const Register = asyncComponent(() => import('./Pages/Users/Register'));
export const BlankPage = asyncComponent(() => import('./Pages/BlankPage'));
export const ResetPassword = asyncComponent(() => import('./Pages/Users/ResetPassword'));
export const LockScreen = asyncComponent(() => import('./Pages/Users/LockScreen'));
export const LoginDedicated = asyncComponent(() => import('./Pages/Standalone/LoginDedicated'));
// Other
export const NotFound = asyncComponent(() => import('./NotFound/NotFound'));
export const NotFoundDedicated = asyncComponent(() => import('./Pages/Standalone/NotFoundDedicated'));
export const Error = asyncComponent(() => import('./Pages/Error'));
export const Maintenance = asyncComponent(() => import('./Pages/Maintenance'));
export const Builtin = asyncComponent(() => import('./Pages/Builtin'));
