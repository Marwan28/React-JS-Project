import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    AlertCircle,
    CheckCircle2,
    Globe,
    Loader2,
    LogOut,
    Mail,
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
    { name: "email", label: "Email Address", type: "email", icon: Mail, placeholder: "admin@luxeestate.com" },
    { name: "phone", label: "Phone Number", type: "tel", icon: Phone, placeholder: "+1 (555) 123-4567" },
    { name: "location", label: "Location", type: "text", icon: MapPin, placeholder: "Cairo, Egypt" },
];

const platformFields = [
    { name: "contactEmail", label: "Contact Email", type: "email", icon: Mail, placeholder: "info@luxeestate.com" },
    { name: "contactPhone", label: "Contact Phone", type: "tel", icon: Phone, placeholder: "+1 (555) 123-4567" },
];

const defaultPlatformInfo = {
    contactEmail: "info@luxeestate.com",
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
        if (typeof window === "undefined") {
            return defaultPlatformInfo;
        }

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
        window.setTimeout(() => setProfileStatus({ type: "", message: "" }), 4000);
    });

    const handleProfileSubmit = async (event) => {
        event.preventDefault();
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

    const handlePlatformChange = (event) => {
        const { name, value } = event.target;
        setPlatformInfo((current) => ({ ...current, [name]: value }));
        if (platformStatus.message) {
            setPlatformStatus({ type: "", message: "" });
        }
    };

    const handlePlatformSubmit = (event) => {
        event.preventDefault();

        if (!platformInfo.contactEmail || !platformInfo.siteDescription || !platformInfo.contactPhone) {
            setPlatformStatus({ type: "error", message: "Please complete all platform fields." });
            return;
        }

        window.localStorage.setItem(platformStorageKey, JSON.stringify(platformInfo));
        setPlatformStatus({ type: "success", message: "Platform information saved successfully." });
        window.setTimeout(() => setPlatformStatus({ type: "", message: "" }), 4000);
    };

    return (
        <div className="flex min-h-screen bg-[#f8fafc] text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
            <AdminSidebar />

            <div className="ml-64 flex-1 transition-all duration-300">
                <AdminHeader
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    adminName={user?.name || formData.name || "Admin User"}
                    adminEmail={user?.email || formData.email || "admin@luxeestate.com"}
                />

                <main className="mx-auto max-w-5xl space-y-6 p-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                            Settings
                        </h1>
                        <p className="mt-2 text-sm font-medium text-gray-500 dark:text-slate-400">
                            Manage your admin profile and public platform information.
                        </p>
                    </div>

                    <SettingsCard
                        icon={User}
                        title="Profile Settings"
                        description="Update the admin account details shown across your dashboard."
                    >
                        {loading ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="space-y-2">
                                        <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-slate-800"></div>
                                        <div className="h-11 animate-pulse rounded-lg bg-gray-100 dark:bg-slate-950"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <form onSubmit={handleProfileSubmit} className="space-y-6">
                                <StatusMessage status={profileStatus} fallbackError={errors.form} />

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                                className={getInputClass(Boolean(errors[field.name]))}
                                            />
                                        </Field>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 dark:border-slate-800 sm:flex-row sm:justify-between">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800 dark:border-red-900/70 dark:bg-red-700 dark:hover:bg-red-800"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#344d60] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b2e40] disabled:opacity-60 dark:bg-[#344d60] dark:hover:bg-[#243b53]"
                                    >
                                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                        {saving ? "Saving..." : "Save Profile"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </SettingsCard>

                    <SettingsCard
                        icon={Globe}
                        title="Platform Info"
                        description="Control the contact details visitors see for LuxeEstate."
                    >
                        <form onSubmit={handlePlatformSubmit} className="space-y-6">
                            <StatusMessage status={platformStatus} />

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {platformFields.map((field) => (
                                    <Field key={field.name} label={field.label} icon={field.icon}>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={platformInfo[field.name]}
                                            onChange={handlePlatformChange}
                                            placeholder={field.placeholder}
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
                                    placeholder="Premium Luxury Real Estate Platform"
                                    className={`${getInputClass(false)} min-h-28 resize-y`}
                                />
                            </Field>

                            <div className="flex justify-end border-t border-gray-200 pt-6 dark:border-slate-800">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#344d60] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b2e40] dark:bg-[#344d60] dark:hover:bg-[#243b53]"
                                >
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
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f0f3] text-[#1A2C3C] dark:bg-slate-800 dark:text-slate-100">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{description}</p>
            </div>
        </div>
        {children}
    </section>
);

const Field = ({ label, icon: Icon, error, children }) => (
    <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-300">
            {Icon && <Icon className="h-4 w-4 text-gray-400 dark:text-slate-500" />}
            {label}
        </label>
        {children}
        {error && (
            <p className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-300">
                <AlertCircle className="h-3.5 w-3.5" />
                {error}
            </p>
        )}
    </div>
);

const StatusMessage = ({ status, fallbackError }) => {
    const message = status.message || fallbackError;
    const type = status.message ? status.type : "error";

    if (!message) return null;

    return (
        <div
            className={`flex items-center gap-3 rounded-xl border p-4 text-sm font-semibold ${
                type === "success"
                    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
            }`}
        >
            {type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {message}
        </div>
    );
};

const getInputClass = (hasError) => `
    w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-gray-400 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500
    ${
        hasError
            ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100 dark:border-red-500 dark:bg-red-950/30 dark:focus:ring-red-500/20"
            : "border-gray-200 focus:border-[#243b53] focus:bg-white focus:ring-2 focus:ring-[#243b53]/20 dark:border-slate-700 dark:focus:border-[#344d60] dark:focus:bg-slate-900 dark:focus:ring-[#344d60]/30"
    }
`;

export default AdminSettings;
