import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import { isImage } from '../../utils';
import { Redirect } from 'react-router';
import { createPost } from '../../redux/actions/postActions';
import { getFriendNames } from '../../redux/actions/friendActions';
import {
  clearError,
  clearSuccess,
  clearUserList,
} from '../../redux/actions/userActions';
import {
  FRIENDS,
  PERSONAL,
  PUBLIC,
  CUSTOM,
} from '../../constants/common-constants';
import {
  DASHBOARD_ROUTE,
  POST_DETAIL_URL,
} from '../../constants/route-constants';

const CreatePost = () => {
  const dispatchAction = useDispatch();

  const { error, post, user, users } = useSelector(
    (state) => ({
      error: state.userReducer.error,
      post: state.postReducer.post,
      user: state.userReducer.user,
      users: state.userReducer.userList.users,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(clearSuccess());
    dispatchAction(clearError());
    dispatchAction(clearUserList());
  }, [dispatchAction]);

  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState(false);

  const [selectFriends, setSelectFriends] = useState(false);
  const [friend, setFriend] = useState({
    ids: [],
  });
  const [description, setDescription] = useState('');
  const [visibleTo, setVisibleTo] = useState('');

  const errorBaseState = {
    description: false,
    visibleTo: false,
    friends: false,
  };
  const [errorState, setErrorState] = useState(errorBaseState);
  const [alert, setAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const errorMessage = {
    emptyMessage: 'Required',
    invalidMessage: 'Invalid',
  };

  useEffect(() => {
    if (Object.keys(error).length) {
      setAlert(true);
    } else setAlert(false);
  }, [error]);

  const handleDescription = (e) => {
    setDescription(e.target.value);
    setErrorState({
      ...errorState,
      [e.target.name]: false,
    });
  };

  const handleVisibleTo = (e) => {
    setVisibleTo(e.target.value);
    setErrorState({
      ...errorState,
      [e.target.name]: false,
    });
    if (e.target.value === CUSTOM) {
      dispatchAction(getFriendNames());
      setSelectFriends(true);
    } else {
      setSelectFriends(false);
      setFriend({
        ids: [],
      });
    }
  };

  const handleFriends = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(parseInt(options[i].value));
      }
    }
    setFriend({
      ids: value,
    });
    if (value.length) {
      setErrorState((prevState) => ({ ...prevState, friends: false }));
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    if (!isImage(e.target.files[0].type)) {
      setImageError(true);
    } else {
      setImageError(false);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorState({ errorBaseState });
    let emptyField = true;
    if (!description.length) {
      emptyField = false;
      setErrorState((prevState) => ({ ...prevState, description: true }));
    }
    if (
      visibleTo !== PUBLIC &&
      visibleTo !== PERSONAL &&
      visibleTo !== FRIENDS &&
      visibleTo !== CUSTOM
    ) {
      emptyField = false;
      setErrorState((prevState) => ({ ...prevState, visibleTo: true }));
    }
    if (selectFriends && !friend.ids.length) {
      emptyField = false;
      setErrorState((prevState) => ({ ...prevState, friends: true }));
    }
    if (imageError) {
      emptyField = false;
    }
    if (emptyField) {
      dispatchAction(createPost({ image, description, visibleTo, friend }));
    }
  };

  const handleRedirect = () => {
    setRedirect(!redirect);
  };

  if (redirect) {
    return <Redirect to={POST_DETAIL_URL(post.id)} />;
  }

  if (user && user.id) {
    if (!user.verified) {
      return <Redirect to={DASHBOARD_ROUTE} />;
    }
  }

  return (
    <div className="container border content">
      {post.id && (
        <Alert
          variant="success"
          className="fixed-top"
          onClose={() => handleRedirect()}
          dismissible
        >
          Post Created
        </Alert>
      )}
      {alert && (
        <Alert
          variant="danger"
          className="fixed-top"
          onClose={() => setAlert(false)}
          dismissible
        >
          {errorMessage.invalidMessage}
        </Alert>
      )}
      <div className="d-flex justify-content my-3 pt-3 cream-body">
        <form onSubmit={handleSubmit} className="col-sm-12">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label form-control-lg">
              <b>Image:</b>
            </label>
            <div className="col-sm-9 pt-1">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="image_preview"
                  height="250"
                  width="350"
                />
              )}
              <input
                type="file"
                accept="image/*"
                name="image"
                className="float-left p-2"
                onChange={handleImage}
              />
              <small className="text-muted d-flex justify-content-end">
                <span className="text-danger">
                  {imageError && errorMessage.image}
                  {error.image}
                </span>
              </small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label form-control-lg">
              <b>
                Description:
                <span className="text-danger">*</span>
              </b>
            </label>
            <div className="col-sm-9 pt-1">
              <textarea
                type="text"
                name="description"
                rows="5"
                className={`form-control ${
                  (error.description || errorState.description) && 'is-invalid'
                }`}
                onChange={handleDescription}
                maxLength="1000"
              />
              <small className="text-muted d-flex justify-content-end">
                <span className="text-danger">
                  {errorState.description &&
                    (description.length
                      ? errorMessage.invalidMessage
                      : errorMessage.emptyMessage)}
                  {error.description}
                </span>
              </small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label form-control-lg">
              <b>
                Visible To:
                <span className="text-danger">*</span>
              </b>
            </label>
            <div className="col-sm-9 pt-1">
              <select
                type="text"
                name="visibleTo"
                className={`custom-select form-control ${
                  (error.visibleTo || errorState.visibleTo) && 'is-invalid'
                }`}
                onChange={handleVisibleTo}
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value={PUBLIC}>Public</option>
                <option value={FRIENDS}>Friends</option>
                <option value={PERSONAL}>Only Me</option>
                <option value={CUSTOM}>Custom Friends</option>
              </select>
              <small className="text-muted d-flex justify-content-end">
                <span className="text-danger">
                  {errorState.visibleTo &&
                    (visibleTo.length
                      ? errorMessage.invalidMessage
                      : errorMessage.emptyMessage)}
                  {error.visibleTo}
                </span>
              </small>
            </div>
          </div>
          {selectFriends && (
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Friends:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9 pt-1">
                <select
                  type="text"
                  name="friends"
                  className={`multiselect-ui form-control ${
                    (error.user || errorState.friends) && 'is-invalid'
                  }`}
                  onChange={handleFriends}
                  multiple
                >
                  <option value="" selected disabled>
                    Select
                  </option>
                  {users.map((user, index) => {
                    return (
                      <option
                        key={index}
                        className="text-capitalize h-50"
                        value={user.id}
                      >
                        {user.first_name} {user.last_name}
                      </option>
                    );
                  })}
                </select>
                <small className="text-muted d-flex justify-content-end">
                  <span className="text-danger">
                    {errorState.friends &&
                      (friend.ids.length
                        ? errorMessage.invalidMessage
                        : errorMessage.emptyMessage)}
                    {error.user}
                  </span>
                </small>
              </div>
            </div>
          )}
          <small className="error text-danger">{error.message}</small>
          <div className="form-group row d-flex justify-content-center">
            <Button className="col-3" block variant="success" type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
