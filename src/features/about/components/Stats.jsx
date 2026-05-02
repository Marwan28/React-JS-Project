import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FiUsers, FiAward, FiTrendingUp } from "react-icons/fi";

const statsData = [
  { id: 1, icon: HiOutlineOfficeBuilding, number: "2,500+", label: "Properties Sold" },
  { id: 2, icon: FiUsers, number: "5,000+", label: "Happy Clients" },
  { id: 3, icon: FiAward, number: "50+", label: "Industry Awards" },
  { id: 4, icon: FiTrendingUp, number: "$15B+", label: "Total Sales Volume" },
];

function Stats() {
  return (
    <section className="py-10 px-6 bg-gray-50 transition-colors dark:bg-slate-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 s mb-8">
        {statsData.map((item) => {
          const Icon = item.icon;

          return (
          <div key={item.id} className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-[#f0f4f8] p-4 rounded-full mb-6 dark:bg-slate-800">
              <Icon className="text-3xl text-[#1a364b] dark:text-cyan-300" />
            </div>
            <h3 className="text-3xl font-bold text-black dark:text-white mb-2">{item.number}</h3>
            <p className="text-gray-500 font-medium">{item.label}</p>
          </div>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;
