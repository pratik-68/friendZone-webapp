import {
  EMAIL_VERIFICATION_URL,
  SIGNUP_URL,
} from '../constants/action-constants';
import { defaultHeaderWithoutToken } from '../utils';

export const addSignupUserService = (user) => {
  return fetch(SIGNUP_URL, {
    method: 'POST',
    body: user,
  });
};

export const emailVerificationService = (token) => {
  return fetch(EMAIL_VERIFICATION_URL(token), {
    method: 'PATCH',
    headers: defaultHeaderWithoutToken(),
  });
};
