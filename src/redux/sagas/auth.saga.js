import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { loginFailure, loginSuccess, signUpMessage } from '../actions/auth.action';
import { useNavigate } from 'react-router-dom';

const backend = 'http://localhost:3000/api';

function* login(action) {
    //const navigate = useNavigate();
  try {
    const { email, password } = action.payload;
    const response = yield call(axios.post, `${backend}/publisher-login`, {
      email,
      password,
    });

    if (response.status === 200) {
      const currentUser = {
        token: response.data.token,
        id: response.data.id,
        userName: response.data.userName,
        email: response.data.email,
        role: response.data.role,
      };

      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('token', response.data.token);

      yield put(loginSuccess(currentUser));
      //navigate("/home");
    } else {
      // Handle other status codes if needed
    }
  } catch (error) {
    console.error('Error during login:', error);

    yield put(loginFailure(error.response.data.message));
  }
}

const signUp = async (name, number, email, password, description) => {
  try {
    const response = await axios.post(backend + "/publisher-signup", 
    {
      userName: name,
      email: email,
      password: password,
      phoneNumber: number,
      avatarImage: "example.com",
      description: description,
    },
    );

    if (response.status === 201) {
      console.log(response.data.message);
      return response.data.message;
    } 
  } catch (error) {
    console.error("Error during sign up:", error);
    return error.response.data.message;
  }
};

function* authSaga() {
  yield takeLatest('LOGIN_REQUEST', login);
}

export {authSaga, signUp};
