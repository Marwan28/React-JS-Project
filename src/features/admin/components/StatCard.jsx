const StatCard = ({ title, value, color }) => (
    <div className={`${color} relative overflow-hidden p-6 rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md cursor-default dark:border-slate-800`}>
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{title}</p>
        <h3 className="text-3xl font-bold text-slate-950 my-2 dark:text-white">{value}</h3>
    </div>
);

export default StatCard;
