import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { specialityData } from '../assets/assets_frontend/assets';
import TopDoctor from '../components/TopDoctor';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const specialitySet = specialityData.map((doc) => doc.speciality);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className='mt-24'>
      <p className='text-gray-600'>Browse through the doctors specialist...</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          {specialitySet.map((speciality, idx) => (
            <p
              className={`w-[94vw] sm:w-auto pl-3 py-3 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-200`}
              onClick={() =>
                speciality === ''
                  ? navigate('/doctors')
                  : navigate(`/doctors/${speciality}`)
              }
              key={idx}
            >
              {speciality}
            </p>
          ))}
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, idx) => {
            return (
              <TopDoctor
                itemId={item._id}
                Index={idx}
                docImage={item.image}
                docName={item.name}
                speciality={item.speciality}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
