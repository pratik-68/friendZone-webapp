import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import AllPosts from '../AllPosts';

const Dashboard = () => {
  const { user } = useSelector(
    (state) => ({
      user: state.userReducer.user,
    }),
    shallowEqual
  );

  return (
    <>
      {user.id ? (
        user.verified ? (
          <AllPosts />
        ) : (
          <div className="container content h4 py-5 my-5">
            Please Verify Your Account to create new posts and Add friends.
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Dashboard;
