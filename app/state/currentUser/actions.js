export const UPDATE_USER = 'UPDATE_USER';

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}

export const CLEAN_USER = 'CLEAN_USER';

export function cleanUser() {
  return {
    type: CLEAN_USER,
  };
}

export const GET_USER_BY_ID_REQUEST = 'GET_USER_BY_ID_REQUEST';

export function getUserByIdRequest(userId) {
  return {
    type: GET_USER_BY_ID_REQUEST,
    userId,
  }
}


export const GET_USER_BY_ID_ERROR = 'GET_USER_BY_ID_ERROR';

export function getUserByIdError(error) {
  return {
    type: GET_USER_BY_ID_ERROR,
    error,
  }
}

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';

export function editUserRequest(user) {
  return {
    type: EDIT_USER_REQUEST,
    user,
  }
}


export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';

export function editUserError(error) {
  return {
    type: EDIT_USER_ERROR,
    error,
  }
}
