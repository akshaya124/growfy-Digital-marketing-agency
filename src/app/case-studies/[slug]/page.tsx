"use client";

import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Target, Search, PenTool, Code, Zap, TrendingUp, Quote, ArrowLeft } from "lucide-react";
import Link from "next/link";

const getCaseStudyData = (slug: string) => {
  if (slug === "nova-ecommerce") {
    return {
      title: "Nova E-Commerce App",
      category: "Mobile Apps",
      heroImage: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1200&auto=format&fit=crop",
      overview: "Nova is a fast-growing fashion retailer that needed to transition from a clunky mobile web experience to a lightning-fast native application.",
      challenge: "Their mobile conversion rate was sitting at an abysmal 1.2%, heavily impacted by slow load times and a confusing checkout flow.",
      research: "We analyzed heatmaps and conducted 20+ user interviews to identify the exact friction points in the purchasing journey.",
      strategy: "A mobile-first, React Native architecture focused purely on speed, intuitive swiping gestures, and a 1-click Apple/Google Pay checkout.",
      design: "We implemented a sleek, dark-mode-first aesthetic with large, high-resolution imagery and minimal text to let the products shine.",
      dev: "Built on React Native for iOS/Android parity, integrated with Firebase for real-time inventory, and Stripe for seamless payments.",
      marketing: "Launched with an influencer-led social campaign driving users to download the app for exclusive 'app-only' drops.",
      results: "App downloads hit 50k in the first month. The new checkout flow reduced cart abandonment by 60%.",
      roi: "140% Increase in Mobile Sales within 90 days.",
      feedback: { name: "Michael Chang", role: "CEO, Nova", quote: "Growfy didn't just build us an app; they revolutionized how our customers shop. The ROI has been incredible." }
    };
  }
  
  if (slug === "aura-real-estate") {
    return {
      title: "Aura Branding & Web",
      category: "Branding & Web",
      heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      overview: "Aura is a premium real estate firm dealing in ultra-luxury properties. They needed a digital presence that matched their million-dollar listings.",
      challenge: "Their previous website looked like a generic template from 2010, failing to convey trust or luxury to high-net-worth clients.",
      research: "We analyzed the digital footprint of top-tier luxury brands (not just real estate) to understand the visual language of high-end consumerism.",
      strategy: "A complete brand overhaul. New logo, typography, and a cinematic web experience that feels like flipping through a high-end magazine.",
      design: "Employed a minimalist black and gold palette, serif typography, and full-screen video backgrounds to immediately capture attention.",
      dev: "Built using Next.js for blazing fast image delivery, with GSAP for buttery-smooth scroll animations that make the properties feel alive.",
      marketing: "A highly targeted SEO strategy focusing on long-tail keywords for luxury neighborhoods.",
      results: "Time spent on site increased by 300%. The new brand identity helped them secure 5 exclusive new development contracts.",
      roi: "Generated $40M in traceable pipeline value in 6 months.",
      feedback: { name: "Sarah Lin", role: "Founder, Aura", quote: "The branding and web experience they crafted perfectly captures our luxury ethos. We've seen a huge spike in high-ticket leads." }
    };
  }

  if (slug === "medisync-crm") {
    return {
      title: "MediSync CRM",
      category: "Automation",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      overview: "MediSync is a growing healthcare network that was struggling with massive administrative overhead due to manual patient intake processes.",
      challenge: "Staff were spending over 40 hours a week manually entering data from physical intake forms into three different isolated systems.",
      research: "We mapped the entire patient journey from appointment booking to post-visit follow-up, identifying 12 major bottlenecks.",
      strategy: "A custom HIPAA-compliant CRM and automated intake portal to serve as the single source of truth for all patient data.",
      design: "We designed a highly accessible, clean, and intuitive patient intake flow that even elderly patients found easy to navigate.",
      dev: "Engineered using Next.js and Python on an AWS HIPAA-compliant infrastructure, integrating deeply with their existing EMR software.",
      marketing: "Internal rollout campaign to staff and a 'Skip the Clipboard' digital campaign for patients.",
      results: "Wait times in the clinic dropped by 25%. Staff reclaimed 40+ hours per week previously spent on data entry.",
      roi: "Saved $85,000 annually in administrative costs.",
      feedback: { name: "Dr. James Wilson", role: "Director, MediSync", quote: "The CRM automation has literally saved our staff hundreds of hours. Their technical expertise is unmatched." }
    };
  }

  if (slug === "fintrack-dashboard") {
    return {
      title: "FinTrack Dashboard",
      category: "Websites",
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      overview: "FinTrack provides institutional investors with real-time analytics. Their legacy platform was struggling to render large datasets efficiently.",
      challenge: "The dashboard would freeze for up to 10 seconds when loading complex historical data charts, leading to high user frustration.",
      research: "We conducted performance profiling on their frontend architecture and found massive memory leaks tied to their charting library.",
      strategy: "A complete frontend rewrite using Vue.js and D3.js, shifting heavy data processing to a dedicated Node.js microservice.",
      design: "A dark-mode financial interface designed for trading floors, featuring modular widgets that users can drag and drop.",
      dev: "Implemented WebSocket connections for sub-second data updates and utilized WebGL for rendering charts with millions of data points smoothly.",
      marketing: "Launched at a major Fintech conference, utilizing the new platform speed as the core unique selling proposition.",
      results: "Dashboard load times plummeted from 10s to 0.4s. Customer churn dropped by 18% in the quarter following the launch.",
      roi: "Secured $2M in new enterprise contracts attributed to the platform upgrade.",
      feedback: { name: "Elena Rostova", role: "CTO, FinTrack", quote: "The speed of the new dashboard blew our clients away. Growfy engineered a masterpiece." }
    };
  }

  if (slug === "luxe-fashion-platform") {
    return {
      title: "Luxe Fashion Platform",
      category: "Websites",
      heroImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200&auto=format&fit=crop",
      overview: "A premier boutique fashion brand needed to scale their e-commerce presence internationally without sacrificing their high-end aesthetic.",
      challenge: "Their monolithic Shopify theme was slow, difficult to customize, and struggled with multi-currency checkout.",
      research: "We analyzed luxury brand e-commerce trends and realized a headless architecture was required to achieve the desired speed and design freedom.",
      strategy: "Decouple the frontend from Shopify, building a custom Next.js experience while keeping Shopify as the reliable backend engine.",
      design: "Minimalist, editorial-style layouts featuring giant, high-resolution lifestyle imagery and subtle scroll-triggered micro-animations.",
      dev: "Built on Next.js Commerce, integrating Shopify Storefront API, Sanity CMS for lookbooks, and Algolia for instant product search.",
      marketing: "A highly visual Meta Ads campaign driving traffic directly to the new, lightning-fast dynamic product pages.",
      results: "Page load speed improved by 300%. The headless setup allowed for seamless internationalization and multi-currency support.",
      roi: "+85% Conversion Rate leading to record-breaking Q4 revenue.",
      feedback: { name: "Marcus Thorne", role: "Creative Director", quote: "They brought our brand vision to life online without compromising a single millisecond of speed." }
    };
  }

  if (slug === "ai-support-bot") {
    return {
      title: "AI Support Bot",
      category: "Automation",
      heroImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
      overview: "A rapidly growing SaaS company was drowning in support tickets, with their human agents struggling to keep response times under 24 hours.",
      challenge: "Over 60% of their support tickets were repetitive 'how-to' questions that already existed in their documentation.",
      research: "We exported 10,000 past support tickets and used NLP to cluster and identify the most common user queries.",
      strategy: "Develop a custom AI chatbot trained specifically on their technical documentation and past ticket resolutions.",
      design: "A friendly, non-intrusive chat widget that feels conversational rather than robotic, complete with quick-action prompt buttons.",
      dev: "Leveraged OpenAI's GPT models via Python microservices, integrated directly into their existing Intercom and Zendesk workflows.",
      marketing: "An email campaign announcing the 'Instant Support' feature, resulting in immediate user adoption.",
      results: "The AI bot successfully resolved 70% of tier-1 support tickets without ever needing human intervention.",
      roi: "Decreased human response times from 24 hours to 15 minutes for complex queries.",
      feedback: { name: "David Chen", role: "VP of Operations", quote: "It’s like we hired 10 extra support agents overnight. The AI integration was flawless." }
    };
  }

  return null;
};

