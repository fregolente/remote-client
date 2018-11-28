// Actions
import {
  UPDATE_USER,
  CLEAN_USER,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_ERROR,
  EDIT_USER_REQUEST,
  EDIT_USER_ERROR,
} from './actions';

const initialState = {};

export default function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        currentUser: action.user,
      };
    case GET_USER_BY_ID_REQUEST:
      return {
        ...state,
        userId: action.userId,
      };
    case EDIT_USER_REQUEST:
      return {
        ...state,
        user: action.user,
      };
    case EDIT_USER_ERROR:
    case GET_USER_BY_ID_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CLEAN_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};