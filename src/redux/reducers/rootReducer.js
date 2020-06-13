import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import { USER_LOGOUT } from '../../constants/action-constants';

const appReducer = combineReducers({
  postReducer,
  signupReducer,
  userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    // clear state
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
