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