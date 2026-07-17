"use client";

import { motion } from "framer-motion";
import { 
  ArrowUpRight, Users, FolderKanban, DollarSign, 
  TrendingUp, Users2, Activity, Calendar, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/context/DashboardContext";
import { useState } from "react";

export default function AdminOverview() {
  const { addEvent, addNotification } = useDashboard();
  const [isScheduling, setIsScheduling] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");

  const handleSchedule = () => {
    if (!meetingTitle) return;
    
    // Schedule for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    addEvent({
      title: meetingTitle,
      type: "meeting",
      date: tomorrow.toISOString(),
      status: "Scheduled",
      description: "Meeting scheduled by Admin via Admin Dashboard."
    });

    addNotification({
      message: `Admin scheduled a new meeting: ${meetingTitle}`,
      date: new Date().toISOString(),
      target: "all"
    });

    setIsScheduling(false);
    setMeetingTitle("");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Schedule Meeting Modal */}
      {isScheduling && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="glass-card p-8 rounded-3xl border border-border w-full max-w-md bg-background shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Schedule Client Meeting</h2>
            <p className="text-muted-foreground mb-6">This will appear in the Client's Content Calendar instantly.</p>
            <input 
              type="text" 
              placeholder="Meeting Title (e.g. Website Review)" 
              value={meetingTitle}
              onChange={e => setMeetingTitle(e.target.value)}
              className="w-full bg-muted border border-border rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-primary"
            />
            <div className="flex gap-4">
              <Button onClick={() => setIsScheduling(false)} variant="outline" className="flex-1">Cancel</Button>
              <Button onClick={handleSchedule} className="flex-1">Schedule</Button>
            </div>
          </div>
        </div>
      )}
      
      {/* 1. WELCOME & QUICK ACTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black mb-2">Agency Overview</h1>
          <p className="text-muted-foreground">Here is the global status of your agency today.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
          <Button onClick={() => setIsScheduling(true)} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 rounded-lg">
            Schedule Global Meeting
          </Button>
          <Button variant="premium" className="rounded-lg">New Client</Button>
        </div>
      </div>

      {/* 2. SUPER HIGH-LEVEL METRICS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue (MTD)", value: "$124,500", trend: "+12.5%", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { title: "Active Clients", value: "42", trend: "+3 this week", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
          { title: "Active Projects", value: "56", trend: "12 nearing deadline", icon: FolderKanban, color: "text-purple-500", bg: "bg-purple-500/10" },
          { title: "Total Employees", value: "24", trend: "2 on leave today", icon: Users2, color: "text-orange-500", bg: "bg-orange-500/10" }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-border bg-background hover:border-primary/30 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-500 flex items-center bg-emerald-500/10 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3 mr-1" /> {stat.trend.split(' ')[0]}
              </span>
            </div>
            <h3 className="text-sm font-bold text-muted-foreground mb-1">{stat.title}</h3>
            <div className="text-3xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* 3. CHART MOCKUP & PIPELINE (Left - 2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Revenue Chart Mockup */}
          <div className="glass-card rounded-2xl border border-border bg-background overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2"><TrendingUp className="text-primary w-5 h-5"/> Revenue Growth</h2>
              <select className="bg-muted border border-border rounded-lg text-xs px-3 py-1.5 focus:outline-none">
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="p-6 h-72 flex items-end justify-between gap-2">
               {/* Fake Chart Bars */}
               {[40, 60, 45, 80, 65, 90, 75, 100, 85, 110, 95, 120].map((h, i) => (
                 <div key={i} className="w-full bg-primary/20 rounded-t-md relative group hover:bg-primary transition-colors cursor-pointer" style={{ height: `${h}%` }}>
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                     ${(h * 1200).toLocaleString('en-US')}
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* CRM Pipeline Overview */}
          <div className="glass-card rounded-2xl border border-border bg-background overflow-hidden">
             <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold">Sales Pipeline</h2>
              <button className="text-sm text-primary font-medium hover:underline">Go to CRM</button>
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-2 text-sm font-bold text-muted-foreground">
                <span>Leads (142)</span>
                <span>Proposals (24)</span>
                <span>Negotiation (12)</span>
                <span>Won (8)</span>
              </div>
              <div className="flex h-4 rounded-full overflow-hidden gap-1">
                <div className="bg-blue-500/20 w-[50%]"></div>
                <div className="bg-purple-500/40 w-[25%]"></div>
                <div className="bg-orange-500/60 w-[15%]"></div>
                <div className="bg-emerald-500 w-[10%]"></div>
              </div>
            </div>
          </div>

        </div>

        {/* 4. SIDEBAR WIDGETS (Right - 1 Col) */}
        <div className="space-y-8">
          
          {/* Notifications & Approvals */}
          <div className="glass-card rounded-2xl border border-border bg-background overflow-hidden">
             <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2"><Bell className="text-primary w-5 h-5"/> Requires Attention</h2>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">4</span>
            </div>
            <div className="divide-y divide-border/50">
              <div className="p-4 hover:bg-muted/30 transition-colors">
                <p className="text-sm font-bold mb-1">Leave Request: Sarah J.</p>
                <p className="text-xs text-muted-foreground mb-3">Oct 28 - Nov 2 (Vacation)</p>
                <div className="flex gap-2">
                  <Button size="sm" className="h-7 text-xs bg-emerald-500 hover:bg-emerald-600 text-white flex-1">Approve</Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs flex-1">Deny</Button>
                </div>
              </div>
              <div className="p-4 hover:bg-muted/30 transition-colors">
                <p className="text-sm font-bold mb-1">Invoice Overdue</p>
                <p className="text-xs text-muted-foreground">Apex Tech - $4,500 (3 days late)</p>
              </div>
              <div className="p-4 hover:bg-muted/30 transition-colors">
                <p className="text-sm font-bold mb-1">New Lead Assigned</p>
                <p className="text-xs text-muted-foreground">Enterprise E-commerce build.</p>
              </div>
            </div>
          </div>

          {/* Today's Meetings */}
          <div className="glass-card rounded-2xl border border-border bg-background overflow-hidden">
             <div className="p-6 border-b border-border">
              <h2 className="text-lg font-bold flex items-center gap-2"><Calendar className="text-primary w-5 h-5"/> Today's Schedule</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-4 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="text-center font-bold text-primary">
                  <div className="text-lg leading-none mb-1">10</div>
                  <div className="text-xs uppercase">AM</div>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Client Pitch: Zenith</h4>
                  <p className="text-xs text-muted-foreground">Zoom • 4 Attendees</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="text-center font-bold text-primary">
                  <div className="text-lg leading-none mb-1">02</div>
                  <div className="text-xs uppercase">PM</div>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Internal Dev Sync</h4>
                  <p className="text-xs text-muted-foreground">Google Meet • Engineering</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
