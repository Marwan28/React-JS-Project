import AdminSidebar from '../admin/components/AdminSidebar';
import AdminHeader from '../admin/components/AdminHeader';
import PropertyForm from '../admin/components/PropertyForm';
import { useTheme } from "../../theme/useTheme";
import { useSelector } from "react-redux";

const AddProperty = () => {
    const { theme, toggleTheme } = useTheme();
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="flex min-h-screen bg-[#f8fafc] text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
            <AdminSidebar />

            <div className="min-w-0 flex-1 transition-all duration-300 lg:ml-64">
                <AdminHeader
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    adminName={user?.name || "Admin User"}
                    adminEmail={user?.email || "admin@luxeestate.com"}
                />

                <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 pb-24 sm:px-6 lg:p-10">

                    <div>
                        <h1 className="text-2xl font-bold text-slate-950 tracking-tight dark:text-white sm:text-3xl">
                            Add New Property
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium dark:text-slate-400">
                            Create a new listing by filling out the information below.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:bg-slate-900 dark:border-slate-800 sm:p-6 lg:p-8">
                        <PropertyForm />
                    </div>

                    <footer className="py-6 border-t border-gray-200 text-center dark:border-slate-800">
                        <p className="text-sm text-gray-400 font-medium dark:text-slate-500">
                            © 2026 LuxeEstate Admin Dashboard. Built with Precision.
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default AddProperty;
