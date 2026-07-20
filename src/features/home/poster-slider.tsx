"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react";

interface Poster {
  id: string;
  url: string;
  title: string;
}

export function PosterSlider({ initialPosters = [] }: { initialPosters?: Poster[] }) {
  const [posters, setPosters] = useState<Poster[]>(initialPosters);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current && !selectedPoster) {
        const slider = sliderRef.current;
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (slider.scrollLeft >= maxScroll - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' }); // Loop back
        } else {
          slider.scrollBy({ left: 320, behavior: 'smooth' }); // Scroll one item
        }
      }
    }, 4000); // Auto move every 4 seconds

    return () => clearInterval(interval);
  }, [selectedPoster]);

  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const displayPosters = posters.length > 0 ? posters : [
    { id: '1', title: 'Creative Campaign', url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop' },
    { id: '2', title: 'Brand Identity', url: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=600&auto=format&fit=crop' },
    { id: '3', title: 'Social Media', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop' },
    { id: '4', title: 'UI/UX Design', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <>
      <div className="w-full overflow-hidden py-12 bg-primary/5 rounded-3xl relative mt-12">
        <div className="px-8 md:px-16 mb-8 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Featured Posters
            </h2>
            <p className="text-muted-foreground mt-2">Explore our latest visual campaigns and graphics.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={scrollLeft}
              className="p-3 bg-background border border-border/50 rounded-full shadow-sm hover:scale-105 hover:bg-muted transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-3 bg-background border border-border/50 rounded-full shadow-sm hover:scale-105 hover:bg-muted transition-all"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-8 md:px-16 pb-8 custom-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayPosters.map((poster, i) => (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={poster.id}
              onClick={() => setSelectedPoster(poster)}
              className="shrink-0 w-[280px] md:w-[400px] aspect-[4/5] snap-center relative rounded-2xl overflow-hidden shadow-2xl group bg-black cursor-pointer"
            >
              <img
                src={poster.url}
                alt={poster.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 flex flex-col justify-end p-6 pointer-events-none">
                <p className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-md">
                  {poster.title.replace(/\.[^/.]+$/, "")}
                </p>
                <div className="mt-4 flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-white ml-0.5" />
                   </div>
                   <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">View Poster</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>

      {/* Full Screen Image Modal */}
      {selectedPoster && (
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedPoster(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center p-2">
             <img
                src={selectedPoster.url}
                alt={selectedPoster.title}
                className="max-w-full max-h-full object-contain rounded-2xl"
              />
          </div>
        </div>
      )}
    </>
  );
}
