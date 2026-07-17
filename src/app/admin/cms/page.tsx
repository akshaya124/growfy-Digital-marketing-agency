"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, Plus, Filter, FileText, Image as ImageIcon, 
  Settings, CheckCircle2, Clock, Eye, Edit, Trash2, 
  MoreVertical, Calendar, User
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Mock Data ---
const kpis = [
  { title: "Total Published", value: "124", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "Drafts", value: "12", icon: FileText, color: "text-amber-500", bg: "bg-amber-500/10" },
  { title: "Scheduled", value: "3", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Total Views", value: "84.5k", icon: Eye, color: "text-primary", bg: "bg-primary/10" },
];

const mockPosts = [
  {
    id: 1,
    title: "10 Web Design Trends for 2026",
    excerpt: "Discover the latest UI/UX trends dominating the web landscape this year, from glassmorphism evolutions to AI-driven layouts.",
    author: "Sarah Jenkins",
    date: "Jul 12, 2026",
    status: "Published",
    category: "Design",
    views: "12.4k",
    imageColor: "from-purple-500 to-indigo-500"
  },
  {
    id: 2,
    title: "How to Optimize Next.js Apps",
    excerpt: "A comprehensive guide to boosting performance in your Next.js 16 applications using the new App Router features.",
    author: "Michael Chen",
    date: "Jul 14, 2026",
    status: "Published",
    category: "Engineering",
    views: "8.1k",
    imageColor: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Mastering Digital Marketing Strategies",
    excerpt: "Learn how to leverage organic growth and paid channels to maximize your brand's digital presence in Q3.",
    author: "Emily Rodriguez",
    date: "Jul 18, 2026",
    status: "Scheduled",
    category: "Marketing",
    views: "-",
    imageColor: "from-emerald-500 to-teal-500"
  },
  {
    id: 4,
    title: "Understanding Serverless Architecture",
    excerpt: "The pros and cons of migrating your monolithic backend to a fully serverless infrastructure.",
    author: "David Kim",
    date: "Jul 20, 2026",
    status: "Draft",
    category: "Engineering",
    views: "-",
    imageColor: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "The Future of AI in Creative Industries",
    excerpt: "How generative AI is reshaping the way designers, writers, and artists approach their daily workflows.",
    author: "Sarah Jenkins",
    date: "Jul 05, 2026",
    status: "Published",
    category: "Technology",
    views: "45.2k",
    imageColor: "from-pink-500 to-rose-500"
  }
];

export default function CMSDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredPosts = mockPosts.filter(post => 
    (activeTab === "All" || post.status === activeTab) &&
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Content Manager</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and publish your digital content.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="rounded-xl h-10 flex-1 md:flex-none"><Settings className="w-4 h-4 mr-2"/> Categories</Button>
          <Button variant="premium" className="rounded-xl h-10 flex-1 md:flex-none"><Plus className="w-4 h-4 mr-2"/> New Post</Button>
        </div>
      </div>

      {/* KPIS / OVERVIEW */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass-card p-6 rounded-3xl border border-border bg-background/50 flex items-center gap-4 hover:border-primary/30 transition-colors"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
              <kpi.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">{kpi.title}</p>
              <h3 className="text-2xl font-black">{kpi.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-border/50 flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl border border-border/50 w-fit">
            {["All", "Published", "Draft", "Scheduled"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search posts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-xl shrink-0"><Filter className="w-4 h-4"/></Button>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-border/50 text-xs uppercase tracking-wider text-muted-foreground bg-muted/20">
                <th className="p-6 font-bold">Post Details</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold">Category</th>
                <th className="p-6 font-bold">Author</th>
                <th className="p-6 font-bold">Date</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredPosts.map((post, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={post.id} 
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-12 rounded-lg bg-gradient-to-tr ${post.imageColor} flex items-center justify-center shrink-0 shadow-inner`}>
                        <ImageIcon className="w-5 h-5 text-white/50" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base group-hover:text-primary transition-colors cursor-pointer">{post.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-md mt-1">{post.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit
                      ${post.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                        post.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                        'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                      {post.status === 'Published' && <CheckCircle2 className="w-3 h-3"/>}
                      {post.status === 'Scheduled' && <Clock className="w-3 h-3"/>}
                      {post.status === 'Draft' && <FileText className="w-3 h-3"/>}
                      {post.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="text-sm font-medium px-2.5 py-1 bg-muted rounded-md border border-border/50">{post.category}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"><User className="w-3 h-3 text-primary"/></div>
                       <span className="text-sm font-medium">{post.author}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4"/>
                      {post.date}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg"><Eye className="w-4 h-4"/></Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg"><Edit className="w-4 h-4 text-primary"/></Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg hover:text-red-500 hover:border-red-500/50"><Trash2 className="w-4 h-4"/></Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 opacity-20 mb-4" />
                      <p className="text-lg font-bold text-foreground">No posts found</p>
                      <p className="text-sm">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
