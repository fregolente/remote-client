export const GET_UTILITIES_REQUESTED = 'GET_UTILITIES_REQUESTED';
export const GET_UTILITIES_SUCCESS = 'GET_UTILITIES_SUCCESS';
export const GET_UTILITIES_ERROR = 'GET_UTILITIES_ERROR';

export function getUtilitiesRequested(callback) {
  return {
    type: GET_UTILITIES_REQUESTED,
    callback,
  };
}

export function getUtilitiesSuccess(utilities) {
  return {
    type: GET_UTILITIES_SUCCESS,
    utilities,
  };
}

export function getUtilitiesError(error) {
  return {
    type: GET_UTILITIES_ERROR,
    error,
  };
}
