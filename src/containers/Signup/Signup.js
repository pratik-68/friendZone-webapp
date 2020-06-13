import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addSignupUser } from '../../redux/actions/signupActions';
import { clearError, clearSuccess } from '../../redux/actions/userActions';
import { Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import defaultImage from '../../assets/profile_pic.png';
import {
  MALE,
  FEMALE,
  OTHER,
  CHARACTERS_ONLY,
  STRING,
  STRING_WITH_NUMBER_SYMBOL,
} from '../../constants/common-constants';
import { isImage } from '../../utils';

const Signup = () => {
  const dispatchAction = useDispatch();

  const { error, success } = useSelector(
    (state) => ({
      error: state.userReducer.error,
      success: state.userReducer.success,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(clearSuccess());
    dispatchAction(clearError());
  }, [dispatchAction]);

  const date = new Date();
  const maxBirthDate = new Date(
    date.getFullYear() - 18,
    date.getMonth(),
    date.getDate() - 1
  );
  const [user, setUser] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    date_of_birth: maxBirthDate,
    interests: '',
    gender: '',
    city: '',
  });
  const [profilePic, setProfilePic] = useState('');
  const [profilePicPreview, setProfilePicPreview] = useState('');
  const [profilePicError, setProfilePicError] = useState(false);
  const [alert, setAlert] = useState(false);
  const required = {
    email: true,
    first_name: true,
    last_name: true,
    password: true,
    password_confirmation: true,
    gender: true,
    username: true,
  };
  const errorBaseState = {
    email: false,
    first_name: false,
    last_name: false,
    password: false,
    password_confirmation: false,
    gender: false,
    username: false,
    date_of_birth: false,
    city: false,
    interests: false,
  };
  const [errorState, setErrorState] = useState(errorBaseState);
  const errorMessage = {
    charactersOnly: 'Only Characters allowed',
    stringOnly: 'Only String allowed',
    password_confirmation: 'Password Doesnot Match',
    profilePic: 'Invalid Image, accepted image format: png/jpg/jpeg',
    emptyMessage: 'Required',
    invalidMessage: 'Invalid',
    allowedCharacters:
      'special characters( -/_/!/@ ) allowed only, followed by character',
  };

  useEffect(() => {
    if (Object.keys(error).length) {
      setAlert(true);
    } else setAlert(false);
  }, [error]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrorState({
      ...errorState,
      [e.target.name]: false,
    });
  };

  const handleDateChange = (date) => {
    setUser((prevState) => ({
      ...prevState,
      date_of_birth: new Date(date),
    }));
  };

  const handleProfilePic = (e) => {
    setProfilePic(e.target.files[0]);
    if (e.target.files[0] && isImage(e.target.files[0].type)) {
      setProfilePicError(false);
      setProfilePicPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setProfilePicError(true);
      setProfilePicPreview('');
    }
  };

  const validateCharacter = (e) => {
    if (!CHARACTERS_ONLY.test(e.target.value)) {
      if (e.target.name === 'first_name')
        setErrorState((prevState) => ({
          ...prevState,
          first_name: true,
        }));
      else if (e.target.name === 'last_name')
        setErrorState((prevState) => ({
          ...prevState,
          last_name: true,
        }));
      else if (e.target.name === 'city')
        setErrorState((prevState) => ({
          ...prevState,
          city: true,
        }));
    }
  };

  const validateString = (e) => {
    if (!STRING.test(e.target.value)) {
      if (e.target.name === 'interests')
        setErrorState((prevState) => ({
          ...prevState,
          interests: true,
        }));
    }
  };

  const validateStringWithNumberSymbol = (e) => {
    if (!STRING_WITH_NUMBER_SYMBOL.test(e.target.value)) {
      if (e.target.name === 'username')
        setErrorState((prevState) => ({
          ...prevState,
          username: true,
        }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let emptyField = true;
    for (let i in errorState) {
      if (errorState[i]) {
        emptyField = false;
      }
    }
    for (let i in user) {
      if (i === 'date_of_birth') {
        continue;
      }
      if (!user[i].length && required[i]) {
        setErrorState((prevState) => ({
          ...prevState,
          [i]: true,
        }));
        emptyField = false;
      }
    }
    if (user.password !== user.password_confirmation) {
      emptyField = false;
      setErrorState((prevState) => ({
        ...prevState,
        password_confirmation: true,
      }));
    }
    if (
      user.gender !== MALE &&
      user.gender !== FEMALE &&
      user.gender !== OTHER
    ) {
      emptyField = false;
      setErrorState((prevState) => ({ ...prevState, gender: true }));
    }
    if (profilePicError) {
      emptyField = false;
    }
    if (emptyField) {
      dispatchAction(addSignupUser({ profilePic, user }));
    } else {
      setAlert(true);
    }
  };

  if (success)
    return (
      <div className="container cream-body text-center py-5">
        <h2>User Successfully Created.</h2>
        <p>You will receive an email with the verification link.</p>
        <p>Please verify through the link to get full access to FriendZone</p>
        <p>Login to access your account.</p>
      </div>
    );
  else
    return (
      <div className="container content border">
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
        <div className="pt-3 mt-3 d-flex justify-content-center cream-body">
          <h2 className="m-0">Fill Details:</h2>
        </div>
        <div className="d-flex justify-content mb-3 pt-3 cream-body">
          <form onSubmit={handleSubmit} className="col-sm-12">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>Profile Picture:</b>
              </label>
              <div className="col-sm-9 pt-1">
                <img
                  src={`${
                    profilePicPreview ? profilePicPreview : defaultImage
                  }`}
                  height="250"
                  width="250"
                  alt="image_preview"
                  className="float-left"
                />
                <input
                  type="file"
                  accept="image/*"
                  name="profile_pic"
                  className="float-left p-2"
                  onChange={handleProfilePic}
                />
                <small className="text-muted d-flex justify-content-between">
                  <span className="text-danger">
                    {profilePicError && errorMessage.profilePic}
                    {error.profile_pic}
                  </span>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  First Name:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9 pt-1">
                <input
                  type="text"
                  name="first_name"
                  className={`form-control ${
                    (error.first_name || errorState.first_name) && 'is-invalid'
                  }`}
                  value={user.first_name}
                  onChange={handleChange}
                  onBlur={validateCharacter}
                  maxLength="20"
                />
                <small className="text-muted d-flex justify-content-end">
                  <span className="text-danger">
                    {errorState.first_name &&
                      (user.first_name.length
                        ? errorMessage.charactersOnly
                        : errorMessage.emptyMessage)}
                    {error.first_name}
                  </span>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Last Name:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9 pt-1">
                <input
                  type="text"
                  name="last_name"
                  className={`form-control ${
                    (error.last_name || errorState.last_name) && 'is-invalid'
                  }`}
                  value={user.last_name}
                  onChange={handleChange}
                  onBlur={validateCharacter}
                  maxLength="20"
                />
                <small className="text-muted d-flex justify-content-end">
                  <span className="text-danger">
                    {errorState.last_name &&
                      (user.last_name.length
                        ? errorMessage.charactersOnly
                        : errorMessage.emptyMessage)}
                    {error.last_name}
                  </span>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Email:
                  <span className="text-danger">*</span>
                </b>
              </div>
              <div className="col-sm-9 pt-1">
                <input
                  type="email"
                  name="email"
                  className={`form-control ${
                    (error.email || errorState.email) && 'is-invalid'
                  }`}
                  value={user.email}
                  onChange={handleChange}
                />
                <small className="text-muted d-flex justify-content-end">
                  <span className="text-danger">
                    {errorState.email && errorMessage.emptyMessage}
                    {error.email}
                  </span>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Username:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9 pt-1">
                <input
                  type="text"
                  name="username"
                  className={`form-control ${
                    (error.username || errorState.username) && 'is-invalid'
                  }`}
                  value={user.username}
                  onChange={handleChange}
                  onBlur={validateStringWithNumberSymbol}
                  minLength="3"
                  maxLength="20"
                />
                <small className="text-muted d-flex justify-content-between">
                  <span>Must be 3-20 characters long.</span>
                  <span className="text-danger">
                    {errorState.username &&
                      (user.username.length
                        ? errorMessage.allowedCharacters
                        : errorMessage.emptyMessage)}
                    {error.username}
                  </span>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Password:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9 pt-1">
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    (error.password || errorState.password) && 'is-invalid'
                  }`}
                  value={user.password}
                  onChange={handleChange}
                  minLength="8"
                  maxLength="20"
                />
                <small className="text-muted d-flex justify-content-between">
                  <span>Must be 8-20 characters long.</span>
                  <span className="text-danger">
                    {errorState.password && errorMessage.emptyMessage}
                    {error.password}
                  </span>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Confirm Password:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9 pt-1">
                <input
                  type="password"
                  name="password_confirmation"
                  className={`form-control ${
                    (error.password_confirmation ||
                      errorState.password_confirmation) &&
                    'is-invalid'
                  }`}
                  value={user.password_confirmation}
                  onChange={handleChange}
                  minLength="8"
                  maxLength="20"
                />
                <small className="text-muted d-flex justify-content-between">
                  <span>Must be 8-20 characters long.</span>
                  <small className="mr-2 text-danger">
                    {errorState.password_confirmation &&
                      (user.password_confirmation.length
                        ? errorMessage.password_confirmation
                        : errorMessage.emptyMessage)}
                    {error.password_confirmation}
                  </small>
                </small>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Date Of Birth:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9 pt-1">
                <DatePicker
                  className={`form-control ${
                    (error.date_of_birth || errorState.date_of_birth) &&
                    'is-invalid'
                  }`}
                  dateFormat="dd/MM/yyyy"
                  onChange={handleDateChange}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  maxDate={maxBirthDate}
                  selected={user.date_of_birth}
                />
                <small className="text-muted d-flex justify-content-between">
                  <span>Must be 18 years old.</span>
                  <span className="text-danger">
                    {errorState.date_of_birth && errorMessage.emptyMessage}
                    {error.date_of_birth}
                  </span>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>
                  Gender:
                  <span className="text-danger">*</span>
                </b>
              </label>
              <div className="col-sm-9 pt-1">
                <select
                  type="text"
                  name="gender"
                  className={`custom-select form-control ${
                    (error.gender || errorState.gender) && 'is-invalid'
                  }`}
                  onChange={handleChange}
                >
                  <option value="" className="d-flex justify-content-center">
                    Select
                  </option>
                  <option value={MALE}>Male</option>
                  <option value={FEMALE}>Female</option>
                  <option value={OTHER}>Other</option>
                </select>
                <small className="text-muted d-flex justify-content-end">
                  <span className="text-danger">
                    {errorState.gender &&
                      (user.gender.length
                        ? errorMessage.invalidMessage
                        : errorMessage.emptyMessage)}
                    {error.gender}
                  </span>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>City:</b>
              </label>
              <div className="col-sm-9 pt-1">
                <input
                  type="text"
                  name="city"
                  className={`form-control ${
                    (error.city || errorState.city) && 'is-invalid'
                  }`}
                  value={user.city}
                  onChange={handleChange}
                  onBlur={validateCharacter}
                  minLength="3"
                  maxLength="20"
                />
                <small className="d-flex justify-content-end">
                  <span className="text-danger">
                    {errorState.city && errorMessage.charactersOnly}
                    {error.city}
                  </span>
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label form-control-lg">
                <b>Interests:</b>
              </label>
              <div className="col-sm-9 pt-1">
                <input
                  type="text"
                  name="interests"
                  className={`form-control ${
                    (error.interests || errorState.interests) && 'is-invalid'
                  }`}
                  value={user.interests}
                  onBlur={validateString}
                  onChange={handleChange}
                />
                <small className="d-flex justify-content-end">
                  <span className="text-danger">
                    {errorState.interests && errorMessage.stringOnly}
                    {error.interests}
                  </span>
                </small>
              </div>
            </div>
            <small className="error text-danger">{error.message}</small>
            <div className="form-group row d-flex justify-content-center">
              <Button className="col-3" block variant="success" type="submit">
                Signup
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Signup;
