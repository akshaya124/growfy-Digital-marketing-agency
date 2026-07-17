"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, MoreHorizontal, MessageSquare, Paperclip, 
  Clock, X, CheckCircle2, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Task = {
  id: string;
  title: string;
  project: string;
  priority: "High" | "Medium" | "Low";
  status: "To Do" | "In Progress" | "In Review" | "Completed";
  dueDate: string;
};

const mockTasks: Task[] = [
  { id: "T-101", title: "Design Homepage Hero", project: "Nova E-Commerce", priority: "High", status: "In Progress", dueDate: "Today" },
  { id: "T-102", title: "Update Navbar Links", project: "Nova E-Commerce", priority: "Low", status: "To Do", dueDate: "Tomorrow" },
  { id: "T-103", title: "Fix Mobile Padding", project: "TechFlow Ads", priority: "Medium", status: "In Review", dueDate: "Oct 12" },
  { id: "T-104", title: "Submit Final Assets", project: "Lumina Brand", priority: "High", status: "Completed", dueDate: "Last Week" },
  { id: "T-105", title: "Draft Q4 Report", project: "Internal", priority: "Medium", status: "To Do", dueDate: "Next Week" }
];

export default function TeamTasksPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const columns = ["To Do", "In Progress", "In Review", "Completed"] as const;

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto relative overflow-hidden">
      
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-black mb-1 text-foreground">My Tasks</h1>
          <p className="text-muted-foreground">Drag and drop to update task status.</p>
        </div>
        <Button variant="premium" className="rounded-xl shadow-lg shadow-primary/20 font-bold h-10 px-6">
          <Plus className="w-4 h-4 mr-2" /> Add Task
        </Button>
      </div>

      <div className="flex-1 flex gap-6 min-h-0 relative">
        
        {/* KANBAN BOARD */}
        <div className={`flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-4 ${selectedTask ? 'hidden xl:flex xl:pr-[400px]' : 'flex'}`}>
          <div className="flex gap-6 h-full min-w-max px-1">
            
            {columns.map(col => (
              <div key={col} className="w-[320px] flex flex-col h-full bg-muted/20 border border-border/50 rounded-3xl overflow-hidden shrink-0">
                
                <div className="p-4 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
                  <h3 className="font-bold">{col}</h3>
                  <span className="bg-muted text-muted-foreground text-xs font-bold px-2 py-0.5 rounded-md">
                    {mockTasks.filter(t => t.status === col).length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
                  {mockTasks.filter(t => t.status === col).map(task => (
                    <div 
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="glass-card p-4 rounded-2xl border border-border bg-background/80 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border
                          ${task.priority === 'High' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                            task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                            'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                          {task.priority}
                        </span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><MoreHorizontal className="w-4 h-4"/></Button>
                      </div>
                      <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors leading-tight">{task.title}</h4>
                      <p className="text-xs text-muted-foreground mb-4 truncate">{task.project}</p>
                      
                      <div className="flex justify-between items-center text-muted-foreground pt-3 border-t border-border/50">
                        <div className="flex gap-3 text-xs font-bold">
                          <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5"/> 3</span>
                          <span className="flex items-center gap-1"><Paperclip className="w-3.5 h-3.5"/> 1</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-muted rounded-md">
                          <Clock className="w-3 h-3" /> {task.dueDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* TASK DETAILS PANEL */}
        <AnimatePresence>
          {selectedTask && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedTask(null)}
                className="fixed inset-0 bg-black/40 z-40 xl:hidden backdrop-blur-sm"
              />
              <motion.div 
                initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="fixed xl:absolute inset-y-0 right-0 w-full md:w-[400px] z-50 bg-background/95 backdrop-blur-3xl border-l border-border shadow-2xl flex flex-col"
              >
                <div className="p-6 border-b border-border/50 bg-muted/20 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-primary mb-1 block">{selectedTask.project}</span>
                    <h2 className="text-xl font-black">{selectedTask.title}</h2>
                  </div>
                  <button onClick={() => setSelectedTask(null)} className="p-2 bg-background rounded-full hover:bg-muted text-muted-foreground transition-colors shadow-sm border border-border">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-background border border-border p-3 rounded-xl shadow-sm">
                      <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Status</p>
                      <p className="font-bold">{selectedTask.status}</p>
                    </div>
                    <div className="bg-background border border-border p-3 rounded-xl shadow-sm">
                      <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Due Date</p>
                      <p className="font-bold flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-muted-foreground"/> {selectedTask.dueDate}</p>
                    </div>
                  </div>

                  {selectedTask.status !== "Completed" && (
                     <Button variant="premium" className="w-full rounded-xl shadow-lg shadow-primary/20 font-bold h-12">
                       <Play className="w-4 h-4 mr-2"/> Track Time on Task
                     </Button>
                  )}
                  {selectedTask.status === "Completed" && (
                     <div className="w-full rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 font-bold h-12 flex items-center justify-center">
                       <CheckCircle2 className="w-4 h-4 mr-2"/> Task Completed
                     </div>
                  )}

                  <div className="bg-background border border-border rounded-2xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Task Description</h3>
                    <p className="text-sm leading-relaxed text-foreground">
                      Please ensure the new hero image is optimized for mobile screens. We need the text overlay to be perfectly legible on devices smaller than 768px. Reference the Figma link in the attachments.
                    </p>
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
