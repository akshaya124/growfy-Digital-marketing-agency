"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    id: "nova-ecommerce",
    title: "Nova E-Commerce App",
    category: "Mobile Apps",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop",
    desc: "A high-conversion React Native app that increased mobile sales by 140%."
  },
  {
    id: "aura-real-estate",
    title: "Aura Branding & Web",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    desc: "Complete brand overhaul and luxury web experience for a premium real estate firm."
  },
  {
    id: "medisync-crm",
    title: "MediSync CRM",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    desc: "Automated patient intake and CRM workflows saving 40+ hours a week."
  },
  {
    id: "fintrack-dashboard",
    title: "FinTrack Dashboard",
    category: "Websites",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    desc: "A real-time financial tracking dashboard with advanced data visualization."
  },
  {
    id: "luxe-fashion-platform",
    title: "Luxe Fashion Platform",
    category: "Websites",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop",
    desc: "Headless Shopify integration for lightning-fast shopping experiences."
  },
  {
    id: "ai-support-bot",
    title: "AI Support Bot",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
    desc: "NLP-driven customer support bot resolving 70% of tickets automatically."
  }
];

export default function CaseStudiesOverviewPage() {
  return (
    <div className="min-h-screen text-foreground pb-24">
      {/* HERO */}
      <section className="relative pt-40 pb-20 px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black mb-6">
          Case Studies
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Deep dives into how we solve complex problems and drive explosive growth.
        </motion.p>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((study) => (
          <Link href={`/case-studies/${study.id}`} key={study.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group cursor-pointer aspect-video rounded-3xl overflow-hidden relative"
            >
              <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <div className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold w-fit mb-4">
                  {study.category}
                </div>
                <h3 className="text-white font-bold text-3xl mb-2">{study.title}</h3>
                <p className="text-white/70 mb-6">{study.desc}</p>
                <Button variant="premium" className="w-fit rounded-full gap-2">Read Case Study <ArrowRight size={16}/></Button>
              </div>
            </motion.div>
          </Link>
        ))}
      </section>
    </div>
  );
}
