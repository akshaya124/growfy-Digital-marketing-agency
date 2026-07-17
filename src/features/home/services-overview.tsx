"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MonitorSmartphone, PenTool, TrendingUp, Bot } from "lucide-react";

const services = [
  {
    icon: MonitorSmartphone,
    title: "Web & App Development",
    description: "High-performance websites and mobile apps built with cutting-edge tech stacks like Next.js and React Native.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: PenTool,
    title: "UI/UX & Branding",
    description: "Stunning visual identities and intuitive user interfaces that captivate and convert your audience.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven SEO, Google Ads, and Meta Ads strategies to dominate your market and maximize ROI.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "Intelligent chatbots, WhatsApp automation, and CRM integrations to put your business on autopilot.",
    color: "from-emerald-500 to-teal-400"
  }
];

export function ServicesOverview() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Comprehensive digital solutions tailored to elevate your brand, streamline your operations, and drive explosive growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="glass-card rounded-2xl p-8 h-full border border-black/5 hover:border-primary/20 transition-colors z-10 relative overflow-hidden">
                {/* Hover gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.color} text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon size={28} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mt-auto">
                  <Link href="/services" className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-indigo-600 transition-colors">
                    Explore Details
                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href="/services">
            <Button variant="premium" size="lg">View All Services</Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
