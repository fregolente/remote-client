export const paginationUrl = (baseUrl, pageNumber) => `${baseUrl}/Pages/${pageNumber}`;

// Basic routes
export const LOGIN = '/Login';
export const LANDING_PAGE = '/RemoteLegal';

export const tokenlessRoutes = [LOGIN, LANDING_PAGE];