import React, { useContext, useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Admin') {
        //Admin Login Api call             //base backend url //endpoint
        const { data } = await axios.post(backendUrl + '/api/admin/login', {
          email, //detail sent to backend
          password,
        });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success('Admin Login Successfull');
        } else {
          toast.error(data.message);
        }
      } else {
        //Doctor Login Api call
      }
    } catch (error) {
      console.log('Catch error:- ', error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-primary'>{state}</span> Login
        </p>
        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-[#DADADA] rounded w-full p-2 m-1'
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            value={email}
            required
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-[#DADADA] rounded w-full p-2 m-1'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='text-white w-full bg-primary py-2 font-semibold text-lg rounded-md m-1'>
          Login
        </button>
        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span
              onClick={() => setState('Doctor')}
              className='text-primary cursor-pointer hover:scale-105 hover:text-blue-600 hover:font-semibold'
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span
              onClick={() => setState('Admin')}
              className='text-primary cursor-pointer hover:scale-105 hover:text-blue-600 hover:font-semibold'
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
