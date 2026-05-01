import React from 'react';
import AboutHero from './components/AboutHero';
import OurStory from './components/OurStory';
import Stats from './components/Stats';
import OurMission from './components/OurMission';
import OurValues from './components/OurValues';
import Footer from '../../components/Footer';

function About() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#f5f4f0" }}>
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