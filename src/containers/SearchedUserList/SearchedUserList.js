import React, { useEffect, useState } from 'react';
import {
  clearUserList,
  searchUsers,
  clearSearchedUser,
} from '../../redux/actions/userActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { Redirect, useLocation, useHistory } from 'react-router';
import { DASHBOARD_ROUTE } from '../../constants/route-constants';
import Error404 from '../../components/Error404';
import UsersList from '../../components/UsersList';

const SearchedUserList = () => {
  const { search } = useLocation();
  const dispatchAction = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState({ currentPage: 1, totalPage: 0 });
  const [username, setUsername] = useState('');

  useEffect(() => {
    let username = search.split('username=');
    username = username[username.length - 1];
    setUsername(username);
    let valid = search.search('page=');
    if (valid !== -1) {
      let page = search.split('page=');
      page = page[page.length - 1];
      page = parseInt(page);
      if (page < 1) page = 1;
      setPage((prevState) => ({
        ...prevState,
        currentPage: page,
      }));
    }
    if (username.length) {
      dispatchAction(clearUserList());
      dispatchAction(clearSearchedUser());
      dispatchAction(searchUsers(search));
    }
  }, [dispatchAction, search]);

  const { userList, error } = useSelector(
    (state) => ({
      userList: state.userReducer.userList,
      error: state.userReducer.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    setPage((prevState) => ({
      ...prevState,
      totalPage: Math.ceil(userList.list_size / 10),
    }));
  }, [userList.list_size]);

  const pageChangeHandler = (index) => {
    if (page.totalPage < index) index = page.totalPage;
    else if (index < 1) index = 1;
    history.push(`/profile?page=${index}&username=${username}`);
  };

  return (
    <div className="container">
      {userList.users ? (
        <div className="container content p-5 border">
          <p className="h2 mx-5 mb-4">Search Results:</p>
          <UsersList
            currentPage={page.currentPage}
            totalPage={page.totalPage}
            users={userList.users}
            pageChangeHandler={pageChangeHandler}
          />
        </div>
      ) : search.length ? (
        error.message ? (
          <Error404 />
        ) : (
          <Loading />
        )
      ) : (
        <Redirect to={DASHBOARD_ROUTE} />
      )}
    </div>
  );
};

export default SearchedUserList;
