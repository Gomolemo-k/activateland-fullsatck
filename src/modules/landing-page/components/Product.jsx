import React from 'react';
// import data
import { product } from '../../../assets/data/landing-page/data';
// import components
import Cards from './Cards';

const Product = () => {
  // destructure product data
  const { id, title, subtitle } = product;
  return (
    <section id={id} className='section py-10'>
      <div className='container mx-auto py-10'>
        {/* title */}
        <h2
          className='title mb-10 lg:mb-20 max-w-[920px] mx-auto strong text-center text-2xl text-orange-600'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          {title}
        </h2>
        <div data-aos='fade-up' data-aos-delay='400'>
          <Cards />
        </div>
      </div>
    </section>
  );
};

export default Product;
