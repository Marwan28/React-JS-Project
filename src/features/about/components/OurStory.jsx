import React from 'react';
import aboutpage from '../../../assets/about page.png';

function OurStory() {
  return (
    <section className='py-6 px-6 md:px-12 lg:px-24 bg-white'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        
      
        <div>
          <h2 className='text-4xl font-bold text-[#1a1a1a]  mb-8'>
            Our Story
          </h2>

          <div className="space-y-6 text-gray-600 text-lg leading-relaxed ">
            <p>
              Founded in 1995, LuxeEstate has been at the forefront of luxury 
              real estate, connecting discerning clients with exceptional 
              properties in the world's most prestigious locations.
            </p>
            <p>
              With over 25 years of experience, we've built a reputation for 
              excellence, integrity, and unparalleled service. Our team of expert 
              agents brings deep market knowledge and a commitment to 
              making your real estate journey seamless and successful.
            </p>
            <p>
              Today, we proudly serve clients across the United States, offering a 
              curated portfolio of luxury properties that represent the pinnacle of 
              design, craftsmanship, and location.
            </p>
          </div>
        </div>

        <div>
          <img 
            src={aboutpage} 
            alt="Luxury Modern House with Pool" 
            className="rounded-3xl shadow-lg w-full object-cover h-[400px] md:h-[500px]"
          />
        </div>

      </div>
    </section>
  );
}

export default OurStory;