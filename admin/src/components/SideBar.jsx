import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const adminSideBar = [
    {
      navigateTo: '/admin-dashboard',
      image: assets.home_icon,
      title: 'Dashboard',
    },
    {
      navigateTo: '/all-appointments',
      image: assets.appointment_icon,
      title: 'Appointment',
    },
    {
      navigateTo: '/add-doctor',
      image: assets.add_icon,
      title: 'Add Doctor',
    },
    {
      navigateTo: '/doctor-list',
      image: assets.people_icon,
      title: 'Doctor List',
    },
  ];

  const doctorSideBar = [
    {
      navigateTo: '/doctor-dashboard',
      image: assets.home_icon,
      title: 'Dashboard',
    },
    {
      navigateTo: '/doctor-appointments',
      image: assets.appointment_icon,
      title: 'Appointments',
    },
    {
      navigateTo: '/doctor-profile',
      image: assets.people_icon,
      title: 'Profile',
    },
  ];
  return (
    <div className='h-[150vh] bg-white border-r'>
      {aToken && (
        <ul className='text-[#515151] mt-5'>
          {adminSideBar.map((item) => {
            return (
              <NavLink
                key={item.title}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                    isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                  }`
                }
                to={item.navigateTo}
              >
                <img src={item.image} />
                <p className='hidden md:block'>{item.title}</p>
              </NavLink>
            );
          })}
        </ul>
      )}

      {dToken && (
        <ul className='text-[#515151] mt-5'>
          {doctorSideBar.map((item) => {
            return (
              <NavLink
                key={item.title}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                    isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                  }`
                }
                to={item.navigateTo}
              >
                <img src={item.image} />
                <p className='hidden md:block'>{item.title}</p>
              </NavLink>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SideBar;