export default function CaseStudyDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  if (!slug) return null;

  const data = getCaseStudyData(slug);

  if (!data) notFound();

  return (
    <div className="min-h-screen text-foreground pb-24 selection:bg-primary/20">
      
      {/* 1. HERO */}
      <section className="relative pt-32 pb-0 px-6 border-b border-border/50">
        <div className="max-w-5xl mx-auto">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-semibold">
            <ArrowLeft size={16} /> Back to Case Studies
          </Link>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold w-fit mb-4">
            {data.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-12">{data.title}</h1>
          <div className="w-full aspect-video md:aspect-[21/9] rounded-t-3xl overflow-hidden relative">
            <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 pt-16">
        
        {/* 2 & 3. CLIENT OVERVIEW & CHALLENGE */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Client Overview</h2>
            <p className="text-lg leading-relaxed">{data.overview}</p>
          </div>
          <div>
            <h2 className="text-sm font-bold text-red-500 tracking-widest uppercase mb-4 flex items-center gap-2"><Target size={16}/> Business Challenge</h2>
            <p className="text-lg leading-relaxed">{data.challenge}</p>
          </div>
        </div>

        {/* 4 & 5. RESEARCH & STRATEGY */}
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-border mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><Search className="text-primary"/> Our Research</h2>
              <p className="text-muted-foreground leading-relaxed">{data.research}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><Zap className="text-primary"/> Strategy</h2>
              <p className="text-muted-foreground leading-relaxed">{data.strategy}</p>
            </div>
          </div>
        </div>

        {/* 6 & 7. DESIGN & DEV PROCESS */}
        <div className="space-y-12 mb-20">
          <h2 className="text-3xl font-black text-center mb-8">The Execution</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <PenTool size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Design Process</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{data.design}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
              <Code size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Development Process</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{data.dev}</p>
            </div>
          </div>
        </div>

        {/* 8. MARKETING CAMPAIGN */}
        <div className="glass-card bg-primary/5 p-8 rounded-3xl border border-primary/20 mb-20">
          <h3 className="text-2xl font-bold mb-3">Marketing & Launch</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">{data.marketing}</p>
        </div>

        {/* 9 & 10. RESULTS & ROI */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-black mb-8">The Results</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-3xl border border-border">
              <TrendingUp className="text-emerald-500 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-emerald-500">Key Outcomes</h3>
              <p className="text-lg">{data.results}</p>
            </div>
            <div className="glass-card p-8 rounded-3xl border border-border bg-emerald-500/10">
              <div className="text-5xl font-black text-emerald-500 mb-4">ROI</div>
              <p className="text-xl font-bold">{data.roi}</p>
            </div>
          </div>
        </div>

        {/* 11. CLIENT FEEDBACK */}
        <div className="mb-24">
          <div className="glass-card p-10 rounded-3xl border border-border relative text-center">
            <Quote className="mx-auto text-primary/20 w-16 h-16 mb-6" />
            <p className="text-xl md:text-2xl italic mb-8 relative z-10 leading-relaxed font-medium">"{data.feedback.quote}"</p>
            <div>
              <h4 className="font-bold text-lg">{data.feedback.name}</h4>
              <p className="text-primary font-medium">{data.feedback.role}</p>
            </div>
          </div>
        </div>

        {/* 12. RELATED PROJECTS CTA */}
        <div className="text-center border-t border-border pt-16">
          <h2 className="text-3xl font-black mb-8">Want results like this?</h2>
          <div className="flex justify-center gap-4">
             <Link href="/contact">
               <Button variant="premium" size="lg" className="rounded-full">Start Your Project</Button>
             </Link>
             <Link href="/case-studies">
               <Button variant="outline" size="lg" className="rounded-full bg-background">View More Case Studies</Button>
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
