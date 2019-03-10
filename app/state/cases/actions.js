export const CREATE_CASE = 'CREATE_CASE';

export function createCase(newCase) {
  return {
    type: CREATE_CASE,
    newCase,
  }
}

export const CREATE_CASE_SUCCESS = 'CREATE_CASE_SUCCESS';

export function createCaseSuccess() {
  return {
    type: CREATE_CASE_SUCCESS,
  }
}


export const CREATE_CASE_ERROR = 'CREATE_CASE_ERROR';

export function createCaseError(error) {
  return {
    type: CREATE_CASE_ERROR,
    error,
  }
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
    type: GET_USER_CASES,
    error,
  };
}
