import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import Loader from '../../components/Loader';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('@prescripto.com');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [loading, setLoading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);
  const resetHandler = () => {
    setDocImg(false);
    // setName('');
    // setEmail('@prescripto.com');
    // setPassword('');
    // setAddress1('');
    // setAddress2('');
    // setDegree('');
    // setAbout('');
    // setSpeciality('General physician');
    // setFees('');
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!docImg) {
      return toast.error('Please upload the doctor image');
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append(
        'address',
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.forEach((val, key) => {
        console.log(`${key}: ${val}`);
      });

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-doctor',
        formData,
        { headers: { aToken } } //here we are passing aToken where 'T' is in capital but when it pass through the api then it will be automatically converted into small leter means it will be atoken . So that's why we use 'atoken' variable not aToken in backend authAdmin middleware
      );

      if (data.success) {
        toast.success(data.message);
        resetHandler();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className=' flex flex-col items-center m-5 w-full'
        >
          <p className='mb-3  font-medium text-white bg-gradient-to-r from-blue-400 to-blue-700 shadow-lg px-6 py-4 rounded-lg border border-green-800'>
            Add Doctor
          </p>

          <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl'>
            <div className='flex flex-col items-center gap-4 mb-8 text-gray-500'>
              <label htmlFor='doc-img'>
                <img
                  className='w-24 bg-gray-100 rounded-full cursor-pointer'
                  src={
                    docImg ? URL.createObjectURL(docImg) : assets.doctor_icon
                  }
                />
              </label>
              <input
                onChange={(e) => setDocImg(e.target.files[0])}
                type='file'
                id='doc-img'
                hidden
              />
              <p>Upload Image</p>
            </div>

            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
              <div className='w-full lg:flex-1 flex flex-col gap-6 '>
                <div className='flex-1 flex flex-col gap-1'>
                  <p className='font-semibold '>Doctor name</p>
                  <input
                    className='border rounded px-3 py-2'
                    type='text'
                    placeholder='name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                  <p className='font-semibold '>Doctor email</p>
                  <input
                    className='border rounded px-3 py-2'
                    type='email'
                    placeholder='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                  <p className='font-semibold '>Doctor password</p>
                  <input
                    className='border rounded px-3 py-2'
                    type='password'
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                  <p className='font-semibold '>Experience</p>
                  <select
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                    name=''
                    id=''
                    className='border rounded px-3 py-2'
                  >
                    <option value='1 Year'>1 Year</option>
                    <option value='2 Year'>2 Year</option>
                    <option value='3 Year'>3 Year</option>
                    <option value='4 Year'>4 Year</option>
                    <option value='5 Year'>5 Year</option>
                    <option value='6 Year'>6 Year</option>
                    <option value='7 Year'>7 Year</option>
                    <option value='8 Year'>8 Year</option>
                    <option value='9 Year'>9 Year</option>
                    <option value='10 Year'>10 Year</option>
                  </select>
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                  <p className='font-semibold '>Fees</p>
                  <input
                    className='border rounded px-3 py-2'
                    type='number'
                    placeholder='fees'
                    onChange={(e) => setFees(e.target.value)}
                    value={fees}
                    required
                  />
                </div>
              </div>

              <div className='w-full lg:flex-1 flex flex-col gap-6'>
                <div className='flex-1 flex flex-col gap-1'>
                  <p className='font-semibold '>Speciality</p>
                  <select
                    onChange={(e) => setSpeciality(e.target.value)}
                    value={speciality}
                    name=''
                    id=''
                    className='border rounded px-3 py-2'
                  >
                    <option value='General physician'>General physician</option>
                    <option value='Gynecologist'>Gynecologist</option>
                    <option value='Dermatologist'>Dermatologist</option>
                    <option value='Pediatricians'>Pediatricians</option>
                    <option value='Neurologist'>Neurologist</option>
                    <option value='Gastroenterologist'>
                      Gastroenterologist
                    </option>
                  </select>
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                  <p className='font-semibold '>Education</p>
                  <input
                    className='border rounded px-3 py-2'
                    type='text'
                    placeholder='education'
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                  />
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                  <p className='font-semibold '>Address</p>
                  <input
                    className='border rounded px-3 py-2'
                    type='text'
                    placeholder='address 1'
                    onChange={(e) => setAddress1(e.target.value)}
                    value={address1}
                    required
                  />
                  <input
                    className='border rounded px-3 py-2'
                    type='text'
                    placeholder='address 2'
                    onChange={(e) => setAddress2(e.target.value)}
                    value={address2}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <p className='mt-4 mb-2 font-semibold '>About Doctor</p>
              <textarea
                className='w-full px-4 pt-2 border rounded'
                type='text'
                placeholder='About...'
                rows={5}
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                required
              />
            </div>
            <div className='flex items-center gap-5 justify-center'>
              <button
                type='submit'
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
                className='bg-primary my-6 w-[170px] font-semibold text-white text-sm px-10 py-3 rounded-full hover:scale-105 hover:bg-white hover:text-primary hover:border hover:border-primary'
              >
                Add Doctor
              </button>
              <button
                type='reset'
                onClick={() => {
                  resetHandler();
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
                className='bg-[#4BB543] my-6 w-[170px] font-semibold text-white text-sm px-10 py-3 rounded-full hover:scale-105 hover:bg-white hover:text-[#4BB543] hover:border hover:border-[#4BB543]'
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default AddDoctor;
