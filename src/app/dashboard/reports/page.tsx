"use client";

import { motion } from "framer-motion";
import { 
  BarChart2, FileText, Download, ArrowUpRight, TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trafficData = [
  { name: 'Jan', visitors: 4000, conversions: 2400 },
  { name: 'Feb', visitors: 3000, conversions: 1398 },
  { name: 'Mar', visitors: 2000, conversions: 9800 },
  { name: 'Apr', visitors: 2780, conversions: 3908 },
  { name: 'May', visitors: 1890, conversions: 4800 },
  { name: 'Jun', visitors: 2390, conversions: 3800 },
  { name: 'Jul', visitors: 3490, conversions: 4300 },
];

const mockReports = [
  { id: "1", title: "Q3 Website Performance", date: "Oct 01, 2026", size: "2.4 MB" },
  { id: "2", title: "September SEO Audit", date: "Sep 15, 2026", size: "1.8 MB" },
  { id: "3", title: "Paid Ads Campaign Results", date: "Aug 30, 2026", size: "3.1 MB" },
  { id: "4", title: "Brand Identity Guidelines", date: "Aug 15, 2026", size: "8.5 MB" },
];

export default function ClientReportsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black mb-2 text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">View high-level project metrics and download detailed PDF reports.</p>
        </div>
        <Button variant="premium" className="rounded-xl h-11 w-full md:w-auto font-bold shadow-lg shadow-primary/20">
          <Download className="w-5 h-5 mr-2" /> Request Custom Report
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* CHART WIDGET */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-border bg-background/50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary"/> Website Performance</h2>
                <p className="text-sm text-muted-foreground mt-1">Traffic and conversions over the last 6 months.</p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3"/> +24%
              </div>
            </div>
            
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl border border-border bg-background/50">
              <h3 className="text-sm font-bold text-muted-foreground mb-2">Total Visitors</h3>
              <div className="text-3xl font-black mb-1">18,540</div>
              <p className="text-xs text-emerald-500 font-medium">+12% from last month</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-border bg-background/50">
              <h3 className="text-sm font-bold text-muted-foreground mb-2">Conversion Rate</h3>
              <div className="text-3xl font-black mb-1">4.2%</div>
              <p className="text-xs text-emerald-500 font-medium">+0.8% from last month</p>
            </div>
          </div>
        </div>

        {/* REPORTS LIST */}
        <div className="glass-card rounded-3xl border border-border bg-background/50 flex flex-col h-full">
           <div className="p-6 border-b border-border/50">
            <h2 className="text-lg font-bold flex items-center gap-2"><BarChart2 className="w-5 h-5 text-primary"/> Deliverable Reports</h2>
            <p className="text-sm text-muted-foreground mt-1">Download your official PDFs.</p>
          </div>
          
          <div className="flex-1 p-6 space-y-4">
            {mockReports.map((report) => (
              <div key={report.id} className="p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors group cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{report.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground">{report.date}</span>
                      <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{report.size}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-primary">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
