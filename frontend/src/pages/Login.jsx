import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/user/login', {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);

      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <StyledWrapper>
      <div className='container'>
        <img
          onClick={() => {
            navigate('/home');
          }}
          className='w-56 cursor-pointer'
          src={assets.logo}
          alt=''
        />
        <div className='form_area'>
          <p className='title'>LOG IN</p>
          <p>Please Log in to book appointment...</p>
          <form action onSubmit={submitHandler}>
            <div className='form_group'>
              <label className='sub_title' htmlFor='email'>
                Email
              </label>
              <input
                placeholder='Enter your email'
                id='email'
                className='form_style'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form_group'>
              <label className='sub_title' htmlFor='password'>
                Password
              </label>
              <input
                placeholder='Enter your password'
                id='password'
                className='form_style'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type='submit' className='btn'>
                LOG IN
              </button>
              <p>
                Don't have any account?
                <span
                  className='link hover:cursor-pointer'
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </span>
              </p>
              <a className='link' href></a>
            </div>
            <a className='link' href></a>
          </form>
        </div>
        <a className='link' href></a>
      </div>
      <img
        className='w-full absolute right-1 bottom-6 max-w-md opacity-0 animate-slide-left delay-500'
        src={assets.appointment_img}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin-top: 8%;
  }

  .form_area {
    margin-top: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #eddcd9;
    height: auto;
    width: 70%;
    border: 2px solid #264143;
    border-radius: 20px;
    box-shadow: 3px 4px 0px 1px #e99f4c;
  }

  .title {
    color: #264143;
    font-weight: 900;
    font-size: 1.5em;
    margin-top: 20px;
  }

  .sub_title {
    font-weight: 600;
    margin: 5px 0;
  }

  .form_group {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin: 10px;
  }

  .form_style {
    outline: none;
    border: 2px solid #264143;
    box-shadow: 3px 4px 0px 1px #e99f4c;
    width: 390px;
    padding: 12px 10px;
    border-radius: 4px;
    font-size: 15px;
  }

  .form_style:focus,
  .btn:focus {
    transform: translateY(4px);
    box-shadow: 1px 2px 0px 0px #e99f4c;
  }

  .btn {
    padding: 15px;
    margin: 25px 0px;
    width: 390px;
    font-size: 15px;
    background: #de5499;
    border-radius: 10px;
    font-weight: 800;
    box-shadow: 3px 3px 0px 0px #e99f4c;
  }

  .btn:hover {
    opacity: 0.9;
  }

  .link {
    font-weight: 800;
    color: #264143;
    padding: 5px;
  }
`;

export default Login;
