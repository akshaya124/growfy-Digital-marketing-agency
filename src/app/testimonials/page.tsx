"use client";

import { motion } from "framer-motion";
import { Star, Play, Quote, CheckCircle2, TrendingUp, Award, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const googleReviews = [
  { name: "John Doe", time: "2 weeks ago", text: "Incredible team to work with. They completely revamped our digital ecosystem and the ROI was apparent within the first month. Highly recommended!" },
  { name: "Sarah Jenkins", time: "1 month ago", text: "Professional, fast, and creative. They took our vague ideas and turned them into a stunning web application. A+ agency." },
  { name: "Mark Zuckerberg", time: "2 months ago", text: "The automation workflows they built saved our sales team hundreds of hours. Their technical expertise is unmatched." }
];

const textReviews = [
  { name: "Elena Rodriguez", role: "CMO, Nova", text: "I've worked with dozens of agencies over my career, and Growfy is in a league of its own. They don't just build things; they engineer growth." },
  { name: "David Alaba", role: "Founder, Zenith", text: "From the initial discovery call to the final deployment, the communication was flawless. The end product exceeded all our expectations." },
  { name: "Marcus Chen", role: "Director, Apex Tech", text: "Their UI/UX design is world-class. Our user engagement metrics doubled after launching the new interface they designed for us." }
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen text-foreground pb-24 selection:bg-primary/20">
      
      {/* 1. HERO & RATINGS */}
      <section className="relative pt-40 pb-20 px-6 text-center border-b border-border/50">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20 tracking-widest uppercase">
          Client Love
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black mb-6">
          Don't just take <br/><span className="text-primary">our word for it.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          We measure our success by the success of our clients. Here is what they have to say about partnering with us.
        </motion.p>

        {/* Global Ratings Badge */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-8 bg-background border border-border w-fit mx-auto p-6 md:p-8 rounded-[30px] shadow-2xl">
          <div className="text-center sm:text-left sm:border-r sm:border-border/50 sm:pr-8">
            <div className="text-5xl font-black mb-2 flex items-center justify-center sm:justify-start gap-2">
              4.9 <Star className="w-8 h-8 fill-yellow-500 text-yellow-500" />
            </div>
            <p className="text-muted-foreground font-medium">Based on 200+ Reviews</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-3xl font-black mb-1">98%</div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Retention</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black mb-1">150+</div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Projects</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. VIDEO TESTIMONIALS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Hear it from them.</h2>
          <p className="text-muted-foreground">Video testimonials from our top partners.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((v) => (
            <div key={v} className="group relative aspect-[9/16] md:aspect-[4/5] rounded-[30px] overflow-hidden cursor-pointer border border-border/50">
              <img src={`https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop&sig=${v}`} alt="Video Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                  <Play className="w-6 h-6 fill-white" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-white font-bold text-lg">Michael Chang</h4>
                <p className="text-white/70 text-sm">CEO, Nova E-Commerce</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GOOGLE REVIEWS */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                  <span className="text-blue-600 font-black text-2xl font-serif">G</span>
                </div>
                Google Reviews
              </h2>
              <p className="text-muted-foreground">Real feedback from verified clients.</p>
            </div>
            <Button variant="outline" className="rounded-full bg-background">View all on Google</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {googleReviews.map((review, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl border border-border bg-background">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{review.name}</h4>
                      <p className="text-xs text-muted-foreground">{review.time}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLIENT REVIEWS (TEXT) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-4">More Client Stories</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {textReviews.map((review, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl border border-border relative group hover:border-primary/50 transition-colors">
              <Quote className="absolute top-8 right-8 text-primary/5 w-20 h-20 group-hover:text-primary/10 transition-colors" />
              <p className="text-lg italic mb-8 relative z-10 leading-relaxed font-medium">"{review.text}"</p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500" />
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <p className="text-sm text-primary">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SUCCESS STORIES (Link to Case Studies) */}
      <section className="py-24 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto glass-card bg-gradient-to-br from-primary/10 to-indigo-500/10 border-primary/20 p-12 md:p-20 rounded-[40px] text-center">
          <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-6">See the exact numbers.</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Reviews are great, but data doesn't lie. Dive into our case studies to see the exact strategies and ROI we generated for these clients.
          </p>
          <Link href="/case-studies">
            <Button variant="premium" size="lg" className="rounded-full h-14 px-10 text-lg">
              View Case Studies
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
