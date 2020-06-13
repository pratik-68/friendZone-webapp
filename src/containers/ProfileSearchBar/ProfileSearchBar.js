import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { SEARCHED_USER_LIST_ROUTE } from '../../constants/route-constants';

const ProfileSearchBar = () => {
  const params = useLocation();
  const [username, setUsername] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (params.pathname === SEARCHED_USER_LIST_ROUTE && params.search.length) {
      let search = params.search;
      let valid = search.search('username=');
      if (valid !== -1) {
        let username = search.split('username=');
        username = username[username.length - 1];
        setUsername(username);
      }
    }
  }, [params]);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    if (username.length) {
      history.push(`/profile?username=${username}`);
    }
  };

  return (
    <form className="active-cyan-4" onSubmit={handleRedirect}>
      <input
        className="form-control"
        type="text"
        value={username}
        placeholder="Enter Username"
        aria-label="username"
        onChange={handleChange}
      />
    </form>
  );
};

export default ProfileSearchBar;
