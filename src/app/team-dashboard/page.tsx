"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { Activity, CheckCircle2, MessageSquare, LogOut } from "lucide-react";
import { logout } from "@/lib/auth-helpers";

export default function TeamDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["TEAM_MEMBER", "ADMIN"]}>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2">Team Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.email}!</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "My Tasks", value: "8", trend: "2 urgent" },
            { title: "Completed", value: "24", trend: "This week" },
            { title: "Messages", value: "3", trend: "Unread" }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-border bg-background">
              <h3 className="text-sm font-bold text-muted-foreground mb-4">{stat.title}</h3>
              <div className="text-3xl font-black mb-2">{stat.value}</div>
              <p className="text-xs text-primary font-medium">{stat.trend}</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-3xl border border-border bg-background overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Activity className="text-primary w-5 h-5"/> Team Activity Feed
            </h2>
          </div>
          <div className="divide-y divide-border/50">
            {[
              { icon: CheckCircle2, color: "text-emerald-500", text: "You completed 'Update Hero Section'", time: "2 hours ago" },
              { icon: MessageSquare, color: "text-blue-500", text: "Admin left a comment on your PR", time: "5 hours ago" },
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

      </div>
    </ProtectedRoute>
  );
}
