import { pathOr } from 'ramda';

export const isLawyer = state => pathOr(false, ['state', 'user', 'currentUser', 'userType', 'value'], state) === 1;
export const isRegularUser = state => pathOr(false, ['state', 'user', 'currentUser', 'userType', 'value'], state) === 2;

// eslint-disable-next-line no-underscore-dangle
export const currentUserId = state => pathOr(null, ['user', 'currentUser', '_id'], state);

export const currentUserLawyerId = state => pathOr(null, ['user', 'currentUser', 'lawyerInfo', '_id'], state);

export const lawyerAppliedCases = state => pathOr(null, ['user', 'currentUser', 'lawyerInfo', 'casesApplied'], state);
// eslint-disable-line no-underscore-dangle
export const lawyerFavoritedCases = state => pathOr(null, ['user', 'currentUser', 'lawyerInfo', 'favoriteCases'], state);
