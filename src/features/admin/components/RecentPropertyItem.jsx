import React from 'react';

const RecentPropertyItem = ({ property }) => (
    <div className="bg-white p-6 rounded-\[2rem\] border border-gray-50 shadow-sm flex items-center justify-between group transition-all duration-300 hover:shadow-xl hover:bg-slate-50/50">
        <div className="flex items-center gap-6">
            <div className="relative overflow-hidden rounded-2xl">
                <img src={property.image} alt={property.title} className="w-24 h-24 object-cover transition-transform duration-500 group-hover:scale-110" />
                {property.featured && (
                    <span className="absolute top-2 left-2 bg-[#1e293b] text-[9px] text-white px-3 py-1 rounded-full font-black uppercase tracking-tighter">
                        Featured
                    </span>
                )}
            </div>
            <div>
                <h4 className="font-black text-slate-800 text-lg group-hover:text-[#1e293b] transition-colors">{property.title}</h4>
                <p className="text-xs text-gray-400 font-bold mb-2">{property.address}, {property.city}</p>
                <div className="flex gap-4 text-xs text-gray-500 font-bold">
                    <span className="bg-gray-100 px-2 py-1 rounded-lg">{property.bedrooms} beds</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-lg">{property.bathrooms} baths</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-lg">{property.area} sqft</span>
                </div>
            </div>
        </div>
        <div className="text-right pr-4">
            <p className="font-black text-slate-800 text-xl">${property.price?.toLocaleString()}</p>
        </div>
    </div>
);

export default RecentPropertyItem;