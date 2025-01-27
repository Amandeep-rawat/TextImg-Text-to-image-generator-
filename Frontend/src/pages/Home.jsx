import Description from '@/components/description';
import Header from '@/components/Header';
import Steps from '@/components/Steps';
import Testimonial from '@/components/Testimonial';
import React from 'react';

const Home = () => {
  return (
    <div className='homeIsHere max-w-[1500px] mx-auto   ' >
      
     <Header/>
     <Steps/>
     <Description/>
     <Testimonial/>
    </div>
  );
}

export default Home;
