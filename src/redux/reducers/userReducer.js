import {
  AUTHORIZED_USER,
  CLEAR_ERROR,
  CLEAR_NOT_FOUND,
  CLEAR_SEARCHED_USER,
  CLEAR_SERVICE_UNAVAILABLE,
  CLEAR_SUCCESS,
  CLEAR_SUBSCRIBE,
  CLEAR_USER_LIST,
  ERROR,
  LOAD_USER,
  NOT_FOUND,
  PROFILE_DATA,
  SERVICE_UNAVAILABLE,
  SUCCESS,
  SUBSCRIBE,
  UNAUTHORIZED_USER,
  USER_DATA,
  USER_LIST,
  USER_NAMES_LIST,
} from '../../constants/action-constants';

// INITIAL STATE OF STORE
const initialState = {
  authorizedUser: null,
  error: {},
  searchedUser: {},
  serviceUnavailable: false,
  success: false,
  subscribe: false,
  user: {},
  userList: {
    users: [],
    list_size: 0,
  },
  notFound: false,
};

// REDUCER FOR UPDATING THE CENTRAL STORE
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.error,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: {},
      };

    case SERVICE_UNAVAILABLE:
      return {
        ...state,
        serviceUnavailable: true,
      };

    case NOT_FOUND:
      return {
        ...state,
        notFound: true,
      };

    case CLEAR_NOT_FOUND:
      return {
        ...state,
        notFound: false,
      };

    case LOAD_USER:
      return {
        ...state,
        authorizedUser: true,
        user: action.data.user,
      };

    case SUCCESS:
      return {
        ...state,
        success: true,
      };

    case CLEAR_SUCCESS:
      return {
        ...state,
        success: false,
      };

    case SUBSCRIBE:
      return {
        ...state,
        subscribe: true,
      };

    case CLEAR_SUBSCRIBE:
      return {
        ...state,
        subscribe: false,
      };

    case CLEAR_SEARCHED_USER:
      return {
        ...state,
        searchedUser: {},
      };

    case CLEAR_USER_LIST:
      return {
        ...state,
        userList: {
          users: [],
          list_size: 0,
        },
      };

    case USER_DATA:
      return { ...state, user: action.data.user };

    case USER_LIST:
      return {
        ...state,
        userList: {
          users: action.data.users,
          list_size: action.data.meta.total_count,
        },
      };

    case USER_NAMES_LIST:
      return {
        ...state,
        userList: {
          users: action.data.users,
        },
      };

    case PROFILE_DATA:
      return { ...state, searchedUser: action.data.user };

    case AUTHORIZED_USER:
      return { ...state, authorizedUser: true };

    case UNAUTHORIZED_USER:
      return { ...state, authorizedUser: false };

    case CLEAR_SERVICE_UNAVAILABLE:
      return { ...state, serviceUnavailable: false };

    // DEFAULT CASE
    default:
      return state;
  }
};

export default userReducer;
