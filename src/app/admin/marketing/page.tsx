"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, ArrowDownRight, Megaphone, Target, 
  MousePointerClick, TrendingUp, Calendar, Filter, Plus,
  MoreVertical, Eye, Play, Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from "recharts";

// --- Mock Data ---
const performanceData = [
  { name: "Mon", clicks: 4000, conversions: 240 },
  { name: "Tue", clicks: 3000, conversions: 139 },
  { name: "Wed", clicks: 2000, conversions: 980 },
  { name: "Thu", clicks: 2780, conversions: 390 },
  { name: "Fri", clicks: 1890, conversions: 480 },
  { name: "Sat", clicks: 2390, conversions: 380 },
  { name: "Sun", clicks: 3490, conversions: 430 },
];

const sourceData = [
  { name: "Google Ads", value: 4000, color: "#3b82f6" },
  { name: "Meta Ads", value: 3000, color: "#8b5cf6" },
  { name: "LinkedIn", value: 2000, color: "#0ea5e9" },
  { name: "Organic", value: 2780, color: "#10b981" },
];

const kpis = [
  { title: "Total Ad Spend", value: "$12,450", trend: "+8.2%", isPositive: false, icon: Megaphone, color: "from-rose-500 to-pink-500" },
  { title: "Total Impressions", value: "1.2M", trend: "+12.4%", isPositive: true, icon: Target, color: "from-blue-500 to-cyan-500" },
  { title: "Total Clicks", value: "48.5K", trend: "+5.1%", isPositive: true, icon: MousePointerClick, color: "from-emerald-500 to-teal-500" },
  { title: "Average ROI", value: "245%", trend: "+18.2%", isPositive: true, icon: TrendingUp, color: "from-primary to-purple-500" },
];

const campaigns = [
  { id: 1, name: "Summer Sale 2026", platform: "Meta Ads", status: "Active", spend: "$4,200", budget: "$10,000", roi: "312%", progress: 42 },
  { id: 2, name: "B2B Lead Gen", platform: "LinkedIn", status: "Active", spend: "$8,500", budget: "$15,000", roi: "185%", progress: 56 },
  { id: 3, name: "Retargeting - Cart Abandonment", platform: "Google Ads", status: "Paused", spend: "$1,200", budget: "$5,000", roi: "420%", progress: 24 },
  { id: 4, name: "Brand Awareness Q3", platform: "YouTube", status: "Active", spend: "$12,000", budget: "$20,000", roi: "110%", progress: 60 },
];

export default function MarketingDashboard() {
  const [timeRange, setTimeRange] = useState("7D");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Marketing Analytics</h1>
          <p className="text-muted-foreground mt-1">Track campaign performance, ROI, and audience reach.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-10"><Calendar className="w-4 h-4 mr-2"/> Last 7 Days</Button>
          <Button variant="premium" className="rounded-xl h-10"><Plus className="w-4 h-4 mr-2"/> New Campaign</Button>
        </div>
      </div>

      {/* KPIS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass-card p-6 rounded-3xl border border-border bg-background/50 hover:bg-background/80 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${kpi.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white shadow-lg`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${kpi.isPositive ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-500 bg-amber-500/10 border-amber-500/20'}`}>
                {kpi.isPositive ? <ArrowUpRight className="w-3 h-3"/> : <ArrowDownRight className="w-3 h-3"/>}
                {kpi.trend}
              </span>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-muted-foreground mb-1">{kpi.title}</h3>
              <div className="text-3xl font-black">{kpi.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHARTS GRID */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Performance Chart */}
        <div className="lg:col-span-2 glass-card rounded-3xl border border-border bg-background/50 flex flex-col h-[450px]">
          <div className="p-6 border-b border-border/50 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">Clicks vs Conversions</h2>
              <p className="text-sm text-muted-foreground">Daily performance tracking</p>
            </div>
            <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
              {['7D', '14D', '30D'].map((range) => (
                <button 
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${timeRange === range ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 p-6 pb-2 min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => (val / 1000) + 'k'} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '16px', border: '1px solid hsl(var(--border))', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', color: 'hsl(var(--muted-foreground))' }}/>
                <Line yAxisId="left" type="monotone" dataKey="clicks" name="Clicks" stroke="hsl(var(--primary))" strokeWidth={4} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Line yAxisId="right" type="monotone" dataKey="conversions" name="Conversions" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources Chart */}
        <div className="glass-card rounded-3xl border border-border bg-background/50 flex flex-col h-[450px]">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-lg font-bold">Traffic Sources</h2>
            <p className="text-sm text-muted-foreground">Volume by channel</p>
          </div>
          <div className="flex-1 p-6 pb-2 min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: 'bold' }} />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="value" name="Visitors" radius={[0, 8, 8, 0]}>
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CAMPAIGNS TABLE */}
      <div className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden">
        <div className="p-6 border-b border-border/50 flex justify-between items-center">
          <h2 className="text-lg font-bold">Active Campaigns</h2>
          <Button variant="outline" size="sm" className="rounded-lg"><Filter className="w-4 h-4 mr-2"/> Filter</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-border/50 text-xs uppercase tracking-wider text-muted-foreground bg-muted/20">
                <th className="p-6 font-bold">Campaign Name</th>
                <th className="p-6 font-bold">Platform</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold">Budget Spent</th>
                <th className="p-6 font-bold">ROI</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {campaigns.map((camp, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={camp.id} 
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <td className="p-6">
                    <h4 className="font-bold text-sm">{camp.name}</h4>
                  </td>
                  <td className="p-6">
                    <span className="text-sm font-medium text-muted-foreground">{camp.platform}</span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit
                      ${camp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                        'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="p-6 w-64">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold">{camp.spend}</span>
                      <span className="text-muted-foreground">{camp.budget}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: camp.progress + '%' }}></div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-sm font-black text-emerald-500">{camp.roi}</span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg">{camp.status === 'Active' ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4 text-emerald-500"/>}</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg"><Eye className="w-4 h-4"/></Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg"><MoreVertical className="w-4 h-4"/></Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
