import { find, pathOr, propEq } from 'ramda';

function getIdFromValue(value, array) {
  const object = find(propEq('value', value))(array);
  return pathOr(value, ['id'], object);
}

export function getEditableCaseFromForm(formCase, utilities) {
  const {
    region,
    practiceArea,
    priceType,
  } = formCase;

  const {
    userRegion,
    practiceArea: practiceAreas,
    priceType: priceTypes,
  } = utilities;

  return {
    ...formCase,
    region: getIdFromValue(region, userRegion),
    practiceArea: getIdFromValue(practiceArea, practiceAreas),
    priceType: getIdFromValue(priceType, priceTypes),
  };
}
