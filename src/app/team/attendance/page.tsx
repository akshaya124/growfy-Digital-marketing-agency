"use client";

import { motion } from "framer-motion";
import { 
  Clock, Calendar, CheckCircle2, Play, 
  Square, Coffee, LogOut, Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";

const timesheet = [
  { date: "Today", clockIn: "09:00 AM", clockOut: "--:--", total: "2h 45m", status: "Active" },
  { date: "Yesterday", clockIn: "08:55 AM", clockOut: "05:10 PM", total: "8h 15m", status: "Completed" },
  { date: "Mon, Oct 12", clockIn: "09:15 AM", clockOut: "05:30 PM", total: "8h 15m", status: "Completed" },
  { date: "Fri, Oct 09", clockIn: "08:50 AM", clockOut: "04:45 PM", total: "7h 55m", status: "Completed" },
  { date: "Thu, Oct 08", clockIn: "09:05 AM", clockOut: "05:00 PM", total: "7h 55m", status: "Completed" },
];

export default function TeamAttendancePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black mb-2 text-foreground">Time & Attendance</h1>
          <p className="text-muted-foreground">Clock in, manage your timesheet, and request time off.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* CLOCK WIDGET */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-primary/20 bg-primary/5 text-center shadow-lg shadow-primary/10">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Current Status</h2>
            
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Clocked In
            </div>

            <div className="text-5xl font-black tabular-nums tracking-tight mb-2">02:45<span className="text-2xl text-muted-foreground">:12</span></div>
            <p className="text-xs text-muted-foreground mb-8">Started at 09:00 AM</p>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full rounded-xl font-bold h-12"><Coffee className="w-4 h-4 mr-2"/> Break</Button>
              <Button variant="outline" className="w-full rounded-xl font-bold h-12 text-rose-500 hover:text-white hover:bg-rose-500 border-rose-500/20"><Square className="w-4 h-4 mr-2"/> Clock Out</Button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-border bg-background/50">
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2"><Sun className="w-4 h-4 text-amber-500"/> Request Time Off</h2>
            <form className="space-y-4">
               <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Type</label>
                <select className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary">
                  <option>Vacation (PTO)</option>
                  <option>Sick Leave</option>
                  <option>Personal Day</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Start</label>
                  <input type="date" className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">End</label>
                  <input type="date" className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
              <Button variant="premium" className="w-full rounded-xl shadow-lg shadow-primary/20 font-bold mt-2">Submit Request</Button>
            </form>
          </div>
        </div>

        {/* TIMESHEET */}
        <div className="md:col-span-2 glass-card rounded-3xl border border-border bg-background/50 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50 bg-muted/20 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2"><Calendar className="w-5 h-5 text-primary"/> Weekly Timesheet</h2>
            <div className="text-sm font-bold">Total: <span className="text-primary">35h 10m</span></div>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/30 text-muted-foreground">
                <tr>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Clock In</th>
                  <th className="p-4 font-semibold">Clock Out</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {timesheet.map((day, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{day.date}</td>
                    <td className="p-4 text-muted-foreground">{day.clockIn}</td>
                    <td className="p-4 text-muted-foreground">{day.clockOut}</td>
                    <td className="p-4 font-bold">{day.total}</td>
                    <td className="p-4 text-right">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                        ${day.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                        {day.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
