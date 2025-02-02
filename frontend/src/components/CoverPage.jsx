import React, { useContext } from 'react';
import backImg from '../assets/assets_frontend/back.jpg';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const CoverPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  return (
    <>
      {token ? (
        navigate('/home')
      ) : (
        <div
          className='fixed inset-0 bg-cover bg-center overflow-x-hidden'
          style={{
            backgroundImage: `linear-gradient(to right, rgba(5, 0, 136, 0.7), rgba(5, 0, 136, 0.2)), url(${backImg})`,
          }}
        >
          <div className='mt-[12%] ml-[6%] text-white'>
            <h1 className='text-[80px] leading-[110px] font-semibold opacity-0 animate-slide-left delay-500'>
              Book Appointement <br /> With{' '}
              <span className='text-[110px] font-bold'>100+</span> Trusted
              Doctors...
            </h1>
            <p className='max-w-[600px] text-xl leading-[28px] mt-5 opacity-0 animate-slide-left delay-1000'>
              Simply browse with our extensive list of trusted doctors,
              <br className='hidden sm:block' /> schedule your appointment
              hassle-free
            </p>
            <div className='flex gap-4 mt-10 opacity-0 animate-slide-left delay-1500'>
              <button
                onClick={() => navigate('/signup')}
                className='border-2 border-white px-[55px] py-[10px] rounded-[30px] mr-[15px] hover:bg-white hover:text-black hover:scale-105'
              >
                Sign up
              </button>
              <button
                onClick={() => navigate('/login')}
                className='border-2 border-white px-[55px] py-[10px] rounded-[30px] mr-[15px] hover:bg-white hover:text-black hover:scale-105'
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverPage;
