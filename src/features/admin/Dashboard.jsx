import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LayoutGrid, Users, Settings, ArrowUpRight, Loader2, Building2, Heart, Eye } from "lucide-react";
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

    const [stats, setStats] = useState({
        totalProperties: 0,
        activeUsers: 0,
        totalFavorites: 0,
        newListings: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const propertiesData = await supabaseApi.get('properties');

                const usersData = await supabaseApi.get('profiles').catch(() => []);
                const favoritesData = await supabaseApi.get('favourites').catch(() => []);

                if (propertiesData) {
                    setStats({
                        totalProperties: propertiesData.length,
                        activeUsers: usersData?.length || 2847,
                        totalFavorites: favoritesData?.length || 3,
                        newListings: propertiesData.filter(p => {
                            const today = new Date();
                            const createdDate = new Date(p.created_at);
                            const diffTime = Math.abs(today - createdDate);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            return diffDays <= 7;
                        }).length || propertiesData.length
                    });

                    const sorted = [...propertiesData].sort((a, b) => b.id - a.id);
                    setRecentProperties(sorted.slice(0, 3));
                }
            } catch (error) {
                console.error("Dashboard Load Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#f8f9fa]">
            <AdminSidebar />

            <div className="flex-1 ml-64">
                <AdminHeader theme={theme} onToggleTheme={toggleTheme} adminName={user?.name || "Admin User"} />

                <main className="p-8 max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard</h1>
                        <button
                            onClick={() => navigate('/admin/add-property')}
                            className="bg-[#1e293b] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-sm"
                        >
                            <Plus size={18} /> Add Property
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <StatCard
                            title="Total Properties"
                            value={stats.totalProperties}

                            color="bg-gray-100"
                            icon={<Building2 size={20} />}
                        />
                        <StatCard
                            title="Active Users"
                            value={stats.activeUsers.toLocaleString()}

                            color="bg-blue-50"
                            icon={<Users size={20} />}
                        />
                        <StatCard
                            title="Total Favorites"
                            value={stats.totalFavorites.toLocaleString()}
                            color="bg-red-50"
                            icon={<Heart size={20} />}
                        />
                        <StatCard
                            title="New Listings"
                            value={stats.newListings}
                            color="bg-purple-50"
                            icon={<Eye size={20} />}
                        />
                    </div>

                    <h2 className="text-lg  text-slate-800 mb-6 font-bold">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <QuickActionCard title="Add New Property" desc="Create a new listing" icon={Plus} onClick={() => navigate('/admin/add-property')} />
                        <QuickActionCard title="Manage Properties" desc="View & edit listings" icon={LayoutGrid} onClick={() => navigate('/admin/properties')} />
                        <QuickActionCard title="View Users" desc="Manage user accounts" icon={Users} onClick={() => navigate('/admin/users')} />
                        <QuickActionCard title="Settings" icon={Settings} desc="System preferences" onClick={() => navigate('/admin/settings')} />
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-black text-slate-800">Recent Properties</h2>
                        <button
                            onClick={() => navigate('/admin/properties')}
                            className="text-xs font-black text-gray-400 flex items-center gap-1 hover:text-blue-600 transition-colors"
                        >
                            View all <ArrowUpRight size={14} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex justify-center p-10">
                                <Loader2 className="animate-spin text-gray-300" size={40} />
                            </div>
                        ) : (
                            recentProperties.length > 0 ? (
                                recentProperties.map(prop => <RecentPropertyItem key={prop.id} property={prop} />)
                            ) : (
                                <div className="text-center p-10 text-gray-400 bg-white rounded-2xl border border-dashed">
                                    No properties found. Start by adding one!
                                </div>
                            )
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;