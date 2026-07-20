"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreVertical, Building2, Mail, Phone, Clock } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

const pipelineData = [
  { name: 'Jan', leads: 45, converted: 12 },
  { name: 'Feb', leads: 52, converted: 18 },
  { name: 'Mar', leads: 38, converted: 15 },
  { name: 'Apr', leads: 65, converted: 25 },
  { name: 'May', leads: 74, converted: 32 },
  { name: 'Jun', leads: 82, converted: 40 },
];

const dummyLeads = [
  { id: 1, name: "Sarah Jenkins", company: "TechFlow Inc", value: "₹450,000", status: "Negotiation", lastContact: "2 hrs ago", email: "sarah@techflow.io" },
  { id: 2, name: "Michael Chen", company: "Elevate Real Estate", value: "₹120,000", status: "New Lead", lastContact: "1 day ago", email: "m.chen@elevate.com" },
  { id: 3, name: "Emma Watson", company: "Bloom Health", value: "₹850,000", status: "Closed Won", lastContact: "3 days ago", email: "emma@bloomhealth.org" },
  { id: 4, name: "David Miller", company: "Apex Finance", value: "₹320,000", status: "Proposal Sent", lastContact: "5 hrs ago", email: "david@apex.co" },
  { id: 5, name: "Jessica Lee", company: "Luxe Fashion", value: "₹180,000", status: "Meeting Scheduled", lastContact: "Just now", email: "jessica@luxefashion.com" },
];

const statusColors: Record<string, string> = {
  "New Lead": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Meeting Scheduled": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Proposal Sent": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Negotiation": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Closed Won": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

export default function CRMPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black">CRM Pipeline</h1>
          <p className="text-muted-foreground mt-1">Manage leads, track conversions, and close deals.</p>
        </div>
        <Button variant="premium" onClick={() => setIsModalOpen(true)} className="gap-2 rounded-full px-6">
          <Plus className="w-4 h-4" /> Add New Lead
        </Button>
      </div>

      {/* METRICS & CHART */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-border">
          <h3 className="font-bold mb-6">Lead Acquisition vs Conversion</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pipelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConverted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="leads" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="converted" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorConverted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6 flex flex-col justify-center">
          <div className="glass-card p-6 rounded-3xl border border-border flex flex-col justify-between relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Building2 className="w-24 h-24" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Pipeline Value</p>
              <h2 className="text-5xl font-black text-primary">₹1.9M</h2>
            </div>
            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Active Deals</span>
                <span className="font-bold">24</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-bold text-emerald-500">65%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="glass-card rounded-3xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-bold text-lg">Active Leads</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Lead Details</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Contact</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Value</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Last Activity</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {dummyLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold">{lead.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Building2 className="w-3 h-3"/> {lead.company}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{lead.email}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-primary">
                    {lead.value}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {lead.lastContact}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD LEAD MODAL (DUMMY) */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-background border border-border shadow-2xl rounded-3xl p-8 z-50"
            >
              <h2 className="text-2xl font-black mb-6">Add New Lead</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Lead Name</label>
                  <input type="text" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" placeholder="e.g. John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Company</label>
                  <input type="text" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" placeholder="e.g. Acme Corp" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Deal Value (₹)</label>
                    <input type="text" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" placeholder="e.g. 500000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Status</label>
                    <select className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary">
                      <option>New Lead</option>
                      <option>Meeting Scheduled</option>
                      <option>Proposal Sent</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-8 pt-4">
                  <Button variant="premium" className="w-full rounded-full h-12" onClick={() => setIsModalOpen(false)}>Save Lead</Button>
                  <Button variant="outline" className="w-full rounded-full h-12" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
