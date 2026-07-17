export interface ServiceFeature {
  title: string;
  desc: string;
}

export interface ServiceProcessStep {
  step: string;
  desc: string;
  details: string[];
}

export interface ServiceProofOfWork {
  client: string;
  roi: string;
  desc: string;
  img: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  features: string[];
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceData {
  title: string;
  overview: string;
  problems: string[];
  features: ServiceFeature[];
  process: ServiceProcessStep[];
  proofOfWork: ServiceProofOfWork[];
  tech: string[];
  packages: ServicePackage[];
  faqs: ServiceFAQ[];
}

export const serviceDatabase: Record<string, ServiceData> = {
  // ==========================================
  // DEVELOPMENT
  // ==========================================
  "website-development": {
    title: "Website Development",
    overview: "We build fast, responsive, and scalable websites that drive conversions and establish your digital authority.",
    problems: [
      "Slow loading speeds costing you customers.",
      "Non-responsive designs that break on mobile.",
      "Poor conversion rates despite high traffic.",
      "Hard-to-manage legacy CMS platforms."
    ],
    features: [
      { title: "Custom Architecture", desc: "Built specifically for your business needs." },
      { title: "Headless CMS", desc: "Decoupled architecture for blazing fast speeds." },
      { title: "SEO Optimized", desc: "Built-in technical SEO best practices." },
      { title: "E-Commerce Ready", desc: "Seamless integration with Stripe & Shopify." }
    ],
    process: [
      { step: "Discovery", desc: "Deep dive into your business goals.", details: ["Brand alignment session", "Competitor analysis", "Technical requirement scoping"] },
      { step: "Wireframing", desc: "Mapping the user journey.", details: ["User journey mapping", "Figma wireframing", "Conversion funnel optimization"] },
      { step: "Development", desc: "Coding with Next.js & React.", details: ["Pixel-perfect implementation", "CMS integration", "Performance optimization"] },
      { step: "Launch", desc: "Deployment and QA testing.", details: ["Cross-browser testing", "SEO migration", "Live server deployment"] }
    ],
    proofOfWork: [
      { client: "Apex Tech", roi: "+210% Traffic", desc: "Rebuilt their legacy site using Next.js, dropping load times to under 1s and doubling organic traffic.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" },
      { client: "Zenith Retail", roi: "+150% Sales", desc: "Created a lightning-fast headless Shopify store that drastically improved the mobile checkout experience.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel", "Sanity CMS"],
    packages: [
      { name: "Landing Page", price: "$1,500+", features: ["One-page design", "Basic SEO", "Contact Form"] },
      { name: "Corporate Site", price: "$4,500+", features: ["Up to 10 pages", "CMS Integration", "Advanced SEO", "Analytics Setup"] },
      { name: "Custom Platform", price: "Custom", features: ["Unlimited Pages", "Custom Backend", "API Integrations", "24/7 Support"] }
    ],
    faqs: [
      { q: "How long does a website take to build?", a: "A standard corporate site takes 4-6 weeks." },
      { q: "Do you provide hosting?", a: "Yes, we handle hosting via Vercel or AWS." },
      { q: "Will my website be mobile-friendly?", a: "Yes, we use a mobile-first approach for all designs to ensure perfect display on any device." },
      { q: "Do you provide SEO optimization?", a: "Basic technical SEO is included in all packages to give you a strong foundation." }
    ]
  },
  "web-applications": {
    title: "Web Application Development",
    overview: "We engineer complex, data-driven web applications that streamline workflows and provide immense value to your users.",
    problems: [
      "Relying on messy spreadsheets for complex operations.",
      "Off-the-shelf software not fitting your unique processes.",
      "Data silos across multiple disjointed platforms.",
      "Poor scalability as your user base grows."
    ],
    features: [
      { title: "Custom Logic", desc: "Business rules programmed exactly to your needs." },
      { title: "API Integrations", desc: "Connect seamlessly with your existing tools." },
      { title: "Real-time Sync", desc: "Live data updates using WebSockets." },
      { title: "Enterprise Security", desc: "Role-based access control and encryption." }
    ],
    process: [
      { step: "Architecture", desc: "Designing the database and data flow.", details: ["Schema design", "API architecture planning", "Security protocol drafting"] },
      { step: "Prototyping", desc: "Interactive mockups of the application.", details: ["Dashboard wireframing", "User flow testing", "Stakeholder approval"] },
      { step: "Engineering", desc: "Full-stack development.", details: ["Frontend state management", "Backend logic implementation", "Third-party API integration"] },
      { step: "Deployment", desc: "Going live on scalable infrastructure.", details: ["CI/CD pipeline setup", "Load testing", "User onboarding planning"] }
    ],
    proofOfWork: [
      { client: "LogisTracker", roi: "30% Efficiency", desc: "Built a custom logistics dashboard that eliminated manual data entry across 4 warehouses.", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop" },
      { client: "MedPortal", roi: "HIPAA Compliant", desc: "Developed a secure patient management portal handling 10,000+ daily active users.", img: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Firebase", "GraphQL", "AWS"],
    packages: [
      { name: "MVP Web App", price: "$15,000+", features: ["Core Business Logic", "Authentication", "Basic Dashboard"] },
      { name: "Full Platform", price: "$35,000+", features: ["Advanced Features", "Multiple User Roles", "Payment Gateway", "Analytics"] },
      { name: "Enterprise SaaS", price: "Custom", features: ["Microservices", "SLA Support", "Dedicated Infrastructure", "SOC2 Compliance"] }
    ],
    faqs: [
      { q: "Can you take over an existing codebase?", a: "Yes, provided the code is written in modern JavaScript/TypeScript." },
      { q: "Do I own the source code?", a: "Absolutely. Once paid, the intellectual property is 100% yours." },
      { q: "Can you integrate with third-party APIs?", a: "Yes, we specialize in complex API integrations and custom middleware." },
      { q: "What kind of support do you provide post-launch?", a: "We offer SLA-backed maintenance and support retainers to keep your app running smoothly." }
    ]
  },
  "mobile-apps": {
    title: "Mobile App Development",
    overview: "Engage your users on the go with high-performance, native-feeling mobile applications for iOS and Android.",
    problems: [
      "Losing market share to competitors with apps.",
      "Clunky web-wrappers masquerading as apps.",
      "High costs of maintaining separate iOS and Android codebases.",
      "Poor app store ratings due to bugs."
    ],
    features: [
      { title: "Cross-Platform", desc: "One codebase for both iOS and Android." },
      { title: "Native Performance", desc: "Smooth 60fps animations and transitions." },
      { title: "Offline Support", desc: "Keep users engaged even without internet." },
      { title: "Push Notifications", desc: "Direct channel to your users' pockets." }
    ],
    process: [
      { step: "Concept", desc: "Defining the core app loop.", details: ["Feature prioritization", "Monetization strategy", "Tech stack selection"] },
      { step: "UI/UX", desc: "Designing intuitive mobile interfaces.", details: ["Interactive prototyping", "Apple/Google design guidelines", "Usability testing"] },
      { step: "Engineering", desc: "Building with React Native.", details: ["API integrations", "State management", "Offline data sync"] },
      { step: "App Store", desc: "Publishing and compliance.", details: ["App Store submission", "Play Store rollout", "App Store Optimization (ASO)"] }
    ],
    proofOfWork: [
      { client: "FitLife App", roi: "50k+ Downloads", desc: "A cross-platform fitness tracker that reached #5 in Health & Fitness during launch week.", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop" },
      { client: "Nova Delivery", roi: "4.9★ Rating", desc: "Built a highly responsive delivery driver app with real-time GPS tracking and offline sync.", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["React Native", "Expo", "Firebase", "Redux", "Swift", "Kotlin"],
    packages: [
      { name: "MVP App", price: "$10,000+", features: ["Core features", "iOS & Android", "Basic Analytics"] },
      { name: "Full Scale", price: "$25,000+", features: ["Advanced features", "Custom UI", "Push Notifications", "Admin Panel"] },
      { name: "Enterprise", price: "Custom", features: ["Legacy Integration", "Dedicated Team", "SLA Support"] }
    ],
    faqs: [
      { q: "Will the app work on both Apple and Android?", a: "Yes, we build cross-platform apps." },
      { q: "Can you help get it approved in the App Store?", a: "Absolutely, we handle the entire submission process." },
      { q: "Do you build for tablets as well?", a: "Yes, our apps are fully responsive across both phones and tablets." },
      { q: "How do you handle app updates?", a: "We manage the entire update rollout process through the respective App Stores." }
    ]
  },
  "e-commerce": {
    title: "E-Commerce Development",
    overview: "We engineer high-converting digital storefronts that scale effortlessly during traffic spikes and sales events.",
    problems: [
      "High cart abandonment rates due to slow checkouts.",
      "Inflexible platforms limiting merchandising strategies.",
      "Poor mobile shopping experience.",
      "Complex inventory sync issues."
    ],
    features: [
      { title: "Lightning Fast", desc: "Sub-second page loads to boost conversions." },
      { title: "Custom Integrations", desc: "Syncs perfectly with your ERP and 3PL." },
      { title: "Headless Architecture", desc: "Frontend separated from backend for max flexibility." },
      { title: "Advanced Analytics", desc: "Deep insights into customer purchasing behavior." }
    ],
    process: [
      { step: "Strategy", desc: "Planning the commerce architecture.", details: ["Platform selection (Shopify vs Custom)", "Payment gateway strategy", "Logistics mapping"] },
      { step: "Design", desc: "Creating high-converting product pages.", details: ["Mobile-first checkout flow", "Category architecture", "Trust signal placement"] },
      { step: "Development", desc: "Building the storefront.", details: ["Headless frontend implementation", "Inventory sync scripts", "CRM integration"] },
      { step: "Launch", desc: "Go-live and optimization.", details: ["Load testing for sales events", "Analytics verification", "Post-launch tuning"] }
    ],
    proofOfWork: [
      { client: "Luxe Wear", roi: "+85% Conversion", desc: "Migrated their legacy store to a headless Shopify build, dramatically increasing mobile sales.", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop" },
      { client: "Bean Co", roi: "Zero Downtime", desc: "Engineered a custom checkout flow that handled 50,000 concurrent users during a flash sale.", img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Shopify Plus", "Next.js Commerce", "Stripe", "Algolia", "Sanity"],
    packages: [
      { name: "Shopify Store", price: "$5,000+", features: ["Custom Theme", "App Integrations", "Payment Setup"] },
      { name: "Headless Build", price: "$15,000+", features: ["Next.js Frontend", "Shopify Backend", "Sub-second Speeds", "Custom Analytics"] },
      { name: "Enterprise Commerce", price: "Custom", features: ["Multi-region setup", "ERP Integration", "B2B Functionality", "Dedicated Support"] }
    ],
    faqs: [
      { q: "Do you recommend Shopify or custom?", a: "For 90% of brands, Shopify Plus or Headless Shopify is the best route." },
      { q: "Can you integrate with our inventory software?", a: "Yes, we build custom middleware to sync your 3PL and ERP." },
      { q: "Can you handle product imports?", a: "Yes, we can migrate your existing product catalog via CSV or API." },
      { q: "Do you set up payment gateways?", a: "Yes, we integrate with major providers like Stripe, PayPal, and Shopify Payments." }
    ]
  },
  "custom-software": {
    title: "Custom Software Solutions",
    overview: "Stop adapting your business to off-the-shelf software. We build proprietary systems tailored to your exact operational workflows.",
    problems: [
      "Using 15 different SaaS tools that don't talk to each other.",
      "Manual data entry eating up hundreds of employee hours.",
      "Outgrowing standard CRM/ERP platforms.",
      "Lack of centralized data visibility."
    ],
    features: [
      { title: "Proprietary IP", desc: "You own the software that runs your business." },
      { title: "Workflow Automation", desc: "Replace manual tasks with automated triggers." },
      { title: "Unified Dashboards", desc: "All your company data in one single pane of glass." },
      { title: "Extreme Scalability", desc: "Built to handle millions of records effortlessly." }
    ],
    process: [
      { step: "Business Audit", desc: "Mapping your exact internal workflows.", details: ["Process bottleneck identification", "Data flow mapping", "Stakeholder interviews"] },
      { step: "System Design", desc: "Architecting the perfect solution.", details: ["Database schema design", "Microservices architecture", "Security compliance mapping"] },
      { step: "Development", desc: "Iterative agile engineering.", details: ["Sprints & continuous delivery", "Backend API creation", "Frontend dashboard build"] },
      { step: "Training", desc: "Onboarding your team.", details: ["Documentation creation", "Staff training sessions", "Phased rollout"] }
    ],
    proofOfWork: [
      { client: "BuildIt Construction", roi: "Saved 200hrs/mo", desc: "Created a centralized project management and bidding system replacing 4 separate SaaS tools.", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" },
      { client: "Aero Logistics", roi: "Real-time Tracking", desc: "Built a proprietary routing algorithm and tracking portal for their fleet.", img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c1590a?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["PostgreSQL", "Node.js", "React", "Docker", "AWS", "Redis"],
    packages: [
      { name: "Internal Tool", price: "$20,000+", features: ["Specific Workflow Solution", "Basic Admin Panel", "Standard Security"] },
      { name: "Core System", price: "$50,000+", features: ["Multiple Modules", "Advanced Dashboards", "API Connectivity", "Role Management"] },
      { name: "Enterprise OS", price: "Custom", features: ["Full Company Operating System", "AI Integrations", "High Availability Infrastructure"] }
    ],
    faqs: [
      { q: "How do we maintain it after launch?", a: "We offer SLA retainers to maintain, host, and upgrade your software." },
      { q: "Is custom software worth the investment?", a: "If standard SaaS costs you thousands a month and still requires manual workarounds, custom software yields massive long-term ROI." },
      { q: "How secure is custom software?", a: "We implement enterprise-grade security including encryption, SOC2 compliance standards, and role-based access." },
      { q: "Can you build an internal admin panel?", a: "Yes, all our custom software comes with an intuitive admin dashboard for your team." }
    ]
  },

  // ==========================================
  // DESIGN
  // ==========================================
  "ui-ux-design": {
    title: "UI/UX Design",
    overview: "We design intuitive, gorgeous digital interfaces that reduce friction, delight users, and drive meaningful engagement.",
    problems: [
      "Users dropping off due to confusing navigation.",
      "An interface that looks outdated compared to competitors.",
      "High bounce rates on key landing pages.",
      "Complex features that users don't know how to use."
    ],
    features: [
      { title: "User-Centric", desc: "Designed based on real user psychology." },
      { title: "Design Systems", desc: "Scalable component libraries in Figma." },
      { title: "Micro-interactions", desc: "Subtle animations that make apps feel alive." },
      { title: "Conversion Optimized", desc: "Strategic placement of CTAs and trust signals." }
    ],
    process: [
      { step: "Research", desc: "Understanding the user and market.", details: ["Competitor benchmarking", "User persona creation", "Heuristic evaluation"] },
      { step: "Wireframing", desc: "Laying the structural foundation.", details: ["Information architecture", "Low-fidelity wireframes", "User flow mapping"] },
      { step: "UI Design", desc: "Applying visual aesthetics.", details: ["High-fidelity mockups", "Typography & color application", "Design system creation"] },
      { step: "Prototyping", desc: "Interactive testing.", details: ["Clickable Figma prototypes", "Usability testing", "Developer handoff prep"] }
    ],
    proofOfWork: [
      { client: "FinBank App", roi: "+40% Retention", desc: "Redesigned their mobile banking app, dramatically simplifying the money transfer flow.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop" },
      { client: "SaaSify", roi: "-25% Churn", desc: "Overhauled their complex B2B dashboard into a clean, intuitive interface.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Figma", "Framer", "Adobe XD", "Principle", "Miro"],
    packages: [
      { name: "App Refresh", price: "$3,000+", features: ["UI Update", "Up to 10 Screens", "Basic Prototype"] },
      { name: "Full UX Overhaul", price: "$8,000+", features: ["Deep UX Research", "Full App Redesign", "Design System", "Interactive Prototype"] },
      { name: "Retainer", price: "$2,500/mo", features: ["Ongoing UI updates", "New feature design", "A/B test designs"] }
    ],
    faqs: [
      { q: "Do you code the designs?", a: "This service is purely for the design (Figma). We offer development as a separate service." },
      { q: "Can we use the design system later?", a: "Yes, you get full access to the organized Figma component library." },
      { q: "What tools do you use for design?", a: "We primarily use Figma for collaborative UI/UX design." },
      { q: "Do you do user testing?", a: "Yes, we offer interactive usability testing as part of our full UX overhaul package." }
    ]
  },
  "branding": {
    title: "Brand Identity",
    overview: "We build magnetic brands that command attention, foster loyalty, and stand out in crowded markets.",
    problems: [
      "Inconsistent visuals across different platforms.",
      "A brand voice that sounds like everyone else.",
      "Struggling to charge premium prices due to cheap aesthetics.",
      "No clear brand guidelines for your team to follow."
    ],
    features: [
      { title: "Visual Cohesion", desc: "Unified look across web, print, and social." },
      { title: "Brand Voice", desc: "Distinctive messaging guidelines." },
      { title: "Premium Aesthetics", desc: "Position your company as a market leader." },
      { title: "Comprehensive Guidelines", desc: "A rulebook for how to use your brand." }
    ],
    process: [
      { step: "Strategy", desc: "Defining the core brand pillars.", details: ["Brand archetype discovery", "Mission & vision alignment", "Target audience psychographics"] },
      { step: "Identity", desc: "Crafting the visual language.", details: ["Logo design", "Color palette development", "Typography selection"] },
      { step: "Application", desc: "Testing the brand in the wild.", details: ["Business card mockups", "Social media templates", "Website hero concept"] },
      { step: "Guidelines", desc: "Creating the brand bible.", details: ["Do's and don'ts", "Tone of voice document", "Asset export"] }
    ],
    proofOfWork: [
      { client: "Oasis Wellness", roi: "Premium Pivot", desc: "Completely rebranded them from a discount spa to a luxury wellness retreat.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop" },
      { client: "Vanguard Capital", roi: "Trust Established", desc: "Created a modern, authoritative identity that helped them secure $50M in AUM.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Illustrator", "Photoshop", "InDesign", "Figma"],
    packages: [
      { name: "Visual Identity", price: "$2,500+", features: ["Logo Design", "Colors & Fonts", "Basic Guidelines"] },
      { name: "Full Rebrand", price: "$6,000+", features: ["Brand Strategy", "Voice & Tone", "Extensive Brand Book", "Marketing Collateral"] },
      { name: "Global Enterprise", price: "Custom", features: ["Sub-brand architecture", "Extensive market research", "Global trademarking support"] }
    ],
    faqs: [
      { q: "What is a brand book?", a: "A document detailing exactly how to use your logo, fonts, and colors to maintain consistency." },
      { q: "Do you help with naming?", a: "Yes, naming is offered as an add-on to our Full Rebrand package." },
      { q: "Do you design business cards?", a: "Yes, stationary and collateral design are included in our higher-tier packages." },
      { q: "Can we trademark the brand?", a: "We design original assets, but you will need a legal professional to execute the trademark process." }
    ]
  },
  "logo-design": {
    title: "Logo Design",
    overview: "Crafting iconic, memorable logos that perfectly encapsulate your brand identity and resonate with your audience.",
    problems: [
      "A generic logo that blends in with competitors.",
      "Outdated designs that don't reflect your current brand.",
      "Complex logos that don't scale or print well.",
      "Lack of a cohesive visual identity system."
    ],
    features: [
      { title: "Bespoke Design", desc: "100% original, custom-crafted vectors." },
      { title: "Versatility", desc: "Looks perfect on a billboard or a favicon." },
      { title: "Brand Identity", desc: "Includes color palettes and typography." },
      { title: "Full Ownership", desc: "You receive all source files and IP rights." }
    ],
    process: [
      { step: "Discovery", desc: "Understanding your brand's soul.", details: ["Brand questionnaire", "Competitor visual audit", "Moodboard creation"] },
      { step: "Sketching", desc: "Exploring creative directions.", details: ["Pencil sketches", "Silhouette testing", "Concept refinement"] },
      { step: "Digital Drafts", desc: "Bringing the best concepts to life.", details: ["Vectorization in Illustrator", "Typography pairing", "Color psychology application"] },
      { step: "Final Polish", desc: "Delivering the complete package.", details: ["Client revisions", "Exporting all formats (SVG, PNG, EPS)", "Brand guideline PDF"] }
    ],
    proofOfWork: [
      { client: "Aura Coffee", roi: "Brand Relaunch", desc: "Designed a minimalist, earthy logo that spearheaded their highly successful franchising push.", img: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?q=80&w=1200&auto=format&fit=crop" },
      { client: "Nexus Tech", roi: "Series A Identity", desc: "Created a sharp, modern geometric mark that secured their professional image during funding rounds.", img: "https://images.unsplash.com/photo-1616036740257-9449ea1f6605?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Adobe Illustrator", "Figma", "Photoshop", "Pantone"],
    packages: [
      { name: "Startup Logo", price: "$800+", features: ["3 Concepts", "2 Revision Rounds", "All File Formats"] },
      { name: "Brand Identity", price: "$2,500+", features: ["5 Concepts", "Typography & Colors", "Brand Book", "Social Media Kit"] },
      { name: "Full Rebrand", price: "Custom", features: ["Full Audit", "Unlimited Concepts", "Stationery Design", "Motion Logo"] }
    ],
    faqs: [
      { q: "Do I get the vector source files?", a: "Yes, you receive the full AI/EPS vector files." },
      { q: "How many revisions do we get?", a: "Standard packages include 2-3 rounds of revisions to ensure you're happy." },
      { q: "Can you animate our logo?", a: "Yes, motion logo design is available as an add-on." },
      { q: "Who owns the copyright?", a: "Upon final payment, full copyright ownership transfers completely to you." }
    ]
  },
  "graphic-design": {
    title: "Graphic Design",
    overview: "High-impact visual assets for your marketing campaigns, social media, and digital presence.",
    problems: [
      "Inconsistent visual quality across social platforms.",
      "Struggling to produce creative assets quickly enough.",
      "Boring ads that fail to capture attention.",
      "Lack of in-house design resources."
    ],
    features: [
      { title: "Scroll-Stopping", desc: "Designed to capture attention instantly." },
      { title: "Brand Aligned", desc: "Strict adherence to your visual identity." },
      { title: "Multi-Format", desc: "Optimized for IG, LinkedIn, Print, etc." },
      { title: "Rapid Turnaround", desc: "Quick delivery for fast-moving campaigns." }
    ],
    process: [
      { step: "Briefing", desc: "Understanding the campaign goal.", details: ["Asset requirements gathering", "Copy integration", "Format specifications"] },
      { step: "Drafting", desc: "Creating the initial visuals.", details: ["Layout design", "Stock/asset sourcing", "First review"] },
      { step: "Refinement", desc: "Polishing the graphics.", details: ["Revisions based on feedback", "Color correction", "Typography alignment"] },
      { step: "Delivery", desc: "Providing the final files.", details: ["Exporting to required formats", "Organizing assets", "Handoff"] }
    ],
    proofOfWork: [
      { client: "Glow Cosmetics", roi: "+45% CTR", desc: "Designed a series of highly engaging Meta ad creatives that drastically lowered their CPA.", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop" },
      { client: "TechSummit", roi: "Event Sold Out", desc: "Created all digital and physical collateral for their annual conference.", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Photoshop", "Illustrator", "InDesign", "Figma", "Canva (Templates)"],
    packages: [
      { name: "Campaign Kit", price: "$1,200+", features: ["10 Ad Creatives", "Social Media Posts", "Email Headers"] },
      { name: "Monthly Retainer", price: "$2,000/mo", features: ["Unlimited Requests", "Dedicated Designer", "48hr Turnaround"] },
      { name: "Print & Digital", price: "$3,500+", features: ["Brochures", "Pitch Decks", "Billboard Designs", "Merch"] }
    ],
    faqs: [
      { q: "Do you offer unlimited design retainers?", a: "Yes, our monthly retainer works on a queue system for unlimited requests." },
      { q: "Can you design pitch decks?", a: "Absolutely, we specialize in high-end investor pitch decks." },
      { q: "Do you do print design?", a: "Yes, we design for both digital mediums and physical print." },
      { q: "Can you work with our existing brand guidelines?", a: "Absolutely, we strictly adhere to your established brand rules." }
    ]
  },
  // ==========================================
  // MARKETING
  // ==========================================
  "seo": {
    title: "Search Engine Optimization",
    overview: "Dominate search rankings and drive high-intent organic traffic to your website through technical and content-driven SEO.",
    problems: [
      "Your website doesn't appear on the first page of Google.",
      "Competitors are stealing your organic traffic.",
      "You get traffic, but they don't convert.",
      "Technical issues are penalizing your site."
    ],
    features: [
      { title: "Technical SEO", desc: "Fixing core web vitals and crawl errors." },
      { title: "Content Strategy", desc: "Targeting high-volume, low-competition keywords." },
      { title: "Backlink Building", desc: "Acquiring high-authority, relevant links." },
      { title: "Local SEO", desc: "Dominating local map packs and searches." }
    ],
    process: [
      { step: "Audit", desc: "Deep dive into your current standing.", details: ["Technical site audit", "Competitor gap analysis", "Keyword research"] },
      { step: "On-Page", desc: "Optimizing your existing assets.", details: ["Meta tag optimization", "Internal linking structure", "Page speed improvements"] },
      { step: "Content", desc: "Creating rankable assets.", details: ["Blog post creation", "Landing page copy optimization", "Schema markup implementation"] },
      { step: "Off-Page", desc: "Building authority.", details: ["Outreach campaigns", "Guest posting", "Citation building"] }
    ],
    proofOfWork: [
      { client: "Legal Firm Partners", roi: "+400% Leads", desc: "Ranked them #1 for highly competitive local search terms in under 6 months.", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop" },
      { client: "EcoShop", roi: "100k Monthly Visitors", desc: "Scaled their organic traffic from zero to 100k through a massive content cluster strategy.", img: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog", "SurferSEO"],
    packages: [
      { name: "Local SEO", price: "$1,000/mo", features: ["Google My Business", "Local Citations", "Review Management"] },
      { name: "Growth SEO", price: "$2,500/mo", features: ["National Targeting", "Content Creation", "Link Building", "Technical Audits"] },
      { name: "Enterprise SEO", price: "Custom", features: ["International SEO", "Programmatic SEO", "Dedicated Strategy Team"] }
    ],
    faqs: [
      { q: "How long until we see results?", a: "SEO is a long-term game. Typically, significant movement is seen between months 3 and 6." },
      { q: "Do you guarantee rankings?", a: "No reputable agency guarantees #1 spots due to algorithm volatility, but we guarantee execution and KPI growth." },
      { q: "Do you do local SEO?", a: "Yes, we optimize Google My Business profiles and manage local citations." },
      { q: "Can you audit our current SEO?", a: "Yes, we perform a comprehensive technical audit before starting any major campaign." }
    ]
  },
  "social-media-marketing": {
    title: "Social Media Marketing",
    overview: "Build a loyal community, increase brand awareness, and drive engagement across all major social platforms.",
    problems: [
      "Inconsistent posting and low engagement.",
      "Struggling to come up with fresh content ideas.",
      "Followers aren't converting into paying customers.",
      "No clear strategy tying social to business goals."
    ],
    features: [
      { title: "Platform Strategy", desc: "Tailored approaches for IG, TikTok, LinkedIn." },
      { title: "Community Management", desc: "Engaging directly with your audience." },
      { title: "Trend Jacking", desc: "Capitalizing on viral trends quickly." },
      { title: "Visual Consistency", desc: "Maintaining your brand identity online." }
    ],
    process: [
      { step: "Strategy", desc: "Defining the content pillars.", details: ["Audience persona development", "Platform selection", "Content theme creation"] },
      { step: "Creation", desc: "Producing the assets.", details: ["Copywriting", "Graphic design", "Short-form video editing"] },
      { step: "Scheduling", desc: "Planning the calendar.", details: ["Optimal time analysis", "Hashtag strategy", "Content calendar approval"] },
      { step: "Engagement", desc: "Managing the community.", details: ["Replying to comments", "Proactive outreach", "Monthly performance reporting"] }
    ],
    proofOfWork: [
      { client: "Bite Snacks", roi: "1M+ Views", desc: "Grew their TikTok following from 0 to 50k in one month through a viral content strategy.", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop" },
      { client: "SaaS Founders", roi: "+200% Inbound", desc: "Leveraged LinkedIn thought leadership to drive massive B2B inbound leads.", img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Sprout Social", "Hootsuite", "Canva", "CapCut", "Later"],
    packages: [
      { name: "Starter Social", price: "$1,500/mo", features: ["2 Platforms", "12 Posts/mo", "Basic Community Mgmt"] },
      { name: "Growth Social", price: "$3,000/mo", features: ["3 Platforms", "20 Posts/mo", "Short-form Reels", "Proactive Engagement"] },
      { name: "Omnichannel", price: "$6,000/mo", features: ["All Platforms", "Daily Posting", "Full Video Production", "Influencer Outreach"] }
    ],
    faqs: [
      { q: "Do you shoot the videos?", a: "We can edit provided footage, or you can bolt on our 'Videography' service for full production." },
      { q: "Who responds to DMs?", a: "Our community managers handle basic inquiries and escalate complex ones to your team." },
      { q: "Do you create content for TikTok?", a: "Yes, short-form vertical video is a core part of our modern strategy." },
      { q: "Can you run influencer campaigns?", a: "Yes, influencer outreach and management is included in our Omnichannel package." }
    ]
  },
  "performance-marketing": {
    title: "Performance Marketing",
    overview: "Data-driven, ROI-focused paid advertising campaigns across Google, Meta, and emerging channels to scale your revenue.",
    problems: [
      "High Customer Acquisition Costs (CAC) eating your margins.",
      "Ad fatigue causing campaigns to flatline.",
      "Inaccurate tracking preventing you from knowing what works.",
      "Agencies hiding behind vanity metrics instead of ROI."
    ],
    features: [
      { title: "Omnichannel Approach", desc: "Google, Meta, TikTok, and LinkedIn." },
      { title: "Advanced Tracking", desc: "Server-side tracking and attribution modeling." },
      { title: "Creative Testing", desc: "Rigorous A/B testing of ad creatives." },
      { title: "Scaling", desc: "Aggressively increasing budget on winning ads." }
    ],
    process: [
      { step: "Onboarding", desc: "Auditing accounts and tracking.", details: ["Pixel & Conversion API setup", "Historical data analysis", "Offer formulation"] },
      { step: "Creation", desc: "Building the campaign assets.", details: ["Direct-response copywriting", "UGC video curation", "Landing page optimization"] },
      { step: "Launch", desc: "Deploying initial testing phases.", details: ["Audience testing", "Creative testing matrix", "Budget allocation"] },
      { step: "Scale", desc: "Maximizing the winners.", details: ["Killing losing ads", "Vertical and horizontal scaling", "Retargeting funnel implementation"] }
    ],
    proofOfWork: [
      { client: "Glow Skincare", roi: "4.5x ROAS", desc: "Scaled their monthly ad spend from $10k to $100k while maintaining profitability.", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop" },
      { client: "FinTech Pro", roi: "-60% CAC", desc: "Restructured their Google Ads account to drastically lower the cost per acquired user.", img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Google Ads", "Meta Ads Manager", "TikTok Ads", "Google Tag Manager", "TripleWhale"],
    packages: [
      { name: "Single Channel", price: "$2,000/mo", features: ["Management of Google OR Meta", "Creative Testing", "Weekly Reporting"] },
      { name: "Omnichannel Growth", price: "$4,500/mo", features: ["Google + Meta + TikTok", "Advanced Attribution", "Custom Dashboards"] },
      { name: "Performance Partnership", price: "Custom", features: ["Base + % of Revenue", "Full Creative Production", "Dedicated Media Buyer"] }
    ],
    faqs: [
      { q: "Is ad spend included in the fee?", a: "No, the packages cover our management fee. Ad spend is billed directly by the platforms." },
      { q: "What is the minimum ad spend required?", a: "We typically require a minimum monthly ad spend of $5,000 to ensure we can test and scale effectively." },
      { q: "Do you do remarketing campaigns?", a: "Yes, retargeting is essential to our scaling strategy." },
      { q: "How often do you report on performance?", a: "We provide custom real-time dashboards and have weekly or bi-weekly check-ins." }
    ]
  },

  // ==========================================
  // MEDIA
  // ==========================================
  "videography": {
    title: "Videography & Commercials",
    overview: "Cinematic video production that tells your brand story, showcases your products, and hooks viewers instantly.",
    problems: [
      "Low-quality iPhone videos hurting your brand perception.",
      "Videos that look nice but don't convert viewers into buyers.",
      "Struggling to explain complex products clearly.",
      "Lack of video assets for your ad campaigns."
    ],
    features: [
      { title: "Cinematic Quality", desc: "Shot on RED/ARRI cinema cameras." },
      { title: "Story-Driven", desc: "Scripts designed to evoke emotion and action." },
      { title: "Multi-Format Delivery", desc: "Exported for TV, YouTube, and TikTok/IG." },
      { title: "Full Production", desc: "We handle casting, locations, and permits." }
    ],
    process: [
      { step: "Pre-Production", desc: "Planning the shoot.", details: ["Scriptwriting", "Storyboarding", "Location scouting & Casting"] },
      { step: "Production", desc: "Lights, camera, action.", details: ["Directing", "Cinematography", "Audio recording"] },
      { step: "Post-Production", desc: "Putting it all together.", details: ["Video editing", "Color grading", "Sound design & VFX"] },
      { step: "Delivery", desc: "Finalizing the assets.", details: ["Client review rounds", "Formatting for platforms", "Final master delivery"] }
    ],
    proofOfWork: [
      { client: "Peak Outdoors", roi: "Brand Anthem", desc: "Produced a cinematic brand documentary that became the cornerstone of their new identity.", img: "https://images.unsplash.com/photo-1576402431608-f4581f44053d?q=80&w=1200&auto=format&fit=crop" },
      { client: "TechFlow", roi: "Explainer Video", desc: "Created a 3D animated explainer that increased landing page conversions by 65%.", img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1200&auto=format&fit=crop" }
    ],
    tech: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Cinema 4D", "RED Digital Cinema"],
    packages: [
      { name: "Social Content Shoot", price: "$3,500+", features: ["1 Shoot Day", "15 Short-form videos", "Basic Editing"] },
      { name: "Brand Anthem", price: "$10,000+", features: ["2 Shoot Days", "Storyboarding", "Color Grading", "Voiceover"] },
      { name: "Commercial Campaign", price: "$25,000+", features: ["Full Crew", "Talent Casting", "VFX & Sound Design", "Multi-format Deliverables"] }
    ],
    faqs: [
      { q: "Do you travel for shoots?", a: "Yes, we travel globally. Travel expenses are billed separately." },
      { q: "Who owns the raw footage?", a: "You can purchase the raw footage buyout as an add-on, otherwise we deliver the final polished cuts." },
      { q: "Do you provide voiceovers?", a: "Yes, we handle professional voiceover casting, recording, and mixing." },
      { q: "Can you shoot drone footage?", a: "Yes, our team includes licensed commercial drone operators." }
    ]
  }
};
