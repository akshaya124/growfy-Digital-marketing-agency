"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Monitor, 
  Smartphone, 
  PenTool, 
  Search, 
  Share2, 
  Video, 
  Bot, 
  Database,
  MessageCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

const orbitingServices = [
  // Orbit 1 (Inner)
  { id: "website-development", icon: Monitor, label: "Web Dev", orbitSize: 250, duration: 20, delay: 0, color: "text-blue-500", shadow: "rgba(59,130,246,0.5)" },
  { id: "mobile-apps", icon: Smartphone, label: "Mobile Apps", orbitSize: 250, duration: 20, delay: -10, color: "text-green-500", shadow: "rgba(34,197,94,0.5)" },
  
  // Orbit 2
  { id: "ui-ux-design", icon: PenTool, label: "UI/UX", orbitSize: 400, duration: 30, delay: 0, color: "text-purple-500", shadow: "rgba(168,85,247,0.5)" },
  { id: "seo", icon: Search, label: "SEO", orbitSize: 400, duration: 30, delay: -15, color: "text-yellow-500", shadow: "rgba(234,179,8,0.5)" },
  
  // Orbit 3
  { id: "social-media-marketing", icon: Share2, label: "Social Media", orbitSize: 550, duration: 40, delay: 0, color: "text-pink-500", shadow: "rgba(236,72,153,0.5)" },
  { id: "video-editing", icon: Video, label: "Video Editing", orbitSize: 550, duration: 40, delay: -20, color: "text-red-500", shadow: "rgba(239,68,68,0.5)" },
  
  // Orbit 4 (Outer)
  { id: "ai-chatbots", icon: Bot, label: "AI Chatbots", orbitSize: 700, duration: 50, delay: 0, color: "text-cyan-500", shadow: "rgba(6,182,212,0.5)" },
  { id: "crm-automation", icon: Database, label: "CRM Automation", orbitSize: 700, duration: 50, delay: -25, color: "text-orange-500", shadow: "rgba(249,115,22,0.5)" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-left max-w-2xl pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
                <Sparkles className="w-4 h-4" />
                <span>Award-Winning Marketing Agency</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1] text-foreground">
                We Build Brands <br/>
                That <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Grow <br/>Businesses</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                Creative Strategy. Stunning Design. Powerful Marketing. Measurable Results. Tap the orbiting icons to see our services!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button variant="premium" size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full shadow-[0_8px_30px_rgba(124,58,237,0.3)]">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Chat on WhatsApp
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full font-semibold hover:bg-secondary">
                    Our Work <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Solar System */}
          <div className="relative h-[600px] w-full flex items-center justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 lg:left-[55%] -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
              
              {/* Mild tilt and diagonal rotation */}
              <div className="relative flex items-center justify-center w-full h-full group" style={{ transformStyle: "preserve-3d", transform: "rotate(-15deg) rotateX(50deg)" }}>
                
                {/* Central Logo */}
                <div 
                  className="absolute z-20 w-32 h-32 rounded-full bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.6)] pointer-events-auto hover:scale-110 hover:shadow-[0_0_80px_rgba(124,58,237,0.8)] transition-all duration-300"
                  style={{ transform: "rotateX(-50deg) rotate(15deg)" }}
                >
                  <span className="text-white text-6xl font-black">G</span>
                </div>

                {/* Render Orbits */}
                {[250, 400, 550, 700].map((size, i) => (
                  <div 
                    key={`orbit-ring-${i}`}
                    className="absolute rounded-full border border-primary/20 pointer-events-none"
                    style={{ width: size, height: size }}
                  />
                ))}

                {/* Render Service Planets */}
                {orbitingServices.map((service, index) => (
                  <motion.div
                    key={index}
                    animate={{ rotate: 360 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: service.duration, 
                      ease: "linear",
                      delay: service.delay
                    }}
                    className="absolute pointer-events-none flex items-center justify-center"
                    style={{ width: service.orbitSize, height: service.orbitSize, transformStyle: "preserve-3d" }}
                  >
                    <motion.div 
                      className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-auto"
                      style={{ transformStyle: "preserve-3d" }}
                      animate={{ rotate: -360 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: service.duration, 
                        ease: "linear",
                        delay: service.delay
                      }}
                    >
                      <Link href={`/services/${service.id}`} className="group/planet relative flex flex-col items-center justify-center p-6 -m-6">
                        <div 
                          className="w-14 h-14 rounded-full bg-background/90 backdrop-blur-xl border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 group-hover/planet:scale-[1.5] group-hover/planet:bg-white"
                          style={{ 
                            transform: "rotateX(-50deg) rotate(15deg)", 
                            boxShadow: `0 0 50px ${service.shadow}` 
                          }}
                        >
                          <service.icon className={`w-7 h-7 ${service.color} group-hover/planet:text-primary transition-colors`} />
                        </div>
                        {/* Tooltip Label */}
                        <div 
                          className="absolute top-16 opacity-0 group-hover/planet:opacity-100 transition-all duration-300 group-hover/planet:translate-y-2 bg-primary text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg whitespace-nowrap pointer-events-none"
                          style={{ transform: "rotateX(-50deg) rotate(15deg)" }}
                        >
                          {service.label}
                        </div>
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}

              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Subtle Background Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
    </section>
  );
}
