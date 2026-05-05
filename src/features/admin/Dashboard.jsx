import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LayoutGrid, Users, Settings, ArrowUpRight, Loader2 } from "lucide-react";
import supabaseApi from '../../config/supabaseApi';
import AdminSidebar from '../admin/components/AdminSidebar';
import AdminHeader from '../admin/components/AdminHeader';
import { useTheme } from "../../theme/useTheme";
import { useSelector } from "react-redux";
import StatCard from './components/StatCard';
import QuickActionCard from './components/QuickActionCard';
import RecentPropertyItem from './components/RecentPropertyItem';

const Dashboard = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const user = useSelector((state) => state.auth.user);
    const [recentProperties, setRecentProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const data = await supabaseApi.get('properties');
                if (data) {
                    const sorted = data.sort((a, b) => b.id - a.id).slice(0, 3);
                    setRecentProperties(sorted);
                }
            } catch (error) { console.error(error); }
            finally { setLoading(false); }
        };
        fetchRecent();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#f8f9fa]">
            <AdminSidebar />
            <div className="flex-1 ml-64">
                <AdminHeader theme={theme} onToggleTheme={toggleTheme} adminName={user?.name || "Admin User"} />

                <main className="p-8 max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard</h1>
                        <button onClick={() => navigate('/admin/add-property')} className="bg-[#1e293b] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all">
                            <Plus size={18} /> Add Property
                        </button>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <StatCard title="Total Properties" value="10" change="+12%" color="bg-gray-100" />
                        <StatCard title="Active Users" value="2,847" change="+8%" color="bg-blue-50" />
                        <StatCard title="Total Favorites" value="1,293" change="+15%" color="bg-red-50" />
                        <StatCard title="New Listings" value="23" change="+18%" color="bg-purple-50" />
                    </div>

                    <h2 className="text-lg font-black text-slate-800 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <QuickActionCard title="Add New Property" desc="Create a new listing" icon={Plus} onClick={() => navigate('/admin/add-property')} />
                        <QuickActionCard title="Manage Properties" desc="View & edit listings" icon={LayoutGrid} onClick={() => navigate('/admin/properties')} />
                        <QuickActionCard title="View Users" desc="Manage user accounts" icon={Users} disabled />
                        <QuickActionCard title="Settings" icon={Settings} disabled />
                    </div>


                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-black text-slate-800">Recent Properties</h2>
                        <button onClick={() => navigate('/admin/properties')} className="text-xs font-black text-gray-400 flex items-center gap-1 hover:text-blue-600">
                            View all <ArrowUpRight size={14} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {loading ? <Loader2 className="animate-spin mx-auto text-gray-300" /> :
                            recentProperties.map(prop => <RecentPropertyItem key={prop.id} property={prop} />)
                        }
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;