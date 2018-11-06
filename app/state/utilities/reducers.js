import {
  GET_UTILITIES_SUCCESS,
  GET_UTILITIES_REQUESTED,
} from './actions';

const initialState = {
  utilities: [],
}

export default function utilitiesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_UTILITIES_REQUESTED:
      return {
        ...state,
        utilities: initialState.utilities,
      };
    case GET_UTILITIES_SUCCESS:
      return {
        ...state,
        utilities: action.utilities,
      };
    default:
      return state;
  }
}