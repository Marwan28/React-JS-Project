import AboutHero from "./components/AboutHero";
import OurStory from "./components/OurStory";
import Stats from "./components/Stats";
import OurMission from "./components/OurMission";
import OurValues from "./components/OurValues";

function About() {
  return (
    <div className="bg-[#f5f4f0] font-sans transition-colors dark:bg-slate-950">
      <AboutHero />
      <OurStory />
      <Stats />
      <OurMission />
      <OurValues />
    </div>
  );
}

export default About;
