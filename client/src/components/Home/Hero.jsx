import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const images = [
  "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80"
];

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              currentImage === index
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className={`w-full h-full object-cover transform scale-105 transition-transform duration-[10000ms] ${
                currentImage === index ? 'scale-100' : 'scale-105'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="min-h-screen flex items-center">
          <div className="max-w-2xl space-y-6 py-12 lg:py-0">
            <span className="text-white font-medium tracking-wider uppercase text-sm bg-[#B8860B] px-4 py-2 rounded-full inline-block">
              New Arrival
            </span>
            <h1 className="text-4xl lg:text-7xl font-bold text-white leading-tight">
              Discover Our
              <br />
              <span className="text-[#B8860B]">New Collection</span>
            </h1>
            <p className="text-gray-200 text-lg max-w-md">
              Transform your space with our curated selection of modern furniture. 
              Each piece is crafted to bring comfort and style to your home.
            </p>
            <Link to="/products">
            <button className="bg-[#B8860B] text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#9B7300] transition-all hover:scale-105 duration-300">
              BUY NOW
              <ArrowRight size={20} />
            </button>            
            </Link>

            {/* Slider Indicators */}
            <div className="flex gap-3 mt-8">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-12 h-1 rounded-full transition-all duration-300 ${
                    currentImage === index
                      ? 'bg-[#B8860B] w-20'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;