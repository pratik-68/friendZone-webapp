import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addUserVerification } from '../../redux/actions/signupActions';
import { clearError } from '../../redux/actions/userActions';
import { useParams } from 'react-router';

const EmailConfirmation = () => {
  const dispatchAction = useDispatch();
  const { token } = useParams();

  const { error, success } = useSelector(
    (state) => ({
      error: state.userReducer.error,
      success: state.signupReducer.success,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(clearError());
    dispatchAction(addUserVerification(token));
  }, [dispatchAction, token]);

  return (
    <div className="container content">
      <h1 className="text-center m-3 p-4">
        <b>
          {error.email}
          {error.message}
        </b>
        {success && <div>Email Successfully Verified</div>}
      </h1>
    </div>
  );
};

export default EmailConfirmation;
