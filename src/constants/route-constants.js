export const INDEX_ROUTE = '/';
export const SERVICE_UNAVAILABLE_ROUTE = '/500';

export const SIGN_UP_ROUTE = '/signup';
export const EMAIL_CONFIRMATION_ROUTE = '/user/verification/:token';

export const LOGIN_ROUTE = '/login';

export const DASHBOARD_ROUTE = '/';
export const PROFILE_ROUTE = '/user';

export const SEARCHED_PROFILE_ROUTE = '/user/:id';
export const SEARCHED_PROFILE_URL = (id) => `/user/${id}`;
export const SEARCHED_USER_LIST_ROUTE = '/profile';

export const FRIEND_REQUEST_ACCEPT_ROUTE = '/friends/request-verify/:token';
export const FRIEND_LIST_ROUTE = '/friends';

export const CREATE_POST_ROUTE = '/post';
export const MY_POSTS_ROUTE = '/my-posts';
export const POST_DETAIL_ROUTE = '/post/:id';
export const POST_DETAIL_URL = (id) => `/post/${id}`;
