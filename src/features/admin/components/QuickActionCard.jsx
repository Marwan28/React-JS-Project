import React from 'react';

const QuickActionCard = ({ title, desc, icon: Icon, onClick }) => (
    <button
        onClick={onClick}
        className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm text-left group transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-100"
    >
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1e293b] group-hover:text-white transition-all duration-300">
            <Icon size={32} className="text-slate-600 group-hover:text-inherit transition-colors" />
        </div>
        <p className="font-black text-xl text-slate-800">{title}</p>
        <p className="text-xs text-gray-400 font-medium mt-2 leading-relaxed">{desc}</p>
    </button>
);

export default QuickActionCard;