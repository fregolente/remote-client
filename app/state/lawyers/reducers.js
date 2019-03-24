// Actions
import {
  GET_FAVORITE_CASES,
  GET_FAVORITE_CASES_ERROR,
  GET_FAVORITE_CASES_SUCCESS,
  GET_APPLIED_CASES,
  GET_APPLIED_CASES_ERROR,
  GET_APPLIED_CASES_SUCCESS,
} from './actions';

const initialState = {
  favoriteCases: [],
  favoriteCasesError: '',
  favoriteCasesLoading: false,
  appliedCases: [],
  appliedCasesError: '',
  appliedCasesLoading: false,
};

export default function lawyerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITE_CASES:
      return {
        ...state,
        favoriteCases: initialState.favoriteCases,
        favoriteCasesError: initialState.error,
        favoriteCasesLoading: true,
      };
    case GET_FAVORITE_CASES_ERROR:
      return {
        ...state,
        favoriteCases: initialState.favoriteCases,
        favoriteCasesError: action.error,
        favoriteCasesLoading: initialState.favoriteCasesLoading,
      };
    case GET_FAVORITE_CASES_SUCCESS:
      return {
        ...state,
        favoriteCases: action.cases,
        favoriteCasesError: initialState.error,
        favoriteCasesLoading: initialState.favoriteCasesLoading,
      };
    case GET_APPLIED_CASES:
      return {
        ...state,
        appliedCases: initialState.favoriteCases,
        appliedCasesError: initialState.error,
        appliedCasesLoading: true,
      };
    case GET_APPLIED_CASES_ERROR:
      return {
        ...state,
        appliedCases: initialState.favoriteCases,
        appliedCasesError: action.error,
        appliedCasesLoading: initialState.favoriteCasesLoading,
      };
    case GET_APPLIED_CASES_SUCCESS:
      return {
        ...state,
        appliedCases: action.cases,
        appliedCasesError: initialState.error,
        appliedCasesLoading: initialState.favoriteCasesLoading,
      };
    default:
      return state;
  }
}
