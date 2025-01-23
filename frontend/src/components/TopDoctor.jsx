import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopDoctor = ({ itemId, Index, docImage, docName, docSpeciality }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/appointment/${itemId}`)}
      key={Index}
      className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-20px] transition-all duration-300'
    >
      <img
        className='bg-blue-50 hover:bg-primary'
        src={docImage}
        alt="doctor's image"
      />
      <div className='p-4'>
        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
          <p className='w-2 h-2 bg-green-500 rounded-full'></p>
          <p>Available</p>
        </div>
        <p className='text-gray-900 text-lg font-medium'>{docName}</p>
        <p className='text-gray-600 text-sm'>{docSpeciality}</p>
      </div>
    </div>
  );
};

export default TopDoctor;
