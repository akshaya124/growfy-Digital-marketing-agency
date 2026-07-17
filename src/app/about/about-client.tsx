"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Award, Briefcase, Globe, Users, Target, Rocket, Heart, Trophy, MapPin, MonitorPlay, Eye, Quote, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const milestones = [
  { year: "2019", title: "The Inception", desc: "Growfy was founded with a vision to redefine digital marketing." },
  { year: "2020", title: "First Enterprise Client", desc: "Secured our first Fortune 500 partner, scaling our operations." },
  { year: "2021", title: "Agency Growth", desc: "Expanded the team to 50+ creatives and engineers." },
  { year: "2022", title: "100+ Projects Delivered", desc: "Crossed a major milestone in delivering high-converting ecosystems." },
  { year: "2023", title: "Global Expansion", desc: "Opened offices in London and Dubai. International client base." },
  { year: "2024", title: "AI Integration", desc: "Pioneered AI-driven marketing and automation services." },
  { year: "Future", title: "Beyond Limits", desc: "Building the next generation of spatial computing interfaces." }
];

const values = [
  { icon: Target, title: "Precision", desc: "Data-driven strategies that guarantee ROI." },
  { icon: Heart, title: "Empathy", desc: "User-centric design focused on real human needs." },
  { icon: Rocket, title: "Innovation", desc: "Always pushing boundaries with cutting-edge tech." },
  { icon: Users, title: "Collaboration", desc: "Radical transparency with our clients and team." }
];

