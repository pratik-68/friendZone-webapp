import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { userDetail, clearSuccess } from '../../redux/actions/userActions';
import EditProfile from '../EditProfile';
import { Alert } from 'react-bootstrap';
import defaultImage from '../../assets/profile_pic.png';
import UserDetail from '../../components/UserDetail/UserDetail';

const UserProfile = () => {
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(clearSuccess());
    dispatchAction(userDetail());
  }, [dispatchAction]);

  const { user, success } = useSelector(
    (state) => ({
      user: state.userReducer.user,
      success: state.userReducer.success,
    }),
    shallowEqual
  );
  const [alert, setAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    if (success) {
      setEdit(false);
      setAlert(true);
      dispatchAction(userDetail());
      dispatchAction(clearSuccess());
    }
  }, [success, dispatchAction]);

  if (edit) {
    return (
      <>
        <EditProfile handleEdit={handleEdit} />;
      </>
    );
  }

  return (
    <div className="container">
      {alert && (
        <Alert
          variant="success"
          className="fixed-top"
          onClose={() => setAlert(false)}
          dismissible
        >
          Successfully Updated
        </Alert>
      )}
      <div className="card">
        <div className="row no-gutters">
          <div className="d-flex justify-content-center">
            <div className="d-flex align-items-center">
              <img
                src={`${
                  user.profile_pic ? user.profile_pic.url : defaultImage
                }`}
                alt="profile_pic"
                height="370"
                width="330"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <button
                className="btn btn-outline-success col-2 float-right"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
              <UserDetail user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
