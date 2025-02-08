import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : false
  );
  const [userData, setUserData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list');
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserProfile();
    } else {
      setUserData(false);
    }
  }, [token]);

  useEffect(() => {
    getAllDoctors();
  }, []);

  const value = {
    doctors,
    getAllDoctors,
    userData,
    setUserData,
    getUserProfile,
    token,
    setToken,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
