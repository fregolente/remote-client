export const CREATE_USER_REQUESTED = 'CREATE_USER_REQUESTED';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export function createUserRequested(user) {
  return {
    type: CREATE_USER_REQUESTED,
    user,
  };
}

export function createUserSuccess(user) {
  return {
    type: CREATE_USER_SUCCESS,
    user,
  };
}

export function createUserError(error) {
  return {
    type: CREATE_USER_ERROR,
    error,
  };
}
