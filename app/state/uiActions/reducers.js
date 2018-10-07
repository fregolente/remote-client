// Actions
import {
  CHANGE_THEME,
  LOAD_PAGE,
  SET_LOADING_PAGE,
  OPEN_SUBMENU,  
} from './actions';


const initialState = {
  theme: 'greyTheme', // default theme
  isPageLoading: true,
  sidebarOpen: false,
};

export default function uiActionsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case SET_LOADING_PAGE:
      return {
        ...state,
        isPageLoading: action.isPageLoading,
      };
  default:
      return state;
  }
}
