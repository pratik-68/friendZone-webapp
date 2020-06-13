import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Loading from '../../components/Loading';
import PostsList from '../../components/PostsList';
import { getMyPosts, clearPostList } from '../../redux/actions/postActions';
import { useLocation, useHistory } from 'react-router';

const MyPosts = () => {
  const dispatchAction = useDispatch();
  const history = useHistory();
  const { search } = useLocation();

  const [page, setPage] = useState({ currentPage: 1, totalPage: 0 });

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
    dispatchAction(clearPostList());
    dispatchAction(getMyPosts(search));
  }, [dispatchAction, search]);

  const { postsList } = useSelector(
    (state) => ({
      postsList: state.postReducer.postsList,
    }),
    shallowEqual
  );

  useEffect(() => {
    setPage((prevState) => ({
      ...prevState,
      totalPage: Math.ceil(postsList.list_size / 10),
    }));
  }, [postsList.list_size]);

  const pageChangeHandler = (index) => {
    if (page.totalPage < index) index = page.totalPage;
    else if (index < 1) index = 1;
    history.push(`/my-posts?page=${index}`);
  };

  return (
    <div className="container p-5 border content">
      <div className="h2">
        <p className="mb-3 ml-3 d-flex">Your Posts:</p>
      </div>
      {postsList.posts ? (
        <PostsList
          posts={postsList.posts}
          currentPage={page.currentPage}
          totalPage={page.totalPage}
          pageChangeHandler={pageChangeHandler}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MyPosts;
