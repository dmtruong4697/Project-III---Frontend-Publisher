import React, { useEffect, useState } from 'react';
import { Badge, FormControl, FormGroup, FormLabel, Image } from 'react-bootstrap';
import loginIllustration from '../../../assets/images/Mobile login-bro.png';
import './signUp.scss'; // Import file SCSS
import { AppColor } from '../../../constants/AppColor';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginRequest } from '../../../redux/actions/auth.action';
import { signUp } from '../../../redux/sagas/auth.saga';

const SignUp = () => {

  const backend = 'http://localhost:3000/api';
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [number, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleSignUp = () => {
    signUp(name, number, email, password, description)
     .then((message) => {
        setMessage(message);
        if(message == "Đăng ký nhà phát hành thành công") navigate("/login");
     })
  }
  
  return (
    <div className='container'>
      {/* <Image className='illustration' src={loginIllustration}/> */}
      <div className='illustration'>
        <Image src={loginIllustration}/>
      </div>

      <div className='content'>
        {/* <div className='title'>
          <p style={{color: AppColor.themeColor, fontSize: 50, fontWeight: 'bold'}}>Welcome !</p>
        </div> */}

        <div className='inputForm'>
          <Form>

          <FormGroup className='inputField'>
              <FormLabel>Publisher Name</FormLabel>
              <FormControl                 
                //type='email'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup className='inputField'>
              <FormLabel>Phone Number</FormLabel>
              <FormControl                 
                //type='email'
                value={number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormGroup>

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

            <FormGroup className='inputField'>
              <FormLabel>Description</FormLabel>
              <FormControl
                //type='password'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
          </Form>
        </div>

        <div className='buttonView'>
          <Button 
            onClick={() => handleSignUp()}
          >Sign Up</Button>
        </div>

        <div className='signUpLink'>
          <Badge>
            Already have an account?{' '}
            <Link to={'/login'} style={{textDecoration: 'none', color: '#17bd80'}}>login</Link>
          </Badge>
          {/* <p className='errorMessage'>{message}</p> */}
          <p className='errorMessage'>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
