import { EMAIL_VERIFICATION } from '../../constants/action-constants';

// INITIAL STATE OF STORE
const initialState = {
  data: [],
  success: false,
};

// REDUCER FOR UPDATING THE CENTRAL STORE
const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_VERIFICATION:
      return {
        ...state,
        data: action.data,
        success: true,
      };

    // DEFAULT CASE
    default:
      return state;
  }
};

export default signupReducer;
