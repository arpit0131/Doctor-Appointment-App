import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className='fixed top-0 left-0 bg-white w-full z-10 px-5 py-2.5 border-b border-gray-400'>
      {/* Desktop View */}
      <div className='flex justify-between'>
        <img
          onClick={() => {
            navigate('/');
          }}
          className='w-44 cursor-pointer'
          src={assets.logo}
          alt=''
        />
        <ul className='hidden lg:flex items-center gap-8 text-lg font-medium'>
          <NavLink to='/'>
            <li className='py-1'>HOME</li>
            <hr className='h-1 bg-primary w-5/5 hidden' />
          </NavLink>
          <NavLink to='/doctors'>
            <li className='py-1'>ALL DOCTORS</li>
            <hr className='h-1 bg-primary w-5/5 hidden' />
          </NavLink>
          <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr className='h-1 bg-primary w-5/5 hidden' />
          </NavLink>
          <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
            <hr className='h-1 bg-primary w-5/5 hidden' />
          </NavLink>
        </ul>
        <div className='flex gap-4'>
          {token ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img
                className='w-12 rounded-full'
                src={assets.profile_pic}
                alt='Profile pic'
              />
              <img
                className='w-3'
                src={assets.dropdown_icon}
                alt='Dropdown icon'
              />
              <div className='absolute top-2 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded-lg flex flex-col'>
                  <p
                    onClick={() => navigate('/my-profile')}
                    className='p-3 hover:text-black cursor-pointer hover:bg-stone-300 hover:rounded-t-lg'
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate('/my-appointments')}
                    className='p-3 hover:text-black cursor-pointer hover:bg-stone-300 '
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className='p-3 hover:text-black cursor-pointer hover:bg-stone-300 hover:hover:rounded-b-lg'
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
            >
              Create Account
            </button>
          )}
          <img
            onClick={() => setShowMenu(true)}
            className='w-6 lg:hidden cursor-pointer'
            src={assets.menu_icon}
            alt='Menu Icon'
          />
        </div>
      </div>
      {/* Mobile View */}
      {showMenu && (
        <div
          className={`${
            showMenu ? 'fixed w-full h-full top-0  left-0' : 'h-0 w-0'
          } bg-white transition-all duration-500 lg:hidden`}
        >
          <div className='flex items-center justify-between px-5 py-6'>
            <img
              src={assets.logo}
              onClick={() => {
                navigate('/');
              }}
              className='w-36 cursor-pointer'
              alt=''
            />
            <img
              className='w-7 cursor-pointer'
              src={assets.cross_icon}
              onClick={() => setShowMenu(false)}
              alt=''
            />
          </div>
          <ul className='flex flex-col items-center gap-4 mt-8 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'>
              <p className='px-4 py-2 rounded inline-block'>HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
              <p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'>
              <p className='px-4 py-2 rounded inline-block'>ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'>
              <p className='px-4 py-2 rounded inline-block'>CONTACT US</p>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
