import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/**-------Left--------- */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt='prescripto-logo' />
          <p className='w-full md:w-2/3 text-gray-600 leading-6 text-justify'>
            We offer comprehensive medical care with all types of medicines
            readily available. Our team of highly qualified doctors and
            experienced staff is dedicated to providing personalized treatment.
            Equipped with advanced facilities, we ensure accurate diagnostics
            and effective care. Visit us for a healthier, happier you!
          </p>
        </div>
        {/**-------Middle--------- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        {/**-------Right--------- */}
        <div className='md:text-end'>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 9867489276</li>
            <li>abc@gmail.com</li>
          </ul>
        </div>
      </div>

      {/**------Copyright--------- */}
      <div>
        <hr />
        <p className='text-sm text-center py-5'>
          Copyright 2024@ Prescripto -All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
