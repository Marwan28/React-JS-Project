import { useState } from "react";
import { Send } from "lucide-react";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s-]{7,15}$/;

    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      tempErrors.email = "Invalid email format";

    if (!formData.phone.trim()) tempErrors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone))
      tempErrors.phone = "Invalid phone number";

    if (!formData.subject) tempErrors.subject = "Subject is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    if (validate()) {
      setSuccess("Message sent successfully!");
      setFormData(initialFormData);
      setErrors({});
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-[#1a2d3d] focus:ring-4 focus:ring-[#1a2d3d]/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-300 dark:focus:ring-cyan-300/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#1a1a1a] dark:text-slate-200";

  return (
    <div className="min-w-[280px] flex-1 rounded-2xl bg-white p-10 shadow-sm transition-colors dark:bg-slate-900 dark:shadow-black/30">
      <h2 className="mb-7 text-2xl font-bold text-[#1a1a1a] dark:text-white">
        Send Us a Message
      </h2>

      {success && (
        <div className="mb-4 rounded-lg bg-emerald-100 p-2.5 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className={labelClass}>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="mb-5">
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mb-5">
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        <div className="mb-5">
          <label className={labelClass}>Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a subject</option>
            <option value="buy">Buy a Property</option>
            <option value="sell">Sell a Property</option>
            <option value="rent">Schedule a viewing</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && (
            <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
          )}
        </div>

        <div className="mb-7">
          <label className={labelClass}>Message</label>
          <textarea
            name="message"
            placeholder="Tell us how we can help you..."
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`${inputClass} resize-none`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1a2d3d] p-3.5 text-base font-semibold text-white transition hover:bg-[#14506b] dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
        >
          <Send size={18} /> Send Message
        </button>
      </form>
    </div>
  );
}