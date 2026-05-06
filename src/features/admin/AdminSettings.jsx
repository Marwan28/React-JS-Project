import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    AlertCircle,
    CheckCircle2,
    Globe,
    Loader2,
    LogOut,
    MapPin,
    Phone,
    Save,
    User,
} from "lucide-react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import { useTheme } from "../../theme/useTheme";
import { useEditProfile } from "../profile/editProfile/useEditProfile";
import { logout } from "../../Redux/Reducer/authSlice";

const profileFields = [
    { name: "name", label: "Full Name", type: "text", icon: User, placeholder: "Admin User" },
    { name: "phone", label: "Phone Number", type: "tel", icon: Phone, placeholder: "+1 (555) 123-4567" },
    { name: "location", label: "Location", type: "text", icon: MapPin, placeholder: "Cairo, Egypt" },
];

const platformFields = [
    { name: "contactPhone", label: "Contact Phone", type: "tel", icon: Phone, placeholder: "+1 (555) 123-4567" },
];

const defaultPlatformInfo = {
    siteDescription: "Premium Luxury Real Estate Platform",
    contactPhone: "+1 (555) 123-4567",
};

const platformStorageKey = "luxeestate-platform-info";

const AdminSettings = () => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const [profileStatus, setProfileStatus] = useState({ type: "", message: "" });
    const [platformStatus, setPlatformStatus] = useState({ type: "", message: "" });

    const [platformInfo, setPlatformInfo] = useState(() => {
        if (typeof window === "undefined") return defaultPlatformInfo;

        try {
            return {
                ...defaultPlatformInfo,
                ...JSON.parse(window.localStorage.getItem(platformStorageKey)),
            };
        } catch {
            return defaultPlatformInfo;
        }
    });

    const {
        formData,
        errors,
        saving,
        loading,
        handleChange,
        handleSave,
    } = useEditProfile(() => {
        setProfileStatus({ type: "success", message: "Profile settings saved successfully." });
        setTimeout(() => setProfileStatus({ type: "", message: "" }), 4000);
    });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileStatus({ type: "", message: "" });
        await handleSave();
    };

    const handleLogout = async () => {
        try {
            await dispatch(logout());
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handlePlatformChange = (e) => {
        const { name, value } = e.target;
        setPlatformInfo((prev) => ({ ...prev, [name]: value }));
        if (platformStatus.message) {
            setPlatformStatus({ type: "", message: "" });
        }
    };

    const handlePlatformSubmit = (e) => {
        e.preventDefault();

        if (!platformInfo.siteDescription || !platformInfo.contactPhone) {
            setPlatformStatus({ type: "error", message: "Please complete all platform fields." });
            return;
        }

        localStorage.setItem(platformStorageKey, JSON.stringify(platformInfo));
        setPlatformStatus({ type: "success", message: "Platform information saved successfully." });
        setTimeout(() => setPlatformStatus({ type: "", message: "" }), 4000);
    };

    return (
        <div className="flex min-h-screen bg-[#f8fafc] text-slate-950 dark:bg-slate-950 dark:text-slate-100">
            <AdminSidebar />

            <div className="ml-64 flex-1">
                <AdminHeader
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    adminName={user?.name || formData.name || "Admin User"}
                />

                <main className="mx-auto max-w-5xl space-y-6 p-8">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white">Settings</h1>
                        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                            Manage your admin profile and platform information.
                        </p>
                    </div>

                    {/* Profile Settings */}
                    <SettingsCard
                        icon={User}
                        title="Profile Settings"
                        description="Update your admin account details."
                    >
                        {loading ? (
                            <div className="grid gap-6 md:grid-cols-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-4 w-28 animate-pulse bg-gray-200 rounded"></div>
                                        <div className="h-11 animate-pulse bg-gray-100 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <form onSubmit={handleProfileSubmit} className="space-y-6">
                                <StatusMessage status={profileStatus} fallbackError={errors.form} />

                                <div className="grid gap-6 md:grid-cols-2">
                                    {profileFields.map((field) => (
                                        <Field
                                            key={field.name}
                                            label={field.label}
                                            icon={field.icon}
                                            error={errors[field.name]}
                                        >
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                value={formData[field.name] || ""}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                className={getInputClass(!!errors[field.name])}
                                            />
                                        </Field>
                                    ))}
                                </div>

                                <div className="flex justify-between pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-[#344d60] text-white px-6 py-3 rounded-lg flex items-center gap-2"
                                    >
                                        {saving ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
                                        {saving ? "Saving..." : "Save Profile"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </SettingsCard>

                    {/* Platform Info */}
                    <SettingsCard
                        icon={Globe}
                        title="Platform Info"
                        description="Public contact info for your platform."
                    >
                        <form onSubmit={handlePlatformSubmit} className="space-y-6">
                            <StatusMessage status={platformStatus} />

                            <div className="grid gap-6 md:grid-cols-2">
                                {platformFields.map((field) => (
                                    <Field key={field.name} label={field.label} icon={field.icon}>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={platformInfo[field.name]}
                                            onChange={handlePlatformChange}
                                            className={getInputClass(false)}
                                        />
                                    </Field>
                                ))}
                            </div>

                            <Field label="Site Description" icon={Globe}>
                                <textarea
                                    name="siteDescription"
                                    value={platformInfo.siteDescription}
                                    onChange={handlePlatformChange}
                                    rows={4}
                                    className={getInputClass(false)}
                                />
                            </Field>

                            <div className="flex justify-end pt-6 border-t">
                                <button className="bg-[#344d60] text-white px-6 py-3 rounded-lg flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Save Platform Info
                                </button>
                            </div>
                        </form>
                    </SettingsCard>
                </main>
            </div>
        </div>
    );
};

const SettingsCard = ({ icon: Icon, title, description, children }) => (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-4">
            <Icon className="h-5 w-5" />
            <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        {children}
    </section>
);

const Field = ({ label, icon: Icon, error, children }) => (
    <div>
        <label className="text-sm flex items-center gap-2 mb-1">
            <Icon className="h-4 w-4" />
            {label}
        </label>
        {children}
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
);

const StatusMessage = ({ status, fallbackError }) => {
    const message = status.message || fallbackError;
    if (!message) return null;

    return (
        <div className="flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" />
            {message}
        </div>
    );
};

const getInputClass = (error) =>
    `w-full border rounded px-3 py-2 ${error ? "border-red-500" : "border-gray-300"}`;

export default AdminSettings;