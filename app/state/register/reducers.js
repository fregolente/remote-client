import {
  CREATE_USER_REQUESTED,
  CREATE_USER_SUCCESS,
} from './actions';

const initialState = {
  user: {},
}

export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_USER_REQUESTED:
      return {
        ...state,
        user: initialState.user,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}