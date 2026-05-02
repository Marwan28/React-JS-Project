
import HeroSection from "./components/HeroSection";
import HomeFeaturesList from "./components/HomeFeaturesList";
import ReadyToFindHome from "./components/ReadyToFindHome";
import FeaturedPropertyList from "./components/FeaturedPropertyList";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HomeFeaturesList />
      <FeaturedPropertyList />
      <ReadyToFindHome />
    </>
  );
}
