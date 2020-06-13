import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
  CREATE_POST_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  MY_POSTS_ROUTE,
  PROFILE_ROUTE,
  SIGN_UP_ROUTE,
  FRIEND_LIST_ROUTE,
} from '../../constants/route-constants';
import { Redirect } from 'react-router-dom';
import ProfileSearchBar from '../../containers/ProfileSearchBar/ProfileSearchBar';
import PropTypes from 'prop-types';

const NavBar = ({
  authorizedUser,
  location,
  logoutCallback,
  redirect,
  userData,
}) => (
  <Navbar className="navbar" variant="dark" expand="lg">
    <div className="container">
      <Navbar.Brand href={DASHBOARD_ROUTE}>FriendZone</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {authorizedUser ? (
          <Nav className="w-100">
            <div className="d-flex justify-content-left pl-5">
              <ProfileSearchBar />
            </div>
            <div className="d-flex ml-auto text-light">
              <Nav.Link href={DASHBOARD_ROUTE}>Home</Nav.Link>
              <span
                data-placement="bottom"
                title={`${!userData.verified ? 'Verify Email to Access' : ''}`}
              >
                <Nav.Link
                  href={CREATE_POST_ROUTE}
                  disabled={!userData.verified}
                >
                  Create Post
                </Nav.Link>
              </span>
              <span
                data-placement="bottom"
                title={`${!userData.verified ? 'Verify Email to Access' : ''}`}
              >
                <Nav.Link
                  href={FRIEND_LIST_ROUTE}
                  disabled={!userData.verified}
                >
                  Friend List
                </Nav.Link>
              </span>

              {userData.first_name && (
                <NavDropdown
                  title={userData.first_name}
                  className="text-capitalize"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href={PROFILE_ROUTE}>
                    Profile
                  </NavDropdown.Item>
                  <span
                    data-placement="bottom"
                    title={`${
                      !userData.verified ? 'Verify Email to Access' : ''
                    }`}
                  >
                    <NavDropdown.Item
                      href={MY_POSTS_ROUTE}
                      disabled={!userData.verified}
                    >
                      My posts
                    </NavDropdown.Item>
                  </span>
                  <NavDropdown.Item onClick={logoutCallback}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </div>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            {location !== SIGN_UP_ROUTE && (
              <Nav.Link href={SIGN_UP_ROUTE}>Signup</Nav.Link>
            )}
            {location !== LOGIN_ROUTE && (
              <Nav.Link href={LOGIN_ROUTE}>Login</Nav.Link>
            )}
            {redirect && <Redirect to={LOGIN_ROUTE} />}
          </Nav>
        )}
      </Navbar.Collapse>
    </div>
  </Navbar>
);

NavBar.propTypes = {
  redirect: PropTypes.bool,
  authorizedUser: PropTypes.bool,
  userData: PropTypes.object,
  logoutCallback: PropTypes.func,
  location: PropTypes.string,
};

export default NavBar;
