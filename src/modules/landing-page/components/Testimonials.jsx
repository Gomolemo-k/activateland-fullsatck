import React from 'react';
// import data
import { testimonials } from '../../../assets/data/landing-page/data';
// import components
import ClientSlider from './ClientSlider';

const Testimonials = () => {
  // destructure testimonials
  const { id, title, clients } = testimonials;
  return (
    <section id={id} className='section py-10 bg-gradient-to-r from-green-800 to-green-400'>
      <div className='container mx-auto py-10'>
        {/* title */}
        <h2
          className='title mb-10 lg:mb-20 max-w-[920px] mx-auto strong text-center text-2xl text-white'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          {title}
        </h2>
        {/* slider */}
        <div data-aos='fade-up' data-aos-delay='400'>
          <ClientSlider clients={clients} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
