import {
  FRIEND_REQUEST_URL,
  FRIEND_REQUEST_VERIFICATION_URL,
  GET_FRIENDS_URL,
  GET_FRIENDS_NAME_URL,
  SUBSCRIBE_URL,
} from '../constants/action-constants';
import { defaultHeader, defaultHeaderWithoutToken } from '../utils';

export const sendFriendRequest = (user_id) => {
  return fetch(FRIEND_REQUEST_URL(user_id), {
    method: 'POST',
    headers: defaultHeader(),
  });
};

export const acceptFriendRequest = (user_id) => {
  return fetch(FRIEND_REQUEST_URL(user_id), {
    method: 'PATCH',
    headers: defaultHeader(),
  });
};

export const verifyFriendRequestService = (token) => {
  return fetch(FRIEND_REQUEST_VERIFICATION_URL(token), {
    method: 'PATCH',
    headers: defaultHeaderWithoutToken(),
  });
};

export const getUserFriends = (query) => {
  return fetch(GET_FRIENDS_URL(query), {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const getFriendsName = () => {
  return fetch(GET_FRIENDS_NAME_URL, {
    method: 'GET',
    headers: defaultHeader(),
  });
};

export const manageSubscribe = (id) => {
  return fetch(SUBSCRIBE_URL(id), {
    method: 'PATCH',
    headers: defaultHeader(),
  });
};
