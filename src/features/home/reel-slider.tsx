"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Play, VolumeX, Volume2, ChevronLeft, ChevronRight } from "lucide-react";

interface Reel {
  id: string;
  url: string;
  title: string;
}

export function ReelSlider({ initialReels = [] }: { initialReels?: Reel[] }) {
  const [reels, setReels] = useState<Reel[]>(initialReels);
  const [muted, setMuted] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Pause auto-scroll if a reel is open in full screen
      if (sliderRef.current && !selectedReel) {
        const slider = sliderRef.current;
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (slider.scrollLeft >= maxScroll - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' }); // Loop back
        } else {
          slider.scrollBy({ left: 320, behavior: 'smooth' }); // Scroll one item
        }
      }
    }, 3000); // Auto move every 3 seconds

    return () => clearInterval(interval);
  }, [selectedReel]);

  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };



  const displayReels = reels.length > 0 ? reels : [
    { id: '1', title: 'Amazing Web Design', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    { id: '2', title: 'Creative Process', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
    { id: '3', title: 'Behind the Scenes', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
    { id: '4', title: 'Client Testimonial', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
    { id: '5', title: 'UI/UX Highlights', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
    { id: '6', title: 'Development Updates', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' }
  ];

  return (
    <>
      <div className="w-full overflow-hidden py-12 bg-black/5 rounded-3xl relative">
        <div className="px-8 md:px-16 mb-8 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Latest Reels
            </h2>
            <p className="text-muted-foreground mt-2">See our recent work and updates in motion.</p>
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
            <button 
              onClick={() => setMuted(!muted)}
              className="p-3 bg-background border border-border/50 rounded-full shadow-sm hover:scale-105 transition-transform ml-2"
            >
              {muted ? <VolumeX className="w-5 h-5 text-muted-foreground" /> : <Volume2 className="w-5 h-5 text-primary" />}
            </button>
          </div>
        </div>

        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-8 md:px-16 pb-8 custom-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayReels.map((reel, i) => (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={reel.id}
              onClick={() => setSelectedReel(reel)}
              className="shrink-0 w-[280px] md:w-[320px] aspect-[9/16] snap-center relative rounded-2xl overflow-hidden shadow-2xl group bg-black cursor-pointer"
            >
              <video
                src={reel.url}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                autoPlay
                muted={muted}
                loop
                playsInline
                preload="metadata"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 flex flex-col justify-end p-6 pointer-events-none">
                <p className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-md">
                  {reel.title.replace(/\.[^/.]+$/, "")}
                </p>
                <div className="mt-4 flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                   </div>
                   <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">Click to Expand</span>
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

      {/* Full Screen Video Modal */}
      {selectedReel && (
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedReel(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <VolumeX className="w-6 h-6 hidden" /> {/* Hidden hack for spacing */}
            <span className="font-bold">Close X</span>
          </button>
          
          <div className="relative w-full max-w-md aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
             <video
                src={selectedReel.url}
                className="w-full h-full object-cover"
                autoPlay
                controls
                playsInline
              />
          </div>
        </div>
      )}
    </>
  );
}
