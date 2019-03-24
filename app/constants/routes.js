export const paginationUrl = (baseUrl, pageNumber) => `${baseUrl}/Pages/${pageNumber}`;

// Basic routes
export const LOGIN = '/Login';
export const REGISTER = '/Register';

// Logged in pages
export const APP = '/App';

export const PROFILE_PAGE = `${APP}/Profile`;
export const PROFILE_PAGE_TEXT = 'My Profile';

export const EXPLORER = `${APP}/Explorer`;
export const EXPLORER_TEXT = 'Explorer';
export const EXPLORER_SECONDARY_TEXT = 'Find new available cases';

export const CHAT = `${APP}/Chats`;
export const CHAT_TEXT = 'Chats';
export const CHAT_SECONDARY_TEXT = 'Get in touch';

export const SEARCH = `${APP}/Search`;
export const SEARCH_TEXT = 'Search';

export const MY_CASES = `${APP}/MyCases`;
export const MY_CASES_TEXT = 'My Cases';
export const MY_CASES_SECONDARY_TEXT = 'My created cases';

export const CASE_URL = `${APP}/CreateCase`;
export const CASE_TEXT = 'Create new case';
export const CASE_SECONDARY_TEXT = '';

export const FULL_CASE_URL = `${APP}/FullCase`;

export const FAVORITE_CASE_URL = `${APP}/FavoriteCases`;
export const FAVORITE_CASE_TEXT = 'My Favorites';
export const FAVORITE_CASE_SECONDARY_TEXT = 'See all cases you favorited';

export const APPLIED_CASE_URL = `${APP}/AppliedCases`;
export const APPLIED_CASE_TEXT = 'My Applied Cases';
export const APPLIED_CASE_SECONDARY_TEXT = 'See all cases you applied to';

// export const casesUrl = caseUid => `${CASES_URL}/${caseUid}`;


export const tokenlessRoutes = [LOGIN, REGISTER];

export const LOGOUT_TEXT = 'Logout';

