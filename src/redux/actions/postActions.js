import {
  CLEAR_POST,
  ERROR,
  NOT_FOUND,
  POST_DATA,
  SERVICE_UNAVAILABLE,
  UNAUTHORIZED_USER,
  POSTS_LIST,
  SUCCESS,
  CLEAR_POST_LIST,
} from '../../constants/action-constants';
import { logout } from '../../utils';
import {
  createPostService,
  getPostDetail,
  getMyPost,
  getUserPost,
  updatePostService,
  getAllPost,
} from '../../services/postService';

// ACTION FOR CREATING NEW POST
export const createPost = (data) => (dispatch) => {
  let formdata = new FormData();

  if (data.image) formdata.append('[post]image', data.image);
  formdata.append('[post]description', data.description);
  formdata.append('[post]visible_to', data.visibleTo);
  formdata.append('[user]ids[]', data.friend.ids);
  // for (var i = 0; i < data.friend.ids.length; i++) {
  //     formdata.append('[user]ids[]', data.friend.ids[i]);
  // }
  createPostService(formdata)
    .then((res) => {
      if (res.status === 201) {
        res.json().then((data) => {
          dispatch({
            type: POST_DATA,
            data: data,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
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

// ACTION FOR UPDATING THE POST
export const updatePost = (data) => (dispatch) => {
  let post = new FormData();
  if (data.image) post.append('[post]image', data.image);
  post.append('[post]description', data.description);
  post.append('[post]visible_to', data.visibleTo);
  updatePostService(data.post_id, post)
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

// ACTION FOR GETTING POST DETAILS
export const getPost = (id) => (dispatch) => {
  getPostDetail(id)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch({
            type: POST_DATA,
            data: data,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else if (res.status === 403 || 404) {
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

// ACTION FOR FETCHING USER POSTS
export const getMyPosts = (query) => (dispatch) => {
  getMyPost(query)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch({
            type: POSTS_LIST,
            data: data,
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

// ACTION FOR FETCHING ALL FRIENDS POSTS
export const getAllPosts = (query) => (dispatch) => {
  getAllPost(query)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch({
            type: POSTS_LIST,
            data: data,
          });
        });
      } else if (res.status === 401) {
        logout();
        dispatch({
          type: UNAUTHORIZED_USER,
        });
      } else if (res.status === 404) {
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

// ACTION FOR CLEARING POSTS STATE
export const clearPost = () => (dispatch) => {
  dispatch({
    type: CLEAR_POST,
  });
};

// ACTION FOR CLEARING POSTS STATE
export const clearPostList = () => (dispatch) => {
  dispatch({
    type: CLEAR_POST_LIST,
  });
};

// ACTION FOR FETCHING SPECIFIC USER POSTS
export const getUserPosts = (id, query) => (dispatch) => {
  getUserPost(id, query)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch({
            type: POSTS_LIST,
            data: data,
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
