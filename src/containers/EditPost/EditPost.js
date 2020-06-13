import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/actions/userActions';
import { Alert } from 'react-bootstrap';
import {
  FRIENDS,
  PERSONAL,
  PUBLIC,
  CUSTOM,
} from '../../constants/common-constants';
import { isImage } from '../../utils';
import { updatePost } from '../../redux/actions/postActions';
import PropTypes from 'prop-types';

const EditPost = ({ handleEdit }) => {
  const dispatchAction = useDispatch();

  const { error, post } = useSelector(
    (state) => ({
      error: state.userReducer.error,
      post: state.postReducer.post,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(clearError());
  }, [dispatchAction]);

  useEffect(() => {
    if (post.id) {
      setDescription(post.description);
      setVisibleTo(post.visible_to);
      if (post.visible_to === CUSTOM) {
        setVisibleToDisabled(true);
      }
    }
  }, [post]);

  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState(false);

  const [description, setDescription] = useState('');
  const [visibleTo, setVisibleTo] = useState('');
  const [visibleToDisabled, setVisibleToDisabled] = useState(false);

  const errorBaseState = {
    description: false,
    visibleTo: false,
  };
  const [errorState, setErrorState] = useState(errorBaseState);
  const [alert, setAlert] = useState(false);

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
      visibleTo !== FRIENDS
    ) {
      emptyField = false;
      setErrorState((prevState) => ({ ...prevState, visibleTo: true }));
    }
    if (imageError) {
      emptyField = false;
    }
    if (emptyField) {
      const post_id = post.id;
      dispatchAction(updatePost({ post_id, image, description, visibleTo }));
    }
  };

  return (
    <div>
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
                <img src={imagePreview} alt="image_preview" className="w-25" />
              )}
              <input
                type="file"
                accept="image/*"
                name="image"
                className={`form-control ${
                  (error.image || imageError) && 'is-invalid'
                }`}
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
                value={description}
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
                value={visibleTo}
                onChange={handleVisibleTo}
                disabled={visibleToDisabled}
              >
                <option value={PUBLIC}>Public</option>
                <option value={FRIENDS}>Friends</option>
                <option value={PERSONAL}>Only Me</option>
                <option disabled value={CUSTOM}>
                  Custom Friends
                </option>
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
          <small className="error text-danger">{error.message}</small>

          <div className="form-group row d-flex justify-content-center">
            <button className="btn btn-outline-success col-3">Update</button>
          </div>
          <div className="form-group row d-flex justify-content-center">
            <button
              className="btn btn-outline-danger col-3"
              onClick={handleEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;

EditPost.propTypes = {
  handleEdit: PropTypes.func,
};
