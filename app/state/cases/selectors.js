export const createCaseStatus = state => state.cases;

export const getMyCasesStatus = state => ({
  cases: state.cases.myCases,
  loading: state.cases.loadingMyCases,
  error: state.cases.errorMyCases,
});

export const getSelectedCase = state => state.cases.selectedCase;

const getSelectedCaseLawyers = state => state.cases.selectedCaseLawyers;
const getSelectedCaseLawyersLoading = state => state.cases.loadingCaseLawyers;
const getSelectedCaseLawyersError = state => state.cases.selectedCaseLawyersError;

export const getAppliedLawyersData = state => ({
  appliedLawyers: getSelectedCaseLawyers(state),
  loadingLawyers: getSelectedCaseLawyersLoading(state),
  appliedLawyersError: getSelectedCaseLawyersError(state),
});

const getExplorerCases = state => state.cases.cases;
const getExplorerCasesLoading = state => state.cases.loadingExplorerCases;
const getExplorerCasesError = state => state.cases.explorerCasesError;

export const getExplorerPageData = state => ({
  explorerCases: getExplorerCases(state),
  loadingExplorerCases: getExplorerCasesLoading(state),
  explorerCasesError: getExplorerCasesError(state),
});
