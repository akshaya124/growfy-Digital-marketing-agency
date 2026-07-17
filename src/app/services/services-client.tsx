"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Code, Smartphone, Globe, ShoppingCart, 
  PenTool, Paintbrush, Image as ImageIcon,
  TrendingUp, Share2, Search, Mail, Users,
  Camera, Video, Clapperboard, MonitorPlay,
  Bot, MessageSquare, Database, Zap, Workflow
} from "lucide-react";
import { ServiceSlider } from "@/features/services/service-slider";

const categories = [
  {
    title: "Development",
    desc: "Robust, scalable, and secure engineering solutions.",
    color: "from-blue-500 to-cyan-400",
    services: [
      { name: "Website Development", icon: Globe, slug: "website-development" },
      { name: "Web Applications", icon: Code, slug: "web-applications" },
      { name: "Mobile Apps", icon: Smartphone, slug: "mobile-apps" },
      { name: "E-Commerce", icon: ShoppingCart, slug: "e-commerce" },
      { name: "Custom Software", icon: Database, slug: "custom-software" }
    ]
  },
  {
    title: "Design",
    desc: "Aesthetics that communicate your brand's unique value.",
    color: "from-purple-500 to-pink-500",
    services: [
      { name: "UI/UX Design", icon: PenTool, slug: "ui-ux-design" },
      { name: "Branding", icon: Paintbrush, slug: "branding" },
      { name: "Logo Design", icon: ImageIcon, slug: "logo-design" },
      { name: "Graphic Design", icon: Paintbrush, slug: "graphic-design" }
    ]
  },
  {
    title: "Marketing",
    desc: "Data-driven campaigns that drive explosive growth.",
    color: "from-orange-500 to-red-500",
    services: [
      { name: "SEO", icon: Search, slug: "seo" },
      { name: "Social Media Marketing", icon: Share2, slug: "social-media-marketing" },
      { name: "Google Ads", icon: TrendingUp, slug: "google-ads" },
      { name: "Meta Ads", icon: TrendingUp, slug: "meta-ads" },
      { name: "Performance Marketing", icon: Zap, slug: "performance-marketing" },
      { name: "Email Marketing", icon: Mail, slug: "email-marketing" },
      { name: "Influencer Marketing", icon: Users, slug: "influencer-marketing" }
    ]
  },
  {
    title: "Media",
    desc: "High-quality visual content that tells your story.",
    color: "from-yellow-400 to-orange-500",
    services: [
      { name: "Photography", icon: Camera, slug: "photography" },
      { name: "Videography", icon: Video, slug: "videography" },
      { name: "Video Editing", icon: Clapperboard, slug: "video-editing" },
      { name: "Product Shoots", icon: MonitorPlay, slug: "product-shoots" }
    ]
  },
  {
    title: "AI & Automation",
    desc: "Intelligent systems that put your business on autopilot.",
    color: "from-emerald-500 to-teal-400",
    services: [
      { name: "AI Chatbots", icon: Bot, slug: "ai-chatbots" },
      { name: "WhatsApp Automation", icon: MessageSquare, slug: "whatsapp-automation" },
      { name: "CRM Automation", icon: Database, slug: "crm-automation" },
      { name: "AI Assistants", icon: Bot, slug: "ai-assistants" },
      { name: "Workflow Automation", icon: Workflow, slug: "workflow-automation" }
    ]
  }
];

export function ServicesClient({ 
  designImages, 
  marketingImages, 
  mediaImages 
}: { 
  designImages: any[]; 
  marketingImages: any[]; 
  mediaImages: any[];
}) {
  return (
    <div className="min-h-screen text-foreground pb-24">
      
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            Digital Solutions for <br/> <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Every Challenge</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            From stunning web experiences to AI-powered automations, we provide a full spectrum of services to elevate your brand.
          </motion.p>
        </div>
      </section>

      {/* CATEGORIES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="space-y-32">
          {categories.map((category, catIdx) => (
            <div key={catIdx} className="relative">
              
              <div className="mb-12">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4"
                >
                  <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${category.color} block`} />
                  {category.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-xl text-muted-foreground"
                >
                  {category.desc}
                </motion.p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link href={`/services/${service.slug}`}>
                      <div className="glass-card p-6 rounded-2xl border border-black/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 group h-full cursor-pointer bg-card hover:shadow-xl">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                          <service.icon size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                          {service.name}
                        </h3>
                        <div className="flex items-center text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors mt-4">
                          Learn More <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* SLIDERS INJECTED BETWEEN CATEGORIES */}
              {category.title === "Development" && <ServiceSlider images={designImages} />}
              {category.title === "Design" && <ServiceSlider images={marketingImages} />}
              {category.title === "Marketing" && <ServiceSlider images={mediaImages} />}

            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-32 max-w-4xl mx-auto px-6 text-center">
        <div className="glass-card rounded-[40px] p-12 bg-primary/5 border border-primary/10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Not sure what you need?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Let's get on a discovery call and figure out the best strategy for your business.
          </p>
          <Link href="/contact">
            <Button variant="premium" size="lg" className="rounded-full">Book a Strategy Call</Button>
          </Link>
        </div>
      </section>
      
    </div>
  );
}
