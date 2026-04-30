import React from 'react';

const ImageGallery = ({ images, activeImage, setActiveImage, propertyImage }) => {
    return (
        <div className="space-y-4">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl bg-gray-200" style={{ height: '500px' }}>
                <img
                    src={images.length > 0 ? images[activeImage]?.image_url : propertyImage}
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
    );
};

export default ImageGallery;