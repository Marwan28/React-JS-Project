import { MapPin, Share2, Heart, Bed, Bath, Maximize } from 'lucide-react';

const PropertyInfo = ({ property }) => {
    return (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
            <div className="p-10 border-b border-gray-50">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">Villa</span>
                            <span className="px-3 py-1 bg-taupe-300 border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">For Sale</span>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all"><Share2 size={18} className="text-gray-600" /></button>
                            <button className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all"><Heart size={18} className="text-gray-600 hover:text-red-500" /></button>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">{property.title}</h1>
                    <p className="flex items-center text-gray-400 font-medium text-lg">
                        <MapPin size={30} className="mr-2 text-gray-500" /> {property.address}, {property.city}
                    </p>
                </div>
            </div>

            <div className="p-10 py-8 border-b border-gray-50 flex justify-between items-center px-12 bg-gray-50/10">
                <div className="text-center group">
                    <Bed className="mx-auto text-gray-500 mb-2" size={32} />
                    <p className="text-xs text-gray-400 font-bold uppercase">Bedrooms</p>
                    <p className="font-black text-2xl">{property.bedrooms}</p>
                </div>
                <div className="text-center group">
                    <Bath className="mx-auto text-gray-500 mb-2" size={32} />
                    <p className="text-xs text-gray-400 font-bold uppercase">Bathrooms</p>
                    <p className="font-black text-2xl">{property.bathrooms}</p>
                </div>
                <div className="text-center group">
                    <Maximize className="mx-auto text-gray-500 mb-2" size={32} />
                    <p className="text-xs text-gray-400 font-bold uppercase">Area</p>
                    <p className="font-black text-2xl">{property.area} <span className="text-sm font-normal">sq ft</span></p>
                </div>
            </div>

            <div className="p-10 border-b border-gray-50">
                <h2 className="text-2xl font-black mb-6 text-gray-900">Description</h2>
                <p className="text-gray-500 leading-relaxed font-medium text-lg italic">{property.description}</p>
            </div>

            <div className="p-10">
                <h2 className="text-2xl font-black mb-10 text-gray-900">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-7 gap-x-8">
                    {["Smart Home System", "Wine Cellar", "Swimming Pool", "Security System", "Hardwood Floors", "Walk-in Closets"].map((item) => (
                        <div key={item} className="flex items-center text-gray-600 font-bold text-sm">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#23404a] mr-3"></div> {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertyInfo;
