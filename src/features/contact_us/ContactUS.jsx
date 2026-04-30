import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import MapPlaceholder from "./components/MapPlaceholder";
import Footer from "../../components/Footer";

export default function ContactUS() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#f5f4f0" }}>
      <ContactHero />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px", display: "flex", gap: "60px", flexWrap: "wrap" }}>
        <ContactInfo />
        <ContactForm />
      </div>
      <MapPlaceholder />
      <Footer />
    </div>
  );
}