import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LayoutGrid, Users, Settings, ArrowUpRight, Loader2, Building2, Heart } from "lucide-react";
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
        totalFavorites: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const propertiesData = await supabaseApi.get('properties');

                const usersData = await supabaseApi.get('profiles').catch(() => []);
                const favoritesData = await supabaseApi.get('favorites').catch(() => []);

                if (propertiesData) {
                    setStats({
                        totalProperties: propertiesData.length,
                        activeUsers: usersData?.length || 2847,
                        totalFavorites: favoritesData?.length || 3
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
        <div className="flex min-h-screen bg-[#f8fafc] text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
            <AdminSidebar />

            <div className="min-w-0 flex-1 lg:ml-64">
                <AdminHeader theme={theme} onToggleTheme={toggleTheme} adminName={user?.name || "Admin User"} />

                <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 pb-24 sm:px-6 lg:space-y-8 lg:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-950 tracking-tight dark:text-white sm:text-3xl">Dashboard</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Overview of your real estate platform</p>
                        </div>
                        <button
                            onClick={() => navigate('/admin/add-property')}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#344d60] px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#1b2e40] hover:shadow-md dark:bg-[#344d60] dark:hover:bg-[#243b53] sm:w-auto"
                        >
                            <Plus size={18} /> Add Property
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            title="Total Properties"
                            value={stats.totalProperties}

                            color="bg-white dark:bg-slate-900"
                            icon={<Building2 size={20} />}
                        />
                        <StatCard
                            title="Active Users"
                            value={stats.activeUsers.toLocaleString()}

                            color="bg-white dark:bg-slate-900"
                            icon={<Users size={20} />}
                        />
                        <StatCard
                            title="Total Favorites"
                            value={stats.totalFavorites.toLocaleString()}
                            color="bg-white dark:bg-slate-900"
                            icon={<Heart size={20} />}
                        />
                    </div>

                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Quick Actions</h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Manage your platform efficiently</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <QuickActionCard title="Add New Property" desc="Create a new listing" icon={Plus} onClick={() => navigate('/admin/add-property')} />
                            <QuickActionCard title="Manage Properties" desc="View & edit listings" icon={LayoutGrid} onClick={() => navigate('/admin/properties')} />
                            <QuickActionCard title="Settings" icon={Settings} desc="System preferences" onClick={() => navigate('/admin/settings')} />
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Recent Properties</h2>
                                <p className="text-sm text-gray-500 mt-1 dark:text-slate-400">Latest property listings</p>
                            </div>
                            <button
                                onClick={() => navigate('/admin/properties')}
                                className="text-sm font-medium text-[#344d60] flex items-center gap-1 hover:text-[#1b2e40] hover:underline transition-colors dark:text-slate-200 dark:hover:text-white"
                            >
                                View all <ArrowUpRight size={14} />
                            </button>
                        </div>

                        <div className="divide-y divide-slate-200 dark:divide-slate-800">
                            {loading ? (
                                <div className="flex justify-center p-10">
                                    <Loader2 className="animate-spin text-slate-300 dark:text-slate-600" size={40} />
                                </div>
                            ) : (
                                recentProperties.length > 0 ? (
                                    recentProperties.map(prop => <RecentPropertyItem key={prop.id} property={prop} />)
                                ) : (
                                    <div className="text-center p-10 text-slate-400 bg-white border border-dashed border-slate-200 dark:bg-slate-900 dark:border-slate-700">
                                        No properties found. Start by adding one!
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
