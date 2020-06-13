import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { verifyFriendRequest } from '../../redux/actions/friendActions';
import { useParams, Redirect } from 'react-router';
import { Modal } from 'react-bootstrap';
import { SEARCHED_PROFILE_URL } from '../../constants/route-constants';

const FriendRequestAcceptEmail = () => {
  const dispatchAction = useDispatch();
  const { token } = useParams();

  const [showModal, setModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { error, user } = useSelector(
    (state) => ({
      error: state.userReducer.error,
      user: state.userReducer.searchedUser,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(verifyFriendRequest(token));
  }, [dispatchAction, token]);

  useEffect(() => {
    if (user && user.id) setModal(true);
  }, [user]);

  const handleModal = () => {
    if (showModal) setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={SEARCHED_PROFILE_URL(user.id)} />;
  }

  const successModal = (
    <Modal show={showModal} onHide={handleModal} backdrop="static">
      <Modal.Header closeButton />
      <Modal.Body className="d-flex justify-content-center">
        Friend Request Accepted
      </Modal.Body>
    </Modal>
  );

  return (
    <div className="container d-flex justify-content-center">
      <h1 className="text-center text-secondary mb-0 p-5">
        <b>
          {error.email}
          {error.message}
        </b>
      </h1>
      {successModal}
    </div>
  );
};

export default FriendRequestAcceptEmail;
