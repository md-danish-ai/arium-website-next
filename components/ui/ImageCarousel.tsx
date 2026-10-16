"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
  intervalMs?: number;
}

export default function ImageCarousel({ images, intervalMs = 2500 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  return (
    <div className="ov-showcase reveal stagger-1">
      <div className="ov-showcase-stage">
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`ov-showcase-slide ${index === currentIndex ? "is-active" : ""}`}
          >
            <Image 
              src={img.src} 
              alt={img.alt} 
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <div className="ov-showcase-nav">
        {images.map((_, index) => (
          <button 
            key={index}
            className={`ov-showcase-dot ${index === currentIndex ? "is-active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="ov-dot-progress"></span>
          </button>
        ))}
      </div>
    </div>
  );
}
