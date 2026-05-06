import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    AlertCircle,
    CheckCircle2,
    Eye,
    Loader2,
    Pencil,
    Plus,
    RefreshCw,
    Trash2,
} from "lucide-react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import DataTable from "./components/DataTable";
import { ConfirmModal, Modal } from "./components/Modal";
import { useTheme } from "../../theme/useTheme";
import { supabase } from "../../config/supabaseClient";
import { propertyTypeOptions } from "../../constants/propertyTypes";

const validationSchema = Yup.object({
    title: Yup.string().min(5, "Title too short").required("Required"),
    description: Yup.string().min(10, "Description too short").required("Required"),
    price: Yup.number().positive("Price must be positive").required("Required"),
    city: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    bedrooms: Yup.number().min(0, "Invalid value").required("Required"),
    bathrooms: Yup.number().min(0, "Invalid value").required("Required"),
    size: Yup.number().positive("Invalid value").required("Required"),
    main_image: Yup.string().url("Invalid URL").required("Required"),
    extra_images: Yup.string(),
});

const getInitialValues = (property) => ({
    title: property?.title || "",
    description: property?.description || "",
    price: property?.price || "",
    city: property?.city || "",
    location: property?.address || property?.location || "",
    type: property?.type || "Villa",
    bedrooms: property?.bedrooms || "",
    bathrooms: property?.bathrooms || "",
    size: property?.area || property?.size || "",
    main_image: property?.image || "",
    extra_images: property?.extra_images || "",
    is_featured: Boolean(property?.featured),
});

const getPropertyPayload = (values) => ({
    title: values.title,
    price: Number(values.price),
    city: values.city,
    address: values.location,
    description: values.description,
    image: values.main_image,
    bedrooms: Number(values.bedrooms),
    bathrooms: Number(values.bathrooms),
    area: Number(values.size),
    type: values.type,
    featured: values.is_featured,
});

const getImageRows = (propertyId, extraImages) =>
    extraImages
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean)
        .map((url) => ({
            property_id: propertyId,
            image_url: url,
        }));

const formatPrice = (price) =>
    typeof price === "number" ? `$${price.toLocaleString()}` : "Not set";

const formatArea = (area) =>
    area ? `${Number(area).toLocaleString()} sqft` : "-";

