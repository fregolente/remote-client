
import * as ROUTES from '~/constants/routes';

export function isTokenlessRoute(route) {
  return ROUTES.tokenlessRoutes.some(tokenlessRoute => route.match(tokenlessRoute));
}