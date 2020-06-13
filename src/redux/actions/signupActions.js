import {
  addSignupUserService,
  emailVerificationService,
} from '../../services/signupService';
import {
  EMAIL_VERIFICATION,
  ERROR,
  SERVICE_UNAVAILABLE,
  SUCCESS,
} from '../../constants/action-constants';

// ACTION FOR SIGNUP USER DETAILS
export const addSignupUser = (signupData) => (dispatch) => {
  let user = new FormData();
  if (signupData.profilePic)
    user.append('[user]profile_pic', signupData.profilePic);
  user.append('[user]first_name', signupData.user.first_name);
  user.append('[user]last_name', signupData.user.last_name);
  user.append('[user]email', signupData.user.email);
  user.append('[user]username', signupData.user.username);
  user.append('[user]gender', signupData.user.gender);
  user.append('[user]date_of_birth', signupData.user.date_of_birth);
  if (signupData.city) user.append('[user]city', signupData.user.city);
  if (signupData.interests)
    user.append('[user]interests', signupData.user.interests);
  user.append('[user]password', signupData.user.password);
  user.append(
    '[user]password_confirmation',
    signupData.user.password_confirmation
  );
  addSignupUserService(user)
    .then((res) => {
      if (res.status === 201) {
        dispatch({
          type: SUCCESS,
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

// ACTION FOR EMAIL CONFIRMATION LINK VERIFICATION
export const addUserVerification = (token) => (dispatch) => {
  emailVerificationService(token)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          dispatch({
            type: EMAIL_VERIFICATION,
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
