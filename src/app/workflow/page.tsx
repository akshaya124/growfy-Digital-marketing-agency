"use client";

import { motion } from "framer-motion";
import { 
  PhoneCall, FileSearch, LineChart, FileText, 
  PenTool, Target, Activity, CheckCircle2, 
  Rocket, Wrench, BarChart
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Discovery Call",
    icon: PhoneCall,
    desc: "We start with a deep dive to understand your brand vision, target audience, and overarching business goals."
  },
  {
    title: "Audits & Market Research",
    icon: FileSearch,
    desc: "We analyze your current digital footprint, dissect competitor strategies, and identify lucrative market gaps."
  },
  {
    title: "Strategy & Planning",
    icon: Target,
    desc: "Our strategists construct a comprehensive roadmap detailing the exact channels, funnels, and campaigns needed to hit your KPIs."
  },
  {
    title: "Proposal & Approval",
    icon: FileText,
    desc: "You receive a detailed blueprint outlining the execution timeline, resource allocation, and expected ROI."
  },
  {
    title: "Creative & Asset Production",
    icon: PenTool,
    desc: "Our design and copy teams craft scroll-stopping ad creatives, landing pages, and brand assets engineered for conversion."
  },
  {
    title: "Campaign Execution",
    icon: Rocket,
    desc: "We deploy your campaigns across search, social, and programmatic channels using advanced targeting algorithms."
  },
  {
    title: "Optimization & A/B Testing",
    icon: Activity,
    desc: "We rigorously split-test audiences, creatives, and offers in real-time to aggressively lower your acquisition costs."
  },
  {
    title: "Client Review & Alignment",
    icon: CheckCircle2,
    desc: "Regular touchpoints to review early data, ensure brand alignment, and pivot strategy based on market feedback."
  },
  {
    title: "Scaling Winners",
    icon: LineChart,
    desc: "Once we identify the highest-converting campaigns, we aggressively scale ad spend to maximize your revenue."
  },
  {
    title: "Ongoing Management",
    icon: Wrench,
    desc: "Daily proactive account management, bid adjustments, and SEO monitoring to keep performance peaked."
  },
  {
    title: "Analytics & Reporting",
    icon: BarChart,
    desc: "You receive transparent, custom dashboards and deep-dive monthly reports tracking every dollar of your ROI."
  }
];

export default function WorkflowPage() {
  return (
    <div className="min-h-screen text-foreground pb-24 overflow-hidden selection:bg-primary/20">
      
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 text-center border-b border-border/50">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] -z-10" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
          How We Work
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black mb-6">
          The <span className="text-primary">Growfy</span> Workflow
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          We leave nothing to chance. Our battle-tested 11-step process guarantees delivery on time, on budget, and beyond expectations.
        </motion.p>
      </section>

      {/* WORKFLOW TIMELINE */}
      <section className="max-w-4xl mx-auto px-6 py-24 relative">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-24 bottom-24 w-1 bg-border -translate-x-1/2 rounded-full hidden md:block" />
        
        <div className="space-y-12 md:space-y-24">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Content Side */}
                <div className={`w-full md:w-[45%] ${isEven ? 'text-left md:text-left' : 'text-left md:text-right'}`}>
                  <div className={`glass-card p-8 rounded-3xl border border-black/5 hover:border-primary/30 transition-colors ${isEven ? 'hover:-translate-x-2' : 'hover:translate-x-2'} duration-300`}>
                    <div className="text-primary font-black text-6xl opacity-20 mb-4">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="hidden md:flex w-16 h-16 rounded-full bg-background border-4 border-primary z-10 items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)] shrink-0">
                  <step.icon className="text-primary w-6 h-6" />
                </div>

                {/* Empty Side for Spacing */}
                <div className="hidden md:block w-full md:w-[45%]" />
                
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card bg-primary/5 border border-primary/20 p-12 rounded-[40px]">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to start Step 01?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Book your Discovery Call today and let's start mapping out your digital future.
            </p>
            <Link href="/contact">
              <Button variant="premium" size="lg" className="rounded-full h-14 px-10 text-lg">
                Book Discovery Call
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
