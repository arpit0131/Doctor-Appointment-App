import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Edward Vincent',
    image: assets.profile_pic,
    email: 'richardjameswap@gmail.com',
    phone: '+1  123 456 7890',
    address: {
      line1: '57th Cross, Richmond ',
      line2: 'Circle, Church Road, London',
    },
    gender: 'Male',
    dob: '20 July, 2024',
  });
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='mt-28'>
      <div className='max-w-lg flex flex-col gap-2 text-sm m-auto'>
        <img
          src={userData.image}
          className='rounded-lg w-36'
          alt='user profile pic'
        />
        {isEdit ? (
          <input
            type='text'
            className='bg-gray-50 text-3xl font-medium max-w-60 mt-4'
            placeholder='Enter your name'
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className='text-3xl font-medium text-neutral-800 mt-4'>
            {userData.name}
          </p>
        )}
        <hr className='bg-zinc-400 h-[1px] border-none' />
        <div className='mt-3'>
          <p className='text-neutral-500 text-lg underline'>
            CONTACT INFORMATION
          </p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>Email:</p>
            <p className='text-blue-500'>{userData.email}</p>

            <p className='font-medium'>Phone:</p>
            {isEdit ? (
              <input
                type='number'
                placeholder='Enter your phone number'
                className='text-blue-500'
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className='text-blue-500'>{userData.phone}</p>
            )}

            <p className='font-medium'>Address:</p>
            {isEdit ? (
              <p>
                <input
                  type='text'
                  placeholder='Enter your address line 1'
                  className='bg-gray-50'
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <br />
                <input
                  type='text'
                  placeholder='Enter your address line 2'
                  className='bg-gray-50'
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </p>
            ) : (
              <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-neutral-500 text-lg underline'>
            BASIC INFORMATION
          </p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>Gender:</p>
            {isEdit ? (
              <select
                className='max-w-28 rounded-lg py-0.5 bg-gray-100'
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='female'>Female</option>
              </select>
            ) : (
              <p className='text-gray-400'>{userData.gender}</p>
            )}

            <p className='font-medium'>Birthday:</p>
            {isEdit ? (
              <input
                className='max-w-28 rounded-lg py-0.5 bg-gray-100'
                type='date'
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className='text-gray-400'>{userData.dob}</p>
            )}
          </div>
        </div>
        <div className='mt-10'>
          {isEdit ? (
            <button
              className='border border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all duration-150 hover:scale-110'
              onClick={() => setIsEdit(false)}
            >
              Save Information
            </button>
          ) : (
            <button
              className='border border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all duration-150 hover:scale-110'
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
