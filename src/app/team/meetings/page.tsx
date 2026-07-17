"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, Calendar, Clock, Users, Link as LinkIcon, 
  MoreHorizontal, Plus, Play, FileText, X
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  host: string;
  attendees: number;
  type: "Internal Sync" | "Client Call" | "All Hands";
  status: "Upcoming" | "Live" | "Past";
};

const mockMeetings: Meeting[] = [
  { id: "m1", title: "Design Review: Nova Inc.", date: "Today", time: "10:00 AM", duration: "45m", host: "Sarah J.", attendees: 4, type: "Client Call", status: "Live" },
  { id: "m2", title: "Frontend Standup", date: "Today", time: "11:30 AM", duration: "15m", host: "Marcus C.", attendees: 6, type: "Internal Sync", status: "Upcoming" },
  { id: "m3", title: "Q4 Strategy Kickoff", date: "Tomorrow", time: "09:00 AM", duration: "1h 30m", host: "Admin", attendees: 12, type: "All Hands", status: "Upcoming" },
  { id: "m4", title: "Client Onboarding: TechFlow", date: "Yesterday", time: "02:00 PM", duration: "1h", host: "Admin", attendees: 3, type: "Client Call", status: "Past" },
];

export default function TeamMeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-black mb-2 text-foreground">Video Meetings</h1>
          <p className="text-muted-foreground">Join upcoming calls and review past meeting recordings.</p>
        </div>
        <Button variant="premium" className="rounded-xl shadow-lg shadow-primary/20 font-bold px-6">
          <Plus className="w-4 h-4 mr-2" /> Schedule Meeting
        </Button>
      </div>

      <div className="flex-1 flex gap-6 min-h-0 relative">
        
        {/* MEETINGS LIST */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar pr-2 pb-8 ${selectedMeeting ? 'hidden xl:block xl:pr-[400px]' : ''}`}>
          <div className="space-y-4">
            
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Today & Upcoming</h3>
            {mockMeetings.filter(m => m.status !== "Past").map((meeting) => (
              <div 
                key={meeting.id}
                onClick={() => setSelectedMeeting(meeting)}
                className={`glass-card p-5 rounded-2xl border bg-background/50 hover:bg-background/80 transition-all cursor-pointer group flex flex-col md:flex-row justify-between md:items-center gap-4
                  ${meeting.status === 'Live' ? 'border-primary/50 shadow-lg shadow-primary/10' : 'border-border hover:border-primary/30'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                    ${meeting.status === 'Live' ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-muted text-muted-foreground'}`}>
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {meeting.status === "Live" && <span className="bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> Live Now</span>}
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{meeting.type}</span>
                    </div>
                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors leading-tight">{meeting.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Hosted by {meeting.host}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm font-medium">
                  <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="w-4 h-4"/> {meeting.date}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Clock className="w-4 h-4"/> {meeting.time}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Users className="w-4 h-4"/> {meeting.attendees}</div>
                  {meeting.status === "Live" ? (
                    <Button variant="premium" className="rounded-lg shadow-md font-bold px-6">Join Call</Button>
                  ) : (
                    <Button variant="outline" className="rounded-lg font-bold">Details</Button>
                  )}
                </div>
              </div>
            ))}

            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-8 mb-2">Past Meetings</h3>
            {mockMeetings.filter(m => m.status === "Past").map((meeting) => (
              <div 
                key={meeting.id}
                onClick={() => setSelectedMeeting(meeting)}
                className="glass-card p-5 rounded-2xl border border-border bg-background/30 opacity-70 hover:opacity-100 transition-all cursor-pointer flex flex-col md:flex-row justify-between md:items-center gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted text-muted-foreground flex items-center justify-center shrink-0"><Video className="w-6 h-6" /></div>
                  <div>
                    <span className="text-xs font-bold text-muted-foreground">{meeting.type}</span>
                    <h4 className="font-bold text-lg leading-tight">{meeting.title}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm font-medium">
                  <div className="flex items-center gap-2 text-muted-foreground">{meeting.date}, {meeting.time}</div>
                  <Button variant="outline" size="sm" className="rounded-lg font-bold"><Play className="w-3 h-3 mr-2"/> Watch Recording</Button>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* SIDE PANEL */}
        <AnimatePresence>
          {selectedMeeting && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedMeeting(null)}
                className="fixed inset-0 bg-black/40 z-40 xl:hidden backdrop-blur-sm"
              />
              <motion.div 
                initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="fixed xl:absolute inset-y-0 right-0 w-full md:w-[400px] z-50 bg-background/95 backdrop-blur-3xl border-l border-border shadow-2xl flex flex-col"
              >
                <div className="p-6 border-b border-border/50 bg-muted/20 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-primary mb-1 block">{selectedMeeting.type}</span>
                    <h2 className="text-xl font-black leading-tight">{selectedMeeting.title}</h2>
                  </div>
                  <button onClick={() => setSelectedMeeting(null)} className="p-2 bg-background rounded-full hover:bg-muted text-muted-foreground transition-colors shadow-sm border border-border">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-background border border-border p-3 rounded-xl shadow-sm">
                      <p className="text-xs text-muted-foreground font-bold uppercase mb-1">When</p>
                      <p className="font-bold">{selectedMeeting.date}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{selectedMeeting.time} ({selectedMeeting.duration})</p>
                    </div>
                    <div className="bg-background border border-border p-3 rounded-xl shadow-sm">
                      <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Attendees</p>
                      <p className="font-bold flex items-center gap-1"><Users className="w-3.5 h-3.5"/> {selectedMeeting.attendees} people</p>
                    </div>
                  </div>

                  {selectedMeeting.status !== "Past" && (
                     <Button variant="premium" className="w-full rounded-xl shadow-lg shadow-primary/20 font-bold h-12">
                       <Video className="w-4 h-4 mr-2"/> Join Video Call
                     </Button>
                  )}

                  <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Meeting Notes / Agenda</h3>
                    <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
                      <li>Review latest wireframes for homepage</li>
                      <li>Discuss color palette changes</li>
                      <li>Align on Q4 deliverables timeline</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2">Attachments</h3>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:border-primary/50 cursor-pointer transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0"><FileText className="w-4 h-4"/></div>
                        <div>
                          <p className="text-sm font-bold group-hover:text-primary transition-colors">Q4_Brief.pdf</p>
                          <p className="text-[10px] text-muted-foreground">1.2 MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="w-8 h-8"><LinkIcon className="w-4 h-4"/></Button>
                    </div>
                  </div>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
