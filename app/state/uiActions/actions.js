// Global UI Action
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const toggleAction = () => {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

export const OPEN_SUBMENU = 'OPEN_SUBMENU';
export const openAction = (initialLocation) => {
  return {
    type: OPEN_SUBMENU,
    initialLocation,
  };
};

export const CHANGE_THEME = 'CHANGE_THEME';
export const changeThemeAction = (theme) => {
  return {
    type: CHANGE_THEME,
    theme,
  };
};

export const LOAD_PAGE = 'LOAD_PAGE';
export const playTransitionAction = (isLoaded) => {
  return {
    type: LOAD_PAGE,
    isLoaded,
  };
};

export const SET_LOADING_PAGE = 'SET_LOADING_PAGE';
export const setPageLoadingAction = (isPageLoading) => {
  return {
    type: SET_LOADING_PAGE,
    isPageLoading,
  };
};
