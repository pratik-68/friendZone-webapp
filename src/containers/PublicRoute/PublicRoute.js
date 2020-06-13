import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../../constants/route-constants';
import { shallowEqual, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PublicRoute = ({ Component, restricted, ...rest }) => {
  const { authorizedUser } = useSelector(
    (state) => ({
      authorizedUser: state.userReducer.authorizedUser,
    }),
    shallowEqual
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        authorizedUser && restricted ? (
          <Redirect to={DASHBOARD_ROUTE} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;

PublicRoute.propTypes = {
  restricted: PropTypes.bool,
  Component: PropTypes.elementType,
};
