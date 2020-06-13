import React, { useEffect, useState } from 'react';
import { clearNotFound, clearSuccess } from '../../redux/actions/userActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { useParams } from 'react-router';
import Error404 from '../../components/Error404';
import { getPost } from '../../redux/actions/postActions';
import PostDetailPage from '../../components/PostDetail';
import EditPost from '../EditPost';
import { Alert } from 'react-bootstrap';

const PostDetail = () => {
  const dispatchAction = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatchAction(clearNotFound());
    dispatchAction(clearSuccess());
  }, [dispatchAction]);

  useEffect(() => {
    dispatchAction(getPost(id));
  }, [dispatchAction, id]);

  const { post, notFound, success } = useSelector(
    (state) => ({
      notFound: state.userReducer.notFound,
      post: state.postReducer.post,
      success: state.userReducer.success,
    }),
    shallowEqual
  );

  const [alert, setAlert] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    if (success) {
      setEdit(false);
      setAlert(true);
      dispatchAction(getPost(id));
      dispatchAction(clearSuccess());
    }
  }, [success, dispatchAction, id]);

  if (notFound) {
    return <Error404 />;
  }

  return (
    <div className="container border content p-5">
      {alert && (
        <Alert
          variant="success"
          className="fixed-top"
          onClose={() => setAlert(false)}
          dismissible
        >
          Successfully Updated
        </Alert>
      )}
      {post && post.id ? (
        <div>
          {edit ? (
            <EditPost handleEdit={handleEdit} />
          ) : (
            <>
              <p className="h2 mx-5 mb-4">Post Details:</p>
              <PostDetailPage post={post} handleEdit={handleEdit} />
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PostDetail;
