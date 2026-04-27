import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;

    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) tempErrors.email = "Invalid email format";

    if (!formData.phone.trim()) tempErrors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone)) tempErrors.phone = "Invalid phone number";

    if (!formData.subject) tempErrors.subject = "Subject is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    if (validate()) {
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    }
  };

  const inputStyle = { width: "100%", padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: "8px", boxSizing: "border-box" };
  const labelStyle = { display: "block", fontSize: "0.9rem", fontWeight: "500", marginBottom: "8px", color: "#1a1a1a" };
  const errorStyle = { color: "red", fontSize: "0.8rem" };

  return (
    <div style={{ flex: 1, minWidth: "280px", backgroundColor: "white", borderRadius: "16px", padding: "40px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "28px", color: "#1a1a1a" }}>
        Send Us a Message
      </h2>

      {success && (
        <div style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "10px", borderRadius: "8px", marginBottom: "15px", fontSize: "0.9rem" }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Your Name</label>
          <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} style={inputStyle} />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Email Address</label>
          <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} style={inputStyle} />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Phone Number</label>
          <input type="tel" name="phone" placeholder="+1 (555) 123-4567" value={formData.phone} onChange={handleChange} style={inputStyle} />
          {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Subject</label>
          <select name="subject" value={formData.subject} onChange={handleChange} style={{ ...inputStyle, backgroundColor: "white" }}>
            <option value="">Select a subject</option>
            <option value="buy">Buy a Property</option>
            <option value="sell">Sell a Property</option>
            <option value="rent">Rent a Property</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && <p style={errorStyle}>{errors.subject}</p>}
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label style={labelStyle}>Message</label>
          <textarea name="message" placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange} rows={5} style={inputStyle} />
          {errors.message && <p style={errorStyle}>{errors.message}</p>}
        </div>

        <button type="submit" style={{ width: "100%", padding: "14px", backgroundColor: "#1a2d3d", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <Send size={18} /> Send Message
        </button>
      </form>
    </div>
  );
}