import React from 'react';
import { to_Date } from '../../utils';
import PropTypes from 'prop-types';

const UserDetail = ({ user }) => (
  <div>
    <h2 className="card-title mb-5">User Details:</h2>
    {user.first_name && (
      <p className="row h5 font-weight-normal card-text mb-2">
        <b className="col-3">Name:</b>
        <span className="card-text text-capitalize">
          {user.first_name} {user.last_name}
        </span>
      </p>
    )}
    {user.email && (
      <p className="row h5 font-weight-normal card-text mb-2">
        <b className="col-3">Email:</b>
        <span>{user.email}</span>
      </p>
    )}
    {user.username && (
      <p className="row h5 font-weight-normal card-text mb-2">
        <b className="col-3">Username:</b>
        <span>{user.username}</span>
      </p>
    )}
    {user.gender && (
      <p className="row h5 font-weight-normal card-text mb-2">
        <b className="col-3">Gender:</b>
        <span className="text-capitalize">{user.gender}</span>
      </p>
    )}
    {user.date_of_birth && (
      <p className="row h5 font-weight-normal card-text mb-2">
        <b className="col-3">Date Of Birth:</b>
        <span>{to_Date(user.date_of_birth)}</span>
      </p>
    )}
    {user.city && (
      <p className="row h5 font-weight-normal card-text mb-2">
        <b className="col-3">City: </b>
        <span>{user.city}</span>
      </p>
    )}
    {user.interests && (
      <p className="row h5 font-weight-normal card-text mb-2">
        <b className="col-3">Interests: </b>
        <span className="text-capitalize">{user.interests}</span>
      </p>
    )}
    <p className="row h5 font-weight-normal card-text mb-2">
      <b className="col-3">Status: </b>
      {user.verified ? (
        <span>Verified</span>
      ) : (
        <span className="text-danger">Not Verified</span>
      )}
    </p>
  </div>
);

UserDetail.propTypes = {
  user: PropTypes.object,
};

export default UserDetail;
