import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../constants/route-constants';
import { shallowEqual, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading';

const PrivateRoute = ({ Component, ...rest }) => {
  const { authorizedUser } = useSelector(
    (state) => ({
      authorizedUser: state.userReducer.authorizedUser,
    }),
    shallowEqual
  );

  if (authorizedUser === null) {
    return <Loading />;
  }

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        authorizedUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={LOGIN_ROUTE} />
        )
      }
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  Component: PropTypes.elementType,
};
