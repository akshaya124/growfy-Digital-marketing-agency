"use client";

import { motion } from "framer-motion";

interface SliderImage {
  id: string;
  url: string;
  title: string;
}

interface ServiceSliderProps {
  images: SliderImage[];
}

export function ServiceSlider({ images }: ServiceSliderProps) {
  const displayImages = images && images.length > 0 ? images : [
    { id: "fb1", url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop", title: "Creative Design" },
    { id: "fb2", url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop", title: "Strategy" },
    { id: "fb3", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", title: "Data Analysis" },
    { id: "fb4", url: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop", title: "Marketing" }
  ];

  // Duplicate images to create an infinite loop effect
  const extendedImages = [...displayImages, ...displayImages, ...displayImages, ...displayImages];

  return (
    <div className="w-full overflow-hidden py-10 bg-primary/5 border-y border-primary/10 my-20">
      <div className="flex w-max">
        <motion.div
          className="flex gap-6 px-3"
          animate={{ x: [0, -1920] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {extendedImages.map((image, idx) => (
            <div 
              key={`${image.id}-${idx}`} 
              className="relative w-[300px] md:w-[400px] aspect-[4/3] rounded-3xl overflow-hidden shrink-0 group"
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <h3 className="text-white font-bold text-lg">{image.title}</h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
