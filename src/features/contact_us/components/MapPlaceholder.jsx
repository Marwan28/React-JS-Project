import { MapPin } from "lucide-react";

export default function MapPlaceholder() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto 60px", padding: "0 20px" }}>
      <div style={{ backgroundColor: "#eef0f2", borderRadius: "16px", height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", gap: "8px" }}>
        <MapPin size={22} /> Map Placeholder
      </div>
    </div>
  );
}