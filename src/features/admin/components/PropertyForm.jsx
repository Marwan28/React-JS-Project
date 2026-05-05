import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import supabaseApi from '../../../config/supabaseApi';

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
        extra_images: Yup.string().required('Please add at least one gallery image'),
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

                const result = await supabaseApi.insert('properties', propertyData);

                if (result && result.length > 0) {
                    const propertyId = result[0].id;
                    const imagesArray = values.extra_images.split(',').map(url => ({
                        property_id: propertyId,
                        image_url: url.trim()
                    }));

                    await supabaseApi.insert('property_images', imagesArray);

                    setStatus({ type: 'success', message: 'Property added successfully!' });
                    formik.resetForm();
                } else {
                    throw new Error("Insert failed");
                }
            } catch (error) {
                console.error(error);
                setStatus({ type: 'error', message: 'Error adding property. Check console.' });
            } finally {
                setLoading(false);
                setTimeout(() => setStatus({ type: '', message: '' }), 5000);
            }
        },
    });

    const inputClass = (name) => `
        w-full p-4 bg-gray-50 border rounded-2xl outline-none transition-all duration-200
        ${formik.touched[name] && formik.errors[name]
            ? 'border-red-300 bg-red-50 focus:ring-red-100'
            : 'border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200'}
    `;

    return (
        <div className="max-w-4xl mx-auto">
            {status.message && (
                <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span className="font-bold">{status.message}</span>
                </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                        <input name="title" {...formik.getFieldProps('title')} className={inputClass('title')} placeholder="Property Title" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Price ($)</label>
                        <input name="price" type="number" {...formik.getFieldProps('price')} className={inputClass('price')} placeholder="850,000" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                        <input name="city" {...formik.getFieldProps('city')} className={inputClass('city')} placeholder="e.g. Cairo" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Address</label>
                        <input name="location" {...formik.getFieldProps('location')} className={inputClass('location')} placeholder="Street, District" />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
                        <select name="type" {...formik.getFieldProps('type')} className={inputClass('type')}>
                            <option value="Villa">Villa</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Studio">Studio</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Bedrooms</label>
                        <input name="bedrooms" type="number" {...formik.getFieldProps('bedrooms')} className={inputClass('bedrooms')} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Bathrooms</label>
                        <input name="bathrooms" type="number" {...formik.getFieldProps('bathrooms')} className={inputClass('bathrooms')} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Area (sqft)</label>
                        <input name="size" type="number" {...formik.getFieldProps('size')} className={inputClass('size')} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Main Image URL</label>
                    <input name="main_image" {...formik.getFieldProps('main_image')} className={inputClass('main_image')} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Gallery (URLs separated by commas)</label>
                    <textarea name="extra_images" {...formik.getFieldProps('extra_images')} className={`${inputClass('extra_images')} h-24`} placeholder="url1, url2, url3" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                    <textarea name="description" {...formik.getFieldProps('description')} className={`${inputClass('description')} h-32`} />
                </div>

                <div className="flex items-center gap-3">
                    <input type="checkbox" id="is_featured" name="is_featured" checked={formik.values.is_featured} onChange={formik.handleChange} className="w-5 h-5 rounded black" />
                    <label htmlFor="is_featured" className="font-bold text-gray-600">Featured Property</label>
                </div>

                <div className="flex gap-4 pt-4">
                    <button type="submit" disabled={loading} className="flex-1 bg-[#1e293b] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50">
                        {loading ? <Loader2 className="animate-spin" /> : "Add Property"}
                    </button>
                    <button type="button" onClick={() => formik.resetForm()} className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default PropertyForm;