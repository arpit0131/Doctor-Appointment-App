import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AppointmentSection = ({ docItem, index }) => {
  return (
    <>
      <div
        className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
        key={index}
      >
        <div>
          <img
            className='w-40 bg-indigo-50'
            src={docItem.image}
            alt='doctor image'
          />
        </div>
        <div className='flex-1'>
          <p className='text-gray-800 text-lg font-semibold'>{docItem.name}</p>
          <p className='text-neutral-700 text-sm'>{docItem.speciality}</p>
          <p className='font-semibold text-gray-600 mt-2'>Address:</p>
          <p className='text-sm text-gray-600 my-2'>
            {docItem.address.line1}
            <br />
            {docItem.address.line2}
          </p>
          <p className='text-sm'>
            <span className='font-semibold text-gray-600 mr-1'>
              Date & Time:
            </span>
            <span> 25 July,2024 | 8:30 PM</span>
          </p>
        </div>
        <div className=''></div>
        <div className=' flex flex-col justify-end gap-2'>
          <button className='bg-primary px-9 py-1.5 text-white rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-150'>
            Pay Online
          </button>
          <button className='bg-white px-9 py-1.5 text-stone-500 border border-stone-500 rounded-md hover:bg-red-500 hover:text-white hover:border-none hover:scale-105 transition-all duration-150'>
            Cancel Appointment
          </button>
        </div>
      </div>
    </>
  );
};

export default AppointmentSection;
