import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updateUserDetail, clearError } from '../../redux/actions/userActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  MALE,
  FEMALE,
  OTHER,
  CHARACTERS_ONLY,
  STRING,
} from '../../constants/common-constants';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const EditProfile = ({ handleEdit }) => {
  const dispatchAction = useDispatch();

  useEffect(() => {
    dispatchAction(clearError());
  }, [dispatchAction]);

  const { error, user } = useSelector(
    (state) => ({
      error: state.userReducer.error,
      user: state.userReducer.user,
    }),
    shallowEqual
  );
  const [state, setState] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    city: user.city,
    gender: user.gender,
    interests: user.interests,
    date_of_birth: new Date(user.date_of_birth),
    old_password: '',
    password: '',
    password_confirmation: '',
    same_new_password_error: false,
    password_match_error: false,
    same_new_password_error_message: 'New Password Must be Different',
    password_match_error_message: 'Password Does not Match',
  });
  const [alert, setAlert] = useState(false);
  const [errorState, setErrorState] = useState({
    first_name: false,
    last_name: false,
    city: false,
    interests: false,
  });
  const required = {
    first_name: true,
    last_name: true,
  };
  const errorMessage = {
    charactersOnly: 'Only Characters allowed',
    stringOnly: 'Only String allowed',
    emptyMessage: 'Required',
    invalidMessage: 'Invalid',
  };

  useEffect(() => {
    if (Object.keys(error).length) {
      setAlert(true);
    } else setAlert(false);
  }, [error]);

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

  const date = new Date();
  const maxBirthDate = new Date(
    date.getFullYear() - 18,
    date.getMonth(),
    date.getDate() - 1
  );

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setErrorState({
      ...errorState,
      [e.target.name]: false,
    });
  };

  const handleDateChange = (date) => {
    setState({
      ...state,
      date_of_birth: new Date(date),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      password_match_error: false,
      same_new_password_error: false,
    });
    let flag = true;
    for (let i in errorState) {
      if (errorState[i]) {
        flag = false;
      }
    }
    for (let i in required) {
      if (required[i] && !state[i].length) {
        setErrorState((prevState) => ({
          ...prevState,
          i: true,
        }));
      }
    }
    if (state.password === state.old_password && state.password.length) {
      setState((prevState) => ({
        ...prevState,
        same_new_password_error: true,
      }));
      flag = false;
    }
    if (state.password !== state.password_confirmation) {
      setState((prevState) => ({
        ...prevState,
        password_match_error: true,
      }));
      flag = false;
    }
    if (flag) {
      dispatchAction(updateUserDetail(state));
    } else {
      setAlert(true);
    }
  };

  return (
    <div className="container d-flex justify-content-center cream-body border">
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
      <form onSubmit={handleSubmit} className="col-6 m-5">
        <h3 className="text-center">
          <p>Edit Details:</p>
        </h3>
        <div className="mb-3">
          <label>
            First Name<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${
              (error.first_name || errorState.first_name) && 'is-invalid'
            }`}
            value={state.first_name}
            name="first_name"
            onChange={handleChange}
            onBlur={validateCharacter}
            maxLength="20"
            required
          />
          <small className="d-flex justify-content-end">
            <span className="text-danger">
              {errorState.first_name &&
                (user.first_name.length
                  ? errorMessage.charactersOnly
                  : errorMessage.emptyMessage)}
              {error.first_name}
            </span>
          </small>
        </div>
        <div className="mb-3">
          <label>
            Last Name<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${
              (error.last_name || errorState.last_name) && 'is-invalid'
            }`}
            value={state.last_name}
            name="last_name"
            onChange={handleChange}
            onBlur={validateCharacter}
            maxLength="20"
            required
          />
          <small className="d-flex justify-content-end">
            <span className="text-danger">
              {errorState.last_name &&
                (user.last_name.length
                  ? errorMessage.charactersOnly
                  : errorMessage.emptyMessage)}
              {error.last_name}
            </span>
          </small>
        </div>
        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={user.email}
            name="email"
            disabled
          />
          <small className="d-flex justify-content-end text-danger">
            {error.email}
          </small>
        </div>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={user.username}
            name="username"
            minLength="3"
            maxLength="20"
            disabled
          />
          <small className="d-flex justify-content-end text-danger">
            {error.username}
          </small>
        </div>
        <div className="mb-3">
          <label>Date Of Birth</label>
          <span className="text-danger">*</span>
          <small> (must be 18 years old)</small>
          <div>
            <DatePicker
              block
              className="form-control"
              dateFormat="dd/MM/yyyy"
              selected={state.date_of_birth}
              onChange={handleDateChange}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              maxDate={maxBirthDate}
            />
          </div>
          <small className="d-flex justify-content-between text-danger">
            <p>{error.date_of_birth}</p>
          </small>
        </div>
        <div className="mb-3">
          <label>Gender</label>
          <span className="text-danger">*</span>
          <select
            name="gender"
            className="custom-select"
            value={state.gender}
            onChange={handleChange}
          >
            <option value={MALE}>Male</option>
            <option value={FEMALE}>Female</option>
            <option value={OTHER}>Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label> City</label>
          <input
            type="text"
            className={`form-control ${
              (error.city || errorState.city) && 'is-invalid'
            }`}
            value={state.city}
            name="city"
            onChange={handleChange}
            onBlur={validateCharacter}
            minLength="3"
            maxLength="20"
          />
          <small className="d-flex justify-content-between">
            <span className="text-danger">
              {errorState.city && errorMessage.charactersOnly}
              {error.city}
            </span>
          </small>
        </div>
        <div className="mb-3">
          <label>Interests</label>
          <input
            type="text"
            className={`form-control ${
              (error.interests || errorState.interests) && 'is-invalid'
            }`}
            value={state.interests}
            name="interests"
            onBlur={validateString}
            onChange={handleChange}
          />
          <small className="d-flex justify-content-between text-danger">
            {errorState.interests && errorMessage.stringOnly}
            {error.interests}
          </small>
        </div>
        <div className="mb-3">
          <label>
            Old Password (<small className="text-danger">*</small>
            <small>for password change </small>)
          </label>
          <input
            type="password"
            name="old_password"
            className="form-control"
            minLength="8"
            maxLength="20"
            value={state.old_password}
            onChange={handleChange}
            required={state.password.length}
          />
          <small className="d-flex justify-content-between">
            <p className="text-danger">{error.old_password}</p>
          </small>
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            minLength="8"
            maxLength="20"
            value={state.password}
            onChange={handleChange}
          />
          <small className="d-flex justify-content-between text-danger">
            <p>
              {state.same_new_password_error &&
                state.same_new_password_error_message}
            </p>
            <p>{error.password}</p>
          </small>
        </div>
        <div className="mb-3">
          <label>Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            className="form-control"
            minLength="8"
            maxLength="20"
            value={state.password_confirmation}
            onChange={handleChange}
            required={state.password.length}
          />
          <small className="d-flex justify-content-between text-danger">
            <p>
              {state.password_match_error && state.password_match_error_message}
            </p>
            <p>{error.password_confirmation}</p>
          </small>
        </div>
        <button className="btn btn-outline-success btn-block mb-3">
          Update
        </button>
        <button
          className="btn btn-outline-danger btn-block"
          onClick={handleEdit}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

EditProfile.propTypes = {
  handleEdit: PropTypes.func,
};
