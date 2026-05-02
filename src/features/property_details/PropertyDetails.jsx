import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabaseApi from '../../config/supabaseApi';
import { useDispatch } from 'react-redux';
import { Loader2, ChevronLeft } from 'lucide-react';
import { addToHistory } from '../../Redux/Reducer/historySlice';

import ImageGallery from './components/ImageGallery';
import PropertyInfo from './components/PropertyInfo';
import ContactCard from './components/ContactCard';
import Footer from '../../components/Footer';

const PropertyDetails = () => {
  const { id } = useParams();
  //  const history = useSelector((state) => state.history.viewedProperties);
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPropertyData = async () => {
      setLoading(true);
      try {
        const data = await supabaseApi.getById('properties', id);
        if (data && data.length > 0) {
          const mainProperty = data[0];
          setProperty(mainProperty);

          if (mainProperty.id) {
          
            dispatch(addToHistory({
              id: mainProperty.id,
              title: mainProperty.title,
              image: mainProperty.image,
              location: mainProperty.city || mainProperty.address,
              price: mainProperty.price, 
              bedrooms: mainProperty.bedrooms, 
              bathrooms: mainProperty.bathrooms, 
              area: mainProperty.area,
              type: mainProperty.type, 
              featured: mainProperty.featured
            }));
          }

          const propertyImages = await supabaseApi.get('property_images');
          if (propertyImages) {
            const extraImages = propertyImages.filter(img => String(img.property_id) === String(id));
            setImages([{ image_url: mainProperty.image }, ...extraImages]);
          } else {
            setImages([{ image_url: mainProperty.image }]);
          }
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPropertyData();
  }, [id, dispatch]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-[#23404a]" size={48} />
    </div>
  );

  if (!property) return <div className="text-center py-20 text-2xl font-bold">Property not found!</div>;

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans transition-colors dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/listings" className="flex items-center gap-1 text-gray-500 hover:text-black font-medium transition-all">
            <ChevronLeft size={20} /> Back to Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery
              images={images}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              propertyImage={property.image}
            />
            <PropertyInfo property={property} />
          </div>
          <div className="lg:col-span-1">
            <ContactCard price={property.price} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
