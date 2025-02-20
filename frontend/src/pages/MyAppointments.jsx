import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import AppointmentSection from './AppointmentSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  console.log('My Appointments:- ', appointments);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse()); //here as a response initially we will get the recent booked appointment in bottom . So to get the recent booked appointment at top, we reverse the response
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token, appointments]);

  return (
    <>
      <Navbar />
      <div className='mt-24'>
        <div>
          <p className='pb-3 mt-12 font-medium text-zinc-500 border-b text-2xl text-center'>
            My Appointments
          </p>
          <div>
            {appointments.length > 0 ? (
              <>
                {appointments.map((item, index) => (
                  <AppointmentSection
                    key={index}
                    docItem={item}
                    index={index}
                    userAppointment={getUserAppointments}
                  />
                ))}
                <button
                  onClick={() => navigate('/doctors')}
                  className='ml-[36%] mt-20 px-20 py-4 bg-primary rounded-full text-white text-xl hover:scale-105 '
                >
                  Book More Appointment
                </button>
              </>
            ) : (
              <>
                <p className='ml-[36%] mt-24 text-3xl text-red-500'>
                  No Appointments booked till now...
                </p>
                <button
                  onClick={() => navigate('/doctors')}
                  className='ml-[36%] mt-20 px-20 py-4 bg-primary rounded-full text-white text-xl hover:scale-105 '
                >
                  Book your Appointment Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAppointments;
