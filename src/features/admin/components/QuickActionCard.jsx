const QuickActionCard = ({ title, desc, icon: Icon, onClick }) => (
    <button
        onClick={onClick}
        className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-left group transition-all duration-300 hover:shadow-md hover:border-[#d7e3e8] dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700"
    >
        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1A2C3C] transition-all duration-300 dark:bg-slate-800 dark:group-hover:bg-[#243b53]">
            <Icon size={28} className="text-[#1A2C3C] group-hover:text-white transition-colors dark:text-slate-200" />
        </div>
        <p className="font-semibold text-lg text-slate-950 dark:text-white">{title}</p>
        <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed dark:text-slate-400">{desc}</p>
    </button>
);

export default QuickActionCard;
