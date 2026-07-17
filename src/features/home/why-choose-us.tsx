"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  {
    title: "Data-Driven Strategies",
    description: "We don't guess. Every decision is backed by analytics and market research to guarantee ROI."
  },
  {
    title: "Award-Winning Design",
    description: "Our UI/UX team crafts stunning, user-centric designs that elevate your brand's perception."
  },
  {
    title: "Cutting-Edge Technology",
    description: "We use the latest tech stacks like Next.js, React Native, and AI models to keep you ahead."
  },
  {
    title: "End-to-End Automation",
    description: "From lead generation to CRM management, we automate your workflows to save you time."
  },
  {
    title: "Dedicated Support Team",
    description: "Get 24/7 priority support and a dedicated project manager for seamless communication."
  },
  {
    title: "Proven Track Record",
    description: "Over 150+ successful projects delivered across 20+ industries with a 98% satisfaction rate."
  }
];

export function WhyChooseUs() {
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
            Why Choose <span className="text-primary">Growfy</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            We partner with ambitious brands to drive meaningful growth through digital excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-black/5 hover:border-primary/30 transition-colors group"
            >
              <div className="mb-6 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{reason.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
    </section>
  );
}
