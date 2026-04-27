import { MapPin, Phone, Mail } from "lucide-react";

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37a4 4 0 1 1-7.75 1.27 4 4 0 0 1 7.75-1.27z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.63 0-4.6 2.45-4 5A12.94 12.94 0 0 1 1.64 1s-4 9 5 13a13.07 13.07 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  return (
    <div style={{ borderTop: "1px solid #e5e7eb", backgroundColor: "white", padding: "60px 20px 30px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "space-between" }}>

        <div style={{ minWidth: "200px", maxWidth: "260px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ backgroundColor: "#1a2d3d", color: "white", borderRadius: "8px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>L</div>
            <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>LuxeEstate</span>
          </div>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "20px" }}>
            Your premium destination for luxury real estate. Find your dream property with our curated collection of high-end homes.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {[FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon].map((Icon, i) => (
              <div key={i} style={{ width: "36px", height: "36px", border: "1px solid #e5e7eb", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6b7280" }}>
                <Icon />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontWeight: "bold", marginBottom: "16px" }}>Quick Links</h4>
          {["Home", "Browse Listings", "About Us", "Contact"].map((link, i) => (
            <p key={i} style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "10px", cursor: "pointer" }}>{link}</p>
          ))}
        </div>

        <div>
          <h4 style={{ fontWeight: "bold", marginBottom: "16px" }}>Property Types</h4>
          {["Luxury Villas", "Modern Apartments", "Family Houses", "Penthouses"].map((type, i) => (
            <p key={i} style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "10px", cursor: "pointer" }}>{type}</p>
          ))}
        </div>

        <div>
          <h4 style={{ fontWeight: "bold", marginBottom: "16px" }}>Contact Info</h4>
          {[
            { icon: <MapPin size={16} />, text: "123 Luxury Avenue, Beverly Hills, CA 90210" },
            { icon: <Phone size={16} />, text: "+1 (555) 123-4567" },
            { icon: <Mail size={16} />, text: "info@luxeestate.com" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "flex-start" }}>
              {item.icon}
              <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "40px auto 0", borderTop: "1px solid #e5e7eb", paddingTop: "24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>© 2026 LuxeEstate. All rights reserved.</p>
        <div style={{ display: "flex", gap: "20px" }}>
          <span style={{ color: "#9ca3af", fontSize: "0.85rem", cursor: "pointer" }}>Privacy Policy</span>
          <span style={{ color: "#9ca3af", fontSize: "0.85rem", cursor: "pointer" }}>Terms of Service</span>
        </div>
      </div>
    </div>
  );
}