import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorList from './pages/Admin/DoctorList';
import AddDoctor from './pages/Admin/AddDoctor';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <NavBar />
      <div className='flex items-start'>
        <SideBar />
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorList />} />

          {/* Doctor Routes */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
          <Route path='/doctor-appointments' element={<DoctorAppointment />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
