"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckSquare, Clock, Plus, Search, Filter, 
  MessageSquare, Paperclip, MoreHorizontal, X, Send,
  AlignLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "To Do" | "In Progress" | "In Review" | "Completed";
  dueDate: string;
  comments: number;
  attachments: number;
  assignee: { name: string, initials: string, color: string };
};

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Review Homepage Copy",
    description: "Please review the final draft of the homepage copy provided by the marketing team. We need approval before sending it to development.",
    priority: "High",
    status: "To Do",
    dueDate: "Oct 24",
    comments: 3,
    attachments: 1,
    assignee: { name: "John Doe", initials: "JD", color: "from-blue-500 to-cyan-500" }
  },
  {
    id: "2",
    title: "Approve Brand Colors",
    description: "Review the updated brand color palette in the Figma file and provide final sign-off.",
    priority: "Medium",
    status: "To Do",
    dueDate: "Oct 26",
    comments: 0,
    attachments: 2,
    assignee: { name: "John Doe", initials: "JD", color: "from-blue-500 to-cyan-500" }
  },
  {
    id: "3",
    title: "Provide API Keys for Stripe",
    description: "We need the production API keys for Stripe to finalize the checkout flow integration.",
    priority: "High",
    status: "In Progress",
    dueDate: "Oct 22",
    comments: 5,
    attachments: 0,
    assignee: { name: "Admin", initials: "AD", color: "from-primary to-purple-500" }
  },
  {
    id: "4",
    title: "Review App Wireframes",
    description: "The mobile app wireframes are ready for your review. Check the prototype link attached.",
    priority: "Medium",
    status: "In Review",
    dueDate: "Oct 20",
    comments: 12,
    attachments: 4,
    assignee: { name: "Sarah J.", initials: "SJ", color: "from-emerald-500 to-teal-500" }
  },
  {
    id: "5",
    title: "Sign NDA Agreement",
    description: "Please sign the standard non-disclosure agreement before we start the next phase.",
    priority: "High",
    status: "Completed",
    dueDate: "Oct 10",
    comments: 1,
    attachments: 1,
    assignee: { name: "John Doe", initials: "JD", color: "from-blue-500 to-cyan-500" }
  },
];

const columns = ["To Do", "In Progress", "In Review", "Completed"];

export default function ClientTasksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = mockTasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-black mb-2 text-foreground">Task Board</h1>
          <p className="text-muted-foreground">Manage your action items and review project tasks.</p>
        </div>
        <Button variant="premium" className="rounded-xl h-11 w-full md:w-auto font-bold shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5 mr-2" /> New Request
        </Button>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-background/50 backdrop-blur-md p-2 rounded-xl border border-border shrink-0">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" 
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="bg-background rounded-lg flex-1 sm:flex-none"><Filter className="w-4 h-4 mr-2"/> Filters</Button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex gap-6 min-h-0 relative">
        
        {/* KANBAN BOARD */}
        <div className={`flex-1 transition-all duration-500 overflow-x-auto overflow-y-hidden custom-scrollbar ${selectedTask ? 'mr-[420px] hidden xl:block' : ''}`}>
          <div className="flex gap-6 h-full pb-4 min-w-[1000px]">
            {columns.map(colStatus => (
              <div key={colStatus} className="flex-1 flex flex-col min-w-[280px]">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{colStatus}</h3>
                  <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-bold text-muted-foreground">
                    {filteredTasks.filter(t => t.status === colStatus).length}
                  </span>
                </div>
                
                {/* Column Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 pb-4">
                  {filteredTasks.filter(t => t.status === colStatus).map((task) => (
                    <div 
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`glass-card p-5 rounded-2xl border transition-all duration-300 cursor-pointer group hover:bg-background/80 hover:-translate-y-1 hover:shadow-xl
                        ${selectedTask?.id === task.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-border bg-background/50 hover:border-primary/30'}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border
                          ${task.priority === 'High' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                            task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                            'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                          {task.priority}
                        </span>
                        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <h4 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight">{task.title}</h4>
                      
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          {task.comments > 0 && <span className="flex items-center gap-1 text-xs"><MessageSquare className="w-3.5 h-3.5"/> {task.comments}</span>}
                          {task.attachments > 0 && <span className="flex items-center gap-1 text-xs"><Paperclip className="w-3.5 h-3.5"/> {task.attachments}</span>}
                        </div>
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${task.assignee.color} flex items-center justify-center text-[9px] text-white font-bold shadow-sm`} title={task.assignee.name}>
                          {task.assignee.initials}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SLIDE-OUT SIDE PANEL (Master-Detail) */}
        <AnimatePresence>
          {selectedTask && (
            <>
              {/* Mobile Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedTask(null)}
                className="fixed inset-0 bg-black/40 z-40 xl:hidden backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="fixed xl:absolute inset-y-0 right-0 w-full md:w-[420px] z-50 bg-background/95 backdrop-blur-2xl border-l border-border shadow-2xl flex flex-col"
              >
                {/* Panel Header */}
                <div className="p-6 border-b border-border/50 flex justify-between items-start bg-muted/20">
                  <div className="flex gap-2 items-center mb-1">
                     <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border
                        ${selectedTask.priority === 'High' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                          selectedTask.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                          'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                        {selectedTask.priority}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground">{selectedTask.status}</span>
                  </div>
                  <button onClick={() => setSelectedTask(null)} className="p-2 bg-background rounded-full hover:bg-muted text-muted-foreground transition-colors shadow-sm border border-border">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 flex flex-col">
                  
                  {/* Title & Description */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{selectedTask.title}</h2>
                    <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl border border-border/50">
                      <AlignLeft className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80 leading-relaxed">{selectedTask.description}</p>
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border bg-background">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">Assignee</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${selectedTask.assignee.color} flex items-center justify-center text-[9px] text-white font-bold shadow-sm`}>
                          {selectedTask.assignee.initials}
                        </div>
                        <span className="text-sm font-bold">{selectedTask.assignee.name}</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-background">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2 flex items-center gap-1"><Clock className="w-3 h-3"/> Due Date</p>
                      <span className="text-sm font-bold">{selectedTask.dueDate}</span>
                    </div>
                  </div>

                  {/* Comments Section (Mock) */}
                  <div className="flex-1 flex flex-col min-h-[250px]">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4"/> Activity & Comments
                    </h3>
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-[10px] text-white font-bold shrink-0">AD</div>
                        <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
                          <p className="text-sm font-bold mb-1">Admin <span className="font-normal text-xs text-muted-foreground ml-2">2 hours ago</span></p>
                          <p className="text-sm">I've attached the latest files. Let me know when you've reviewed them!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border/50 bg-background/80">
                  <div className="flex items-end gap-2">
                    <textarea 
                      placeholder="Write a comment..." 
                      className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none h-12 custom-scrollbar"
                    />
                    <Button variant="premium" size="icon" className="h-12 w-12 rounded-xl shrink-0"><Send className="w-5 h-5"/></Button>
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
