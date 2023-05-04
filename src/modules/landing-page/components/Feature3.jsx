import React from 'react';
// import data
import { features } from '../../../assets/data/landing-page/data';

const Feature3 = () => {
  // destructure features
  const { feature3 } = features;
  // destructure feature3
  const { id, pretitle, title, subtitle, btnLink, btnIcon, image } = feature3;
  return (
    <section id={id} className='section py-10'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:gap-x-[30px]'>
          {/* text */}
          <div className='flex-1' data-aos='fade-right' data-aos-offset='400'>
            <div className='pretitle'>{pretitle}</div>
            <h2 className='title text-orange-700'>{title}</h2>
            <p className='lead'>{subtitle}</p>
            <button className='btn-link flex items-center gap-x-3 hover:gap-x-5 transition-all'>
              {btnLink} <img src={btnIcon} alt='' />
            </button>
          </div>
          {/* image */}
          <div className='flex-1' data-aos='fade-left' data-aos-offset='300'>
            <img src={image} alt='' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature3;
