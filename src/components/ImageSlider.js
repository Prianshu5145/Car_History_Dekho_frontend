import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  // Image arrays for mobile and laptop views
  const mobileImages = [
    'https://res.cloudinary.com/dunsl7vvf/image/upload/v1746554425/WhatsApp_Image_2025-05-06_at_23.27.24_d77182e4_urh1dx.jpg',
   
  ];

  const laptopImages = [
   
   
    'https://res.cloudinary.com/dunsl7vvf/image/upload/v1746562682/Your_paragraph_text_sw617h.png',
   
    
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Automatically change the image every 1.7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (isMobile ? mobileImages.length : laptopImages.length));
    }, 1700);

    return () => clearInterval(interval);
  }, [isMobile, mobileImages.length, laptopImages.length]);

  // Detect if the screen size changes to switch between mobile and laptop images
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentImage = isMobile ? mobileImages[currentImageIndex] : laptopImages[currentImageIndex];

  return (
    <div className="relative w-full h-76 lg:h-[58vh] lg:w-full overflow-hidden rounded-sm m-0 p-0">
    
      {/* Image slider */}
      <img
  src={currentImage}
  alt="Slideshow"
  className="w-full h-full object-contain transition-all duration-450 ease-in-out lg:scale-[1.02]"
/>


      {/* Pagination indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
      {(isMobile ? mobileImages.length : laptopImages.length) > 1 && (
  <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
    {(isMobile ? mobileImages : laptopImages).map((_, index) => (
      <span
        key={index}
        className={`w-1 h-1 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
      />
    ))}
  </div>
)}

      </div>
    </div>
  );
};

export default ImageSlider;
