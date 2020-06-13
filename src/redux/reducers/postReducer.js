import {
  CLEAR_POST,
  CLEAR_POST_LIST,
  POST_DATA,
  POSTS_LIST,
} from '../../constants/action-constants';

// INITIAL STATE OF STORE
const initialState = {
  post: {},
  postsList: {
    posts: [],
    list_size: 0,
  },
};

// REDUCER FOR UPDATING THE CENTRAL STORE
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DATA:
      return {
        ...state,
        post: action.data.post,
      };

    case CLEAR_POST: {
      return {
        ...state,
        post: {},
      };
    }

    case CLEAR_POST_LIST: {
      return {
        ...state,
        postsList: {
          posts: [],
          list_size: 0,
        },
      };
    }

    case POSTS_LIST:
      return {
        ...state,
        postsList: {
          posts: action.data.posts,
          list_size: action.data.meta.total_count,
        },
      };

    // DEFAULT CASE
    default:
      return state;
  }
};

export default postReducer;
