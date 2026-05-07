import { AiFillHome } from "react-icons/ai";
import { FaChartLine } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

const cards = [
  {
    icon: <AiFillHome className="w-8 h-8 text-[#183D4B]" />,
    title: "Premium Properties",
    desc: "Curated selection of the finest luxury estates worldwide",
  },
  {
    icon: <FaChartLine className="w-8 h-8 text-[#183D4B]" />,
    title: "Expert Guidance",
    desc: "Professional support throughout your property journey",
  },
  {
    icon: <GoLocation className="w-8 h-8 text-[#183D4B]" />,
    title: "Prime Locations",
    desc: "Properties in the world's most sought-after destinations",
  },
];

export default function HomeFeaturesList() {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="mx-auto flex w-full max-w-md flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8"
        >
          <div className="bg-gray-100 rounded-full p-4 mb-4 flex items-center justify-center">
            {card.icon}
          </div>
          <h3 className="mb-2 text-center text-xl font-semibold sm:text-2xl">
            {card.title}
          </h3>
          <p className="text-gray-600 text-center">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}
