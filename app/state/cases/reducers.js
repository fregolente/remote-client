// Actions
import {
  CREATE_CASE,
  CREATE_CASE_ERROR,
  CREATE_CASE_SUCCESS,
  GET_USER_CASES,
  GET_USER_CASES_ERROR,
  GET_USER_CASES_SUCCESS,
  SELECT_A_CASE,
  CLEAR_SELECTED_CASE,
  EDIT_USER_CASE,
  EDIT_USER_CASE_ERROR,
  EDIT_USER_CASE_SUCCESS,
  GET_APPLIED_LAWYERS,
  GET_APPLIED_LAWYERS_ERROR,
  GET_APPLIED_LAWYERS_SUCCESS,
  CLEAN_EXPLORER_CASES,
  GET_EXPLORER_CASES,
  GET_EXPLORER_CASES_ERROR,
  GET_EXPLORER_CASES_SUCCESS,
} from './actions';

const initialState = {
  error: '',
  creatingCase: false,
  createSuccess: false,
  myCases: [],
  loadingMyCases: false,
  errorMyCases: '',
  cases: [],
  loadingExplorerCases: false,
  explorerCasesError: '',
  selectedCase: null,
  selectedCaseError: '',
  selectedCaseLawyers: [],
  selectedCaseLawyersError: '',
  loadingCaseLawyers: false,
  loadingSelectedCase: false,
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
    case GET_USER_CASES:
      return {
        ...state,
        errorMyCases: initialState.errorMyCases,
        myCases: [],
        loadingMyCases: true,
      };
    case GET_USER_CASES_SUCCESS:
      return {
        ...state,
        errorMyCases: initialState.errorMyCases,
        myCases: action.cases,
        loadingMyCases: initialState.loadingMyCases,
      };
    case GET_USER_CASES_ERROR:
      return {
        ...state,
        errorMyCases: action.error,
        myCases: initialState.cases,
        loadingMyCases: initialState.loadingMyCases,
      };
    case SELECT_A_CASE:
      return {
        ...state,
        selectedCase: action.selectedCase,
      };
    case CLEAR_SELECTED_CASE:
      return {
        ...state,
        selectedCase: initialState.selectedCase,
      };
    case EDIT_USER_CASE:
      return {
        ...state,
        loadingSelectedCase: true,
      };
    case EDIT_USER_CASE_SUCCESS:
      return {
        ...state,
        loadingSelectedCase: initialState.loadingSelectedCase,
        selectedCase: action.userCase,
      };
    case EDIT_USER_CASE_ERROR:
      return {
        ...state,
        selectedCase: initialState.selectedCase,
        selectedCaseError: action.error,
      };
    case GET_APPLIED_LAWYERS:
      return {
        ...state,
        selectedCaseLawyers: initialState.selectedCaseLawyers,
        selectedCaseLawyersError: initialState.selectedCaseLawyersError,
        loadingCaseLawyers: true,
      };
    case GET_APPLIED_LAWYERS_SUCCESS:
      return {
        ...state,
        selectedCaseLawyers: action.lawyers,
        selectedCaseLawyersError: initialState.selectedCaseLawyersError,
        loadingCaseLawyers: initialState.loadingCaseLawyers,
      };
    case GET_APPLIED_LAWYERS_ERROR:
      return {
        ...state,
        selectedCaseLawyers: initialState.selectedCaseLawyers,
        selectedCaseLawyersError: action.error,
        loadingCaseLawyers: initialState.loadingCaseLawyers,
      };
    case CLEAN_EXPLORER_CASES:
      return {
        ...state,
        cases: [],
        loadingExplorerCases: false,
        explorerCasesError: '',
      };
    case GET_EXPLORER_CASES:
      return {
        ...state,
        loadingExplorerCases: true,
        explorerCasesError: '',
      };
    case GET_EXPLORER_CASES_SUCCESS:
      return {
        ...state,
        cases: action.cases,
        loadingExplorerCases: false,
        explorerCasesError: '',
      };
    case GET_EXPLORER_CASES_ERROR:
      return {
        ...state,
        loadingExplorerCases: false,
        explorerCasesError: action.error,
      };
    default:
      return state;
  }
}
