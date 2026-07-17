"use client";

import { motion } from "framer-motion";

const clients = [
  "Acme Corp",
  "Global Tech",
  "Zenith Solutions",
  "Nova Systems",
  "Apex Brands",
  "Pulse Media",
];

export function TrustedBy() {
  return (
    <section className="py-12 border-y border-border/50 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
          Trusted by industry leaders
        </p>
        
        {/* Marquee effect */}
        <div className="relative flex overflow-x-hidden">
          <motion.div
            className="flex space-x-16 whitespace-nowrap min-w-full"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {clients.map((client, index) => (
              <div key={index} className="text-2xl md:text-3xl font-black text-foreground/20 uppercase">
                {client}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {clients.map((client, index) => (
              <div key={`dup-${index}`} className="text-2xl md:text-3xl font-black text-foreground/20 uppercase">
                {client}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
