import {
  CREATE_POST_URL,
  MY_POSTS_URL,
  POST_URL,
  USER_POSTS_URL,
  UPDATE_POST_URL,
  ALL_POSTS_URL,
} from '../constants/action-constants';
import { getToken, defaultHeader } from '../utils';

export const createPostService = (data) => {
  return fetch(CREATE_POST_URL, {
    method: 'POST',
    headers: {
      token: getToken(),
    },
    body: data,
  });
};

export const updatePostService = (id, data) => {
  return fetch(UPDATE_POST_URL(id), {
    method: 'PATCH',
    headers: {
      token: getToken(),
    },
    body: data,
  });
};

export const getPostDetail = (id) => {
  return fetch(POST_URL(id), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getMyPost = (query) => {
  return fetch(MY_POSTS_URL(query), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getAllPost = (query) => {
  return fetch(ALL_POSTS_URL(query), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getUserPost = (id, query) => {
  return fetch(USER_POSTS_URL(id, query), {
    method: 'GET',
    headers: defaultHeader(),
  });
};
