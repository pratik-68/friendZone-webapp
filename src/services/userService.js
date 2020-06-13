import {
  USER_URL,
  PROFILE_URL,
  GET_USERS_URL,
  USER_UPDATE_URL,
} from '../constants/action-constants';
import { defaultHeader } from '../utils';

export const getUser = () => {
  return fetch(USER_URL, {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getUsers = (query_parameter) => {
  return fetch(GET_USERS_URL(query_parameter), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getProfile = (id) => {
  return fetch(PROFILE_URL(id), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const updateUser = (id, user, password) => {
  return fetch(USER_UPDATE_URL(id), {
    method: 'PATCH',
    headers: defaultHeader(),
    body: JSON.stringify({
      user: user,
      password: password,
    }),
  });
};
