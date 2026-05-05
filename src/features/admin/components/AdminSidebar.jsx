import React, { useState } from 'react';
import {
    LayoutGrid, Building2, Users, Settings,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        { icon: <LayoutGrid size={22} />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Building2 size={22} />, label: 'Properties', path: '/admin/add-property' },
        { icon: <Users size={22} />, label: 'Users', path: '/admin/users' },
        { icon: <Settings size={22} />, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <aside
            className={`bg-white h-screen  fixed top-0 flex flex-col border-r border-gray-100 shadow-sm transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            <div className={`p-4 mb-2 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="w-9 h-9 bg-[#1e293b] rounded-lg shrink-0 flex items-center justify-center text-white font-bold text-xl">
                    L
                </div>
                {!isCollapsed && (
                    <span className="text-xl font-bold text-[#1e293b] tracking-tight animate-fade-in">
                        LuxeEstate
                    </span>
                )}
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            title={isCollapsed ? item.label : ""}
                            className={`flex items-center rounded-xl font-medium transition-all duration-200 group
                ${isCollapsed ? 'justify-center p-3' : 'gap-4 px-4 py-3'}
                ${isActive
                                    ? 'bg-[#1e293b] text-white shadow-lg shadow-slate-200'
                                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                                }`}
                        >
                            <span className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                {item.icon}
                            </span>
                            {!isCollapsed && <span className="text-[15px] whitespace-nowrap">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>


            <div className="p-3 border-t border-gray-50 space-y-1">

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`w-full flex items-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-xl transition-all
            ${isCollapsed ? 'justify-center p-3' : 'gap-4 px-4 py-3'}`}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    {!isCollapsed && <span className="text-[15px]">Collapse</span>}
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;