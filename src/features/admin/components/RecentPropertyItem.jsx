const RecentPropertyItem = ({ property }) => (
    <div className="bg-white p-6 flex items-center justify-between group transition-all duration-300 hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800/70">
        <div className="flex items-center gap-6">
            <div className="relative overflow-hidden rounded-xl">
                <img src={property.image} alt={property.title} className="w-24 h-24 object-cover transition-transform duration-500 group-hover:scale-110" />
                {property.featured && (
                    <span className="absolute top-2 left-2 bg-[#1A2C3C] text-[9px] text-white px-3 py-1 rounded-full font-bold uppercase tracking-tighter dark:bg-[#243b53] dark:text-white">
                        Featured
                    </span>
                )}
            </div>
            <div>
                <h4 className="font-semibold text-slate-950 text-base group-hover:text-[#23404a] transition-colors dark:text-white dark:group-hover:text-slate-200">{property.title}</h4>
                <p className="text-sm text-gray-500 font-medium mb-2 dark:text-slate-400">{property.address}, {property.city}</p>
                <div className="flex gap-3 text-xs text-gray-500 font-medium dark:text-slate-400">
                    <span className="bg-gray-100 px-2 py-1 rounded-lg dark:bg-slate-800">{property.bedrooms} beds</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-lg dark:bg-slate-800">{property.bathrooms} baths</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-lg dark:bg-slate-800">{property.area} sqft</span>
                </div>
            </div>
        </div>
        <div className="text-right pr-4">
            <p className="font-bold text-[#1A2C3C] text-xl dark:text-white">${property.price?.toLocaleString()}</p>
        </div>
    </div>
);

export default RecentPropertyItem;
