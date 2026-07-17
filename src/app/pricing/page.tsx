"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// PRICING DATA
const pricingData = {
  websites: [
    { name: "Launchpad", basePrice: 1000, features: ["Up to 5 Pages", "Mobile Responsive", "Contact Form", "Basic SEO Setup", "Standard Speed Optimization"] },
    { name: "Growth Engine", basePrice: 3000, features: ["Up to 15 Pages", "CMS Integration", "Advanced Tech SEO", "Custom Animations", "E-Commerce Ready", "Priority Support"], popular: true },
    { name: "Ultimate Scale", basePrice: 7500, features: ["Unlimited Pages", "Custom Web App Logic", "Headless Architecture", "CRM Integrations", "Advanced Security", "Dedicated Account Manager", "24/7 SLA Support"] },
  ],
  marketing: [
    { name: "Local Spark", basePrice: 800, features: ["Basic SEO Audit", "2 Social Posts/Week", "Monthly Analytics", "Keyword Tracking"] },
    { name: "Market Leader", basePrice: 2000, features: ["Full Tech SEO", "Daily Content (All Platforms)", "Omnichannel Ads Management", "Custom Funnel Creation", "Bi-Weekly Strategy Calls", "A/B Testing"], popular: true },
    { name: "Global Dominance", basePrice: 5000, features: ["International SEO", "Influencer Outreach", "High-Budget Media Buying", "Custom PR Campaigns", "Predictive Analytics", "On-site Video Shoots", "Dedicated Growth Team"] },
  ],
  branding: [
    { name: "Brand Sprint", basePrice: 1500, features: ["Logo Design", "Color Palette", "Typography Selection", "Mini Brand Guidelines"] },
    { name: "Complete Identity", basePrice: 3500, features: ["Full Logo System", "Comprehensive Brand Book", "UI/UX Direction", "Social Media Templates", "Stationary Design", "3 Rounds of Revisions"], popular: true },
    { name: "Ultimate Experience", basePrice: 8000, features: ["Strategic Brand Positioning", "Naming & Copywriting", "Custom Motion Graphics", "Video Intro Assets", "Complete UI/UX Overhaul", "Unlimited Revisions", "Dedicated Creative Director"] },
  ],
  socialMedia: [
    { name: "Starter Social", basePrice: 600, features: ["3 Posts/Week (IG/FB)", "Basic Community Management", "Monthly Reporting", "Hashtag Strategy"] },
    { name: "Brand Builder", basePrice: 1500, features: ["Daily Posting (IG/FB/LI/TT)", "Pro Video/Reel Editing", "Influencer Outreach", "Priority Support", "Bi-Weekly Strategy Calls"], popular: true },
    { name: "Viral Growth", basePrice: 3500, features: ["Omnichannel Dominance", "Daily TikTok/Reels Production", "UGC Campaign Management", "Dedicated Content Creator", "Real-time Trend Hijacking"] },
  ],
  ai: [
    { name: "AI Starter", basePrice: 1200, features: ["Website Chatbot Setup", "Basic FAQ Automation", "Email Auto-responders"] },
    { name: "Smart Workflows", basePrice: 3000, features: ["WhatsApp & SMS Bots", "CRM Integration", "Trained on Custom Data", "Zapier/Make Workflows", "Lead Qualification Flow"], popular: true },
    { name: "Enterprise AI", basePrice: 10000, features: ["Custom LLM Training", "Internal AI Employee", "Predictive Sales AI", "Voice AI Agents", "Full Tech Stack Integration", "Dedicated AI Architect", "Monthly Model Fine-Tuning"] },
  ]
};

const faqs = [
  { q: "Are there any hidden fees?", a: "No, our pricing is fully transparent. The investment outlined in the proposal is exactly what you pay." },
  { q: "Do you offer payment plans?", a: "Yes, for projects over $5,000 we typically structure payments across 3 milestones." },
  { q: "What happens after the support period ends?", a: "You can opt into a monthly maintenance retainer or handle it internally. We'll give you full access and training." }
];

