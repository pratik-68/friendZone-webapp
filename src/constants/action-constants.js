const BASE_URL = 'http://localhost:3001/api/v1';

export const SIGNUP_URL = `${BASE_URL}/auth/signup/`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;

export const EMAIL_VERIFICATION_URL = (token) =>
  `${BASE_URL}/users/email-verify/${token}`;
export const USER_URL = `${BASE_URL}/users`;
export const USER_UPDATE_URL = (id) => `${BASE_URL}/users/${id}`;
export const GET_USERS_URL = (query) =>
  `${BASE_URL}/users/search-profile${query}`;
export const PROFILE_URL = (id) => `${BASE_URL}/users/${id}`;

export const FRIEND_REQUEST_URL = (user_id) =>
  `${BASE_URL}/friends/request/${user_id}`;
export const FRIEND_REQUEST_VERIFICATION_URL = (user_id) =>
  `${BASE_URL}/friends/request-verify/${user_id}`;
export const SUBSCRIBE_URL = (user_id) =>
  `${BASE_URL}/friends/subscribe/${user_id}`;

export const GET_FRIENDS_URL = (query) => `${BASE_URL}/users/friends${query}`;
export const GET_FRIENDS_NAME_URL = `${BASE_URL}/users/friends-name`;

export const CREATE_POST_URL = `${BASE_URL}/posts`;
export const UPDATE_POST_URL = (id) => `${BASE_URL}/posts/${id}`;
export const POST_URL = (id) => `${BASE_URL}/posts/${id}`;
export const ALL_POSTS_URL = (query) => `${BASE_URL}/posts/friends${query}`;
export const MY_POSTS_URL = (query) => `${BASE_URL}/posts${query}`;
export const USER_POSTS_URL = (id, query) =>
  `${BASE_URL}/posts/users/${id}${query}`;

export const AUTHORIZED_USER = 'AUTHORIZED_USER';
export const UNAUTHORIZED_USER = 'UNAUTHORIZED_USER';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_NOT_FOUND = 'CLEAR_NOT_FOUND';
export const CLEAR_SERVICE_UNAVAILABLE = 'CLEAR_SERVICE_UNAVAILABLE';
export const CLEAR_SUCCESS = 'CLEAR_SUCCESS';
export const CLEAR_SUBSCRIBE = 'CLEAR_SUBSCRIBE';

export const ERROR = 'ERROR';
export const NOT_FOUND = 'NOT_FOUND';
export const SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE';
export const SUCCESS = 'SUCCESS';

export const EMAIL_VERIFICATION = 'EMAIL_VERIFICATION';

export const USER_DATA = 'USER_DATA';
export const USER_LIST = 'USER_LIST';
export const USER_NAMES_LIST = 'USER_NAMES_LIST';
export const PROFILE_DATA = 'PROFILE_DATA';
export const LOAD_USER = 'LOAD_USER';
export const CLEAR_SEARCHED_USER = 'CLEAR_SEARCHED_USER';
export const CLEAR_USER_LIST = 'CLEAR_USER_LIST';
export const USER_LOGOUT = 'USER_LOGOUT';

export const POST_DATA = 'POST_DATA';
export const POSTS_LIST = 'POSTS_LIST';
export const CLEAR_POST = 'CLEAR_POST';
export const CLEAR_POST_LIST = 'CLEAR_POST_LIST';

export const SUBSCRIBE = 'SUBSCRIBE';
