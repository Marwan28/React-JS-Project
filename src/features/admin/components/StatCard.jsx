const StatCard = ({ title, value, change, color }) => (
    <div className={`${color} relative overflow-hidden p-6 rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md cursor-default dark:border-slate-800`}>
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{title}</p>
        <h3 className="text-3xl font-bold text-slate-950 my-2 dark:text-white">{value}</h3>
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-lg dark:bg-green-950/30 dark:text-green-400">{change}</span>
            <span className="text-gray-400 font-medium text-[11px] dark:text-slate-500">vs last month</span>
        </div>
    </div>
);

export default StatCard;
