import { pathOr } from 'ramda';

export const isLawyer = state => pathOr(false, ['state', 'user', 'currentUser', 'userType', 'value'], state) === 1;
export const isRegularUser = state => pathOr(false, ['state', 'user', 'currentUser', 'userType', 'value'], state) === 2;

// export const isRegularUser = state => state.user.currentUser.userType.value === 2;

export const currentUserId = state => state.user.currentUser._id; // eslint-disable-line no-underscore-dangle
export const currentUserLawyerId = state => pathOr(null, ['user', 'currentUser', 'lawyerInfo', '_id'], state); // eslint-disable-line no-underscore-dangle
export const lawyerAppliedCases = state => pathOr(null, ['user', 'currentUser', 'lawyerInfo', 'casesApplied'], state); // eslint-disable-line no-underscore-dangle
export const lawyerFavoritedCases = state => pathOr(null, ['user', 'currentUser', 'lawyerInfo', 'favoriteCases'], state); // eslint-disable-line no-underscore-dangle
