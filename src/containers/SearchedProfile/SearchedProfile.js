import React, { useEffect, useState } from 'react';
import {
  clearNotFound,
  clearSuccess,
  searchProfile,
  clearSearchedUser,
} from '../../redux/actions/userActions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import UserDetail from '../../components/UserDetail';
import Error404 from '../../components/Error404';
import Loading from '../../components/Loading';
import { useParams, useLocation, useHistory } from 'react-router';
import {
  acceptRequest,
  sendRequest,
  manageFriendSubscribe,
  clearSubscribe,
} from '../../redux/actions/friendActions';
import { Alert } from 'react-bootstrap';
import { getUserPosts, clearPost } from '../../redux/actions/postActions';
import PostsList from '../../components/PostsList';
import defaultImage from '../../assets/profile_pic.png';

const SearchedProfile = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const history = useHistory();
  const dispatchAction = useDispatch();

  const [page, setPage] = useState({ currentPage: 1, totalPage: 0 });

  useEffect(() => {
    dispatchAction(clearPost());
    dispatchAction(clearSearchedUser());
    dispatchAction(clearSuccess());
    dispatchAction(clearNotFound());
  }, [dispatchAction]);

  useEffect(() => {
    dispatchAction(searchProfile(id));
  }, [dispatchAction, id]);

  const {
    currentUser,
    notFound,
    postsList,
    subscribe,
    success,
    user,
  } = useSelector(
    (state) => ({
      currentUser: state.userReducer.user,
      notFound: state.userReducer.notFound,
      postsList: state.postReducer.postsList,
      subscribe: state.userReducer.subscribe,
      success: state.userReducer.success,
      user: state.userReducer.searchedUser,
    }),
    shallowEqual
  );
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [buttonText, setButtonText] = useState('Add Friend');

  useEffect(() => {
    if (user.id) {
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
      dispatchAction(getUserPosts(user.id, search));
      if (!user.is_owner) {
        setShowButton(true);
        if (user.is_friend) {
          setButtonText('Already Friend');
          setButtonDisabled(true);
        } else if (user.is_requested) {
          setButtonText('Send Friend Request Again');
          setButtonDisabled(false);
        } else if (user.can_request) {
          setButtonText('Add Friend');
          setButtonDisabled(false);
        } else if (user.has_request) {
          setButtonText('Accept Request');
          setButtonDisabled(false);
        }
      } else {
        setShowButton(false);
      }
    }
  }, [user, dispatchAction, search]);

  useEffect(() => {
    setPage((prevState) => ({
      ...prevState,
      totalPage: Math.ceil(postsList.list_size / 10),
    }));
  }, [postsList.list_size]);

  useEffect(() => {
    if (subscribe) {
      if (user.is_subscribed) setAlertMessage('Successfully Unsubscribed');
      else setAlertMessage('Successfully Subscribed');
      setAlert(true);
      dispatchAction(searchProfile(id));
      dispatchAction(clearSubscribe());
    }
  }, [subscribe, dispatchAction, id, user]);

  const handleButtonSubmit = () => {
    if (user.has_request) {
      dispatchAction(acceptRequest(user.id));
    } else if (user.can_request) {
      dispatchAction(sendRequest(user.id));
    }
  };

  if (success) {
    setAlertMessage('Successful');
    dispatchAction(searchProfile(id));
    setAlert(true);
    dispatchAction(clearSuccess());
  }

  if (notFound) {
    return <Error404 />;
  }

  const pageChangeHandler = (index) => {
    if (page.totalPage < index) index = page.totalPage;
    else if (index < 1) index = 1;
    history.push(`/user/${id}?page=${index}`);
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
          {alertMessage}
        </Alert>
      )}
      {user && user.first_name ? (
        <div className="card border">
          <div className="row no-gutters border">
            <div className="d-flex justify-content-center">
              <div className="d-flex align-items-center">
                <img
                  src={`${
                    user.profile_pic ? user.profile_pic.url : defaultImage
                  }`}
                  alt="profile_pic"
                  height="370"
                  width="330"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                {showButton && (
                  <span
                    data-placement="bottom"
                    title={`${
                      currentUser.verified
                        ? user.verified
                          ? ''
                          : 'User is not Verified'
                        : 'Verify Email to Add Friend'
                    }`}
                  >
                    <button
                      disabled={buttonDisabled}
                      className="float-right btn btn-primary"
                      onClick={handleButtonSubmit}
                    >
                      {buttonText}
                    </button>
                  </span>
                )}
                {user.is_friend && (
                  <button
                    className="float-right btn btn-primary mr-2"
                    onClick={() => handleSubscribe(user.id)}
                  >
                    {user.is_subscribed ? 'Unsubscribe' : 'Subscribe'}
                  </button>
                )}
                <UserDetail user={user} />
              </div>
            </div>
          </div>
          {user.verified && (
            <div className="container mb-3">
              {postsList.posts ? (
                <>
                  <p className="h2 mx-5 mt-5 mb-4">Posts:</p>
                  <PostsList
                    posts={postsList.posts}
                    currentPage={page.currentPage}
                    totalPage={page.totalPage}
                    pageChangeHandler={pageChangeHandler}
                  />
                </>
              ) : (
                <Loading />
              )}
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SearchedProfile;
