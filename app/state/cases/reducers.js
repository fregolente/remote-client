// Actions
import {
  CREATE_CASE,
  CREATE_CASE_ERROR,
  CREATE_CASE_SUCCESS,
} from './actions';

const initialState = {
  error: '',
  creatingCase: false,
  createSuccess: false,
};

export default function casesReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CASE_ERROR:
      return {
        ...state,
        creatingCase: initialState.creatingCase,
        createSuccess: initialState.createSuccess,
        error: action.error,
      };
    case CREATE_CASE:
      return {
        ...state,
        creatingCase: true,
        error: initialState.error,
      };
    case CREATE_CASE_SUCCESS:
      return {
        ...initialState,
        createSuccess: true,
      };
    default:
      return state;
  }
};