const AdminProperties = () => {
    const { theme, toggleTheme } = useTheme();
    const user = useSelector((state) => state.auth.user);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, property: null });
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [editLoading, setEditLoading] = useState(false);

    const loadProperties = async ({ keepLoading = false } = {}) => {
        if (!keepLoading) {
            setLoading(true);
        }

        try {
            const { data, error } = await supabase
                .from("properties")
                .select("*")
                .order("id", { ascending: false });

            if (error) throw error;

            setProperties(data || []);
        } catch (error) {
            console.error("Properties load error:", error);
            setStatus({ type: "error", message: error.message || "Could not load properties." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadInitialProperties = async () => {
            try {
                const { data, error } = await supabase
                    .from("properties")
                    .select("*")
                    .order("id", { ascending: false });

                if (error) throw error;

                if (isMounted) {
                    setProperties(data || []);
                }
            } catch (error) {
                console.error("Properties load error:", error);

                if (isMounted) {
                    setStatus({ type: "error", message: error.message || "Could not load properties." });
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadInitialProperties();

        return () => {
            isMounted = false;
        };
    }, []);

    const summary = useMemo(() => {
        const featuredCount = properties.filter((property) => property.featured).length;
        const averagePrice = properties.length
            ? properties.reduce((total, property) => total + Number(property.price || 0), 0) / properties.length
            : 0;

        return {
            total: properties.length,
            featured: featuredCount,
            averagePrice,
        };
    }, [properties]);

    const showStatus = (type, message) => {
        setStatus({ type, message });
        window.setTimeout(() => setStatus({ type: "", message: "" }), 5000);
    };

    const handleOpenEdit = async (property) => {
        setEditingProperty({ ...property, extra_images: "" });
        setEditModalOpen(true);

        const { data, error } = await supabase
            .from("property_images")
            .select("image_url")
            .eq("property_id", property.id);

        if (error) {
            console.error("Gallery load error:", error.message);
            return;
        }

        setEditingProperty((current) =>
            current?.id === property.id
                ? {
                    ...current,
                    extra_images: (data || []).map((image) => image.image_url).join(", "),
                }
                : current,
        );
    };

    const handleUpdateProperty = async (values) => {
        if (!editingProperty) return;

        setEditLoading(true);

        try {
            const propertyPayload = getPropertyPayload(values);
            const { data, error } = await supabase
                .from("properties")
                .update(propertyPayload)
                .eq("id", editingProperty.id)
                .select()
                .single();

            if (error) throw error;

            const { error: deleteImagesError } = await supabase
                .from("property_images")
                .delete()
                .eq("property_id", editingProperty.id);

            if (deleteImagesError) throw deleteImagesError;

            const imageRows = getImageRows(editingProperty.id, values.extra_images);

            if (imageRows.length) {
                const { error: insertImagesError } = await supabase
                    .from("property_images")
                    .insert(imageRows);

                if (insertImagesError) throw insertImagesError;
            }

            setProperties((current) =>
                current.map((property) =>
                    property.id === editingProperty.id ? { ...property, ...data } : property,
                ),
            );
            setEditModalOpen(false);
            setEditingProperty(null);
            showStatus("success", "Property updated successfully.");
        } catch (error) {
            console.error("Property update error:", error);
            showStatus("error", error.message || "Could not update property.");
        } finally {
            setEditLoading(false);
        }
    };

    const handleDeleteProperty = async () => {
        const propertyId = deleteModal.property?.id;

        if (!propertyId) return;

        setDeleteLoading(true);

        try {
            const { error: imagesError } = await supabase
                .from("property_images")
                .delete()
                .eq("property_id", propertyId);

            if (imagesError) throw imagesError;

            const { error: favoritesError } = await supabase
                .from("favorites")
                .delete()
                .eq("property_id", propertyId);

            if (favoritesError) throw favoritesError;

            const { error: propertyError } = await supabase
                .from("properties")
                .delete()
                .eq("id", propertyId);

            if (propertyError) throw propertyError;

            setProperties((current) => current.filter((property) => property.id !== propertyId));
            setDeleteModal({ isOpen: false, property: null });
            showStatus("success", "Property deleted successfully.");
        } catch (error) {
            console.error("Property delete error:", error);
            showStatus("error", error.message || "Could not delete property.");
        } finally {
            setDeleteLoading(false);
        }
    };

    const columns = [
        {
            key: "image",
            label: "Image",
            render: (property) => (
                <img
                    src={property.image}
                    alt={property.title}
                    className="h-16 w-16 rounded-lg border border-gray-200 object-cover dark:border-slate-700"
                />
            ),
        },
        {
            key: "title",
            label: "Title",
            sortable: true,
            render: (property) => (
                <div>
                    <p className="font-semibold text-slate-950 dark:text-white">{property.title}</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                        {property.city || property.address || "No location"}
                    </p>
                </div>
            ),
        },
        {
            key: "type",
            label: "Type",
            sortable: true,
            render: (property) => (
                <span className="rounded-full bg-[#e6f0f3] px-3 py-1 text-xs font-semibold text-[#1A2C3C] dark:bg-slate-800 dark:text-slate-200">
                    {property.type || "Property"}
                </span>
            ),
        },
        {
            key: "price",
            label: "Price",
            sortable: true,
            render: (property) => (
                <span className="font-semibold text-slate-950 dark:text-white">
                    {formatPrice(property.price)}
                </span>
            ),
        },
        {
            key: "bedrooms",
            label: "Beds",
            sortable: true,
        },
        {
            key: "bathrooms",
            label: "Baths",
            sortable: true,
        },
        {
            key: "area",
            label: "Size",
            sortable: true,
            render: (property) => <span>{formatArea(property.area)}</span>,
        },
        {
            key: "featured",
            label: "Status",
            render: (property) => (
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${property.featured
                    ? "bg-[#1A2C3C] text-white dark:bg-[#243b53]"
                    : "border border-gray-200 text-gray-500 dark:border-slate-700 dark:text-slate-300"
                    }`}
                >
                    {property.featured ? "Featured" : "Active"}
                </span>
            ),
        },
    ];

    return (
        <div className="flex min-h-screen bg-[#f8fafc] text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
            <AdminSidebar />

            <div className="ml-64 flex-1 transition-all duration-300">
                <AdminHeader
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    adminName={user?.name || "Admin User"}
                    adminEmail={user?.email || "admin@luxeestate.com"}
                />

                <main className="mx-auto max-w-7xl space-y-6 p-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                                Properties Management
                            </h1>
                            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                                Manage all properties in your platform ({summary.total} total)
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => loadProperties()}
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Refresh
                            </button>
                            <Link
                                to="/admin/add-property"
                                className="inline-flex items-center gap-2 rounded-lg bg-[#344d60] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b2e40] hover:shadow-md dark:bg-[#344d60] dark:hover:bg-[#243b53]"
                            >
                                <Plus className="h-4 w-4" />
                                Add Property
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <SummaryCard title="Total Properties" value={summary.total} />
                        <SummaryCard title="Featured Listings" value={summary.featured} />
                        <SummaryCard title="Average Price" value={formatPrice(Math.round(summary.averagePrice))} />
                    </div>

                    {status.message && (
                        <div className={`flex items-center gap-3 rounded-xl border p-4 text-sm font-semibold ${status.type === "success"
                            ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300"
                            : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
                            }`}
                        >
                            {status.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                            {status.message}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex min-h-[340px] items-center justify-center rounded-2xl border border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                            <Loader2 className="h-10 w-10 animate-spin text-slate-300 dark:text-slate-600" />
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={properties}
                            searchable
                            searchPlaceholder="Search properties..."
                            actions={(property) => (
                                <div className="flex items-center gap-2">
                                    <Link
                                        to={`/listing/${property.id}`}
                                        target="_blank"
                                        className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#1A2C3C] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                        title="View"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => handleOpenEdit(property)}
                                        className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#1A2C3C] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                        title="Edit"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDeleteModal({ isOpen: true, property })}
                                        className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        />
                    )}
                </main>
            </div>

            <Modal
                isOpen={editModalOpen}
                onClose={() => {
                    if (!editLoading) {
                        setEditModalOpen(false);
                        setEditingProperty(null);
                    }
                }}
                title="Edit Property"
                size="xl"
            >
                <EditPropertyForm
                    property={editingProperty}
                    loading={editLoading}
                    onCancel={() => {
                        setEditModalOpen(false);
                        setEditingProperty(null);
                    }}
                    onSubmit={handleUpdateProperty}
                />
            </Modal>

            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => {
                    if (!deleteLoading) {
                        setDeleteModal({ isOpen: false, property: null });
                    }
                }}
                onConfirm={handleDeleteProperty}
                loading={deleteLoading}
                title="Delete Property"
                message={`Are you sure you want to delete "${deleteModal.property?.title || "this property"}"? This action cannot be undone.`}
                confirmText="Delete"
            />
        </div>
    );
};

const SummaryCard = ({ title, value }) => (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{title}</p>
        <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{value}</p>
    </div>
);

const EditPropertyForm = ({ property, loading, onCancel, onSubmit }) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: getInitialValues(property),
        validationSchema,
        onSubmit,
    });

    const inputClass = (name) => `
        w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-gray-400 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500
        ${formik.touched[name] && formik.errors[name]
            ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100 dark:border-red-500 dark:bg-red-950/30 dark:focus:ring-red-500/20"
            : "border-gray-200 focus:border-[#243b53] focus:bg-white focus:ring-2 focus:ring-[#243b53]/20 dark:border-slate-700 dark:focus:border-[#344d60] dark:focus:bg-slate-900 dark:focus:ring-[#344d60]/30"}
    `;

    const getError = (name) =>
        formik.touched[name] && formik.errors[name] ? (
            <p className="text-xs font-medium text-red-600 dark:text-red-300">{formik.errors[name]}</p>
        ) : null;

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label="Title" error={getError("title")}>
                    <input name="title" {...formik.getFieldProps("title")} className={inputClass("title")} />
                </Field>
                <Field label="Price ($)" error={getError("price")}>
                    <input name="price" type="number" {...formik.getFieldProps("price")} className={inputClass("price")} />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label="City" error={getError("city")}>
                    <input name="city" {...formik.getFieldProps("city")} className={inputClass("city")} />
                </Field>
                <Field label="Address" error={getError("location")}>
                    <input name="location" {...formik.getFieldProps("location")} className={inputClass("location")} />
                </Field>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Field label="Type" error={getError("type")}>
                    <select name="type" {...formik.getFieldProps("type")} className={inputClass("type")}>
                        {propertyTypeOptions.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="Bedrooms" error={getError("bedrooms")}>
                    <input name="bedrooms" type="number" {...formik.getFieldProps("bedrooms")} className={inputClass("bedrooms")} />
                </Field>
                <Field label="Bathrooms" error={getError("bathrooms")}>
                    <input name="bathrooms" type="number" {...formik.getFieldProps("bathrooms")} className={inputClass("bathrooms")} />
                </Field>
                <Field label="Area" error={getError("size")}>
                    <input name="size" type="number" {...formik.getFieldProps("size")} className={inputClass("size")} />
                </Field>
            </div>

            <Field label="Main Image URL" error={getError("main_image")}>
                <input name="main_image" {...formik.getFieldProps("main_image")} className={inputClass("main_image")} />
            </Field>

            <Field label="Gallery URLs" hint="Separate URLs with commas" error={getError("extra_images")}>
                <textarea name="extra_images" {...formik.getFieldProps("extra_images")} className={`${inputClass("extra_images")} min-h-24`} />
            </Field>

            <Field label="Description" error={getError("description")}>
                <textarea name="description" {...formik.getFieldProps("description")} className={`${inputClass("description")} min-h-28`} />
            </Field>

            <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-slate-300">
                <input
                    type="checkbox"
                    name="is_featured"
                    checked={formik.values.is_featured}
                    onChange={formik.handleChange}
                    className="h-5 w-5 rounded border-gray-300 text-[#1A2C3C] focus:ring-2 focus:ring-[#243b53]/20 dark:border-slate-700 dark:bg-slate-950 dark:text-[#344d60]"
                />
                Featured Property
            </label>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="rounded-lg bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-200 disabled:opacity-60 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#344d60] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1b2e40] disabled:opacity-60 dark:bg-[#344d60] dark:hover:bg-[#243b53]"
                >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Save Changes
                </button>
            </div>
        </form>
    );
};

const Field = ({ label, hint, error, children }) => (
    <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-300">{label}</label>
            {hint && <span className="text-xs text-gray-400 dark:text-slate-500">{hint}</span>}
        </div>
        {children}
        {error}
    </div>
);

export default AdminProperties;
