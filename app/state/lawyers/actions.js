export const GET_FAVORITE_CASES = 'GET_FAVORITE_CASES';

export function getFavoriteCases() {
  return {
    type: GET_FAVORITE_CASES,
  };
}

export const GET_FAVORITE_CASES_SUCCESS = 'GET_FAVORITE_CASES_SUCCESS';

export function getFavoriteCasesSuccess(cases) {
  return {
    type: GET_FAVORITE_CASES_SUCCESS,
    cases,
  };
}


export const GET_FAVORITE_CASES_ERROR = 'GET_FAVORITE_CASES_ERROR';

export function getFavoriteCasesError(error) {
  return {
    type: GET_FAVORITE_CASES_ERROR,
    error,
  };
}

export const FAVORITE_A_CASE = 'FAVORITE_A_CASE';

export function favoriteACase(caseId, lawyerId) {
  return {
    type: FAVORITE_A_CASE,
    caseId,
    lawyerId,
  };
}

export const UNFAVORITE_A_CASE = 'UNFAVORITE_A_CASE';

export function unfavoriteACase(caseId, lawyerId) {
  return {
    type: UNFAVORITE_A_CASE,
    caseId,
    lawyerId,
  };
}

export const FAVORITE_A_CASE_SUCCESS = 'FAVORITE_A_CASE_SUCCESS';

export function favoriteACaseSuccess(cases) {
  return {
    type: FAVORITE_A_CASE_SUCCESS,
    cases,
  };
}


export const FAVORITE_A_CASE_ERROR = 'FAVORITE_A_CASE_ERROR';

export function favoriteACaseError(error) {
  return {
    type: FAVORITE_A_CASE_ERROR,
    error,
  };
}


export const GET_APPLIED_CASES = 'GET_APPLIED_CASES';

export function getAppliedCases() {
  return {
    type: GET_APPLIED_CASES,
  };
}

export const GET_APPLIED_CASES_SUCCESS = 'GET_APPLIED_CASES_SUCCESS';

export function getAppliedCasesSuccess(cases) {
  return {
    type: GET_APPLIED_CASES_SUCCESS,
    cases,
  };
}


export const GET_APPLIED_CASES_ERROR = 'GET_APPLIED_CASES_ERROR';

export function getAppliedCasesError(error) {
  return {
    type: GET_APPLIED_CASES_ERROR,
    error,
  };
}

export const APPLY_TO_A_CASE = 'APPLY_TO_A_CASE';

export function applyToACase(caseId, lawyerId) {
  return {
    type: APPLY_TO_A_CASE,
    caseId,
    lawyerId,
  };
}

export const APPLY_TO_A_CASE_ERROR = 'APPLY_TO_A_CASE_ERROR';

export function applyToACaseError(error) {
  return {
    type: APPLY_TO_A_CASE_ERROR,
    error,
  };
}
