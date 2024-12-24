import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  useEffect(() => {
    const getDocInfo = () => {
      const doctorInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(doctorInfo || null);
    };
    getDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    const getAvailableSlots = () => {
      setDocSlots([]);

      //getting current date
      let today = new Date();
      for (let i = 0; i < 7; i++) {
        //get date with index
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        //setting end time of the date withb index
        let endTime = new Date();
        endTime.setDate(today.getDate() + i);
        endTime.setHours(21, 0, 0, 0);

        //setting hours
        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(
            currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
          );
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        let timeSlots = [];
        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          // add slots to array
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });

          //Increment current time by 30 min
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        setDocSlots((prev) => [...prev, timeSlots]);
      }
    };
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  if (!docInfo) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div className='spinner'></div>
      </div>
    );
  }

  return (
    <div className='mt-24'>
      {/* --------------------Doctor's Detail---------------------------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img
            className='bg-primary w-full sm:max-w-72 rounded-lg'
            src={docInfo.image}
            alt='Doc Image'
          />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}{' '}
            <img
              className='w-5'
              src={assets.verified_icon}
              alt='verified icon'
            />{' '}
          </p>
          <div className='flex items-center text-sm text-gray-600 gap-2'>
            <p>
              {docInfo.degree}-{docInfo.speciality}
            </p>
            <button className='px-2 py-0.5 border text-sm rounded-full'>
              {docInfo.experience}
            </button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt='info icon' />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
              {docInfo.about}
            </p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee:
            <span className='text-gray-600 ml-1'> &#8377;{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? 'bg-primary text-white'
                    : 'border border-gray-300'
                } hover:bg-gray-300`}
              >
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full hover:bg-gray-200 cursor-pointer ${
                  item.time === slotTime
                    ? 'bg-primary text-white'
                    : 'text-gray-400 border border-gray-400'
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>
          Book and Appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
