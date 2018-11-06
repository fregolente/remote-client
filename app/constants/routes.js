export const paginationUrl = (baseUrl, pageNumber) => `${baseUrl}/Pages/${pageNumber}`;

// Basic routes
export const LOGIN = '/Login';
export const REGISTER = '/Register';

// Logged in pages
export const APP = '/App';
export const PROFILE_PAGE = '/Profile';
export const EXPLORER = '/Explorer';

export const tokenlessRoutes = [LOGIN, REGISTER];