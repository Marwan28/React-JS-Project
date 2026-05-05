import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageGallery = ({ images, activeImage, setActiveImage, propertyImage }) => {
    const totalImages = images.length || 1;

    const goToPreviousImage = () => {
        setActiveImage((currentImage) =>
            currentImage === 0 ? totalImages - 1 : currentImage - 1
        );
    };

    const goToNextImage = () => {
        setActiveImage((currentImage) =>
            currentImage === totalImages - 1 ? 0 : currentImage + 1
        );
    };

    return (
        <div className="space-y-4">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl bg-gray-200" style={{ height: '500px' }}>
                <img
                    src={images.length > 0 ? images[activeImage]?.image_url : propertyImage}
                    className="w-full h-full object-cover transition-all duration-500"
                    alt="Property"
                />
                <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    {activeImage + 1} / {totalImages}
                </div>

                {totalImages > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={goToPreviousImage}
                            className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-[#23404a] shadow-lg backdrop-blur-sm transition hover:bg-white/35 dark:bg-slate-950/10 dark:text-cyan-300 dark:hover:bg-slate-950/35"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={26} />
                        </button>

                        <button
                            type="button"
                            onClick={goToNextImage}
                            className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-[#23404a] shadow-lg backdrop-blur-sm transition hover:bg-white/35 dark:bg-slate-950/10 dark:text-cyan-300 dark:hover:bg-slate-950/35"
                            aria-label="Next image"
                        >
                            <ChevronRight size={26} />
                        </button>
                    </>
                )}
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative min-w-[140px] h-24 rounded-2xl overflow-hidden cursor-pointer border-4 transition-all duration-300 
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
