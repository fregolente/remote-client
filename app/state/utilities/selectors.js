import { createSelector } from 'reselect';

export const getUserRegion = state => state.utilities.utilities.userRegion;
export const getPracticeArea = state => state.utilities.utilities.practiceArea;

export const utilitiesSelector = createSelector(
  [getUserRegion, getPracticeArea],
  (userRegion, practiceArea) => {
    return {
      userRegion,
      practiceArea,
    };
  }
);