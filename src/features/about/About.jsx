import React from 'react';
import AboutHero from './components/AboutHero';
import OurStory from './components/OurStory';
import Stats from './components/Stats';
import OurMission from './components/OurMission';
import OurValues from './components/OurValues';
import Footer from '../../components/Footer';

function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <AboutHero />
      <OurStory />
      <Stats />
      <OurMission />
      <OurValues />
       <Footer/>
     
    </div>
    
  );
}

export default About;