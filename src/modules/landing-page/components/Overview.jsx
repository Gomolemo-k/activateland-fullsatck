import React from 'react';
// import data
import { overview } from '../../../assets/data/landing-page/data';

const Overview = () => {
  // destructure overview data
  const { id, productImg } = overview;
  return (
    <section id={id} className='lg:min-h-[712px] bg-cover bg-left-top pt-[30px] lg:pt-[87px] bg-gradient-to-r from-orange-600 to-orange-200'>
      <div className='container mx-auto flex justify-end overflow-hidden'>
        <img src={productImg} alt='' data-aos='fade-up' data-aos-offset='300' />
      </div>
    </section>
  );
};

export default Overview;
