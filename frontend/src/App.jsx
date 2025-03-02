import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CoverPage from './components/CoverPage';
import SignUp from './pages/SignUp';
import { AppContext } from './context/AppContext';

const PrivateRoute = ({ element }) => {
  const { token } = useContext(AppContext);
  return token ? element : <Navigate to='/' />; // If token exists, show the element, else redirect to CoverPage
};

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<CoverPage />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route
          path='/doctors'
          element={<PrivateRoute element={<Doctors />} />}
        />
        <Route
          path='/doctors/:speciality'
          element={<PrivateRoute element={<Doctors />} />}
        />
        <Route
          path='/my-profile'
          element={<PrivateRoute element={<MyProfile />} />}
        />
        <Route
          path='/my-appointments'
          element={<PrivateRoute element={<MyAppointments />} />}
        />
        <Route
          path='/appointment/:docId'
          element={<PrivateRoute element={<Appointment />} />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/about' element={<PrivateRoute element={<About />} />} />
        <Route
          path='/contact'
          element={<PrivateRoute element={<Contact />} />}
        />
      </Routes>
    </div>
  );
};

export default App;
//14:33:00
