import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const AppointmentSection = ({ docItem, index, userAppointment }) => {
  const { backendUrl, token, getAllDoctors } = useContext(AppContext);

  const cancelAppointment = async (appointmentId) => {
    console.log('Token:- ', token);
    console.log('Appointment id:- ', appointmentId);

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        userAppointment();
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log('Error:- ', error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
        key={index}
      >
        <div>
          <img
            className='w-40 bg-indigo-50'
            src={docItem.docData.image}
            alt='doctor image'
          />
        </div>
        <div className='flex-1'>
          <p className='text-gray-800 text-lg font-semibold'>
            {docItem.docData.name}
          </p>
          <p className='text-neutral-700 text-sm'>
            {docItem.docData.speciality}
          </p>
          <p className='font-semibold text-gray-600 mt-2'>Address:</p>
          <p className='text-sm text-gray-600 my-2'>
            {docItem.docData.address.line1}
            <br />
            {docItem.docData.address.line2}
          </p>
          <p className='text-sm'>
            <span className='font-semibold text-gray-600 mr-1'>
              Date & Time:
            </span>
            <span>
              {docItem.slotDate.replace(/_/g, '/')} | {docItem.slotTime}
            </span>
          </p>
        </div>
        <div className=''></div>
        <div className=' flex flex-col justify-end gap-2'>
          {!docItem.cancelled && (
            <button className='bg-primary px-9 py-1.5 text-white rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-150'>
              Pay Online
            </button>
          )}
          {!docItem.cancelled && (
            <button
              onClick={() => cancelAppointment(docItem._id)}
              className='bg-white px-9 py-1.5 text-stone-500 border border-stone-500 rounded-md hover:bg-red-500 hover:text-white hover:border-none hover:scale-105 transition-all duration-150'
            >
              Cancel Appointment
            </button>
          )}

          {docItem.cancelled && (
            <button className='text-red-500 px-9 py-1.5 bg-white border border-red-500 rounded-md '>
              Appointment Cancelled
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentSection;
