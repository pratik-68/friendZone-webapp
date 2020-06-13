import { LOGIN_URL, LOGOUT_URL } from '../constants/action-constants';
import { defaultHeaderWithoutToken, defaultHeader } from '../utils';

export const getLoginData = (user) => {
  return fetch(LOGIN_URL, {
    method: 'POST',
    headers: defaultHeaderWithoutToken(),
    body: JSON.stringify({ user: user }),
  });
};

export const removeToken = () => {
  return fetch(LOGOUT_URL, {
    method: 'DELETE',
    headers: defaultHeader(),
  });
};
