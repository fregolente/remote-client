import * as R from 'ramda';
import * as ROUTES from '~/constants/routes';

export function isTokenlessRoute(route) {
  return ROUTES.tokenlessRoutes.some(tokenlessRoute => route.match(tokenlessRoute));
}

function extractIdFromObject(object) {
  return object.id;
}

export function parseRegisterFormDataToMongoUser(user) {
  const {
    gender,
    userType,
    userRegion,
  } = user;
  let lawyerInfo = {};

  if (userType.value === 1) { // lawyer
    const {
      biography,
      linkedinUrl,
      practiceArea,
      graduationDate,
      graduatedInstitution,
    } = user;

    lawyerInfo = {
      biography,
      linkedinUrl,
      graduationDate,
      institution: graduatedInstitution,
      practiceArea: practiceArea.map(area => extractIdFromObject(area)),
    };
  }

  const omitProperties = ['biography', 'linkedinUrl', 'practiceArea', 'graduationDate', 'graduatedInstitution']
  const spreadUser = R.omit(omitProperties, user);

  const responseUser = {
    ...spreadUser,
    gender: extractIdFromObject(gender),
    userType: extractIdFromObject(userType),
    userRegion: userRegion.map(region => extractIdFromObject(region)),
    lawyerInfo: lawyerInfo,
  };



  return responseUser;
}