const fallbackTeam = [
  { name: "Sarah Jenkins", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" },
  { name: "David Chen", role: "Chief Design Officer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
  { name: "Elena Rostova", role: "VP of Engineering", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop" },
  { name: "Marcus Webb", role: "Head of Marketing", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" }
];

function TimelineItem({ item, index }: { item: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <div ref={ref} className="relative flex items-center justify-between md:justify-normal w-full mb-20">
      {/* Connector Line */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-[-80px] w-0.5 bg-border -translate-x-1/2 z-0">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-primary origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isInView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ height: '100%' }}
        />
      </div>

      {/* Node */}
      <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <motion.div 
          initial={{ scale: 0, backgroundColor: "#fff" }}
          animate={{ 
            scale: isInView ? 1 : 0,
            backgroundColor: isInView ? "#a855f7" : "#fff",
            borderColor: isInView ? "#a855f7" : "#e5e7eb"
          }}
          transition={{ duration: 0.5 }}
          className="w-10 h-10 rounded-full border-4 border-muted flex items-center justify-center shadow-lg"
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (index % 2 === 0 ? -50 : 50) }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`w-full md:w-5/12 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right md:ml-auto md:order-1' : 'md:pl-16'}`}
      >
        <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:shadow-xl transition-shadow">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
          <h4 className="text-primary font-black text-2xl md:text-3xl mb-2">{item.year}</h4>
          <h5 className="font-bold text-lg mb-2">{item.title}</h5>
          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function AboutClient({ initialTeam = [], initialGallery = [] }: { initialTeam: any[], initialGallery: any[] }) {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen text-foreground pb-0 overflow-hidden selection:bg-primary/20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32 overflow-hidden">
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-8"
          >
            <Briefcase size={14} /> Inside Growfy
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8"
          >
            We Don&apos;t Just Build Brands. <br />
            <span className="text-primary">We Build Ecosystems.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            A collective of visionaries, engineers, and strategists dedicated to architecting the future of digital commerce.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. COMPANY INTRODUCTION (OUR STORY) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Our Story</h2>
            <h3 className="text-4xl font-black mb-6">Born from a desire to do things differently.</h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Growfy started in a small coffee shop in 2019 when our founders realized that traditional marketing agencies were failing to adapt to the modern web. We set out to create an agency that bridges the gap between stunning design, robust engineering, and AI-driven marketing.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Today, we are a global team of over 50 experts, helping startups and Fortune 500s alike navigate the complexities of the digital world.
            </p>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary to-indigo-500 rounded-3xl blur-2xl opacity-20 -z-10" />
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" alt="Team collaborating" className="rounded-3xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="glass-card p-12 rounded-[40px] border border-black/5 hover:border-primary/30 transition-colors">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-8">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-black mb-4">Our Mission</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To empower businesses by building high-performance digital ecosystems that automate growth, enhance brand equity, and deliver measurable ROI.
            </p>
          </div>
          <div className="glass-card p-12 rounded-[40px] border border-black/5 hover:border-primary/30 transition-colors">
            <div className="w-16 h-16 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center mb-8">
              <Eye size={32} />
            </div>
            <h3 className="text-3xl font-black mb-4">Our Vision</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To be the global leader in AI-driven digital transformation, setting the standard for how brands interact with technology and their audiences.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Philosophy</h2>
            <h3 className="text-4xl md:text-5xl font-black">Our Core Values</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card bg-background p-8 rounded-3xl hover:-translate-y-2 transition-transform"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <val.icon size={28} />
                </div>
                <h4 className="font-bold text-xl mb-3">{val.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOUNDER MESSAGE */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <Quote className="mx-auto w-16 h-16 text-primary/20 mb-8" />
        <h3 className="text-3xl md:text-4xl font-medium leading-snug mb-10 text-foreground">
          &quot;We don&apos;t just write code or design graphics; we architect growth engines. Our true success is measured purely by the success of the businesses we partner with.&quot;
        </h3>
        <div className="flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" alt="Sarah Jenkins" className="w-20 h-20 rounded-full mb-4 object-cover" />
          <h4 className="font-bold text-xl">Sarah Jenkins</h4>
          <p className="text-primary font-medium">CEO & Founder, Growfy</p>
        </div>
      </section>

      {/* 6. MEET THE TEAM */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Leadership</h2>
            <h3 className="text-4xl md:text-5xl font-black">Meet Our Team</h3>
          </div>
          <Button variant="outline" className="rounded-full">Join the Team</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(initialTeam.length > 0 ? initialTeam : fallbackTeam).map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={member.image || member.avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"}
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h4 className="font-bold text-xl mb-1">{member.name}</h4>
              <p className="text-primary text-sm font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. COMPANY JOURNEY TIMELINE */}
      <section className="max-w-5xl mx-auto px-6 py-24 relative">
        <div className="text-center mb-24">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">The Journey</h2>
          <h3 className="text-4xl md:text-5xl font-black">Our Evolution</h3>
        </div>
        
        <div className="relative pb-10">
          {milestones.map((item, idx) => (
            <TimelineItem key={idx} item={item} index={idx} />
          ))}
        </div>
      </section>



      {/* 9 & 10. WORK CULTURE & OFFICE GALLERY */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Culture & Space</h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6">Life at Growfy</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We believe that a great environment fosters great work. Our culture is built on continuous learning, open communication, and celebrating our wins.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 aspect-[16/9] rounded-3xl overflow-hidden relative group">
            <img src={initialGallery[0]?.url || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"} alt="Main Office" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-lg font-semibold">Silicon Valley HQ</div>
          </div>
          <div className="aspect-square md:aspect-auto rounded-3xl overflow-hidden relative group">
            <img src={initialGallery[1]?.url || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop"} alt="Team Collaboration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-lg font-semibold">Brainstorming</div>
          </div>
          <div className="aspect-square md:aspect-auto rounded-3xl overflow-hidden relative group">
            <img src={initialGallery[2]?.url || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop"} alt="Lounge" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-lg font-semibold">Relaxation Zone</div>
          </div>
          <div className="md:col-span-2 aspect-[16/9] rounded-3xl overflow-hidden relative group">
            <img src={initialGallery[3]?.url || "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop"} alt="Company Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-lg font-semibold">Annual Retreat</div>
          </div>
        </div>
      </section>

      {/* 11. CTA */}
      <section className="py-24 border-t border-border/50 bg-primary/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Zap className="mx-auto text-primary w-12 h-12 mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Grow with Us?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether you want to build a world-class digital product or join our team of innovators, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="premium" size="lg" className="h-14 px-8 text-lg rounded-full">
              Let's Talk Business
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full bg-background">
              View Open Roles
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
