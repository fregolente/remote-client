export const getFavoriteCases = state => state.lawyer.favoriteCases;
export const getFavoriteCasesError = state => state.lawyer.favoriteCasesError;
export const getFavoriteCasesLoading = state => state.lawyer.favoriteCasesLoading;

export const getFavoriteCasesSelector = state => ({
  favoriteCases: getFavoriteCases(state),
  favoriteCasesError: getFavoriteCasesError(state),
  favoriteCasesLoading: getFavoriteCasesLoading(state),
});

export const getAppliedCases = state => state.lawyer.appliedCases;
export const getAppliedCasesError = state => state.lawyer.appliedCasesError;
export const getAppliedCasesLoading = state => state.lawyer.appliedCasesLoading;

export const getAppliedCasesSelector = state => ({
  appliedCases: getAppliedCases(state),
  appliedCasesError: getAppliedCasesError(state),
  appliedCasesLoading: getAppliedCasesLoading(state),
});
