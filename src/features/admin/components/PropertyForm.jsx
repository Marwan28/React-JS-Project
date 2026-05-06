import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../../config/supabaseClient';
import { propertyTypeOptions } from '../../../constants/propertyTypes';

const PropertyForm = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const validationSchema = Yup.object({
        title: Yup.string().min(5, 'Title too short').required('Required'),
        description: Yup.string().min(10, 'Description too short').required('Required'),
        price: Yup.number().positive().required('Required'),
        city: Yup.string().required('Required'),
        location: Yup.string().required('Required'),
        type: Yup.string().required('Required'),
        bedrooms: Yup.number().min(0).required('Required'),
        bathrooms: Yup.number().min(0).required('Required'),
        size: Yup.number().positive().required('Required'),
        main_image: Yup.string().url('Invalid URL').required('Required'),
        extra_images: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            title: '', description: '', price: '', location: '', city: '',
            type: 'Villa', bedrooms: '', bathrooms: '', size: '',
            main_image: '', extra_images: '', is_featured: false
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setStatus({ type: '', message: '' });
            try {
                const propertyData = {
                    title: values.title,
                    price: parseFloat(values.price),
                    city: values.city,
                    address: values.location,
                    description: values.description,
                    image: values.main_image,
                    bedrooms: parseInt(values.bedrooms),
                    bathrooms: parseInt(values.bathrooms),
                    area: parseInt(values.size),
                    type: values.type,
                    featured: values.is_featured
                };

                const { data: newProperty, error: propertyError } = await supabase
                    .from('properties')
                    .insert(propertyData)
                    .select()
                    .single();

                if (propertyError) {
                    throw propertyError;
                }

                if (newProperty?.id) {
                    const imagesArray = values.extra_images
                        .split(',')
                        .map(url => url.trim())
                        .filter(Boolean)
                        .map(url => ({
                            property_id: newProperty.id,
                            image_url: url
                        }));

                    if (imagesArray.length) {
                        const { error: imagesError } = await supabase
                            .from('property_images')
                            .insert(imagesArray);

                        if (imagesError) {
                            throw imagesError;
                        }
                    }

                    setStatus({ type: 'success', message: 'Property added successfully!' });
                    formik.resetForm();
                } else {
                    throw new Error("Insert failed");
                }
            } catch (error) {
                console.error(error);
                setStatus({ type: 'error', message: error.message || 'Error adding property. Check console.' });
            } finally {
                setLoading(false);
                setTimeout(() => setStatus({ type: '', message: '' }), 5000);
            }
        },
    });

    const getError = (name) =>
        formik.touched[name] && formik.errors[name] ? (
            <p className="text-xs font-medium text-red-600 dark:text-red-300">{formik.errors[name]}</p>
        ) : null;

    const inputClass = (name) => `
        w-full px-4 py-2.5 bg-gray-50 border rounded-lg outline-none transition-all duration-200 text-slate-950 placeholder:text-gray-400 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500
        ${formik.touched[name] && formik.errors[name]
            ? 'border-red-300 bg-red-50 focus:ring-red-100 dark:border-red-500 dark:bg-red-950/30 dark:focus:ring-red-500/20'
            : 'border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#243b53]/20 focus:border-[#243b53] dark:border-slate-700 dark:focus:bg-slate-900 dark:focus:ring-[#344d60]/30 dark:focus:border-[#344d60]'}
    `;

    return (
        <div className="max-w-4xl mx-auto">
            {status.message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'}`}>
                    {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span className="font-bold">{status.message}</span>
                </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1 dark:text-slate-300">Title</label>
                        <input name="title" {...formik.getFieldProps('title')} className={inputClass('title')} placeholder="Property Title" />
                        {getError('title')}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1 dark:text-slate-300">Price ($)</label>
                        <input name="price" type="number" {...formik.getFieldProps('price')} className={inputClass('price')} placeholder="850,000" />
                        {getError('price')}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1 dark:text-slate-300">City</label>
                        <input name="city" {...formik.getFieldProps('city')} className={inputClass('city')} placeholder="e.g. Cairo" />
                        {getError('city')}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1 dark:text-slate-300">Address</label>
                        <input name="location" {...formik.getFieldProps('location')} className={inputClass('location')} placeholder="Street, District" />
                        {getError('location')}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1 dark:text-slate-300">Type</label>
                        <select name="type" {...formik.getFieldProps('type')} className={inputClass('type')}>
                            {propertyTypeOptions.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                        {getError('type')}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1 dark:text-slate-300">Bedrooms</label>
                        <input name="bedrooms" type="number" {...formik.getFieldProps('bedrooms')} className={inputClass('bedrooms')} />
                        {getError('bedrooms')}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1 dark:text-slate-300">Bathrooms</label>
                        <input name="bathrooms" type="number" {...formik.getFieldProps('bathrooms')} className={inputClass('bathrooms')} />
                        {getError('bathrooms')}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1 dark:text-slate-300">Area (sqft)</label>
                        <input name="size" type="number" {...formik.getFieldProps('size')} className={inputClass('size')} />
                        {getError('size')}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1 dark:text-slate-300">Main Image URL</label>
                    <input name="main_image" {...formik.getFieldProps('main_image')} className={inputClass('main_image')} placeholder="https://..." />
                    {getError('main_image')}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1 dark:text-slate-300">Gallery (URLs separated by commas)</label>
                    <textarea name="extra_images" {...formik.getFieldProps('extra_images')} className={`${inputClass('extra_images')} h-24`} placeholder="url1, url2, url3" />
                    {getError('extra_images')}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1 dark:text-slate-300">Description</label>
                    <textarea name="description" {...formik.getFieldProps('description')} className={`${inputClass('description')} h-32`} />
                    {getError('description')}
                </div>

                <div className="flex items-center gap-3">
                    <input type="checkbox" id="is_featured" name="is_featured" checked={formik.values.is_featured} onChange={formik.handleChange} className="w-5 h-5 rounded border-gray-300 text-[#1A2C3C] focus:ring-2 focus:ring-[#243b53]/20 dark:border-slate-700 dark:bg-slate-950 dark:text-[#344d60] dark:focus:ring-[#344d60]/30" />
                    <label htmlFor="is_featured" className="font-medium text-gray-700 dark:text-slate-300">Featured Property</label>
                </div>

                <div className="flex gap-4 pt-4">
                    <button type="submit" disabled={loading} className="flex-1 bg-[#344d60] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#1b2e40] transition-all disabled:opacity-50 dark:bg-[#344d60] dark:hover:bg-[#243b53]">
                        {loading ? <Loader2 className="animate-spin" /> : "Add Property"}
                    </button>
                    <button type="button" onClick={() => formik.resetForm()} className="px-8 py-3 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200 transition-all dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default PropertyForm;
