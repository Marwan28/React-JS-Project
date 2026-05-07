const RecentPropertyItem = ({ property }) => (
    <div className="group flex flex-col gap-4 bg-white p-4 transition-all duration-300 hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800/70 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            <div className="relative shrink-0 overflow-hidden rounded-xl">
                <img src={property.image} alt={property.title} className="h-20 w-20 object-cover transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24" />
                {property.featured && (
                    <span className="absolute top-2 left-2 bg-[#1A2C3C] text-[9px] text-white px-3 py-1 rounded-full font-bold uppercase tracking-tighter dark:bg-[#243b53] dark:text-white">
                        Featured
                    </span>
                )}
            </div>
            <div className="min-w-0">
                <h4 className="truncate text-base font-semibold text-slate-950 transition-colors group-hover:text-[#23404a] dark:text-white dark:group-hover:text-slate-200">{property.title}</h4>
                <p className="text-sm text-gray-500 font-medium mb-2 dark:text-slate-400">{property.address}, {property.city}</p>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-500 dark:text-slate-400 sm:gap-3">
                    <span className="bg-gray-100 px-2 py-1 rounded-lg dark:bg-slate-800">{property.bedrooms} beds</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-lg dark:bg-slate-800">{property.bathrooms} baths</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-lg dark:bg-slate-800">{property.area} sqft</span>
                </div>
            </div>
        </div>
        <div className="text-left sm:pr-4 sm:text-right">
            <p className="font-bold text-[#1A2C3C] text-xl dark:text-white">${property.price?.toLocaleString()}</p>
        </div>
    </div>
);

export default RecentPropertyItem;
