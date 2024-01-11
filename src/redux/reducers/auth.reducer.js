const initialState = {
  currentUser: null,
  errorMessage: null,
  signUpMessage: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        currentUser: null,
        errorMessage: action.payload,
      };
    case 'SIGNUP_MESSAGE':
      return {
        ...state,
        signUpMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
