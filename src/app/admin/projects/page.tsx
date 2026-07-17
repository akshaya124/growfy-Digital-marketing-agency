"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FolderKanban, LayoutList, Calendar as CalendarIcon, 
  Clock, Plus, Search, Filter, MoreVertical, 
  CheckCircle2, Users, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  { id: 1, name: "E-Commerce Redesign", client: "Zenith Brands", progress: 75, status: "In Progress", deadline: "Nov 15", team: ["AD", "SJ", "DA"] },
  { id: 2, name: "Q4 Meta Ads Campaign", client: "Apex Tech", progress: 25, status: "Planning", deadline: "Dec 01", team: ["ER"] },
  { id: 3, name: "Mobile App MVP", client: "Nova Inc", progress: 90, status: "QA Testing", deadline: "Oct 30", team: ["AD", "MC"] },
  { id: 4, name: "SEO Audit & Strategy", client: "Pulse Marketing", progress: 100, status: "Completed", deadline: "Oct 15", team: ["SJ"] },
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("list");

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage deliverables, timelines, and team assignments.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="premium" className="flex-1 md:flex-none rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Project
          </Button>
        </div>
      </div>

      {/* 2. TOOLBAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-background p-2 rounded-xl border border-border">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setViewMode("kanban")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "kanban" ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'}`}
          >
            <FolderKanban className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'}`}
          >
            <LayoutList className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-border mx-2"></div>
          <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"><CalendarIcon className="w-5 h-5" /></button>
          <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"><Clock className="w-5 h-5" /></button>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search projects..." className="w-full bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors" />
          </div>
          <Button variant="outline" className="bg-background rounded-lg flex items-center gap-2"><Filter className="w-4 h-4"/> Filters</Button>
        </div>
      </div>

      {/* 3. LIST VIEW */}
      {viewMode === "list" && (
        <div className="flex-1 flex flex-col bg-background rounded-2xl border border-border overflow-hidden">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 sticky top-0 z-10 text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4 font-semibold">Project Name</th>
                  <th className="p-4 font-semibold">Client</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Progress</th>
                  <th className="p-4 font-semibold">Deadline</th>
                  <th className="p-4 font-semibold">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {projects.map((project, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors cursor-pointer group">
                    <td className="p-4 font-bold">{project.name}</td>
                    <td className="p-4 text-muted-foreground">{project.client}</td>
                    <td className="p-4">
                       <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 
                        project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' : 
                        project.status === 'QA Testing' ? 'bg-orange-500/10 text-orange-500' :
                        'bg-purple-500/10 text-purple-500'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold w-8">{project.progress}%</span>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${project.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-3 h-3" /> {project.deadline}
                    </td>
                    <td className="p-4">
                      <div className="flex -space-x-2">
                        {project.team.map((initials, idx) => (
                          <div key={idx} className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-[10px] text-white font-bold border-2 border-background shadow-sm">
                            {initials}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. KANBAN VIEW (Mock) */}
      {viewMode === "kanban" && (
         <div className="flex-1 glass-card border border-border rounded-2xl flex flex-col items-center justify-center text-center p-12">
           <FolderKanban className="w-12 h-12 text-muted-foreground/30 mb-4" />
           <h2 className="text-xl font-bold mb-2">Kanban Board</h2>
           <p className="text-muted-foreground text-sm max-w-sm">
             Drag and drop project cards between columns (Planning, In Progress, QA, Completed). Layout is identical to the CRM Leads pipeline.
           </p>
         </div>
      )}
      
    </div>
  );
}
