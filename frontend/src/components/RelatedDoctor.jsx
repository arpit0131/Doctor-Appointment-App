import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import TopDoctor from './TopDoctor';
import { useNavigate } from 'react-router-dom';

const RelatedDoctor = ({ docId, speciality }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);
  if (!relDoc) {
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
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relDoc.slice(0, 6).map((item, idx) => {
          return (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
            >
              <TopDoctor
                itemId={item._id}
                Index={idx}
                docImage={item.image}
                docName={item.name}
                docSpeciality={item.speciality}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedDoctor;
