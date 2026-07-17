"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, Star, CheckCircle2, Clock, 
  Award, ArrowUpRight, BarChart2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { name: 'Mon', tasks: 4 },
  { name: 'Tue', tasks: 6 },
  { name: 'Wed', tasks: 3 },
  { name: 'Thu', tasks: 8 },
  { name: 'Fri', tasks: 5 },
];

export default function TeamPerformancePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black mb-2 text-foreground">My Performance</h1>
          <p className="text-muted-foreground">Track your productivity, tasks completed, and peer feedback.</p>
        </div>
        <Button variant="premium" className="rounded-xl shadow-lg shadow-primary/20 font-bold px-6 h-11">
          <Award className="w-5 h-5 mr-2" /> Request Review
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* MAIN STATS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="glass-card p-6 rounded-2xl border border-border bg-background/50">
              <h3 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Tasks Completed</h3>
              <div className="text-3xl font-black mb-2">42</div>
              <p className="text-xs text-emerald-500 font-medium flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> +12% this month</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-border bg-background/50">
              <h3 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500"/> Hours Logged</h3>
              <div className="text-3xl font-black mb-2">128h</div>
              <p className="text-xs text-muted-foreground font-medium">On track for 160h</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-border bg-background/50">
              <h3 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2"><Star className="w-4 h-4 text-amber-500 fill-amber-500"/> Peer Rating</h3>
              <div className="text-3xl font-black mb-2">4.9/5</div>
              <p className="text-xs text-emerald-500 font-medium flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> Top 10% in team</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-border bg-background/50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2"><BarChart2 className="w-5 h-5 text-primary"/> Task Velocity (This Week)</h2>
                <p className="text-sm text-muted-foreground mt-1">Number of tasks completed per day.</p>
              </div>
            </div>
            
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* FEEDBACK COLUMN */}
        <div className="glass-card rounded-3xl border border-border bg-background/50 flex flex-col h-full">
           <div className="p-6 border-b border-border/50">
            <h2 className="text-lg font-bold flex items-center gap-2"><Award className="w-5 h-5 text-primary"/> Recent Feedback</h2>
            <p className="text-sm text-muted-foreground mt-1">Kudos and notes from managers.</p>
          </div>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="p-4 rounded-xl border border-border bg-background">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
              </div>
              <p className="text-sm font-medium leading-relaxed mb-3">"Marcus crushed the Nova Inc. redesign. The client was blown away by the mobile responsiveness. Great job!"</p>
              <p className="text-xs font-bold text-muted-foreground">— Sarah J. (Design Lead)</p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-background">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4].map(i => <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
                <Star className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium leading-relaxed mb-3">"Solid work on the frontend architecture. Let's make sure we document the new components in Storybook next time."</p>
              <p className="text-xs font-bold text-muted-foreground">— Admin (PM)</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
