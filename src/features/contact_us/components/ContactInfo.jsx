import { MapPin, Phone, Mail } from "lucide-react";

const contactItems = [
  {
    icon: <MapPin size={20} />,
    title: "Visit Us",
    lines: ["123 Luxury Avenue", "Beverly Hills, CA 90210"],
  },
  {
    icon: <Phone size={20} />,
    title: "Call Us",
    lines: ["+1 (555) 123-4567", "Mon-Fri 9am-6pm PST"],
  },
  {
    icon: <Mail size={20} />,
    title: "Email Us",
    lines: ["info@luxeestate.com", "support@luxeestate.com"],
  },
];

const officeHours = [
  ["Monday - Friday", "9:00 AM - 6:00 PM"],
  ["Saturday", "10:00 AM - 4:00 PM"],
  ["Sunday", "By Appointment"],
];

export default function ContactInfo() {
  return (
    <div className="min-w-[280px] flex-1">
      <h2 className="mb-4 text-3xl font-bold text-[#1a1a1a] dark:text-white">
        Get In Touch
      </h2>
      <p className="mb-8 leading-7 text-gray-500 dark:text-slate-400">
        Whether you're looking to buy, sell, or simply explore the luxury real
        estate market, our team is here to help. Reach out to us today.
      </p>

      {contactItems.map((item) => (
        <div
          key={item.title}
          className="mb-6 flex items-start gap-4 text-slate-700 dark:text-slate-300"
        >
          <div className="rounded-xl bg-slate-200 p-3 text-[#1a2d3d] dark:bg-slate-800 dark:text-cyan-300">
            {item.icon}
          </div>
          <div>
            <p className="mb-1 font-bold text-[#1a1a1a] dark:text-white">
              {item.title}
            </p>
            {item.lines.map((line) => (
              <p
                key={line}
                className="my-0.5 text-sm text-gray-500 dark:text-slate-400"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8 rounded-xl bg-slate-100 p-6 dark:bg-slate-900">
        <h3 className="mb-4 font-bold text-[#1a1a1a] dark:text-white">
          Office Hours
        </h3>
        {officeHours.map(([day, hours]) => (
          <div
            key={day}
            className="mb-2.5 flex justify-between text-sm text-gray-600 dark:text-slate-400"
          >
            <span>{day}</span>
            <span>{hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
