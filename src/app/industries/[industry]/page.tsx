"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, TrendingUp, Users, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Utility to format slug to title (e.g. real-estate -> Real Estate)
const formatTitle = (slug: string) => {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const getIndustryData = (slug: string) => {
  const validSlugs = [
    "healthcare", "education", "restaurants", "hotels", "travel", "real-estate", 
    "construction", "finance", "fashion", "jewellery", "fitness", "gyms", 
    "beauty", "automobile", "technology", "manufacturing", "ngos", "startups", "e-commerce"
  ];

  if (!validSlugs.includes(slug)) return null;

  const title = formatTitle(slug);

  // In a real app, this would fetch unique data per industry from a database/CMS
  // For the template, we'll generate dynamic but structured content based on the slug.
  return {
    title: title,
    heroTitle: `Digital Transformation for ${title}`,
    overview: `The ${title} industry is evolving rapidly. We provide end-to-end digital solutions tailored specifically to the unique challenges and opportunities within the ${title} sector, helping you streamline operations, attract more customers, and dominate your market.`,
    challenges: [
      "Outdated legacy systems slowing down operations",
      "High customer acquisition costs and low retention",
      "Lack of data-driven decision making",
      "Poor user experience across digital touchpoints"
    ],
    solutions: [
      { title: "Custom Web & App Platforms", desc: `Bespoke platforms designed for the specific needs of ${title} businesses and their users.` },
      { title: "AI & Automation", desc: "Automate repetitive workflows, customer support, and lead routing to save hundreds of hours." },
      { title: "Data Analytics Dashboards", desc: "Real-time insights into your KPIs, sales, and customer behavior." },
      { title: "Targeted Growth Marketing", desc: `Omnichannel campaigns engineered to capture high-intent leads in the ${title} space.` }
    ]
  };
};

export default function IndustryDetailsPage({ params }: { params: { slug: string } }) {
  const data = getIndustryData(params.slug);

  if (!data) notFound();

  return (
    <div className="min-h-screen text-foreground pb-24 selection:bg-primary/20">
      
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 border-b border-border/50 text-center">
        <div className="max-w-4xl mx-auto">
          <Link href="/industries" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-medium">
            <ArrowLeft size={16} /> Back to All Industries
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20 uppercase tracking-widest">
            {data.title} Solutions
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black mb-6">
            {data.heroTitle}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {data.overview}
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 pt-24">
        
        {/* THE CHALLENGES */}
        <div className="grid md:grid-cols-2 gap-16 mb-32 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black mb-8">The challenges holding<br/> <span className="text-red-500">{data.title}</span> businesses back.</h2>
            <ul className="space-y-6">
              {data.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-red-500 font-bold text-sm">{i + 1}</span>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">{challenge}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-12 rounded-[40px] border border-border bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px]" />
             <div className="flex flex-col gap-6 relative z-10">
               <div className="flex items-center gap-4 bg-background p-4 rounded-2xl shadow-lg border border-border/50 w-[80%] opacity-50">
                 <div className="w-10 h-10 rounded-full bg-muted" />
                 <div className="flex-1 space-y-2"><div className="h-2 w-full bg-muted rounded" /><div className="h-2 w-2/3 bg-muted rounded" /></div>
               </div>
               <div className="flex items-center gap-4 bg-background p-4 rounded-2xl shadow-lg border border-red-500/30 w-[90%] ml-auto relative">
                 <div className="absolute -left-3 -top-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">Inefficient!</div>
                 <div className="w-10 h-10 rounded-full bg-red-500/20" />
                 <div className="flex-1 space-y-2"><div className="h-2 w-full bg-muted rounded" /><div className="h-2 w-1/2 bg-muted rounded" /></div>
               </div>
               <div className="flex items-center gap-4 bg-background p-4 rounded-2xl shadow-lg border border-border/50 w-[80%] opacity-50">
                 <div className="w-10 h-10 rounded-full bg-muted" />
                 <div className="flex-1 space-y-2"><div className="h-2 w-full bg-muted rounded" /></div>
               </div>
             </div>
          </div>
        </div>

        {/* THE SOLUTIONS */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Our <span className="text-primary">Solutions</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">How we engineer growth and operational efficiency for your business.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.solutions.map((solution, i) => {
              const icons = [Zap, TrendingUp, Shield, Users];
              const Icon = icons[i % icons.length];
              
              return (
                <div key={i} className="glass-card p-8 rounded-3xl border border-border hover:border-primary/50 transition-colors group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{solution.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{solution.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card bg-primary/5 border border-primary/20 p-12 md:p-20 rounded-[40px] text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to dominate the {data.title} space?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book a strategy session with our industry experts to see exactly how we can accelerate your growth.
          </p>
          <Link href="/contact">
            <Button variant="premium" size="lg" className="rounded-full h-14 px-10 text-lg">
              Talk to an Expert
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
