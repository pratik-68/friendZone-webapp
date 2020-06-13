import {
  CLEAR_SUBSCRIBE,
  ERROR,
  PROFILE_DATA,
  SERVICE_UNAVAILABLE,
  SUBSCRIBE,
  SUCCESS,
  UNAUTHORIZED_USER,
  USER_LIST,
  USER_NAMES_LIST,
} from '../../constants/action-constants';
import { logout } from '../../utils';
import {
  acceptFriendRequest,
  sendFriendRequest,
  verifyFriendRequestService,
  getUserFriends,
  getFriendsName,
  manageSubscribe,
} from '../../services/friendService';

// ACTION FOR SENDIND FRIEND REQUEST
export const sendRequest = (user_id) => (dispatch) => {
  sendFriendRequest(user_id)
    .then((res) => {
      if (res.status === 201) {
        res.json().then((data) => {
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

// ACTION FOR ACCEPTING FRIEND REQUEST
export const acceptRequest = (user_id) => (dispatch) => {
  acceptFriendRequest(user_id)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
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

// ACTION FOR VERIFYING FRIEND REQUEST EMAIL
export const verifyFriendRequest = (token) => (dispatch) => {
  verifyFriendRequestService(token)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          dispatch({
            type: PROFILE_DATA,
            data: data,
          });
        });
      } else if (res.status === 400) {
        return res.json().then((data) => {
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

// ACTION FOR FETCHING FRIEND LIST
export const getFriends = (search) => (dispatch) => {
  getUserFriends(search)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          dispatch({
            type: USER_LIST,
            data: data,
          });
        });
      } else if (res.status === 400) {
        return res.json().then((data) => {
          dispatch({
            type: ERROR,
            error: data.error,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
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

export const getFriendNames = () => (dispatch) => {
  getFriendsName()
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          dispatch({
            type: USER_NAMES_LIST,
            data: data,
          });
        });
      } else if (res.status === 400) {
        return res.json().then((data) => {
          dispatch({
            type: ERROR,
            error: data.error,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
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

// ACTION FOR CLEARING SUCCESS
export const clearSubscribe = () => (dispatch) => {
  dispatch({
    type: CLEAR_SUBSCRIBE,
  });
};

// ACTION FOR MANAGING SUBSCRIBE
export const manageFriendSubscribe = (id) => (dispatch) => {
  manageSubscribe(id)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          dispatch({
            type: SUBSCRIBE,
          });
        });
      } else if (res.status === 400) {
        return res.json().then((data) => {
          dispatch({
            type: ERROR,
            error: data.error,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
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
