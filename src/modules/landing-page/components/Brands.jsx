import React from 'react';
// import data
import { brands } from '../../../assets/data/landing-page/data';

const Brands = () => {
  // destructure overview
  const { id, logos } = brands;
  return (
    <section id={id} className='py-10 bg-slate-200'>
      <div className='container mx-auto flex flex-col lg:flex-row items-center justify-between space-y-6'>
        {/* logos */}
        {logos.map((item, index) => {
          // destructure item
          const { image, delay } = item;
          return (
            <div key={index} data-aos='fade-up' data-aos-delay={delay}>
              {/* brand img */}
              <img src={image} alt='' />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Brands;
