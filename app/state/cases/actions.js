export const CLEAR_CREATE_CASE = 'CLEAR_CREATE_CASE';
export function cleanCreateCase() {
  return {
    type: CLEAR_CREATE_CASE,
  };
}

export const CREATE_CASE = 'CREATE_CASE';

export function createCase(newCase) {
  return {
    type: CREATE_CASE,
    newCase,
  };
}

export const CREATE_CASE_SUCCESS = 'CREATE_CASE_SUCCESS';

export function createCaseSuccess(cases) {
  return {
    type: CREATE_CASE_SUCCESS,
    cases,
  };
}


export const CREATE_CASE_ERROR = 'CREATE_CASE_ERROR';

export function createCaseError(error) {
  return {
    type: CREATE_CASE_ERROR,
    error,
  };
}

export const GET_USER_CASES = 'GET_USER_CASES';

export function getUserCases() {
  return {
    type: GET_USER_CASES,
  };
}

export const GET_USER_CASES_SUCCESS = 'GET_USER_CASES_SUCCESS';

export function getUserCasesSuccess(cases) {
  return {
    type: GET_USER_CASES_SUCCESS,
    cases,
  };
}

export const GET_USER_CASES_ERROR = 'GET_USER_CASES_ERROR';

export function getUserCasesError(error) {
  return {
    type: GET_USER_CASES_ERROR,
    error,
  };
}

export const SELECT_A_CASE = 'SELECT_A_CASE';

export function selectACase(selectedCase) {
  return {
    type: SELECT_A_CASE,
    selectedCase,
  };
}

export const CLEAR_SELECTED_CASE = 'CLEAR_SELECTED_CASE';

export function clearSelectedCase() {
  return {
    type: CLEAR_SELECTED_CASE,
  };
}

export const EDIT_USER_CASE = 'EDIT_USER_CASE';

export function editUserCase(userCase) {
  return {
    type: EDIT_USER_CASE,
    userCase,
  };
}

export const EDIT_USER_CASE_SUCCESS = 'EDIT_USER_CASE_SUCCESS';

export function editUserCaseSuccess(userCase) {
  return {
    type: EDIT_USER_CASE_SUCCESS,
    userCase,
  };
}

export const EDIT_USER_CASE_ERROR = 'EDIT_USER_CASE_ERROR';

export function editUserCaseError(error) {
  return {
    type: EDIT_USER_CASE_ERROR,
    error,
  };
}

export const GET_APPLIED_LAWYERS = 'GET_APPLIED_LAWYERS';

export function getAppliedLawyers(caseId) {
  return {
    type: GET_APPLIED_LAWYERS,
    caseId,
  };
}

export const GET_APPLIED_LAWYERS_SUCCESS = 'GET_APPLIED_LAWYERS_SUCCESS';

export function getAppliedLawyersSuccess(lawyers) {
  return {
    type: GET_APPLIED_LAWYERS_SUCCESS,
    lawyers,
  };
}

export const GET_APPLIED_LAWYERS_ERROR = 'GET_APPLIED_LAWYERS_ERROR';

export function getAppliedLawyersError(error) {
  return {
    type: GET_APPLIED_LAWYERS_ERROR,
    error,
  };
}

export const GET_EXPLORER_CASES = 'GET_EXPLORER_CASES';

export function getExplorerCases(filters = {}) {
  return {
    type: GET_EXPLORER_CASES,
    filters,
  };
}

export const GET_EXPLORER_CASES_SUCCESS = 'GET_EXPLORER_CASES_SUCCESS';

export function getExplorerCasesSuccess(cases) {
  return {
    type: GET_EXPLORER_CASES_SUCCESS,
    cases,
  };
}

export const GET_EXPLORER_CASES_ERROR = 'GET_EXPLORER_CASES_ERROR';

export function getExplorerCasesError(error) {
  return {
    type: GET_EXPLORER_CASES_ERROR,
    error,
  };
}

export const CLEAN_EXPLORER_CASES = 'CLEAN_EXPLORER_CASES';

export function cleanExplorerCases() {
  return {
    type: CLEAN_EXPLORER_CASES,
  };
}
