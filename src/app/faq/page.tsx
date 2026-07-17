"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqCategories = [
  "General", "Website Development", "Marketing", "SEO", 
  "Pricing", "Payments", "Support", "Contracts", "Automation"
];

// Sample FAQ Data
const allFaqs = [
  { id: 1, category: "General", q: "What exactly does Growfy do?", a: "We are a full-service digital ecosystem builder. We handle everything from branding and UI/UX design to advanced web development, AI automation, and omnichannel growth marketing." },
  { id: 2, category: "General", q: "How long does a typical project take?", a: "A standard corporate website takes 4-6 weeks, while complex web applications or mobile apps take 3-4 months. Marketing campaigns are ongoing with a minimum 3-month commitment." },
  
  { id: 3, category: "Website Development", q: "Do you use templates or custom code?", a: "We build 100% custom solutions. We use modern frameworks like Next.js and React to ensure your site is blazing fast, highly secure, and perfectly tailored to your brand." },
  { id: 4, category: "Website Development", q: "Will I be able to update my own website?", a: "Yes! We integrate user-friendly Headless CMS systems (like Sanity or Strapi) so your team can easily update content, blogs, and products without writing any code." },

  { id: 5, category: "Pricing", q: "Why don't you have fixed pricing for enterprise?", a: "Enterprise needs are highly specific. We prefer to conduct a thorough discovery call to understand your architecture requirements before giving an exact quote." },
  { id: 6, category: "Pricing", q: "Are there any hidden maintenance fees?", a: "No. Any ongoing maintenance costs (like hosting or retainer packages) are strictly optional and clearly outlined in your initial proposal." },

  { id: 7, category: "Payments", q: "What payment methods do you accept?", a: "We accept all major credit cards, bank wire transfers, and crypto for international enterprise clients." },
  { id: 8, category: "Payments", q: "Do you require full payment upfront?", a: "No, we typically structure payments in milestones: 30% upfront, 40% upon design approval, and 30% right before the final launch." },

  { id: 9, category: "Automation", q: "What kind of AI automation can you build?", a: "We can build custom customer support chatbots, WhatsApp lead routing bots, automated CRM data entry, and workflow automations using tools like Zapier and custom Python scripts." }
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const filteredFaqs = allFaqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="min-h-screen text-foreground pb-24 selection:bg-primary/20">
      
      {/* 1. HERO */}
      <section className="relative pt-40 pb-20 px-6 text-center border-b border-border/50">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black mb-6">
          How can we <span className="text-primary">help?</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground mb-0 max-w-2xl mx-auto">
          Everything you need to know about our services, pricing, and process.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* LEFT: CATEGORIES SIDEBAR */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><HelpCircle size={18} className="text-primary"/> Categories</h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
              {faqCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenFaqId(null); }}
                  className={`text-left px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap lg:whitespace-normal ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-background hover:bg-muted text-muted-foreground'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Quick Contact Widget */}
            <div className="hidden lg:block mt-12 glass-card p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-bold text-sm mb-2">Still have questions?</h4>
              <p className="text-xs text-muted-foreground mb-4">Can't find the answer you're looking for? Please chat to our friendly team.</p>
              <Link href="/contact">
                <Button variant="premium" size="sm" className="w-full rounded-full">Contact Us</Button>
              </Link>
            </div>
          </div>

          {/* RIGHT: FAQ ACCORDION */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-black mb-8">{activeCategory} FAQs</h2>
            
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="glass-card border border-border rounded-2xl overflow-hidden transition-all duration-300">
                      <button 
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none hover:bg-primary/5 transition-colors"
                      >
                        <h4 className="font-bold text-lg">{faq.q}</h4>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed border-t border-border/50">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="glass-card p-12 text-center rounded-3xl border border-border bg-background">
                <HelpCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No FAQs found</h3>
                <p className="text-muted-foreground text-sm">We're currently updating the questions for the {activeCategory} category.</p>
              </div>
            )}
            
            {/* Mobile Contact Widget */}
            <div className="lg:hidden mt-12 glass-card p-8 rounded-3xl border border-primary/20 bg-primary/5 text-center">
              <h4 className="font-bold mb-2">Still have questions?</h4>
              <p className="text-sm text-muted-foreground mb-6">Our friendly team is always here to help.</p>
              <Link href="/contact">
                <Button variant="premium" className="rounded-full">Get in touch</Button>
              </Link>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
