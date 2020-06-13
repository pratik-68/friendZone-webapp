import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SEARCHED_PROFILE_URL } from '../../constants/route-constants';
import defaultImage from '../../assets/profile_pic.png';
import MyPagination from '../MyPagination';

const UsersList = ({
  currentPage,
  friends,
  handleSubscribe,
  pageChangeHandler,
  totalPage,
  users,
}) => (
  <>
    {users.length ? (
      users.map((user, index) => {
        return (
          <div className={`card ${index && 'mt-5'}`} key={index}>
            <div className="row no-gutters cream-body">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={`${
                    user.profile_pic ? user.profile_pic.url : defaultImage
                  }`}
                  width="250"
                  height="250"
                  alt="profile_pic"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  {friends && (
                    <button
                      className="float-right btn btn-primary"
                      onClick={() => handleSubscribe(user.id)}
                    >
                      {user.is_subscribed ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                  )}
                  <h2 className="card-text mb-4 text-capitalize">
                    <Link
                      to={SEARCHED_PROFILE_URL(user.id)}
                      className="text-dark"
                    >
                      {user.first_name}&nbsp;
                      {user.last_name}
                    </Link>
                  </h2>
                  {user.email && (
                    <p className="row h5 font-weight-normal card-text mb-2">
                      <b className="col-3">Email:</b>
                      <span>{user.email}</span>
                    </p>
                  )}
                  <p className="row h5 font-weight-normal card-text mb-2">
                    <b className="col-3">Username:</b>
                    <span>{user.username}</span>
                  </p>
                  <p className="row h5 font-weight-normal card-text mb-2">
                    <b className="col-3">Gender:</b>
                    <span className="text-capitalize">{user.gender}</span>
                  </p>
                  <p className="row h5 font-weight-normal card-text mb-2">
                    <b className="col-3">Status:</b>
                    {user.verified ? (
                      <span>Verified</span>
                    ) : (
                      <span className="text-danger">Not Verified</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : friends ? (
      <div className="pl-5 py-5 h3 cream-body border">No Current Friends</div>
    ) : (
      <div className="pl-5 py-5 h3 cream-body border">No User Available</div>
    )}

    <div className="d-flex mt-2 justify-content-center">
      <MyPagination
        currentPage={currentPage}
        totalPage={totalPage}
        pageChangeHandler={pageChangeHandler}
      />
    </div>
  </>
);

UsersList.defaultProps = {
  friends: false,
};

UsersList.propTypes = {
  currentPage: PropTypes.number,
  friends: PropTypes.bool,
  handleSubscribe: PropTypes.func,
  pageChangeHandler: PropTypes.func,
  totalPage: PropTypes.number,
  users: PropTypes.array,
};

export default UsersList;
