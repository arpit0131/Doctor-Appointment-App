import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import AppointmentSection from './AppointmentSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
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
  }, [token]);

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
              appointments.map((item, index) => (
                <AppointmentSection
                  key={index}
                  docItem={item}
                  index={index}
                  userAppointment={getUserAppointments}
                />
              ))
            ) : (
              <p className='ml-[36%] mt-24 text-3xl h-[26vh] text-red-500'>
                No Appointments booked till now...
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAppointments;
