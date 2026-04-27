import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactInfo() {
  return (
    <div style={{ flex: 1, minWidth: "280px" }}>
      <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "16px", color: "#1a1a1a" }}>
        Get In Touch
      </h2>
      <p style={{ color: "#6b7280", lineHeight: "1.7", marginBottom: "32px" }}>
        Whether you're looking to buy, sell, or simply explore the luxury real estate market, our team is here to help. Reach out to us today.
      </p>

      {[
        { icon: <MapPin size={20} />, title: "Visit Us", lines: ["123 Luxury Avenue", "Beverly Hills, CA 90210"] },
        { icon: <Phone size={20} />, title: "Call Us", lines: ["+1 (555) 123-4567", "Mon-Fri 9am-6pm PST"] },
        { icon: <Mail size={20} />, title: "Email Us", lines: ["info@luxeestate.com", "support@luxeestate.com"] },
      ].map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#d1d5d8", borderRadius: "10px", padding: "12px", color: "#1a2d3d" }}>
            {item.icon}
          </div>
          <div>
            <p style={{ fontWeight: "bold", color: "#1a1a1a", marginBottom: "4px" }}>{item.title}</p>
            {item.lines.map((line, j) => (
              <p key={j} style={{ color: "#6b7280", fontSize: "0.9rem", margin: "2px 0" }}>{line}</p>
            ))}
          </div>
        </div>
      ))}

      <div style={{ backgroundColor: "#eef0f2", borderRadius: "12px", padding: "24px", marginTop: "32px" }}>
        <h3 style={{ fontWeight: "bold", marginBottom: "16px", color: "#1a1a1a" }}>Office Hours</h3>
        {[
          ["Monday - Friday", "9:00 AM - 6:00 PM"],
          ["Saturday", "10:00 AM - 4:00 PM"],
          ["Sunday", "By Appointment"],
        ].map(([day, hours], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.9rem" }}>
            <span style={{ color: "#4b5563" }}>{day}</span>
            <span style={{ color: "#4b5563" }}>{hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
}