import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Footer />
      {/* <Banner /> */}
    </div>
  );
};

export default Home;
