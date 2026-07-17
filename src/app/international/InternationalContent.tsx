"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Globe2, 
  Clock, 
  DollarSign, 
  TrendingUp,
  MessageSquare,
  Calendar,
  ChevronDown,
  ArrowRight,
  Quote,
  PhoneCall,
  FileSearch,
  Target,
  Activity,
  Rocket,
  Wrench,
  BarChart,
  PenTool,
  Users,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const COUNTRIES = [
  { id: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", symbol: "$" },
  { id: "AE", name: "UAE", flag: "🇦🇪", currency: "AED", symbol: "د.إ" },
  { id: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", symbol: "$" },
  { id: "US", name: "USA", flag: "🇺🇸", currency: "USD", symbol: "$" },
  { id: "UK", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", symbol: "£" },
];

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  CAD: 1.35,
  AED: 3.67,
  AUD: 1.5,
  GBP: 0.79,
};

const SERVICES = [
  {
    id: "seo",
    name: "SEO Strategy",
    tiers: {
      starter: { price: 500, desc: "Basic keywords & on-page" },
      pro: { price: 1000, desc: "Full tech SEO & backlinks" },
      unlimited: { price: 2000, desc: "Global SEO, multi-language, PR" },
    },
  },
  {
    id: "social",
    name: "Social Media",
    tiers: {
      starter: { price: 400, desc: "2 posts/week (Basic)" },
      pro: { price: 800, desc: "Daily posts & engagement" },
      unlimited: { price: 1500, desc: "Omnichannel, influencer outreach" },
    },
  },
  {
    id: "video",
    name: "Video Editing",
    tiers: {
      starter: { price: 300, desc: "4 short reels/month" },
      pro: { price: 600, desc: "Pro shorts & long videos" },
      unlimited: { price: 1200, desc: "Unlimited revisions, 4K production" },
    },
  },
  {
    id: "design",
    name: "Graphic Design",
    tiers: {
      starter: { price: 250, desc: "Social posts & banners" },
      pro: { price: 500, desc: "Full brand kits & UI assets" },
      unlimited: { price: 1000, desc: "Dedicated designer, motion graphics" },
    },
  },
  {
    id: "ads",
    name: "Paid Ads",
    tiers: {
      starter: { price: 450, desc: "Basic Meta/Google ads" },
      pro: { price: 900, desc: "Omnichannel & retargeting" },
      unlimited: { price: 2000, desc: "High-budget management, custom funnels" },
    },
  },
  {
    id: "web",
    name: "Web Maintenance",
    tiers: {
      starter: { price: 200, desc: "Uptime & security" },
      pro: { price: 400, desc: "Speed & content updates" },
      unlimited: { price: 800, desc: "24/7 SLA, feature development" },
    },
  }
];

const VENDORS = [
  "Website Agency",
  "SEO Agency",
  "Social Media Agency",
  "Video Editor",
  "Graphic Designer",
  "Google Ads Freelancer",
  "Meta Ads Freelancer",
  "Website Maintenance Team",
  "Business Consultant",
];

const PROJECTS = [
  {
    id: 1,
    title: "Nova E-Commerce App",
    category: "Mobile Apps",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop",
    desc: "A high-conversion React Native app that increased mobile sales by 140%."
  },
  {
    id: 2,
    title: "Aura Branding & Web",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    desc: "Complete brand overhaul and luxury web experience for a premium real estate firm."
  },
  {
    id: 3,
    title: "MediSync CRM",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    desc: "Automated patient intake and CRM workflows saving 40+ hours a week."
  }
];

const WORKFLOW_STEPS = [
  { title: "Discovery Call", icon: PhoneCall, desc: "We start with a deep dive to understand your brand vision, target audience, and overarching business goals." },
  { title: "Strategy & Planning", icon: Target, desc: "Our strategists construct a comprehensive roadmap detailing the exact channels, funnels, and campaigns needed to hit your KPIs." },
  { title: "Creative & Asset Production", icon: PenTool, desc: "Our design and copy teams craft scroll-stopping ad creatives, landing pages, and brand assets engineered for conversion." },
  { title: "Campaign Execution", icon: Rocket, desc: "We deploy your campaigns across search, social, and programmatic channels using advanced targeting algorithms." },
  { title: "Optimization & A/B Testing", icon: Activity, desc: "We rigorously split-test audiences, creatives, and offers in real-time to aggressively lower your acquisition costs." },
  { title: "Analytics & Reporting", icon: BarChart, desc: "You receive transparent, custom dashboards and deep-dive monthly reports tracking every dollar of your ROI." }
];

const TESTIMONIALS = [
  { name: "Michael Chang", role: "CEO, Nova E-Commerce", quote: "Growfy didn't just build us an app; they revolutionized how our customers shop. The ROI has been incredible." },
  { name: "Sarah Lin", role: "Founder, Aura Real Estate", quote: "The branding and web experience they crafted perfectly captures our luxury ethos. We've seen a huge spike in high-ticket leads." },
  { name: "Dr. James Wilson", role: "Director, MediSync", quote: "The CRM automation has literally saved our staff hundreds of hours. Their technical expertise is unmatched." }
];

const GROWFY_BENEFITS = [
  "Dedicated Project Manager",
  "Transparent Communication",
  "Professional Design Standards",
  "SEO Development",
  "Time Zone Friendly Communication",
  "Long-Term Technical Support",
  "Performance-Based Strategy",
  "Affordable International Pricing",
  "Complete Marketing Ecosystem",
];

const FAQS = [
  {
    q: "Do you work with international businesses?",
    a: "Yes. We work with businesses across Canada, UAE, Australia, the USA, the UK, and other countries through online collaboration.",
  },
  {
    q: "Can I choose only one service?",
    a: "Absolutely. You can choose a single service or combine multiple services into a customized package.",
  },
  {
    q: "Do you maintain the website after launch?",
    a: "Yes. We provide ongoing maintenance, security updates, backups, performance monitoring, and content updates.",
  },
  {
    q: "Will my website be SEO optimized?",
    a: "Yes. Every website is built with SEO best practices, fast loading speeds, mobile responsiveness, and clean code.",
  },
  {
    q: "Do you provide monthly marketing?",
    a: "Yes. We offer comprehensive monthly digital marketing plans, including social media management, SEO, content creation, paid advertising, and analytics.",
  },
];

export default function InternationalContent() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[3]); // Default US
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Record<string, "starter" | "pro" | "unlimited">>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleService = (id: string, tier: "starter" | "pro" | "unlimited") => {
    setSelectedServices(prev => {
      const next = { ...prev };
      if (next[id] === tier) {
        delete next[id]; // Toggle off if clicking the same tier
      } else {
        next[id] = tier; // Switch tier or add
      }
      return next;
    });
  };

  const calculateTotal = () => {
    const totalUSD = Object.entries(selectedServices).reduce((sum, [serviceId, tier]) => {
      const service = SERVICES.find(s => s.id === serviceId);
      return sum + (service?.tiers[tier].price || 0);
    }, 0);
    
    return Math.round(totalUSD * EXCHANGE_RATES[selectedCountry.currency]);
  };

  const calculateLocalAgencyCost = () => {
    // Estimating local agencies cost ~ 2x more
    return calculateTotal() * 2;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCountry.currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalPrice = calculateTotal();
  const localCost = calculateLocalAgencyCost();
  const savings = localCost - totalPrice;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600 mb-6"
        >
          Global Excellence, Local Partnership
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-foreground/80 leading-relaxed mb-8"
        >
          Seamless digital growth for international clients with dedicated support, transparent communication, and premium design standards.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/contact">
            <Button size="lg" variant="premium">Book Instant Consultation</Button>
          </Link>
          <Button size="lg" variant="outline" className="gap-2">
            <MessageSquare className="w-5 h-5" />
            WhatsApp Us
          </Button>
        </motion.div>
      </section>

      {/* Why Our Clients Save Time */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Our Clients Save Time</h2>
          <p className="text-lg text-foreground/60">Most businesses work with multiple vendors. Managing multiple vendors increases communication gaps, delays, and costs.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* The Old Way */}
          <div className="glass-card p-10 rounded-3xl border border-red-500/20 bg-red-500/5">
            <h3 className="text-3xl font-bold text-red-400 mb-8 flex items-center gap-3">
              <XCircle className="w-8 h-8" />
              The Old Way
            </h3>
            <ul className="space-y-6">
              {[
                "Juggling multiple separate freelancers",
                "Fragmented brand and marketing strategy",
                "Endless communication loops & delays",
                "Inconsistent reporting across platforms",
                "Hidden fees and retainer creep"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-500/60 shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground/80 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* With Growfy */}
          <div className="glass-card p-10 rounded-3xl border border-purple-500/30 bg-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.1)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
            <h3 className="text-3xl font-bold text-purple-400 mb-8 flex items-center gap-3 relative z-10">
              <CheckCircle2 className="w-8 h-8" />
              With Growfy
            </h3>
            <ul className="space-y-6 relative z-10">
              {[
                "One dedicated project manager",
                "Unified, cohesive digital strategy",
                "Clear, instant communication via Slack/WhatsApp",
                "One comprehensive analytics dashboard",
                "Transparent, predictable global pricing"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why International Clients Work With Growfy */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent -z-10 rounded-3xl" />
        <div className="text-center mb-16 pt-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why International Clients Work With Growfy</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto pb-12">
          {GROWFY_BENEFITS.map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 glass-card p-6 rounded-xl border border-white/10 hover:border-purple-500/30 transition-colors"
            >
              <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <span className="font-medium">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 1. Services Overview (Added) */}
      <section className="pt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need, In One Place</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">From branding to custom web apps and high-ROI marketing, we handle your entire digital ecosystem.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {SERVICES.map((s, i) => (
             <div key={i} className="glass-card p-8 rounded-2xl border border-white/10 text-center hover:border-purple-500/30 transition-colors">
               <h3 className="text-xl font-bold mb-2">{s.name}</h3>
               <p className="text-foreground/70">{s.tiers.starter.desc}</p>
             </div>
          ))}
        </div>
      </section>

      {/* 2. Featured Work (Added) */}
      <section className="pt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group cursor-pointer glass-card rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video relative overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">{project.category}</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/portfolio">
            <Button variant="outline" className="rounded-full">View All Case Studies <ArrowRight className="ml-2 w-4 h-4"/></Button>
          </Link>
        </div>
      </section>

      {/* 3. Workflow (Added) */}
      <section className="pt-20 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How We Work Globally</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">A seamless, time-zone friendly process designed to move fast and break records.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-start hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{String(i + 1).padStart(2, '0')}. {step.title}</h3>
              <p className="text-sm text-foreground/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Configurator */}
      <section id="pricing-estimator" className="scroll-mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Interactive Pricing Estimator</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">Select your country and the services you need to instantly estimate your customized package investment.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Column 1: Country Selector */}
          <div className="space-y-8">
            <div className="glass-card p-6 rounded-2xl border border-white/10 relative z-50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-purple-400" />
                Select Your Region
              </h3>
              <div className="relative">
                <button
                  onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-background/50 border border-white/10 hover:border-purple-500/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedCountry.flag}</span>
                    <span className="font-semibold">{selectedCountry.name} ({selectedCountry.currency})</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-foreground/50 transition-transform ${isCountryMenuOpen ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {isCountryMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 z-50 mt-2 py-2 glass-card rounded-xl border border-white/10 shadow-2xl shadow-purple-900/20"
                    >
                      {COUNTRIES.map(country => (
                        <button
                          key={country.id}
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsCountryMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left ${
                            selectedCountry.id === country.id ? "bg-purple-500/10 text-purple-300" : ""
                          }`}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span className="font-medium">{country.name} ({country.currency})</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Column 2: Services Selector */}
          <div className="space-y-8">
            <div className="glass-card p-6 rounded-2xl border border-white/10 relative z-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-400" />
                Select Your Services
              </h3>
              <div className="grid sm:grid-cols-1 gap-4">
                {SERVICES.map(service => (
                  <div key={service.id} className="p-4 rounded-xl border border-white/10 bg-background/50 transition-colors hover:border-white/20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="font-semibold text-lg">{service.name}</span>
                      <div className="flex items-center gap-2 w-full sm:w-auto mt-3 sm:mt-0">
                        <button 
                          onClick={() => toggleService(service.id, "starter")}
                          className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all border ${selectedServices[service.id] === 'starter' ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105' : 'bg-background border-white/10 hover:border-white/30 text-foreground/70 hover:text-foreground'}`}
                        >
                          Starter
                        </button>
                        <button 
                          onClick={() => toggleService(service.id, "pro")}
                          className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all border ${selectedServices[service.id] === 'pro' ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105' : 'bg-background border-white/10 hover:border-white/30 text-foreground/70 hover:text-foreground'}`}
                        >
                          Pro
                        </button>
                        <button 
                          onClick={() => toggleService(service.id, "unlimited")}
                          className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all border ${selectedServices[service.id] === 'unlimited' ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105' : 'bg-background border-white/10 hover:border-white/30 text-foreground/70 hover:text-foreground'}`}
                        >
                          Unlimited
                        </button>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {selectedServices[service.id] && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className={`p-4 mt-4 rounded-lg text-sm border flex items-start gap-3 ${selectedServices[service.id] === 'starter' ? 'bg-purple-500/10 border-purple-500/30' : selectedServices[service.id] === 'pro' ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-emerald-500/10 border-emerald-500/30'} text-foreground`}>
                            <CheckCircle2 className={`w-5 h-5 shrink-0 ${selectedServices[service.id] === 'starter' ? 'text-purple-600' : selectedServices[service.id] === 'pro' ? 'text-indigo-600' : 'text-emerald-600'}`} />
                            <div>
                              <div className="font-semibold text-base mb-1">
                                {selectedServices[service.id] === 'starter' ? 'Starter' : selectedServices[service.id] === 'pro' ? 'Pro' : 'Unlimited'} Package Includes:
                              </div>
                              <div className="text-foreground/80 leading-relaxed">
                                {/* @ts-ignore - Next index dynamically */}
                                {service.tiers[selectedServices[service.id]].desc}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: ROI Calculator Right Panel */}
          <div className="relative z-0">
            <div className="glass-card p-8 rounded-2xl border border-purple-500/30 sticky top-28 bg-gradient-to-b from-purple-900/10 to-background">
              <h3 className="text-2xl font-bold mb-6 text-center">ROI Calculator</h3>
              
              {Object.keys(selectedServices).length === 0 ? (
                <div className="text-center py-12 text-foreground/50 flex flex-col items-center">
                  <DollarSign className="w-12 h-12 mb-4 opacity-50" />
                  <p>Select services to see your estimated savings.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Visual Bar Chart */}
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/60">Typical Local Agency</span>
                        <span className="font-bold text-red-400">{formatCurrency(localCost)}</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div className="bg-red-500/50 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-300">Growfy Investment</span>
                        <span className="font-bold text-purple-400">{formatCurrency(totalPrice)}</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "50%" }}
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-300 mb-1">Estimated Savings</p>
                      <p className="text-2xl font-bold text-emerald-400">
                        {formatCurrency(savings)}/mo
                      </p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-emerald-500 opacity-50" />
                  </div>

                  <div className="pt-4 space-y-3">
                    <Link href="/contact" className="w-full">
                      <Button className="w-full py-6 text-lg font-bold" variant="premium">
                        Claim Your Custom Package
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-foreground/50">
                      *Prices are estimates based on standard packages. Final proposal may vary.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Save Up To 40–50%</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">International businesses often pay premium agency prices for separate services. With Growfy, you receive the same complete solution at a much more competitive investment.</p>
        </div>
        
        <div className="max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 font-semibold text-lg text-purple-300">Country</th>
                  <th className="p-4 font-semibold text-lg">Typical Agency Cost</th>
                  <th className="p-4 font-semibold text-lg text-purple-300">Growfy Investment</th>
                  <th className="p-4 font-semibold text-lg text-emerald-400">Estimated Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center gap-2"><span className="text-xl">🇨🇦</span> Canada</td>
                  <td className="p-4 text-foreground/70">CAD $2,500–$6,000/mo</td>
                  <td className="p-4 font-medium">Up to 40–50% lower</td>
                  <td className="p-4 font-bold text-emerald-400">Significant</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center gap-2"><span className="text-xl">🇦🇪</span> UAE</td>
                  <td className="p-4 text-foreground/70">AED 6,000–15,000/mo</td>
                  <td className="p-4 font-medium">Up to 40–50% lower</td>
                  <td className="p-4 font-bold text-emerald-400">Significant</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center gap-2"><span className="text-xl">🇦🇺</span> Australia</td>
                  <td className="p-4 text-foreground/70">AUD $2,500–$7,000/mo</td>
                  <td className="p-4 font-medium">Up to 40–50% lower</td>
                  <td className="p-4 font-bold text-emerald-400">Significant</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center gap-2"><span className="text-xl">🇺🇸</span> USA</td>
                  <td className="p-4 text-foreground/70">USD $2,000–$6,000/mo</td>
                  <td className="p-4 font-medium">Up to 40–50% lower</td>
                  <td className="p-4 font-bold text-emerald-400">Significant</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center gap-2"><span className="text-xl">🇬🇧</span> UK</td>
                  <td className="p-4 text-foreground/70">£1,800–£5,500/mo</td>
                  <td className="p-4 font-medium">Up to 40–50% lower</td>
                  <td className="p-4 font-bold text-emerald-400">Significant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Testimonials (Added) */}
      <section className="pt-20 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Global Client Success</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TESTIMONIALS.map((review, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl border border-white/10 relative">
              <Quote className="absolute top-6 right-6 text-purple-400/20 w-12 h-12" />
              <div className="flex gap-1 mb-6 text-yellow-500">{"★★★★★"}</div>
              <p className="text-foreground/80 italic mb-8 relative z-10">"{review.quote}"</p>
              <div>
                <h4 className="font-bold">{review.name}</h4>
                <p className="text-sm text-purple-400">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-3xl mx-auto pb-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className="glass-card border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-purple-500/30"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-lg pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-purple-400 transition-transform duration-300 flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-foreground/70 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Free Resources Section */}
      <section className="pt-10 pb-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Free International Resources</h2>
          <p className="text-lg text-foreground/60">Download our free guides to scaling your business globally.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "The 2026 SEO Playbook", icon: FileSearch, desc: "A complete checklist for ranking internationally." },
            { title: "Global Ad Strategies", icon: Target, desc: "How to scale ROAS across multiple borders." },
            { title: "Brand Consistency Guide", icon: PenTool, desc: "Maintaining a premium image everywhere." }
          ].map((res, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <res.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{res.title}</h3>
              <p className="text-sm text-foreground/70 mb-4">{res.desc}</p>
              <span className="text-sm font-bold text-purple-400 flex items-center gap-1 group-hover:text-purple-300">
                Download PDF <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          ))}
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section className="pb-10">
        <div className="glass-card p-12 rounded-3xl border border-purple-500/30 text-center relative overflow-hidden max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 z-0" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Elevate Your Brand Globally?</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">Let's discuss how Growfy can become your all-in-one digital growth partner.</p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" variant="premium" className="px-8 text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 text-lg border-white/20 hover:bg-white/10">
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
