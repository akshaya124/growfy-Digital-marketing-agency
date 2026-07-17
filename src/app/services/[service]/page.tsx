"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, Layers, Target, Zap, Briefcase } from "lucide-react";
import Link from "next/link";

import { serviceDatabase } from "@/data/services";

const getServiceData = (slug: string) => {
  if (serviceDatabase[slug]) return serviceDatabase[slug];
  
  // Fallback generic data
  const formattedTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: formattedTitle,
    overview: `Elevate your digital presence with our premium ${formattedTitle} solutions. We combine strategy, design, and engineering to deliver unparalleled results.`,
    problems: [
      "Low conversion rates and poor user engagement.",
      "Outdated technology holding back scale.",
      "Lack of clear data and actionable analytics.",
      "Inefficient manual workflows."
    ],
    features: [
      { title: "Custom Architecture", desc: "Built specifically for your business needs." },
      { title: "Scalable Infrastructure", desc: "Designed to grow as you grow." },
      { title: "Advanced Security", desc: "Enterprise-grade protection." },
      { title: "24/7 Monitoring", desc: "We keep an eye on things so you don't have to." }
    ],
    process: [
      { step: "Discovery", desc: "Deep dive into your goals.", details: ["Initial consultation", "Requirements gathering", "Defining success metrics"] },
      { step: "Strategy", desc: "Mapping out the blueprint.", details: ["Research & Analysis", "Workflow planning", "Timeline creation"] },
      { step: "Execution", desc: "Building the solution.", details: ["Drafting & Creation", "Client feedback loops", "Refining deliverables"] },
      { step: "Finalization", desc: "Delivering the final product.", details: ["Quality assurance", "Final handover", "Post-launch support"] }
    ],
    proofOfWork: [
      { client: "Global Innovators", roi: "Transformational", desc: `We implemented a custom ${formattedTitle} strategy that completely changed their trajectory.`, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" },
      { client: "Pioneer Startups", roi: "Industry Leader", desc: `Rapid deployment of ${formattedTitle} allowed them to dominate their local market.`, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Industry Standard Tools", "Proprietary Frameworks", "Cloud Infrastructure", "Creative Suites"],
    packages: [
      { name: "Starter", price: "$2,000+", features: ["Basic Implementation", "1 Month Support", "Standard Features"] },
      { name: "Professional", price: "$5,000+", features: ["Advanced Integrations", "6 Months Support", "Custom Features", "Priority SLA"] },
      { name: "Enterprise", price: "Custom", features: ["Dedicated Team", "24/7 Support", "Full Automation", "On-Premises Options"] }
    ],
    faqs: [
      { q: `How long does a typical ${formattedTitle} project take?`, a: "Depending on complexity, it can range from 2 weeks to 3 months." },
      { q: "Do you offer ongoing support?", a: "Yes, all our packages can include a maintenance retainer." }
    ]
  };
};

export default function ServiceDetailsPage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = use(params);
  
  // Basic validation. In real app, check against a known list of slugs.
  if (!resolvedParams.service) notFound();

  const data = getServiceData(resolvedParams.service);

  return (
    <div className="min-h-screen text-foreground selection:bg-primary/20">
      
      {/* 1. HERO */}
      <section className="relative pt-40 pb-20 px-6 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
            Premium Services
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black mb-6">
            {data.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {data.overview}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex justify-center gap-4">
             <Button variant="premium" size="lg" className="rounded-full h-14 px-8 text-base">Book a Consultation</Button>
             <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-base bg-background">View Packages</Button>
          </motion.div>
        </div>
      </section>

      {/* 2 & 3. PROBLEMS WE SOLVE & WHY CHOOSE US */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
              <Target className="text-primary" /> Problems We Solve
            </h2>
            <ul className="space-y-4">
              {data.problems.map((prob: string, i: number) => (
                <li key={i} className="flex items-start gap-3 glass-card p-4 rounded-xl border border-border">
                  <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-muted-foreground">{prob}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
              <Zap className="text-primary" /> Why Choose Growfy
            </h2>
            <div className="glass-card p-8 rounded-3xl border border-black/5 bg-primary/5">
              <p className="text-lg leading-relaxed mb-6">
                Unlike traditional agencies, we integrate deep technical expertise with strategic marketing. We don't just solve isolated problems; we engineer holistic growth ecosystems tailored for {data.title}.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-primary w-5 h-5" /> Award-Winning Experts</li>
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-primary w-5 h-5" /> Data-Driven Decisions</li>
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-primary w-5 h-5" /> Transparent Reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Key Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.features.map((feat: { title: string; desc: string }, i: number) => (
              <div key={i} className="glass-card bg-background p-8 rounded-2xl hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Layers />
                </div>
                <h3 className="font-bold text-xl mb-3">{feat.title}</h3>
                <p className="text-muted-foreground text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR PROCESS (START TO FINISH WORKFLOW) */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-500 font-semibold text-sm border border-purple-500/20">
            How We Work
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black mb-6">From Start to Finish</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">This is exactly how Growfy will handle your {data.title} project to guarantee success.</p>
        </div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-purple-500/50 to-transparent -translate-x-1/2 hidden sm:block" />
          
          <div className="space-y-12">
            {data.process.map((step: { step: string; desc: string; details: string[] }, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center font-bold z-10 hidden sm:flex shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  {i + 1}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 pl-16 sm:pl-0'}`}>
                  <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-colors relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-5xl font-black text-primary/10 absolute top-4 right-6 group-hover:text-primary/20 transition-colors">
                      0{i + 1}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 relative z-10 text-foreground">{step.step}</h3>
                    <p className="text-muted-foreground relative z-10 text-base leading-relaxed">{step.desc}</p>
                    
                    {/* Dynamic checklist details */}
                    <ul className="mt-4 space-y-2 relative z-10">
                      {step.details.map((detail, j) => (
                         <li key={j} className="flex items-center gap-2 text-sm text-foreground/70">
                           <CheckCircle2 className="w-4 h-4 text-primary/70" /> {detail}
                         </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGIES USED */}
      <section className="py-24 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-12">Technologies We Leverage</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.tech.map((tech: string, i: number) => (
              <span key={i} className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-primary transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7 & 8. PROOF OF WORK / CASE STUDIES */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
          <div className="text-center md:text-left">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold text-sm border border-emerald-500/20">
              Proof of Work
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Real Results. No Fluff.</h2>
            <p className="text-muted-foreground text-lg max-w-xl">See exactly how we've applied our {data.title} frameworks to generate massive ROI for other brands.</p>
          </div>
          <Link href="/case-studies">
            <Button variant="outline" className="hidden md:flex rounded-full">View All Case Studies</Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {data.proofOfWork.map((work: { client: string; roi: string; desc: string; img: string }, i: number) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              key={i} 
              className="group cursor-pointer rounded-[2rem] overflow-hidden relative aspect-[4/3] bg-muted shadow-2xl"
            >
              <img 
                src={work.img} 
                alt={work.client} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-primary/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{data.title}</span>
                    <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">{work.roi}</span>
                  </div>
                  <h3 className="text-white font-bold text-3xl mb-2">{work.client}</h3>
                  <p className="text-white/80 line-clamp-2 mb-6">{work.desc}</p>
                  
                  <Button className="bg-white text-black hover:bg-white/90 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    Read Case Study
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <Link href="/case-studies">
            <Button variant="outline" className="rounded-full w-full">View All Case Studies</Button>
          </Link>
        </div>
      </section>

      {/* 9. PACKAGES */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Investment Plans</h2>
            <p className="text-muted-foreground text-lg">Transparent pricing tailored to your needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.packages.map((pkg: { name: string; price: string; features: string[] }, i: number) => (
              <div key={i} className={`glass-card p-8 rounded-3xl bg-background border ${i === 1 ? 'border-primary shadow-xl scale-105 z-10' : 'border-border'}`}>
                {i === 1 && <div className="text-xs font-bold uppercase tracking-wider text-white bg-primary py-1 px-3 rounded-full inline-block mb-4">Most Popular</div>}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-black mb-8">{pkg.price}</div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((f: string, j: number) => (
                    <li key={j} className="flex items-center gap-3">
                      <CheckCircle2 className="text-primary w-5 h-5" />
                      <span className="text-sm font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={i === 1 ? "premium" : "outline"} className="w-full rounded-full">Choose Plan</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {data.faqs.map((faq: { q: string; a: string }, i: number) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-border cursor-pointer hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{faq.q}</h3>
                <ChevronDown className="text-muted-foreground w-5 h-5" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. BOOK CONSULTATION CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center glass-card bg-primary/5 p-12 rounded-[40px] border border-primary/20">
          <Briefcase className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-black mb-6">Ready to transform your business?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Schedule a free strategy call to discuss your {data.title} needs.
          </p>
          <Link href="/contact">
            <Button variant="premium" size="lg" className="rounded-full h-14 px-10 text-lg">Book Consultation</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
