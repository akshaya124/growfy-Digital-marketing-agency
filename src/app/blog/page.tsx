"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Calendar, User, Mail, Tag, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const categories = ["All", "Design", "Development", "Marketing", "AI & Automation", "Business"];

const posts = [
  {
    id: 1,
    title: "The Future of AI in Digital Marketing Strategies",
    category: "AI & Automation",
    author: "Elena Rodriguez",
    date: "Oct 24, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    excerpt: "How generative AI is completely reshaping the way brands approach content creation, SEO, and personalized customer journeys.",
    featured: true,
    popular: true
  },
  {
    id: 2,
    title: "10 Next.js Performance Optimization Tips for 2026",
    category: "Development",
    author: "Marcus Chen",
    date: "Oct 18, 2026",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    excerpt: "Speed is revenue. Learn how to shave vital milliseconds off your web app load times using these advanced Next.js techniques.",
    featured: false,
    popular: true
  },
  {
    id: 3,
    title: "Why Dark Mode is No Longer Just an 'Option'",
    category: "Design",
    author: "Sarah Jenkins",
    date: "Oct 12, 2026",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    excerpt: "Analyzing the psychological and physiological impacts of dark UI, and why it's become a critical accessibility standard.",
    featured: false,
    popular: false
  },
  {
    id: 4,
    title: "Scaling Your E-Commerce Store to $1M/Month",
    category: "Business",
    author: "David Alaba",
    date: "Oct 05, 2026",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    excerpt: "The exact operational playbook and tech stack required to scale a Shopify store past the 7-figure monthly revenue mark.",
    featured: false,
    popular: true
  },
  {
    id: 5,
    title: "Building Omnichannel Marketing Campaigns",
    category: "Marketing",
    author: "Elena Rodriguez",
    date: "Sep 28, 2026",
    image: "https://images.unsplash.com/photo-1432888117281-ea1c6e1da34f?q=80&w=800&auto=format&fit=crop",
    excerpt: "Stop thinking in silos. How to seamlessly connect your social, email, and web touchpoints for a unified brand experience.",
    featured: false,
    popular: false
  },
  {
    id: 6,
    title: "The Ultimate Guide to B2B Lead Generation in 2026",
    category: "Marketing",
    author: "David Alaba",
    date: "Sep 15, 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    excerpt: "Discover the most effective channels and strategies for acquiring high-value B2B clients in a crowded digital landscape.",
    featured: false,
    popular: true
  },
  {
    id: 7,
    title: "Why Your SaaS Needs a Design System",
    category: "Design",
    author: "Sarah Jenkins",
    date: "Sep 02, 2026",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    excerpt: "Stop reinventing the wheel. Learn how a robust design system accelerates development speed and ensures brand consistency.",
    featured: false,
    popular: false
  },
  {
    id: 8,
    title: "Automating Customer Support without Losing the Human Touch",
    category: "AI & Automation",
    author: "Elena Rodriguez",
    date: "Aug 21, 2026",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    excerpt: "Implementing LLM-powered chatbots that actually solve problems, rather than frustrating your customers.",
    featured: false,
    popular: true
  },
  {
    id: 9,
    title: "Migrating from WordPress to Next.js: A Case Study",
    category: "Development",
    author: "Marcus Chen",
    date: "Aug 10, 2026",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop",
    excerpt: "How we helped a major publisher migrate to a headless architecture, resulting in a 300% increase in core web vitals.",
    featured: false,
    popular: false
  }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = posts.find(p => p.featured);
  const popularPosts = posts.filter(p => p.popular && !p.featured);
  const latestPosts = posts.filter(p => !p.featured && (activeCategory === "All" || p.category === activeCategory) && p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen text-foreground pb-24 selection:bg-primary/20">
      
      {/* 1. HERO */}
      <section className="relative pt-40 pb-20 px-6 text-center border-b border-border/50">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20 tracking-widest uppercase">
          Insights & News
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black mb-6">
          The Growfy <span className="text-primary">Blog</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-muted-foreground mb-0 max-w-2xl mx-auto">
          Deep dives into design trends, engineering tutorials, and growth marketing strategies.
        </motion.p>
      </section>

      {/* SEARCH & CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-b border-border">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-primary text-white' : 'bg-background border border-border hover:border-primary/50 text-muted-foreground'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* MAIN CONTENT (Featured + Latest) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* FEATURED POST */}
            {(activeCategory === "All" && searchQuery === "" && featuredPost) && (
              <div>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><SparklesIcon className="text-primary"/> Featured Post</h2>
                <Link href={`/blog/${featuredPost.id}`}>
                  <div className="group rounded-3xl overflow-hidden relative cursor-pointer aspect-[16/10] md:aspect-[21/9]">
                    <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-primary px-3 py-1 rounded-full text-white text-xs font-bold">{featuredPost.category}</span>
                        <span className="text-white/70 text-sm flex items-center gap-1"><Calendar size={14}/> {featuredPost.date}</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-white mb-4 group-hover:text-primary transition-colors">{featuredPost.title}</h3>
                      <p className="text-white/70 text-lg max-w-2xl hidden md:block">{featuredPost.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* LATEST ARTICLES */}
            <div>
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><Tag className="text-primary"/> Latest Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {latestPosts.length > 0 ? latestPosts.map((post) => (
                  <Link href={`/blog/${post.id}`} key={post.id}>
                    <div className="group cursor-pointer">
                      <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-border/50">
                          {post.category}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                        <span className="flex items-center gap-1"><User size={14}/> {post.author}</span>
                        <span className="flex items-center gap-1"><Calendar size={14}/> {post.date}</span>
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="col-span-2 text-center py-12 text-muted-foreground bg-primary/5 rounded-2xl border border-primary/10">
                    No articles found for your search.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR (Popular Posts) */}
          <div className="lg:col-span-1 space-y-12">
            <div className="glass-card p-8 rounded-3xl border border-border">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2 border-b border-border/50 pb-4"><TrendingUp className="text-primary"/> Popular Posts</h2>
              <div className="space-y-6">
                {popularPosts.map((post, i) => (
                  <Link href={`/blog/${post.id}`} key={post.id} className="group block">
                    <div className="flex gap-4 items-center">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* AD / PROMO WIDGET */}
            <div className="glass-card p-8 rounded-3xl border border-primary/20 bg-primary/5 text-center">
              <h3 className="text-2xl font-black mb-4">Want to build something amazing?</h3>
              <p className="text-sm text-muted-foreground mb-6">Let our expert team turn your vision into a digital reality.</p>
              <Link href="/contact">
                <Button variant="premium" className="w-full rounded-full">Start a Project</Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="glass-card bg-gradient-to-br from-primary/10 to-indigo-500/10 border-primary/20 p-12 text-center rounded-[40px]">
          <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">Get the latest insights.</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join 10,000+ founders and marketers receiving our weekly newsletter on tech, design, and growth.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-background border border-border rounded-full px-6 py-4 focus:outline-none focus:border-primary text-sm"
            />
            <Button variant="premium" className="rounded-full px-8 py-4 h-auto">Subscribe</Button>
          </form>
        </div>
      </section>

    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  )
}
