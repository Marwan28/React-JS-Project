import aboutpage from '../../../assets/about page.png';

function OurStory() {
  return (
    <section className='bg-white px-4 py-8 transition-colors dark:bg-slate-950 sm:px-6 md:px-12 lg:px-24'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12'>
        
      
        <div>
          <h2 className='mb-6 text-3xl font-bold text-[#1a1a1a] dark:text-white sm:text-4xl lg:mb-8'>
            Our Story
          </h2>

          <div className="space-y-5 text-base leading-relaxed text-gray-600 dark:text-slate-400 sm:text-lg lg:space-y-6">
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
            className="h-[280px] w-full rounded-2xl object-cover shadow-lg sm:h-[400px] md:h-[500px] lg:rounded-3xl"
          />
        </div>

      </div>
    </section>
  );
}

export default OurStory;
