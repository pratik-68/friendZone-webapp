import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import PrivateRoute from './containers/PrivateRoute';
import PublicRoute from './containers/PublicRoute';

import NavBar from './containers/NavBar';
import Footer from './components/Footer';

import Error404 from './components/Error404';
import ServiceUnavailable from './containers/ServiceUnavailable';

import Signup from './containers/Signup';
import EmailConfirmation from './containers/EmailConfirmation';
import Login from './containers/Login';

import Dashboard from './containers/Dashboard';
import UserProfile from './containers/UserProfile';

import SearchedProfile from './containers/SearchedProfile';
import SearchedUserList from './containers/SearchedUserList';
import FriendRequestAcceptEmail from './containers/FriendRequestAcceptEmail';

import FriendList from './containers/FriendList';

import MyPosts from './containers/MyPosts';
import CreatePost from './containers/CreatePost';
import PostDetail from './containers/PostDetail';

import { loadUser, unauthorisedUser } from './redux/actions/userActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  DASHBOARD_ROUTE,
  FRIEND_LIST_ROUTE,
  INDEX_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  SERVICE_UNAVAILABLE_ROUTE,
  SIGN_UP_ROUTE,
  EMAIL_CONFIRMATION_ROUTE,
  SEARCHED_PROFILE_ROUTE,
  SEARCHED_USER_LIST_ROUTE,
  FRIEND_REQUEST_ACCEPT_ROUTE,
  CREATE_POST_ROUTE,
  POST_DETAIL_ROUTE,
  MY_POSTS_ROUTE,
} from './constants/route-constants';

const App = () => {
  const dispatchAction = useDispatch();
  const { authorizedUser, serviceUnavailable } = useSelector(
    (state) => ({
      authorizedUser: state.userReducer.authorizedUser,
      serviceUnavailable: state.userReducer.serviceUnavailable,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (authorizedUser === null) dispatchAction(loadUser());
  }, [dispatchAction, authorizedUser]);

  useEffect(() => {
    if (serviceUnavailable) dispatchAction(unauthorisedUser());
  }, [dispatchAction, serviceUnavailable]);

  return (
    <Router>
      {serviceUnavailable && <Redirect to={SERVICE_UNAVAILABLE_ROUTE} />}
      <NavBar />
      <div className="main-body py-5">
        <Switch>
          <PublicRoute
            restricted={true}
            Component={Login}
            path={LOGIN_ROUTE}
            exact
          />
          <PublicRoute
            restricted={true}
            Component={Signup}
            path={SIGN_UP_ROUTE}
            exact
          />
          <PublicRoute
            Component={EmailConfirmation}
            path={EMAIL_CONFIRMATION_ROUTE}
            exact
          />
          <PublicRoute
            Component={FriendRequestAcceptEmail}
            path={FRIEND_REQUEST_ACCEPT_ROUTE}
            exact
          />
          <PrivateRoute Component={Dashboard} path={DASHBOARD_ROUTE} exact />
          <PrivateRoute Component={UserProfile} path={PROFILE_ROUTE} exact />
          <PrivateRoute Component={FriendList} path={FRIEND_LIST_ROUTE} exact />
          <PrivateRoute Component={CreatePost} path={CREATE_POST_ROUTE} exact />
          <PrivateRoute Component={MyPosts} path={MY_POSTS_ROUTE} exact />
          <PrivateRoute Component={PostDetail} path={POST_DETAIL_ROUTE} exact />
          <PrivateRoute
            Component={SearchedUserList}
            path={SEARCHED_USER_LIST_ROUTE}
            exact
          />
          <PrivateRoute
            Component={SearchedProfile}
            path={SEARCHED_PROFILE_ROUTE}
            exact
          />
          <PublicRoute
            Component={ServiceUnavailable}
            path={SERVICE_UNAVAILABLE_ROUTE}
            exact
          />
          <PublicRoute Component={Error404} path={INDEX_ROUTE} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
