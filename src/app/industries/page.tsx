"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, BookOpen, Utensils, Building, Plane, Home, HardHat, Landmark, Shirt, Gem, Dumbbell, Zap, Sparkles, Car, Cpu, Factory, HeartHandshake, Rocket, ShoppingCart } from "lucide-react";
import Link from "next/link";

const industriesList = [
  { name: "Healthcare", slug: "healthcare", icon: Activity },
  { name: "Education", slug: "education", icon: BookOpen },
  { name: "Restaurants", slug: "restaurants", icon: Utensils },
  { name: "Hotels", slug: "hotels", icon: Building },
  { name: "Travel", slug: "travel", icon: Plane },
  { name: "Real Estate", slug: "real-estate", icon: Home },
  { name: "Construction", slug: "construction", icon: HardHat },
  { name: "Finance", slug: "finance", icon: Landmark },
  { name: "Fashion", slug: "fashion", icon: Shirt },
  { name: "Jewellery", slug: "jewellery", icon: Gem },
  { name: "Fitness", slug: "fitness", icon: Dumbbell },
  { name: "Gyms", slug: "gyms", icon: Zap },
  { name: "Beauty", slug: "beauty", icon: Sparkles },
  { name: "Automobile", slug: "automobile", icon: Car },
  { name: "Technology", slug: "technology", icon: Cpu },
  { name: "Manufacturing", slug: "manufacturing", icon: Factory },
  { name: "NGOs", slug: "ngos", icon: HeartHandshake },
  { name: "Startups", slug: "startups", icon: Rocket },
  { name: "E-Commerce", slug: "e-commerce", icon: ShoppingCart }
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen text-foreground pb-24 selection:bg-primary/20">
      
      {/* HERO */}
      <section className="relative pt-40 pb-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
          Tailored Solutions
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black mb-6">
          Built for <span className="text-primary">Your Industry.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          We don't do cookie-cutter. Explore how we engineer specialized digital ecosystems and growth strategies for your specific sector.
        </motion.p>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {industriesList.map((industry, i) => (
            <Link href={`/industries/${industry.slug}`} key={industry.slug}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.05 }}
                className="group glass-card p-6 md:p-8 rounded-3xl border border-border hover:border-primary/50 transition-all hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center h-full"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                  <industry.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-4">{industry.name}</h3>
                <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors font-medium">
                  View Solutions <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
      
    </div>
  );
}
