import { useState } from 'react';
import {
    LayoutGrid, Building2, Settings,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    // 1. التعديل هنا: خليت الـ Properties تروح لـ /admin/properties
    const menuItems = [
        { icon: <LayoutGrid size={22} />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Building2 size={22} />, label: 'Properties', path: '/admin/properties' }, // ده المسار اللي زميلك شغال عليه
        { icon: <Settings size={22} />, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <aside
            className={`bg-[#fcfcfb] h-screen fixed top-0 flex flex-col border-r border-[#eee] shadow-sm transition-all duration-300 ease-in-out z-50 dark:bg-slate-950 dark:border-slate-800
        ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            <div className={`p-4 mb-2 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="w-9 h-9 bg-[#1A2C3C] rounded-lg shrink-0 flex items-center justify-center text-white font-bold text-xl shadow-sm dark:bg-[#243b53] dark:text-white">
                    L
                </div>
                {!isCollapsed && (
                    <span className="text-xl font-bold text-[#1A2C3C] tracking-tight dark:text-white">
                        LuxeEstate
                    </span>
                )}
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {menuItems.map((item) => {
                    // 2. بنشوف لو إحنا في الصفحة الحالية أو صفحة فرعية منها (زي الـ add-property)
                    const isActive = location.pathname === item.path ||
                        (item.path === '/admin/properties' && location.pathname === '/admin/add-property');

                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            title={isCollapsed ? item.label : ""}
                            className={`flex items-center rounded-xl transition-all duration-200 group
                ${isCollapsed ? 'justify-center p-3' : 'gap-4 px-4 py-3'}
                ${isActive
                                    ? 'text-[#1A2C3C] bg-[#e6f0f3] font-semibold shadow-sm dark:text-white dark:bg-slate-900'
                                    : 'text-gray-500 font-medium hover:bg-[#e6f0f3] hover:text-[#23404a] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                                }`}
                        >
                            <span className={`text-[15px] ${isActive ? 'text-[#1A2C3C] dark:text-white' : 'text-gray-400 group-hover:text-[#23404a] dark:text-slate-500 dark:group-hover:text-slate-100'}`}>
                                {item.icon}
                            </span>
                            {!isCollapsed && <span className="text-[15px] whitespace-nowrap">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-[#eee] space-y-1 dark:border-slate-800">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`w-full flex items-center text-gray-500 hover:bg-[#e6f0f3] hover:text-[#23404a] rounded-xl transition-all dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100
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
