import React from 'react';
import AdminSidebar from '../admin/components/AdminSidebar';
import AdminHeader from '../admin/components/AdminHeader';
import PropertyForm from '../admin/components/PropertyForm';
import { useTheme } from "../../theme/useTheme";
import { useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";

const AddProperty = () => {
    const { theme, toggleTheme } = useTheme();
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="flex min-h-screen bg-[#fafbfc]">
            <AdminSidebar />

            <div className="flex-1 ml-64 transition-all duration-300">
                <AdminHeader
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    adminName={user?.name || "Admin User"}
                    adminEmail={user?.email || "admin@luxeestate.com"}
                />

                <main className="p-10 max-w-5xl mx-auto">

                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-[#1e293b] tracking-tight">
                            Add New Property
                        </h1>
                        <p className="text-gray-400 mt-2 font-medium">
                            Create a new listing by filling out the information below.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-\[2rem\] shadow-sm border border-gray-100/50">
                        <PropertyForm />
                    </div>

                    <footer className="mt-12 py-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-400 font-medium">
                            © 2026 LuxeEstate Admin Dashboard. Built with Precision.
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default AddProperty;