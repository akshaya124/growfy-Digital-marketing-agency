"use client";

import { useState } from "react";
import { useDashboard, CalendarEvent } from "@/context/DashboardContext";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ContentCalendarPage() {
  const { events } = useDashboard();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Date Math
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-11
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0-6 (Sun-Sat)

  const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  };

  // Helper to check if an event falls on a specific day in the current view
  const getEventsForDay = (day: number) => {
    return events.filter(evt => {
      const eDate = new Date(evt.date);
      return eDate.getDate() === day && eDate.getMonth() === currentMonth && eDate.getFullYear() === currentYear;
    });
  };

  const getStatusColor = (status: CalendarEvent["status"]) => {
    switch(status) {
      case "Draft": return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      case "In Review": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Scheduled": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Published": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Completed": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default: return "bg-white/10 text-white";
    }
  };

  const getEventIcon = (type: CalendarEvent["type"]) => {
    switch(type) {
      case "meeting": return "🗣";
      case "post": return "📝";
      case "email": return "✉️";
      case "video": return "🎥";
      default: return "📌";
    }
  };

  // Build grid blocks
  const days = [];
  // Empty slots before 1st of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="bg-background/40 border-b border-r border-border min-h-[120px] p-2" />);
  }
  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const dayEvents = getEventsForDay(d);
    days.push(
      <div key={`day-${d}`} className={`border-b border-r border-border min-h-[120px] p-2 transition-colors hover:bg-muted/30 ${isToday(d) ? 'bg-primary/5' : 'bg-background'}`}>
        <div className="flex justify-between items-start mb-2">
          <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${isToday(d) ? 'bg-primary text-white' : 'text-muted-foreground'}`}>
            {d}
          </span>
        </div>
        <div className="space-y-1">
          {dayEvents.map(evt => (
            <div 
              key={evt.id} 
              className={`text-xs px-2 py-1 rounded border ${getStatusColor(evt.status)} truncate cursor-pointer hover:opacity-80 transition-opacity`}
              title={`${evt.title} - ${evt.status}`}
            >
              <span className="mr-1">{getEventIcon(evt.type)}</span>
              <span className="font-semibold">{evt.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fill remainder of grid to make complete weeks (rows of 7)
  const totalCells = days.length;
  const remainder = totalCells % 7;
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i++) {
      days.push(<div key={`empty-end-${i}`} className="bg-background/40 border-b border-r border-border min-h-[120px] p-2" />);
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <CalendarIcon className="text-primary w-8 h-8 hidden md:block" />
          <h1 className="text-3xl font-black w-64">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h1>
          <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8"><ChevronLeft className="w-5 h-5"/></Button>
            <Button variant="ghost" size="sm" onClick={goToday} className="h-8 font-bold text-xs px-3">Today</Button>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8"><ChevronRight className="w-5 h-5"/></Button>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] gap-2">
          <Plus className="w-4 h-4" /> Request Content
        </Button>
      </div>

      {/* CALENDAR GRID */}
      <div className="glass-card rounded-2xl border-t border-l border-border overflow-hidden flex-1 flex flex-col min-h-0 bg-background/50">
        {/* Weekdays Header */}
        <div className="grid grid-cols-7 border-b border-border bg-muted/50 shrink-0">
          {WEEKDAYS.map(day => (
            <div key={day} className="py-3 text-center text-xs font-black tracking-wider uppercase text-muted-foreground border-r border-border">
              {day}
            </div>
          ))}
        </div>
        
        {/* Days Grid */}
        <div className="grid grid-cols-7 flex-1 overflow-y-auto">
          {days}
        </div>
      </div>
      
    </div>
  );
}