export default function PricingPage() {
  const formatPrice = (basePrice: number) => {
    return `$${basePrice.toLocaleString()}`;
  };

  const renderPricingCards = (packages: any[]) => (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {packages.map((pkg, i) => (
        <div key={i} className={`glass-card p-8 rounded-3xl relative ${pkg.popular ? 'border-primary shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-105 z-10' : 'border-border'}`}>
          {pkg.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">Professional</div>}
          <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
          <div className="text-4xl font-black mb-8">{formatPrice(pkg.basePrice)}</div>
          <ul className="space-y-4 mb-8">
            {pkg.features.map((f: string, j: number) => (
              <li key={j} className="flex items-center gap-3">
                <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">{f}</span>
              </li>
            ))}
          </ul>
          <Button variant={pkg.popular ? "premium" : "outline"} className="w-full rounded-full">Select Plan</Button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen text-foreground pb-24 selection:bg-primary/20">
      
      {/* 1. HERO & PRICING TOGGLE */}
      <section className="relative pt-40 pb-20 px-6 text-center">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black mb-6">
          Transparent <span className="text-primary">Pricing</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          No hidden fees, no surprises. Choose the right growth engine for your business size and goals.
        </motion.p>

      </section>

      {/* 2, 3, 4, 5. PACKAGE SECTIONS */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-32">
        <div>
          <h2 className="text-3xl font-black mb-10 text-center uppercase tracking-widest text-primary">Website Development</h2>
          {renderPricingCards(pricingData.websites)}
        </div>
        <div>
          <h2 className="text-3xl font-black mb-10 text-center uppercase tracking-widest text-primary">Marketing & SEO</h2>
          {renderPricingCards(pricingData.marketing)}
        </div>
        <div>
          <h2 className="text-3xl font-black mb-10 text-center uppercase tracking-widest text-primary">Social Media Marketing</h2>
          {renderPricingCards(pricingData.socialMedia)}
        </div>
        <div>
          <h2 className="text-3xl font-black mb-10 text-center uppercase tracking-widest text-primary">Branding & Identity</h2>
          {renderPricingCards(pricingData.branding)}
        </div>
        <div>
          <h2 className="text-3xl font-black mb-10 text-center uppercase tracking-widest text-primary">AI & Automation</h2>
          {renderPricingCards(pricingData.ai)}
        </div>
      </section>

      {/* 6. ENTERPRISE PLANS */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center">
        <div className="glass-card bg-gradient-to-br from-primary/10 to-indigo-500/10 border-primary/20 p-12 rounded-[40px]">
          <h2 className="text-4xl font-black mb-4">Enterprise & Custom Plans</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Need a massive custom software build, dedicated offshore team, or full digital ecosystem? We create bespoke plans for enterprise clients.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <span className="px-4 py-2 bg-background rounded-full text-sm font-bold border border-border">Dedicated Managers</span>
            <span className="px-4 py-2 bg-background rounded-full text-sm font-bold border border-border">24/7 SLA Support</span>
            <span className="px-4 py-2 bg-background rounded-full text-sm font-bold border border-border">Unlimited Revisions</span>
          </div>
          <Button variant="premium" size="lg" className="rounded-full h-14 px-10 text-lg">Contact Enterprise Sales</Button>
        </div>
      </section>

      {/* 7. COMPARISON TABLE */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-6">Feature Comparison</h2>
          <p className="text-muted-foreground">See exactly what you're getting in our tier structures.</p>
        </div>
        <div className="overflow-x-auto glass-card rounded-3xl border border-border">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5">
                <th className="p-6 font-bold w-1/3">Features</th>
                <th className="p-6 font-bold text-center">Starter</th>
                <th className="p-6 font-bold text-center">Pro</th>
                <th className="p-6 font-bold text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Dedicated Project Manager", s: false, p: true, e: true },
                { name: "Weekly Strategy Calls", s: false, p: false, e: true },
                { name: "Analytics Dashboard", s: true, p: true, e: true },
                { name: "Priority Email Support", s: false, p: true, e: true },
                { name: "24/7 Phone Support", s: false, p: false, e: true },
              ].map((row, idx) => (
                <tr key={idx} className="border-t border-border/50">
                  <td className="p-6 font-medium">{row.name}</td>
                  <td className="p-6 text-center">{row.s ? <CheckCircle2 className="mx-auto text-primary w-5 h-5"/> : <XCircle className="mx-auto text-muted-foreground/30 w-5 h-5"/>}</td>
                  <td className="p-6 text-center">{row.p ? <CheckCircle2 className="mx-auto text-primary w-5 h-5"/> : <XCircle className="mx-auto text-muted-foreground/30 w-5 h-5"/>}</td>
                  <td className="p-6 text-center">{row.e ? <CheckCircle2 className="mx-auto text-primary w-5 h-5"/> : <XCircle className="mx-auto text-muted-foreground/30 w-5 h-5"/>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-6">Pricing FAQ</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-border">
              <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CUSTOM QUOTE FORM */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        <div className="glass-card p-8 md:p-12 rounded-[40px] border border-primary/20 bg-primary/5">
          <h2 className="text-3xl font-black mb-4 text-center">Need a Custom Quote?</h2>
          <p className="text-muted-foreground text-center mb-10">Tell us a bit about your project and we'll send over a tailored proposal.</p>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Name</label>
                <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Email</label>
                <input type="email" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" placeholder="john@company.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">What do you need help with?</label>
              <select className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary">
                <option>Website & App Development</option>
                <option>Branding & Design</option>
                <option>Marketing & SEO</option>
                <option>AI Automation</option>
                <option>Full Digital Ecosystem</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Project Details</label>
              <textarea rows={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" placeholder="Tell us about your goals..."></textarea>
            </div>
            <Button variant="premium" className="w-full rounded-full h-14 text-lg">Request Custom Quote</Button>
          </form>
        </div>
      </section>

    </div>
  );
}
