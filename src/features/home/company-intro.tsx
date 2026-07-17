"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CompanyIntro() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Empowering your business for the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">digital era</span>.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              At Growfy, we believe in the synergy of stunning design, robust engineering, and intelligent automation. We don't just build websites; we craft comprehensive digital ecosystems designed to accelerate your growth and outpace the competition.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
               <Link href="/about">
                 <Button variant="premium" size="lg">Learn Our Story</Button>
               </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card rounded-2xl p-8 relative z-10 border border-white/10 shadow-2xl">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-primary">150+</h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Projects Delivered</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-indigo-500">98%</h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Client Satisfaction</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-purple-500">5+</h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Experience</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-accent-foreground">24/7</h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Dedicated Support</p>
                </div>
              </div>
            </div>
            
            {/* Decorative background element for the card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-indigo-500/20 rounded-[2rem] blur-xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
