"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FolderKanban, Clock, Users, CheckCircle2, 
  MoreHorizontal, ChevronRight, AlertCircle, Play, X
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  name: string;
  client: string;
  status: "Active" | "At Risk" | "Completed";
  progress: number;
  dueDate: string;
  team: string[];
};

const mockProjects: Project[] = [
  {
    id: "PRJ-01",
    name: "Nova E-Commerce Redesign",
    client: "Nova Inc.",
    status: "Active",
    progress: 65,
    dueDate: "Oct 15, 2026",
    team: ["MC", "SJ", "JD"]
  },
  {
    id: "PRJ-02",
    name: "Q4 Ad Campaign",
    client: "TechFlow",
    status: "At Risk",
    progress: 30,
    dueDate: "Sep 30, 2026",
    team: ["MC", "AL"]
  },
  {
    id: "PRJ-03",
    name: "Brand Identity Guidelines",
    client: "Lumina",
    status: "Completed",
    progress: 100,
    dueDate: "Aug 15, 2026",
    team: ["SJ", "JD"]
  }
];

export default function TeamProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-black mb-2 text-foreground">Assigned Projects</h1>
          <p className="text-muted-foreground">Manage your active client engagements and track progress.</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0 relative">
        
        {/* PROJECTS GRID */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar pr-2 pb-8 ${selectedProject ? 'hidden xl:block xl:pr-[400px]' : ''}`}>
          <div className="grid md:grid-cols-2 gap-6">
            {mockProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="glass-card p-6 rounded-3xl border border-border bg-background/50 hover:border-primary/50 hover:bg-background/80 transition-all cursor-pointer group hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border
                      ${project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                        project.status === 'At Risk' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                        'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                      {project.status}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-primary"><MoreHorizontal className="w-4 h-4" /></Button>
                </div>
                
                <h3 className="text-xl font-bold mb-1 leading-tight group-hover:text-primary transition-colors">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">Client: <span className="font-medium text-foreground">{project.client}</span></p>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2 mb-6 border border-border">
                    <div 
                      className={`h-2 rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-border/50">
                    <div className="flex -space-x-2">
                      {project.team.map((member, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 border-2 border-background flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                          {member}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" /> {project.dueDate}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SLIDE-OUT PANEL */}
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/40 z-40 xl:hidden backdrop-blur-sm"
              />
              <motion.div 
                initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="fixed xl:absolute inset-y-0 right-0 w-full md:w-[400px] z-50 bg-background/95 backdrop-blur-3xl border-l border-border shadow-2xl flex flex-col"
              >
                <div className="p-6 border-b border-border/50 bg-muted/20 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-black mb-1">{selectedProject.name}</h2>
                    <p className="text-sm text-muted-foreground">Client: {selectedProject.client}</p>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="p-2 bg-background rounded-full hover:bg-muted text-muted-foreground transition-colors shadow-sm border border-border">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                  
                  <div className="flex gap-4">
                    <Button variant="premium" className="flex-1 rounded-xl shadow-lg shadow-primary/20 font-bold"><Play className="w-4 h-4 mr-2"/> Start Timer</Button>
                    <Button variant="outline" className="flex-1 rounded-xl font-bold"><CheckCircle2 className="w-4 h-4 mr-2"/> Mark Complete</Button>
                  </div>

                  <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Project Brief</h3>
                    <p className="text-sm leading-relaxed text-foreground">
                      We are redesigning the main e-commerce storefront for Nova Inc. to improve mobile conversion rates and modernize the UI. 
                      Focus areas include the product details page, checkout flow, and homepage hero banner.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2">Assigned Team</h3>
                    {selectedProject.team.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-xs text-white font-bold">
                          {member}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm">Team Member {member}</p>
                          <p className="text-xs text-muted-foreground">Developer / Designer</p>
                        </div>
                        <Button variant="ghost" size="icon" className="w-8 h-8"><ChevronRight className="w-4 h-4"/></Button>
                      </div>
                    ))}
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
