import React from 'react';
// import data
import { cta } from '../../../assets/data/landing-page/data';
// import icons
import { HiOutlineChevronDown } from 'react-icons/hi';

const Cta = () => {
  // destructure cta data
  const { title, subtitle, btnText, img1, img2 } = cta;
  return (
    <section className='section bg-cover bg-left-top bg-gradient-to-r from-purple-500 to-pink-500 py-10'>
      <div className='max-w-[1340px] mx-auto px-[25px]'>
        {/* text */}
        <div className='max-w-[920px] mx-auto text-center'>
          <h2
            className='h2 mb-6 text-center text-2xl text-white'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            {title}
          </h2>
          <p
            className='text-2xl lg:text-4xl text-white'
            data-aos='fade-up'
            data-aos-delay='300'
          >
            {subtitle}
          </p>
        </div>
        {/* btn & images */}
        <div className='flex justify-between'>
          <img
            className='hidden xl:flex'
            src={img1}
            alt=''
            data-aos='zoom-out-right'
            data-aos-delay='700'
          />
          <button
            className='btn btn-md btn-white mt-[40px] lg:text-[22px] gap-x-[10px] mx-auto'
            data-aos='fade-up'
            data-aos-delay='400'
          >
            {btnText} <HiOutlineChevronDown />
          </button>
          <img
            className='hidden xl:flex'
            src={img2}
            alt=''
            data-aos='zoom-out-left'
            data-aos-delay='700'
          />
        </div>
      </div>
    </section>
  );
};

export default Cta;
