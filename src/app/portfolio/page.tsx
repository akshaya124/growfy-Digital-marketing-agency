"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Paintbrush, MonitorPlay, Zap, Quote } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Websites", "Mobile Apps", "Branding", "Automation"];
const industries = ["All", "E-Commerce", "Healthcare", "Fintech", "Real Estate"];

const projects = [
  {
    id: 1,
    title: "Nova E-Commerce App",
    category: "Mobile Apps",
    industry: "E-Commerce",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop",
    desc: "A high-conversion React Native app that increased mobile sales by 140%.",
    tech: ["React Native", "Firebase", "Stripe"]
  },
  {
    id: 2,
    title: "Aura Branding & Web",
    category: "Branding",
    industry: "Real Estate",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    desc: "Complete brand overhaul and luxury web experience for a premium real estate firm.",
    tech: ["Next.js", "Figma", "GSAP"]
  },
  {
    id: 3,
    title: "MediSync CRM",
    category: "Automation",
    industry: "Healthcare",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    desc: "Automated patient intake and CRM workflows saving 40+ hours a week.",
    tech: ["Python", "AWS", "React"]
  },
  {
    id: 4,
    title: "FinTrack Dashboard",
    category: "Websites",
    industry: "Fintech",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    desc: "A real-time financial tracking dashboard with advanced data visualization.",
    tech: ["Vue.js", "D3.js", "Node.js"]
  },
  {
    id: 5,
    title: "Luxe Fashion Platform",
    category: "Websites",
    industry: "E-Commerce",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop",
    desc: "Headless Shopify integration for lightning-fast shopping experiences.",
    tech: ["Next.js", "Shopify", "Tailwind"]
  },
  {
    id: 6,
    title: "AI Support Bot",
    category: "Automation",
    industry: "Fintech",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
    desc: "NLP-driven customer support bot resolving 70% of tickets automatically.",
    tech: ["OpenAI", "Python", "Twilio"]
  },
  {
    id: 7,
    title: "Oasis Wellness Identity",
    category: "Branding",
    industry: "Healthcare",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    desc: "Full brand identity design including logo, typography, and premium packaging for a luxury spa.",
    tech: ["Illustrator", "Photoshop", "Print Design"]
  },
  {
    id: 8,
    title: "Vanguard Capital Rebrand",
    category: "Branding",
    industry: "Fintech",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    desc: "Modernizing a legacy financial firm's image with a sleek new logo and comprehensive brand book.",
    tech: ["Figma", "InDesign", "Strategy"]
  }
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndustry, setActiveIndustry] = useState("All");

  const filteredProjects = projects.filter(project => {
    const matchCategory = activeCategory === "All" || project.category === activeCategory;
    const matchIndustry = activeIndustry === "All" || project.industry === activeIndustry;
    return matchCategory && matchIndustry;
  });

  return (
    <div className="min-h-screen text-foreground pb-0">
      
      {/* 1. HERO */}
      <section className="relative pt-40 pb-20 px-6 border-b border-border/50 overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] -z-10" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
          Our Work
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black mb-6">
          Proof is in the <span className="text-primary">Pixels.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Explore our featured projects, case studies, and the success stories of the brands we've helped scale.
        </motion.p>
      </section>

      {/* 2 & 3 & 4 & 5. CATEGORIES, INDUSTRY FILTER & GALLERY */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 z-10 relative">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button 
                key={cat} 
                variant={activeCategory === cat ? "premium" : "outline"}
                className={`rounded-full ${activeCategory === cat ? '' : 'bg-background'}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">Filter by Industry:</span>
            <select 
              className="bg-background border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary w-full md:w-auto"
              value={activeIndustry}
              onChange={(e) => setActiveIndustry(e.target.value)}
            >
              {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>
        </div>

        {/* Gallery */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden relative mb-6">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <Button variant="premium" className="w-fit rounded-full gap-2">View Project Details <ArrowRight size={16}/></Button>
                  </div>
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                    {project.category}
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No projects found matching the selected filters.
          </div>
        )}
      </section>

      {/* 6. BEFORE & AFTER */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16">The Growfy Transformation</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="glass-card p-6 rounded-3xl border border-red-500/20 bg-red-500/5 relative overflow-hidden">
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">Before</div>
              <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop" className="rounded-2xl opacity-50 grayscale" alt="Old Design" />
              <div className="mt-6 text-left">
                <h4 className="font-bold text-xl mb-2 text-red-500">The Problem</h4>
                <p className="text-muted-foreground text-sm">Outdated UI, slow load times, and poor conversion funnel costing the client thousands in lost revenue.</p>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
              <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">After</div>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" className="rounded-2xl shadow-2xl" alt="New Design" />
              <div className="mt-6 text-left">
                <h4 className="font-bold text-xl mb-2 text-emerald-500">The Solution</h4>
                <p className="text-muted-foreground text-sm">A highly optimized, Next.js powered experience that increased conversions by 140% in the first month.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLIENT REVIEWS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
         <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-black mb-6">Don't just take our word for it.</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Michael Chang", role: "CEO, Nova E-Commerce", quote: "Growfy didn't just build us an app; they revolutionized how our customers shop. The ROI has been incredible." },
            { name: "Sarah Lin", role: "Founder, Aura Real Estate", quote: "The branding and web experience they crafted perfectly captures our luxury ethos. We've seen a huge spike in high-ticket leads." },
            { name: "Dr. James Wilson", role: "Director, MediSync", quote: "The CRM automation has literally saved our staff hundreds of hours. Their technical expertise is unmatched." }
          ].map((review, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl border border-border relative">
              <Quote className="absolute top-6 right-6 text-primary/10 w-16 h-16" />
              <div className="flex gap-1 mb-6 text-yellow-500">
                {"★★★★★"}
              </div>
              <p className="text-muted-foreground text-lg italic mb-8 relative z-10">"{review.quote}"</p>
              <div>
                <h4 className="font-bold">{review.name}</h4>
                <p className="text-sm text-primary">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. TECHNOLOGIES USED (Global) */}
      <section className="py-24 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-10">Powered by the Best Tech</h2>
          <div className="flex flex-wrap justify-center gap-6 opacity-70">
            {["Next.js", "React Native", "Tailwind CSS", "Figma", "Node.js", "Python", "AWS", "OpenAI"].map((tech, i) => (
              <span key={i} className="text-xl font-bold">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="py-24 px-6 border-t border-border/50 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Have a project in mind?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's build something extraordinary together. Schedule a discovery call to see how we can transform your ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button variant="premium" size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto">
                Start a Project
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-background">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
