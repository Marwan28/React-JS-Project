import React from 'react';

const StatCard = ({ title, value, change, color }) => (
    <div className={`${color} p-10 rounded-[2.5rem] border border-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-default}`}>
        <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</p>
        <h3 className="text-4xl font-black text-slate-800 my-3">{value}</h3>
        <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-green-600 bg-white/50 px-2 py-0.5 rounded-lg">{change}</span>
            <span className="text-gray-400 font-medium text-[11px]">vs last month</span>
        </div>
    </div>
);

export default StatCard;