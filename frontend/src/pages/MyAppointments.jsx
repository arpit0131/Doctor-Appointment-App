import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import AppointmentSection from './AppointmentSection';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  console.log(doctors);

  return (
    <div className='mt-24'>
      <div>
        <p className='pb-3 mt-12 font-medium text-zinc-500 border-b text-2xl text-center'>
          My Appointments
        </p>
        <div>
          {doctors.slice(0, 3).map((item, index) => (
            <AppointmentSection docItem={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
