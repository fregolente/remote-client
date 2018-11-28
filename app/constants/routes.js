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


export const tokenlessRoutes = [LOGIN, REGISTER];

export const LOGOUT_TEXT = 'Logout';

