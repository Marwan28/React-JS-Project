import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import MapPlaceholder from "./components/MapPlaceholder";

export default function ContactUS() {
  return (
    <div className="bg-[#f5f4f0] font-sans transition-colors dark:bg-slate-950">
      <ContactHero />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:gap-12 lg:py-14">
        <ContactInfo />
        <ContactForm />
      </div>
      <MapPlaceholder />
    </div>
  );
}
