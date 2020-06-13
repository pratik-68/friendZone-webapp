import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../redux/actions/loginActions';
import { clearError } from '../../redux/actions/userActions';
import { SIGN_UP_ROUTE } from '../../constants/route-constants';
import { Button } from 'react-bootstrap';

const Login = () => {
  const dispatchAction = useDispatch();

  const { error } = useSelector(
    (state) => ({
      error: state.userReducer.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatchAction(clearError());
  }, [dispatchAction]);

  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) dispatchAction(clearError());
    dispatchAction(loginUser(user));
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="bg-light p-4 col-4 rounded-lg shadow">
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-3">
            <label>Email Address</label>
            <span className="text-danger">*</span>
            <input
              type="email"
              name="email"
              className="form-control"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <span className="text-danger">*</span>
            <input
              type="password"
              name="password"
              className="form-control"
              value={user.password}
              onChange={handleChange}
              required
            />
            <span className="mt-3 d-flex justify-content-center text-danger">
              {error.message}
            </span>
          </div>
          <Button variant="success" block className="mb-3" type="submit">
            Login
          </Button>
          <Link
            className="btn btn-outline-primary btn-block mb-3"
            to={SIGN_UP_ROUTE}
          >
            Signup
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
