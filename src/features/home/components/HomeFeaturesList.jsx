
import { Home, TrendingUp, MapPin } from "lucide-react";

const cards = [
  {
    icon: <Home className="w-8 h-8 text-[#183D4B]" />,
    title: "Premium Properties",
    desc: "Curated selection of the finest luxury estates worldwide",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-[#183D4B]" />,
    title: "Expert Guidance",
    desc: "Professional support throughout your property journey",
  },
  {
    icon: <MapPin className="w-8 h-8 text-[#183D4B]" />,
    title: "Prime Locations",
    desc: "Properties in the world's most sought-after destinations",
  },
];

export default function HomeFeaturesList() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 py-8 px-2 md:px-0">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center shadow-sm transition hover:shadow-md w-full max-w-md mx-auto"
        >
          <div className="bg-gray-100 rounded-full p-4 mb-4 flex items-center justify-center">
            {card.icon}
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-center">
            {card.title}
          </h3>
          <p className="text-gray-600 text-center">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}
