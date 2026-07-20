"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeInStagger, FadeInItem } from "@/components/ui/animations";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [errors, setErrors] = useState({ firstName: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = { firstName: "", email: "", message: "" };
    let hasError = false;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      hasError = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      hasError = true;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen text-foreground pb-24 selection:bg-primary/20">
      
      {/* 1. HERO */}
      <section className="relative pt-40 pb-20 px-6 text-center border-b border-border/50">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black mb-6">
          Let's <span className="text-primary">Talk.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground mb-0 max-w-2xl mx-auto">
          Whether you need a complete digital overhaul or just want to bounce an idea off us, we're here to help.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* LEFT: FORMS & BOOKING */}
          <div className="space-y-16">
            
            {/* Contact Form */}
            <div className="glass-card p-8 md:p-12 rounded-[40px] border border-border relative overflow-hidden">
              <h2 className="text-3xl font-black mb-2">Send us a message</h2>
              <p className="text-muted-foreground mb-8">We usually respond within 24 hours.</p>
              
              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-0 left-0 w-full bg-emerald-500/10 border-b border-emerald-500/20 p-4 flex items-center justify-center gap-3 text-emerald-500 font-medium z-10 backdrop-blur-md"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Message sent successfully! We'll be in touch soon.
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">First Name *</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className={`w-full bg-background border ${errors.firstName ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors`} 
                      placeholder="John" 
                    />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email Address *</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full bg-background border ${errors.email ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors`} 
                    placeholder="john@company.com" 
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Message *</label>
                  <textarea 
                    rows={5} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full bg-background border ${errors.message ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors`} 
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>
                <Button variant="premium" className="w-full rounded-full h-14 text-lg relative overflow-hidden" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </motion.div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>

            {/* Book Consultation */}
            <div className="glass-card bg-gradient-to-br from-primary/10 to-indigo-500/10 border-primary/20 p-8 md:p-12 rounded-[40px] text-center">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-black mb-4">Book a Strategy Session</h3>
              <p className="text-muted-foreground mb-8">Skip the email tag and jump straight on a 30-minute discovery call with our lead strategist.</p>
              <Button variant="premium" className="rounded-full h-12 px-8">View Calendar & Book</Button>
            </div>

          </div>

          {/* RIGHT: CONTACT INFO & MAP */}
          <div className="space-y-8">
            
            {/* Quick Contact Grid */}
            <FadeInStagger className="grid sm:grid-cols-2 gap-4">
              <FadeInItem className="h-full">
                <div className="glass-card h-full p-6 rounded-3xl border border-border flex flex-col items-center text-center hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold mb-1">Phone</h4>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 987-6543</p>
                </div>
              </FadeInItem>
              
              <FadeInItem className="h-full">
                <div className="glass-card h-full p-6 rounded-3xl border border-border flex flex-col items-center text-center hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-sm text-muted-foreground">hello@growfy.com</p>
                  <p className="text-sm text-muted-foreground">support@growfy.com</p>
                </div>
              </FadeInItem>

              <FadeInItem className="h-full">
                <div className="glass-card h-full p-6 rounded-3xl border border-[#25D366]/20 bg-[#25D366]/5 flex flex-col items-center text-center hover:border-[#25D366]/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] mb-4 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold mb-1 text-[#25D366]">WhatsApp</h4>
                  <p className="text-sm text-muted-foreground">Chat with us instantly</p>
                  <a href="#" className="text-xs font-bold text-[#25D366] mt-2 underline">Start Chat</a>
                </div>
              </FadeInItem>

              <FadeInItem className="h-full">
                <div className="glass-card h-full p-6 rounded-3xl border border-border flex flex-col items-center text-center hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold mb-1">Business Hours</h4>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9am - 6pm EST</p>
                  <p className="text-sm text-muted-foreground">Sat-Sun: Closed</p>
                </div>
              </FadeInItem>
            </FadeInStagger>

            {/* Address & Map */}
            <div className="glass-card p-8 rounded-3xl border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">HQ Office</h4>
                  <p className="text-muted-foreground text-sm">123 Innovation Drive, Tech District, San Francisco, CA 94105</p>
                </div>
              </div>
              {/* Fake Google Map UI */}
              <div className="w-full h-64 rounded-2xl bg-muted relative overflow-hidden group cursor-pointer border border-border">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" alt="Map View" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary">
                    <MapPin className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & FAQ Shortcut */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="glass-card p-6 rounded-3xl border border-border flex-1 flex flex-col items-center text-center">
                <h4 className="font-bold mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                </div>
              </div>
              
              <Link href="/faq" className="glass-card p-6 rounded-3xl border border-border bg-background flex-1 flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors">
                <HelpCircle className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-sm">Have quick questions?</h4>
                <p className="text-xs text-primary font-bold mt-1">Visit our FAQ Page &rarr;</p>
              </Link>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
