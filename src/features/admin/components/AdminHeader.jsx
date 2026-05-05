import React from 'react';
import { User, Bell } from 'lucide-react';
import ThemeToggle from '../../../components/header/ThemeToggle';

const AdminHeader = ({ theme, onToggleTheme, adminName = "Admin User", adminEmail = "admin@luxeestate.com" }) => {
    return (
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-end px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">

                <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <ThemeToggle theme={theme} onToggle={onToggleTheme} />

                <div className="h-8 w-\[1px\] bg-gray-100 mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-[#1e293b] leading-none">{adminName}</p>
                        <p className="text-[11px] text-gray-400 mt-1.5 lowercase font-medium">{adminEmail}</p>
                    </div>

                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 border border-gray-50 shadow-sm">
                        <User size={20} />
                    </div>
                </div>

            </div>
        </header>
    );
};

export default AdminHeader;