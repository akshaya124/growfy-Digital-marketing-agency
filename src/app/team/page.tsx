"use client";

import { motion } from "framer-motion";
import { 
  CheckSquare, FolderKanban, Calendar, MessageSquare, 
  UploadCloud, TrendingUp, Clock, AlertCircle, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeamOverview() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. WELCOME & QUICK ACTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black mb-2">My Workspace</h1>
          <p className="text-muted-foreground">Here is your schedule and tasks for today, Marcus.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none rounded-lg bg-background">Submit Leave</Button>
          <Button variant="premium" className="flex-1 md:flex-none rounded-lg flex items-center gap-2"><UploadCloud className="w-4 h-4"/> Upload Work</Button>
        </div>
      </div>

      {/* 2. EMPLOYEE METRICS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Tasks Due Today", value: "4", icon: CheckSquare, color: "text-rose-500", bg: "bg-rose-500/10" },
          { title: "Active Projects", value: "3", icon: FolderKanban, color: "text-blue-500", bg: "bg-blue-500/10" },
          { title: "Meetings Today", value: "2", icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
          { title: "Performance Score", value: "98%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-border bg-background hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-muted-foreground">{stat.title}</h3>
            </div>
            <div className="text-3xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* 3. TASKS & PROJECTS (Left - 2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Priority Tasks List */}
          <div className="glass-card rounded-2xl border border-border bg-background overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
              <h2 className="text-lg font-bold flex items-center gap-2"><CheckSquare className="text-primary w-5 h-5"/> My Pending Tasks</h2>
              <button className="text-sm text-primary font-medium hover:underline">Go to Kanban</button>
            </div>
            <div className="divide-y divide-border/50">
              {[
                { task: "Design Homepage Hero Section", project: "Zenith E-Commerce", priority: "High", due: "Today, 5:00 PM" },
                { task: "Fix Mobile Navigation Bug", project: "Apex Tech Site", priority: "High", due: "Today, 6:00 PM" },
                { task: "Update Brand Guidelines PDF", project: "Internal", priority: "Medium", due: "Tomorrow" },
                { task: "Review PR #402", project: "Nova App", priority: "Low", due: "Friday" },
              ].map((t, i) => (
                <div key={i} className="p-5 flex items-center justify-between hover:bg-muted/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded border border-border flex items-center justify-center cursor-pointer group-hover:border-primary transition-colors"></div>
                    <div>
                      <p className="font-bold text-sm mb-1">{t.task}</p>
                      <p className="text-xs text-muted-foreground">{t.project} • {t.due}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${t.priority === 'High' ? 'bg-rose-500/10 text-rose-500' : t.priority === 'Medium' ? 'bg-orange-500/10 text-orange-500' : 'bg-muted text-muted-foreground'}`}>
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Projects */}
          <div className="glass-card rounded-2xl border border-border bg-background overflow-hidden">
             <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold">My Active Projects</h2>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-4">
              <div className="border border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-sm">Zenith E-Commerce</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">My Role: Lead Designer</p>
              </div>
              <div className="border border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-sm">Apex Tech Site</h4>
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">My Role: Frontend Dev</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4. SIDEBAR WIDGETS (Right - 1 Col) */}
        <div className="space-y-8">
          
          {/* Internal Chat / Messages */}
          <div className="glass-card rounded-2xl border border-border bg-background overflow-hidden">
             <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2"><MessageSquare className="text-primary w-5 h-5"/> Recent Messages</h2>
            </div>
            <div className="divide-y divide-border/50">
              <div className="p-4 hover:bg-muted/30 transition-colors cursor-pointer flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 shrink-0 mt-1"></div>
                <div>
                  <p className="text-sm font-bold mb-0.5">Elena (PM)</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">Hey Marcus, can you push the latest changes to staging before the 2PM meeting?</p>
                </div>
              </div>
              <div className="p-4 hover:bg-muted/30 transition-colors cursor-pointer flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 shrink-0 mt-1"></div>
                <div>
                  <p className="text-sm font-bold mb-0.5">David (Backend)</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">The API endpoint is ready. Let me know if you need the updated swagger docs.</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <Button variant="outline" className="w-full text-xs h-8 rounded-lg">Open Chat App</Button>
            </div>
          </div>

          {/* Today's Meetings */}
          <div className="glass-card rounded-2xl border border-border bg-background overflow-hidden">
             <div className="p-6 border-b border-border">
              <h2 className="text-lg font-bold flex items-center gap-2"><Calendar className="text-primary w-5 h-5"/> Schedule</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-4 p-3 rounded-lg border border-primary bg-primary/5">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm mb-1">Design Sync (Ongoing)</h4>
                  <p className="text-xs text-primary font-medium">Join Zoom Meeting</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg border border-border opacity-50">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold">2 PM</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm mb-1">Client Demo</h4>
                  <p className="text-xs text-muted-foreground">Google Meet</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
