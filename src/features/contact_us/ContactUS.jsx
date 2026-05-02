import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import MapPlaceholder from "./components/MapPlaceholder";
import Footer from "../../components/Footer";

export default function ContactUS() {
  return (
    <div className="bg-[#f5f4f0] font-sans transition-colors dark:bg-slate-950">
      <ContactHero />
      <div className="mx-auto flex max-w-7xl flex-wrap gap-[60px] px-5 py-[60px]">
        <ContactInfo />
        <ContactForm />
      </div>
      <MapPlaceholder />
      <Footer />
    </div>
  );
}
