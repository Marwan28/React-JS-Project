import { useState } from 'react';
import {
    LayoutGrid, Building2, Settings,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        { icon: <LayoutGrid size={22} />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Building2 size={22} />, label: 'Properties', path: '/admin/properties' }, // ده المسار اللي زميلك شغال عليه
        { icon: <Settings size={22} />, label: 'Settings', path: '/admin/settings' },
    ];

    const renderMenuItem = (item, compact = false) => {
        const isActive = location.pathname === item.path ||
            (item.path === '/admin/dashboard' && location.pathname === '/admin') ||
            (item.path === '/admin/properties' && location.pathname === '/admin/add-property');

        return (
            <Link
                key={item.label}
                to={item.path}
                title={compact ? item.label : ""}
                className={`group flex items-center rounded-xl transition-all duration-200
                    ${compact ? 'min-w-0 flex-1 flex-col justify-center gap-1 px-2 py-2 text-center' : isCollapsed ? 'justify-center p-3' : 'gap-4 px-4 py-3'}
                    ${isActive
                        ? 'bg-[#e6f0f3] font-semibold text-[#1A2C3C] shadow-sm dark:bg-slate-900 dark:text-white'
                        : 'font-medium text-gray-500 hover:bg-[#e6f0f3] hover:text-[#23404a] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                    }`}
            >
                <span className={`${compact ? 'text-[13px]' : 'text-[15px]'} ${isActive ? 'text-[#1A2C3C] dark:text-white' : 'text-gray-400 group-hover:text-[#23404a] dark:text-slate-500 dark:group-hover:text-slate-100'}`}>
                    {item.icon}
                </span>
                {(!isCollapsed || compact) && (
                    <span className={`${compact ? 'max-w-full truncate text-[11px]' : 'whitespace-nowrap text-[15px]'}`}>
                        {item.label}
                    </span>
                )}
            </Link>
        );
    };

    return (
        <>
            <aside
                className={`fixed top-0 z-50 hidden h-screen flex-col border-r border-[#eee] bg-[#fcfcfb] shadow-sm transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950 lg:flex
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
                    {menuItems.map((item) => renderMenuItem(item))}
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

            <nav className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-gray-200 bg-[#fcfcfb]/95 px-2 py-2 shadow-[0_-8px_30px_rgb(15_23_42_/_0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
                {menuItems.map((item) => renderMenuItem(item, true))}
            </nav>
        </>
    );
};

export default AdminSidebar;
