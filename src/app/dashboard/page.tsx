"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, Activity, Calendar, Clock, CheckCircle2, 
  MessageSquare, FileText, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/context/DashboardContext";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import TeamManagementWidget from "@/components/TeamManagementWidget";


export default function DashboardOverview() {
  const { events } = useDashboard();
  
  // Get upcoming events
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3); // Show max 3 on overview

  return (
    <ProtectedRoute allowedRoles={["CLIENT", "ADMIN"]}>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. WELCOME & QUICK ACTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black mb-2">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">Here is what's happening with your projects today.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none rounded-xl">Book Meeting</Button>
          <Button variant="premium" className="flex-1 md:flex-none rounded-xl">New Request</Button>
        </div>
      </div>

      {/* 2. HIGH-LEVEL METRICS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Active Projects", value: "2", trend: "+1 this month" },
          { title: "Tasks Pending", value: "14", trend: "3 due today" },
          { title: "Unread Messages", value: "5", trend: "From dev team" },
          { title: "Total Spent", value: "$12,450", trend: "On track" }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-border bg-background">
            <h3 className="text-sm font-bold text-muted-foreground mb-4">{stat.title}</h3>
            <div className="text-3xl font-black mb-2">{stat.value}</div>
            <p className="text-xs text-primary font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> {stat.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* 3. RECENT ACTIVITY (Left - 2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="glass-card rounded-3xl border border-border bg-background overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2"><Activity className="text-primary w-5 h-5"/> Recent Activity</h2>
              <button className="text-sm text-primary font-medium hover:underline">View All</button>
            </div>
            <div className="divide-y divide-border/50">
              {[
                { icon: CheckCircle2, color: "text-emerald-500", text: "Phase 1 Design approved by John Doe", time: "2 hours ago" },
                { icon: MessageSquare, color: "text-blue-500", text: "Sarah left a comment on Homepage Mockup", time: "5 hours ago" },
                { icon: FileText, color: "text-purple-500", text: "New invoice #INV-204 generated", time: "Yesterday" },
                { icon: Activity, color: "text-primary", text: "Development sprint #4 started", time: "2 days ago" },
              ].map((activity, i) => (
                <div key={i} className="p-6 flex items-start gap-4 hover:bg-muted/30 transition-colors">
                  <div className={`mt-0.5 ${activity.color}`}><activity.icon className="w-5 h-5" /></div>
                  <div>
                    <p className="font-medium text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl border border-border bg-background overflow-hidden">
             <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold">Active Projects Status</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold">E-Commerce Web App</span>
                  <span className="text-primary font-bold">75%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Currently in QA Testing phase.</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold">Q3 Marketing Campaign</span>
                  <span className="text-primary font-bold">40%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Ad creatives are being finalized.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4. SIDEBAR WIDGETS (Right - 1 Col) */}
        <div className="space-y-8">
          
          <TeamManagementWidget />
          
          {/* Upcoming Events / Content Calendar Widget */}
          <div className="glass-card rounded-3xl border border-border bg-background overflow-hidden flex flex-col h-[400px]">
             <div className="p-6 border-b border-border flex justify-between items-center shrink-0">
              <h2 className="text-lg font-bold flex items-center gap-2"><Calendar className="text-primary w-5 h-5"/> Upcoming Schedule</h2>
              <Link href="/dashboard/content-calendar" className="text-sm text-primary font-medium hover:underline">View All</Link>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(evt => (
                  <div key={evt.id} className="border border-border rounded-2xl p-4 hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">{evt.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">{evt.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3"/> 
                        {new Date(evt.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full font-medium ${evt.status === 'Scheduled' ? 'text-blue-500 bg-blue-500/10' : evt.status === 'In Review' ? 'text-yellow-500 bg-yellow-500/10' : 'text-muted-foreground bg-white/5'}`}>
                        {evt.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <p className="text-sm">No upcoming events.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions / Important Docs */}
          <div className="glass-card rounded-3xl border border-border bg-background overflow-hidden">
             <div className="p-6 border-b border-border">
              <h2 className="text-lg font-bold">Quick Links</h2>
            </div>
            <div className="p-4 space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-sm font-medium">
                <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary"/> Master Service Agreement</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-sm font-medium">
                <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary"/> Brand Guidelines PDF</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-sm font-medium">
                <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary"/> Unpaid Invoices (1)</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

        </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
