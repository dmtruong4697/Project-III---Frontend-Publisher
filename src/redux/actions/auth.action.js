export const loginRequest = (email, password) => ({
    type: 'LOGIN_REQUEST',
    payload: { email, password },
});

export const loginSuccess = (currentUser) => ({
    type: 'LOGIN_SUCCESS',
    payload: currentUser,
});

export const loginFailure = (errorMessage) => ({
    type: 'LOGIN_FAILURE',
    payload: errorMessage,
});
  
export const signUpMessage = (message) => ({
    type: 'SIGNUP_MESSAGE',
    payload: message,
});

export const signUpRequest = (name, number, email, password, description) => ({
    type: 'SIGNUP_REQUEST',
    payload: { name, number, email, password, description },
});


  