"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, Download, Eye, Plus, Search, Filter,
  TrendingUp, Users, DollarSign, Activity, ChevronDown,
  FileBarChart, FilePieChart, FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

// --- Mock Data ---
const healthData = [
  { name: "Jan", revenue: 4000, users: 2400 },
  { name: "Feb", revenue: 3000, users: 1398 },
  { name: "Mar", revenue: 5000, users: 3800 },
  { name: "Apr", revenue: 8780, users: 3908 },
  { name: "May", revenue: 6890, users: 4800 },
  { name: "Jun", revenue: 9390, users: 3800 },
  { name: "Jul", revenue: 11490, users: 4300 },
];

const mockReports = [
  { id: 1, title: "Q2 2026 Financial Summary", type: "Financial", date: "Jul 01, 2026", size: "2.4 MB", icon: FileSpreadsheet, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: 2, title: "June Marketing Analytics", type: "Marketing", date: "Jul 05, 2026", size: "4.1 MB", icon: FileBarChart, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 3, title: "User Acquisition Flow", type: "Performance", date: "Jul 10, 2026", size: "1.8 MB", icon: FilePieChart, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: 4, title: "Q3 Budget Allocation", type: "Financial", date: "Jul 12, 2026", size: "3.2 MB", icon: FileSpreadsheet, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: 5, title: "Weekly Server Health", type: "System", date: "Jul 14, 2026", size: "850 KB", icon: Activity, color: "text-rose-500", bg: "bg-rose-500/10" },
  { id: 6, title: "Social Media Reach", type: "Marketing", date: "Jul 15, 2026", size: "5.5 MB", icon: FileBarChart, color: "text-blue-500", bg: "bg-blue-500/10" },
];

export default function ReportsDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("6M");

  const filteredReports = mockReports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Generate, view, and download comprehensive system reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-10"><Filter className="w-4 h-4 mr-2"/> Filter</Button>
          <Button variant="premium" className="rounded-xl h-10"><Plus className="w-4 h-4 mr-2"/> Generate Report <ChevronDown className="w-4 h-4 ml-2"/></Button>
        </div>
      </div>

      {/* COMPANY HEALTH CHART */}
      <div className="glass-card rounded-3xl border border-border bg-background/50 flex flex-col h-[400px]">
        <div className="p-6 border-b border-border/50 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary"/> Company Health Overview</h2>
            <p className="text-sm text-muted-foreground">Revenue and User Growth (YTD)</p>
          </div>
          <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
            {['1M', '3M', '6M', '1Y'].map((range) => (
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
            <AreaChart data={healthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => "$" + (val / 1000) + 'k'} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => (val / 1000) + 'k'} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '16px', border: '1px solid hsl(var(--border))', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', color: 'hsl(var(--muted-foreground))' }}/>
              <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              <Area yAxisId="right" type="monotone" dataKey="users" name="Active Users" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* REPORTS GRID */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold">Recent Reports</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredReports.map((report, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={report.id} 
              className="glass-card p-6 rounded-3xl border border-border bg-background/50 hover:bg-background/80 hover:border-primary/30 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
            >
              {/* Document Layout styling */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-muted/50 to-transparent -z-10 rounded-bl-3xl" />
              
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${report.bg} ${report.color}`}>
                  <report.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1 bg-muted rounded-md border border-border/50">
                  {report.type}
                </span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-primary transition-colors">{report.title}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                   {report.date} • {report.size}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" className="flex-1 rounded-xl h-9 text-xs font-bold"><Eye className="w-4 h-4 mr-1.5"/> View</Button>
                <Button variant="premium" className="flex-1 rounded-xl h-9 text-xs font-bold"><Download className="w-4 h-4 mr-1.5"/> PDF</Button>
              </div>
            </motion.div>
          ))}
          {filteredReports.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              <FileText className="w-12 h-12 opacity-20 mx-auto mb-4" />
              <p className="text-lg font-bold text-foreground">No reports found</p>
              <p className="text-sm">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
