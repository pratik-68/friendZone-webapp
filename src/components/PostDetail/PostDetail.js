import React from 'react';
import { postStatus, to_DateTime } from '../../utils';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  POST_DETAIL_URL,
  SEARCHED_PROFILE_URL,
} from '../../constants/route-constants';

const PostDetail = ({ handleEdit, linkShow, post }) => (
  <Link
    to={POST_DETAIL_URL(post.id)}
    style={{ textDecoration: 'none' }}
    className="text-dark d-flex justify-content-center"
  >
    <div className="card cream-body col-md-9">
      <div className="card-body pb-0">
        <div className="card-body pb-2 pt-0 border-bottom">
          {post.owner && !linkShow && (
            <button
              className="btn btn-outline-success float-right"
              onClick={handleEdit}
            >
              Edit Post
            </button>
          )}
          <object>
            <Link to={SEARCHED_PROFILE_URL(post.user.id)} className="text-dark">
              <p className="card-text text-capitalize">
                <b className="h3">
                  {post.user.first_name}&nbsp;
                  {post.user.last_name}
                </b>
              </p>
            </Link>
          </object>
        </div>
        <div className="card-body pt-0">
          {post.image && (
            <div className="d-flex justify-content-center">
              <img
                src={post.image.url}
                height="400"
                width="600"
                alt="post_image"
              />
            </div>
          )}
          <pre className="h5 font-weight-normal text-capitalize p-3 mb-0">
            {post.description}
          </pre>
        </div>
        {!linkShow && (
          <div className="d-flex justify-content-between px-4 text-secondary">
            <small className="card-text m-0">
              <b>Visibility: </b>
              <span className="text-capitalize">
                {postStatus(post.visible_to)}
              </span>
            </small>

            <small className="card-text m-0">
              <b>Posted On: </b>
              <span className="text-capitalize">
                {to_DateTime(post.created_at)}
              </span>
            </small>
          </div>
        )}
      </div>
    </div>
  </Link>
);

PostDetail.defaultProps = {
  currentPage: 1,
};

PostDetail.propTypes = {
  linkShow: PropTypes.bool,
  post: PropTypes.object,
  handleEdit: PropTypes.func,
};

export default PostDetail;
