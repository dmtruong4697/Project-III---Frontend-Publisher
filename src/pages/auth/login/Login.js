import React, { useEffect, useState } from 'react';
import { Badge, FormControl, FormGroup, FormLabel, Image } from 'react-bootstrap';
import loginIllustration from '../../../assets/images/Mobile login-bro.png';
import './login.scss'; // Import file SCSS
import { AppColor } from '../../../constants/AppColor';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginRequest } from '../../../redux/actions/auth.action';

const Login = () => {

  const backend = 'http://localhost:3000/api';
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);
  
  return (
    <div className='container'>
      {/* <Image className='illustration' src={loginIllustration}/> */}
      <div className='illustration'>
        <Image src={loginIllustration}/>
      </div>

      <div className='content'>
        <div className='title'>
          <p style={{color: AppColor.themeColor, fontSize: 50, fontWeight: 'bold'}}>Welcome !</p>
        </div>

        <div className='inputForm'>
          <Form>
            <FormGroup className='inputField'>
              <FormLabel>Email</FormLabel>
              <FormControl                 
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup className='inputField'>
              <FormLabel>Password</FormLabel>
              <FormControl
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
          </Form>
        </div>

        <div className='buttonView'>
          <Button 
            onClick={() => dispatch(loginRequest(email, password))}
          >LOGIN</Button>
        </div>

        <div className='signUpLink'>
          <Badge>
            Don't have account?{' '}
            <Link to={'/sign-up'} style={{textDecoration: 'none', color: '#17bd80'}}>create a new account</Link>
          </Badge>
          {/* <p className='errorMessage'>{message}</p> */}
          <p className='errorMessage'>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
