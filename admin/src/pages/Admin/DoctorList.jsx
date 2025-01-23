import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div
            key={index}
            className='border border-blue-200 max-w-72 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-20px] transition-all duration-300'
          >
            <img
              className='bg-blue-50 hover:bg-primary'
              src={item.image}
              alt="doctor's image"
            />
            <div className='p-4'>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input
                  className='w-5 h-5 border-2  border-blue-500 rounded-full bg-white checked:bg-blue-500 checked:border-blue-700 focus:ring-2 focus:ring-blue-300 transition duration-200'
                  onChange={() => changeAvailability(item._id)}
                  type='checkbox'
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
