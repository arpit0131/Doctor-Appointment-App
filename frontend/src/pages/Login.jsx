import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const SIGN_UP = 'Sign Up';
  const LOG_IN = 'Log in';
  const [state, setState] = useState(SIGN_UP);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === SIGN_UP) {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('User registered successfully');
        } else {
          toast.error(data.message || 'User registration failed');
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('User Logged in successfully');
        } else {
          toast.error('User Logged in failed');
        }
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
    <form
      onSubmit={submitHandler}
      className='min-h-[80vh] flex items-center mt-16'
    >
      <div className='flex flex-col gap-5 m-auto items-start p-8 md:min-w-[500px] sm:min-w-[96px] border rounded-xl text-zinc-600 shadow-lg'>
        <p className='text-2xl font-semibold'>
          {state === SIGN_UP ? 'Create Account' : 'Login'}
        </p>
        <p>Please {state === SIGN_UP ? SIGN_UP : LOG_IN} to book appointment</p>
        {state === SIGN_UP && (
          <div className='w-full '>
            <p>Full Name:</p>
            <input
              type='text'
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email:</p>
          <input
            type='email'
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='w-full'>
          <p>Password:</p>
          <input
            type='password'
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='bg-primary text-white w-full rounded-md py-3 mt-4 hover:bg-white hover:text-primary hover: border border-primary'
        >
          {state === SIGN_UP ? 'Create Account' : 'Log in'}{' '}
        </button>
        {state === SIGN_UP ? (
          <p>
            Already have an account?
            <span
              className='text-primary underline cursor-pointer ml-2'
              onClick={() => setState(LOG_IN)}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don't have any account?
            <span
              className='text-primary underline cursor-pointer ml-2'
              onClick={() => setState(SIGN_UP)}
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
