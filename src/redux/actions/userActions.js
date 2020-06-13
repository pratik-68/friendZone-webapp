import {
  getProfile,
  getUser,
  getUsers,
  updateUser,
} from '../../services/userService';
import {
  CLEAR_ERROR,
  CLEAR_NOT_FOUND,
  CLEAR_SEARCHED_USER,
  CLEAR_SERVICE_UNAVAILABLE,
  CLEAR_SUCCESS,
  CLEAR_USER_LIST,
  ERROR,
  LOAD_USER,
  NOT_FOUND,
  PROFILE_DATA,
  SERVICE_UNAVAILABLE,
  SUCCESS,
  UNAUTHORIZED_USER,
  USER_DATA,
  USER_LIST,
} from '../../constants/action-constants';
import { getToken, logout } from '../../utils';

// ACTION FOR CLEARING ERROR
export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};

// ACTION FOR CLEARING SERVICEUNAVAILABLE STATE
export const clearServiceUnavailable = () => (dispatch) => {
  dispatch({
    type: CLEAR_SERVICE_UNAVAILABLE,
  });
};

// ACTION FOR CLEARING SUCCESS
export const clearSuccess = () => (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS,
  });
};

// ACTION FOR CLEARING NOT FOUND
export const clearNotFound = () => (dispatch) => {
  dispatch({
    type: CLEAR_NOT_FOUND,
  });
};

// ACTION FOR CLEARING SEARCHED USER STATE
export const clearSearchedUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_SEARCHED_USER,
  });
};

// ACTION FOR CLEARING SEARCHED USER LIST STATE
export const clearUserList = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER_LIST,
  });
};

// ACTION FOR CLEARING AUTHORISE USER STATE
export const unauthorisedUser = () => (dispatch) => {
  dispatch({
    type: UNAUTHORIZED_USER,
  });
};

// ACTION FOR FETCHING USER DETAILS
export const userDetail = () => (dispatch) => {
  getUser()
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch({
            type: USER_DATA,
            data: data,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else {
        return res.json().then((data) => {
          dispatch({
            type: ERROR,
            error: data.error,
          });
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SERVICE_UNAVAILABLE,
      });
    });
};

// ACTION FOR GET SEARCHED USER PROFILE
export const searchProfile = (id) => (dispatch) => {
  getProfile(id)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch({
            type: PROFILE_DATA,
            data: data,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else if (res.status === 404) {
        dispatch({
          type: NOT_FOUND,
        });
      } else {
        dispatch({
          type: SERVICE_UNAVAILABLE,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SERVICE_UNAVAILABLE,
      });
    });
};

// ACTION FOR SEARCHING USERS
export const searchUsers = (query_parameter) => (dispatch) => {
  getUsers(query_parameter)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch({
            type: USER_LIST,
            data: data,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else if (res.status === 400) {
        res.json().then((data) => {
          dispatch({
            type: ERROR,
            error: data.error,
          });
        });
      } else {
        dispatch({
          type: SERVICE_UNAVAILABLE,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SERVICE_UNAVAILABLE,
      });
    });
};

// ACTION FOR UPDATING USER DETAILS
export const updateUserDetail = (user) => (dispatch) => {
  const userDetail = {
    first_name: user.first_name,
    last_name: user.last_name,
    password: user.password,
    password_confirmation: user.password_confirmation,
    city: user.city,
    gender: user.gender,
    interests: user.interests,
    date_of_birth: user.date_of_birth,
  };
  const password = {
    old_password: user.old_password,
  };
  updateUser(user.id, userDetail, password)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          dispatch({
            type: SUCCESS,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else {
        return res.json().then((data) => {
          dispatch({
            type: ERROR,
            error: data.error,
          });
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SERVICE_UNAVAILABLE,
      });
    });
};

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch) => {
  const token = getToken();
  if (token) {
    getUser()
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => {
            dispatch({
              type: LOAD_USER,
              data: data,
            });
          });
        } else if (res.status === 401) {
          return res.json().then((data) => {
            logout();
            dispatch({
              type: UNAUTHORIZED_USER,
            });
          });
        } else {
          dispatch({
            type: SERVICE_UNAVAILABLE,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SERVICE_UNAVAILABLE,
        });
      });
  } else {
    dispatch({
      type: UNAUTHORIZED_USER,
    });
  }
};
