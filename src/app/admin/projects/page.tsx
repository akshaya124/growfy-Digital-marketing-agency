"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreVertical, FolderKanban, CalendarDays, Users, LayoutList } from "lucide-react";

const dummyProjects = [
  { id: 1, name: "Nova App UI Redesign", client: "TechFlow Inc", deadline: "Aug 15, 2026", progress: 75, status: "In Progress", team: ["AD", "JD", "MR"] },
  { id: 2, name: "Brand Guidelines", client: "Elevate Real Estate", deadline: "Jul 25, 2026", progress: 95, status: "Review", team: ["AD", "SK"] },
  { id: 3, name: "E-Commerce Web Build", client: "Luxe Fashion", deadline: "Sep 01, 2026", progress: 30, status: "In Progress", team: ["JD", "MR", "TS", "AD"] },
  { id: 4, name: "SEO Audit Q3", client: "Apex Finance", deadline: "Jul 20, 2026", progress: 100, status: "Completed", team: ["SK"] },
  { id: 5, name: "MediSync CRM Integration", client: "Bloom Health", deadline: "Oct 15, 2026", progress: 15, status: "Planning", team: ["MR", "AD"] },
  { id: 6, name: "Winter Ad Campaign", client: "Luxe Fashion", deadline: "Nov 01, 2026", progress: 5, status: "Planning", team: ["SK", "TS"] },
];

const statusColors: Record<string, string> = {
  "Planning": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "In Progress": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Review": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Completed": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = dummyProjects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black">Projects</h1>
          <p className="text-muted-foreground mt-1">Track deliverables, deadlines, and team progress.</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="bg-background border border-border rounded-full p-1 flex">
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}>
              <FolderKanban className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}>
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
          <Button variant="premium" onClick={() => setIsModalOpen(true)} className="gap-2 rounded-full px-6 flex-1 sm:flex-none">
            <Plus className="w-4 h-4" /> Create Project
          </Button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="glass-card p-4 rounded-full border border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full overflow-x-auto no-scrollbar">
          <button className="px-4 py-2 rounded-full bg-primary text-white text-sm font-bold whitespace-nowrap">All Projects (6)</button>
          <button className="px-4 py-2 rounded-full bg-transparent text-muted-foreground hover:bg-muted text-sm font-bold whitespace-nowrap transition-colors">In Progress (2)</button>
          <button className="px-4 py-2 rounded-full bg-transparent text-muted-foreground hover:bg-muted text-sm font-bold whitespace-nowrap transition-colors">Review (1)</button>
          <button className="px-4 py-2 rounded-full bg-transparent text-muted-foreground hover:bg-muted text-sm font-bold whitespace-nowrap transition-colors">Completed (1)</button>
        </div>
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* PROJECT GRID */}
      {viewMode === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-card p-6 rounded-3xl border border-border flex flex-col hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[project.status]}`}>
                  {project.status}
                </span>
                <button className="p-1 text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{project.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{project.client}</p>
              
              <div className="mt-auto space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Progress</span>
                    <span className="font-bold text-primary">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${project.progress}%` }} 
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} 
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <CalendarDays className="w-4 h-4" />
                    {project.deadline}
                  </div>
                  <div className="flex -space-x-2">
                    {project.team.map((member, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-[10px] text-white font-bold border-2 border-background shadow-sm" style={{ zIndex: 10 - i }}>
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Project Name</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Client</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Progress</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Deadline</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/20 transition-colors group">
                    <td className="px-6 py-4 font-bold">{project.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{project.client}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[project.status]}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 w-48">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                          <div className={`h-full rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${project.progress}%` }} />
                        </div>
                        <span className="text-xs font-bold">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{project.deadline}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE PROJECT MODAL (DUMMY) */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-background border border-border shadow-2xl rounded-3xl p-8 z-50"
            >
              <h2 className="text-2xl font-black mb-6">Create New Project</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Project Name</label>
                  <input type="text" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" placeholder="e.g. Website Redesign" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Client</label>
                  <select className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary">
                    <option>TechFlow Inc</option>
                    <option>Elevate Real Estate</option>
                    <option>Luxe Fashion</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Deadline</label>
                    <input type="date" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Assigned Team</label>
                    <div className="flex -space-x-2 pt-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold border-2 border-background shadow-sm">AD</div>
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold border-2 border-background shadow-sm hover:text-primary cursor-pointer"><Plus className="w-4 h-4" /></div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-8 pt-4">
                  <Button variant="premium" className="w-full rounded-full h-12" onClick={() => setIsModalOpen(false)}>Create Project</Button>
                  <Button variant="outline" className="w-full rounded-full h-12" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
