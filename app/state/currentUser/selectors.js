import { pathOr } from 'ramda';

export const isLawyer = state => pathOr(false, ['user', 'currentUser', 'userType', 'value'], state) === 1;
export const isRegularUser = state => pathOr(false, ['user', 'currentUser', 'userType', 'value'], state) === 2;

export const currentUserId = pathOr(null, ['user', 'currentUser', '_id']);

export const currentUserLawyerId = pathOr(null, ['user', 'currentUser', 'lawyerInfo', '_id']);

export const lawyerAppliedCases = pathOr(null, ['user', 'currentUser', 'lawyerInfo', 'casesApplied']);

export const lawyerFavoritedCases = pathOr(
  null,
  ['user', 'currentUser', 'lawyerInfo', 'favoriteCases'],
);
