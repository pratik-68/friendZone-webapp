import { getLoginData, removeToken } from '../../services/loginService';
import {
  AUTHORIZED_USER,
  ERROR,
  SERVICE_UNAVAILABLE,
  USER_LOGOUT,
} from '../../constants/action-constants';
import { login, logout } from '../../utils';

// ACTION FOR ADDING LOGIN USER STATUS DETAILS
export const loginUser = (user) => (dispatch) => {
  getLoginData(user)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          login(data.login_token.token);
          return dispatch({
            type: AUTHORIZED_USER,
          });
        });
      } else if (res.status === 400) {
        return res.json().then((data) => {
          return dispatch({
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

// LOGOUT ACTION
export const logoutUser = () => (dispatch) => {
  removeToken()
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          logout();
          dispatch({
            type: USER_LOGOUT,
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
