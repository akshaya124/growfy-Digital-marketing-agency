"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { 
  Building2, Leaf, Coffee, Scissors, Camera, Home, CupSoda, 
  Stethoscope, Smile, Activity, HeartPulse, ShoppingBag, Shirt 
} from "lucide-react";

type ClientItem = {
  name: string;
  icon?: any;
  url?: string;
};

const fallbackClients: ClientItem[] = Array(6).fill({ name: "Add Client", isPlaceholder: true });

export function TrustedBy() {
  const [clients, setClients] = useState<ClientItem[]>(fallbackClients);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const q = query(
          collection(db, "gallery"), 
          where("category", "==", "Trusted Clients")
        );
        const querySnapshot = await getDocs(q);
        const fetchedClients: ClientItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedClients.push({
            name: data.title,
            url: data.url,
          });
        });

        if (fetchedClients.length > 0) {
          setClients(fetchedClients);
        }
      } catch (error) {
        console.error("Error fetching trusted clients:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <section className="py-12 border-y border-border/50 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
          Trusted by industry leaders
        </p>

        {/* Marquee effect */}
        <div className="relative flex overflow-x-hidden">
          <motion.div
            className="flex space-x-16 whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
          >
            {clients.map((client, index) => (
              <div key={index} className="flex flex-col items-center justify-center space-y-4">
                {client.url ? (
                  <img 
                    src={client.url} 
                    alt={client.name} 
                    className="w-16 h-16 md:w-24 md:h-24 object-contain hover:scale-110 transition-transform duration-300" 
                  />
                ) : (
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-background/50">
                    <span className="text-[10px] text-muted-foreground/50 uppercase font-bold">Logo</span>
                  </div>
                )}
                {client.name !== "Add Client" && (
                  <div className="text-xl md:text-2xl font-black text-foreground/40 uppercase">
                    {client.name}
                  </div>
                )}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {clients.map((client, index) => (
              <div key={`dup-${index}`} className="flex flex-col items-center justify-center space-y-4">
                {client.url ? (
                  <img 
                    src={client.url} 
                    alt={client.name} 
                    className="w-16 h-16 md:w-24 md:h-24 object-contain hover:scale-110 transition-transform duration-300" 
                  />
                ) : (
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-background/50">
                    <span className="text-[10px] text-muted-foreground/50 uppercase font-bold">Logo</span>
                  </div>
                )}
                {client.name !== "Add Client" && (
                  <div className="text-xl md:text-2xl font-black text-foreground/40 uppercase">
                    {client.name}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
