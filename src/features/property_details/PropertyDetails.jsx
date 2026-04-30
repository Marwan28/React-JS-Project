import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabaseApi from '../../config/supabaseApi';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, MapPin, Bed, Bath, Maximize, Loader2, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { addToHistory } from '../../Redux/Reducer/historySlice';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const viewedProperties = useSelector((state) => state.history.viewedProperties);
  console.log("Viewed Properties from Redux:", viewedProperties);

  useEffect(() => {
    console.log("Viewed Properties History:", viewedProperties);
    const fetchPropertyData = async () => {
      setLoading(true);
      try {
        const data = await supabaseApi.getById('properties', id);

        if (data && data.length > 0) {
          const mainProperty = data[0];
          setProperty(mainProperty);
          if (mainProperty.id) {
            console.log("sending data");
            dispatch(addToHistory(mainProperty));

          }
          console.log("Main Property Data:", mainProperty);
          const propertyImages = await supabaseApi.get('property_images');

          if (propertyImages) {
            const extraImages = propertyImages.filter(img => String(img.property_id) === String(id));

            const allImages = [
              { image_url: mainProperty.image },
              ...extraImages
            ];

            setImages(allImages);
          } else {
            setImages([{ image_url: mainProperty.image }]);
          }
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPropertyData();
  }, [id, dispatch]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  if (!property) return <div className="text-center py-20 text-2xl font-bold text-gray-600">Property not found!</div>;

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/listings" className="flex items-center gap-1 text-gray-500 hover:text-black font-medium transition-all">
            <ChevronLeft size={20} /> Back to Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-8">

            <div className="space-y-4">

              <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl bg-gray-200" style={{ height: '500px' }}>
                <img
                  src={images.length > 0 ? images[activeImage]?.image_url : property.image_url}
                  className="w-full h-full object-cover transition-all duration-500"
                  alt="Property"
                />
                <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  {activeImage + 1} / {images.length || 1}
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative min-w-\[140px\] h-24 rounded-2xl overflow-hidden cursor-pointer border-4 transition-all duration-300 
                      ${activeImage === index ? 'border-blue-600 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img.image_url} className="w-full h-full object-cover" alt={`Thumb ${index}`} />
                  </div>
                ))}
              </div>
            </div>


            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-10 border-b border-gray-50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-400 shadow-sm">Villa</span>
                      <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm">For Sale</span>
                    </div>

                    <div className="flex gap-3">
                      <button className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all"><Share2 size={18} className="text-gray-600" /></button>
                      <button className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all"><Heart size={18} className="text-gray-600 hover:text-red-500" /></button>
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">{property.title}</h1>
                  <p className="flex items-center text-gray-400 font-medium text-lg">
                    <MapPin size={20} className="mr-2 text-blue-600" /> {property.address}, {property.city}
                  </p>
                </div>
              </div>

              <div className="p-10 py-8 border-b border-gray-50 flex justify-between items-center px-12 bg-gray-50/10">
                <div className="text-center group">
                  <Bed className="mx-auto text-blue-600 mb-2" size={32} />
                  <p className="text-xs text-gray-400 font-bold uppercase">Bedrooms</p>
                  <p className="font-black text-2xl">{property.bedrooms}</p>
                </div>
                <div className="text-center group">
                  <Bath className="mx-auto text-blue-600 mb-2" size={32} />
                  <p className="text-xs text-gray-400 font-bold uppercase">Bathrooms</p>
                  <p className="font-black text-2xl">{property.bathrooms}</p>
                </div>
                <div className="text-center group">
                  <Maximize className="mx-auto text-blue-600 mb-2" size={32} />
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
                  {["Smart Home System", "Wine Cellar", "Swimming Pool", "Security System", "Hardwood Floors", "Walk-in Closets", "Gym", "Home Theater"].map((item) => (
                    <div key={item} className="flex items-center text-gray-600 font-bold text-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-3"></div> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-8 space-y-8">
              <div className="md:text-right border-b border-gray-50 pb-6">
                <p className="text-5xl font-black text-blue-600 tracking-tighter">
                  ${property.price ? property.price.toLocaleString() : '0'}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Asking Price</p>
              </div>
              <div className="space-y-4">
                <p className="text-3xl font-black text-gray-900">Contact Us</p>
                <input type="text" placeholder="Your Name" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                <textarea placeholder="Message" rows="4" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 resize-none"></textarea>
                <button className="w-full bg-[#111827] text-white py-5 rounded-2xl font-bold text-sm hover:bg-black transition-all active:scale-[0.98] shadow-lg mt-4">
                  Schedule Viewing
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;