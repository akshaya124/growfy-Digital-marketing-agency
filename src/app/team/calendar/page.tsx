"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  Clock, MapPin, Video, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Quick mock calendar generation
const currentMonth = "October 2026";
const generateDays = () => {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    const hasEvent = i === 12 || i === 15 || i === 22 || i === 28;
    days.push({
      date: i,
      isCurrentMonth: true,
      events: hasEvent ? [
        { id: `e-${i}`, title: i === 15 ? "Project Deadline" : "Client Sync", time: "10:00 AM", type: i === 15 ? "deadline" : "meeting" }
      ] : []
    });
  }
  return days;
};
const calendarDays = generateDays();

export default function TeamCalendarPage() {
  const [view, setView] = useState<"Month" | "Week">("Month");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black mb-2 text-foreground">Schedule</h1>
          <p className="text-muted-foreground">Manage your upcoming meetings and project deadlines.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-background border border-border rounded-xl p-1 flex">
            <button 
              onClick={() => setView("Month")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${view === "Month" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Month
            </button>
            <button 
              onClick={() => setView("Week")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${view === "Week" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Week
            </button>
          </div>
          <Button variant="premium" className="rounded-xl shadow-lg shadow-primary/20 font-bold px-6">
            <Plus className="w-4 h-4 mr-2"/> Add Event
          </Button>
        </div>
      </div>

      <div className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[600px]">
        
        {/* CALENDAR TOOLBAR */}
        <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/20">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 text-primary" /> {currentMonth}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-lg h-9 w-9"><ChevronLeft className="w-4 h-4"/></Button>
            <Button variant="outline" className="rounded-lg h-9 font-bold px-4">Today</Button>
            <Button variant="outline" size="icon" className="rounded-lg h-9 w-9"><ChevronRight className="w-4 h-4"/></Button>
          </div>
        </div>

        {/* CALENDAR GRID */}
        <div className="flex-1 flex flex-col min-h-0 bg-background/50">
          
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-border/50 shrink-0">
            {daysOfWeek.map(day => (
              <div key={day} className="py-3 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-y-auto">
            {calendarDays.map((day, idx) => (
              <div 
                key={idx} 
                className={`border-b border-r border-border/50 p-2 transition-colors hover:bg-muted/30 group cursor-pointer relative
                  ${idx % 7 === 6 ? 'border-r-0' : ''} 
                  ${idx >= 28 ? 'border-b-0' : ''}`}
              >
                <div className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full mb-2
                  ${day.date === 15 ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground group-hover:text-foreground'}`}>
                  {day.date}
                </div>

                <div className="space-y-1">
                  {day.events.map(event => (
                    <div 
                      key={event.id} 
                      className={`text-[10px] font-bold px-2 py-1 rounded truncate transition-all
                        ${event.type === 'deadline' 
                          ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20' 
                          : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                    >
                      {event.time} - {event.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
