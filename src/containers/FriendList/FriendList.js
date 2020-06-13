import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation, useHistory } from 'react-router';
import { DASHBOARD_ROUTE } from '../../constants/route-constants';
import UsersList from '../../components/UsersList';
import Loading from '../../components/Loading';
import { clearUserList } from '../../redux/actions/userActions';
import {
  getFriends,
  manageFriendSubscribe,
  clearSubscribe,
} from '../../redux/actions/friendActions';
import { Alert } from 'react-bootstrap';

const FriendList = () => {
  const { search } = useLocation();
  const history = useHistory();
  const dispatchAction = useDispatch();

  const [page, setPage] = useState({ currentPage: 1, totalPage: 0 });
  const [alert, setAlert] = useState(false);

  useEffect(() => {
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
    dispatchAction(clearUserList());
    dispatchAction(getFriends(search));
  }, [dispatchAction, search]);

  const { userList, user, subscribe } = useSelector(
    (state) => ({
      userList: state.userReducer.userList,
      user: state.userReducer.user,
      subscribe: state.userReducer.subscribe,
    }),
    shallowEqual
  );

  useEffect(() => {
    setPage((prevState) => ({
      ...prevState,
      totalPage: Math.ceil(userList.list_size / 10),
    }));
  }, [userList.list_size]);

  useEffect(() => {
    if (subscribe) {
      setAlert(true);
      dispatchAction(getFriends(search));
      dispatchAction(clearSubscribe());
    }
  }, [subscribe, dispatchAction, search]);

  if (user && user.id) {
    if (!user.verified) {
      return <Redirect to={DASHBOARD_ROUTE} />;
    }
  }

  const pageChangeHandler = (index) => {
    if (page.totalPage < index) index = page.totalPage;
    else if (index < 1) index = 1;
    history.push(`/friends?page=${index}`);
  };

  const handleSubscribe = (id) => {
    dispatchAction(manageFriendSubscribe(id));
  };

  return (
    <div className="container">
      {alert && (
        <Alert
          variant="success"
          className="fixed-top"
          onClose={() => setAlert(false)}
          dismissible
        >
          Successful
        </Alert>
      )}

      {userList.users ? (
        <div className="container border content p-5">
          <p className="h1 mx-5 mb-4">Friends:</p>
          <UsersList
            currentPage={page.currentPage}
            totalPage={page.totalPage}
            users={userList.users}
            friends={true}
            handleSubscribe={handleSubscribe}
            pageChangeHandler={pageChangeHandler}
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default FriendList;
