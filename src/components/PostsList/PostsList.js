import React from 'react';
import PropTypes from 'prop-types';
import PostDetail from '../PostDetail';
import MyPagination from '../MyPagination';

const PostsList = ({ currentPage, pageChangeHandler, posts, totalPage }) => (
  <>
    {posts.length ? (
      posts.map((post, index) => {
        return (
          <div className={`${index && 'mt-5'}`} key={index}>
            <PostDetail post={post} linkShow={true} />
          </div>
        );
      })
    ) : (
      <div className="pl-5 py-5 cream-body border">No Posts Available</div>
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

export default PostsList;

PostsList.propTypes = {
  currentPage: PropTypes.number,
  totalPage: PropTypes.number,
  pageChangeHandler: PropTypes.func,
  posts: PropTypes.array,
};
