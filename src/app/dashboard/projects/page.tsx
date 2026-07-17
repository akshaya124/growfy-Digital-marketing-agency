"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FolderKanban, Calendar as CalendarIcon, Clock, 
  Search, Filter, CheckCircle2, FileText, 
  X, MessageSquare, ArrowRight, ExternalLink, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  name: string;
  progress: number;
  status: string;
  deadline: string;
  team: { name: string, initials: string, color: string }[];
  milestones: { title: string, date: string, completed: boolean }[];
  recentFiles: { name: string, date: string }[];
};

const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-Commerce Web App",
    progress: 75,
    status: "QA Testing",
    deadline: "Nov 15, 2026",
    team: [
      { name: "Admin (PM)", initials: "AD", color: "from-primary to-purple-500" },
      { name: "Sarah J.", initials: "SJ", color: "from-blue-500 to-cyan-500" }
    ],
    milestones: [
      { title: "Project Kickoff", date: "Sep 01", completed: true },
      { title: "Design Approval", date: "Sep 20", completed: true },
      { title: "Frontend Development", date: "Oct 15", completed: true },
      { title: "QA & Testing", date: "Oct 30", completed: false },
      { title: "Final Launch", date: "Nov 15", completed: false }
    ],
    recentFiles: [
      { name: "Homepage_Mockups_v3.fig", date: "2 days ago" },
      { name: "API_Documentation.pdf", date: "1 week ago" }
    ]
  },
  {
    id: "2",
    name: "Q3 Marketing Campaign",
    progress: 40,
    status: "In Progress",
    deadline: "Dec 01, 2026",
    team: [
      { name: "Emily R.", initials: "ER", color: "from-emerald-500 to-teal-500" }
    ],
    milestones: [
      { title: "Campaign Strategy", date: "Oct 05", completed: true },
      { title: "Ad Creatives", date: "Oct 20", completed: false },
      { title: "Copywriting", date: "Nov 01", completed: false },
      { title: "Campaign Launch", date: "Nov 15", completed: false }
    ],
    recentFiles: [
      { name: "Target_Audience_Research.pdf", date: "Yesterday" }
    ]
  },
  {
    id: "3",
    name: "SEO Audit",
    progress: 100,
    status: "Completed",
    deadline: "Oct 10, 2026",
    team: [
      { name: "Sarah J.", initials: "SJ", color: "from-blue-500 to-cyan-500" }
    ],
    milestones: [
      { title: "Initial Crawl", date: "Sep 25", completed: true },
      { title: "Competitor Analysis", date: "Oct 02", completed: true },
      { title: "Final Report Delivery", date: "Oct 10", completed: true }
    ],
    recentFiles: [
      { name: "SEO_Final_Report.pdf", date: "Oct 10" },
      { name: "Keyword_Strategy.xlsx", date: "Oct 08" }
    ]
  }
];

export default function ClientProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = mockProjects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-black mb-2 text-foreground">My Projects</h1>
          <p className="text-muted-foreground">Track the status, timeline, and deliverables of your active projects.</p>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-background/50 backdrop-blur-md p-2 rounded-xl border border-border shrink-0">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search projects..." 
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
        
        {/* PROJECTS LIST */}
        <div className={`flex-1 transition-all duration-500 flex flex-col ${selectedProject ? 'mr-[420px] hidden xl:flex' : ''}`}>
          <div className="grid gap-4 overflow-y-auto custom-scrollbar pr-2 pb-8">
            {filteredProjects.map((project, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className={`glass-card p-6 rounded-2xl border transition-all duration-300 cursor-pointer group hover:bg-background/80
                  ${selectedProject?.id === project.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-border bg-background/50 hover:border-primary/30'}`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                      {project.name}
                      {project.status === 'Completed' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4"/> Due: {project.deadline}</span>
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border
                    ${project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                      project.status === 'QA Testing' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                    {project.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-muted-foreground">Overall Progress</span>
                    <span className="font-black text-primary">{project.progress}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${project.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SLIDE-OUT SIDE PANEL (Master-Detail) */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Mobile Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/40 z-40 xl:hidden backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="fixed xl:absolute inset-y-0 right-0 w-full md:w-[400px] z-50 bg-background/95 backdrop-blur-2xl border-l border-border shadow-2xl flex flex-col"
              >
                {/* Panel Header */}
                <div className="p-6 border-b border-border/50 flex justify-between items-start bg-muted/20">
                  <div>
                    <h2 className="text-xl font-bold mb-1">{selectedProject.name}</h2>
                    <span className="text-sm font-bold text-primary">{selectedProject.status}</span>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="p-2 bg-background rounded-full hover:bg-muted text-muted-foreground transition-colors shadow-sm border border-border">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Panel Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                  
                  {/* Milestones / Timeline */}
                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2"><Activity className="w-4 h-4"/> Project Timeline</h3>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
                      {selectedProject.milestones.map((milestone, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          {/* Marker */}
                          <div className={`flex items-center justify-center w-6 h-6 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10
                            ${milestone.completed ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`}>
                            {milestone.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          
                          {/* Card */}
                          <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border border-border bg-background shadow-sm">
                            <h4 className={`font-bold text-sm ${milestone.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{milestone.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{milestone.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2"><MessageSquare className="w-4 h-4"/> Assigned Team</h3>
                    <div className="space-y-3">
                      {selectedProject.team.map((member, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${member.color} flex items-center justify-center text-[10px] text-white font-bold shadow-sm`}>
                            {member.initials}
                          </div>
                          <span className="text-sm font-bold">{member.name}</span>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full text-xs h-9 rounded-lg border-dashed">Message Team</Button>
                    </div>
                  </div>

                  {/* Recent Files */}
                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2"><FileText className="w-4 h-4"/> Recent Deliverables</h3>
                    <div className="space-y-2">
                      {selectedProject.recentFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileText className="w-4 h-4 text-primary shrink-0" />
                            <div className="truncate">
                              <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{file.name}</p>
                              <p className="text-[10px] text-muted-foreground">{file.date}</p>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Panel Footer */}
                <div className="p-6 border-t border-border/50 bg-background">
                  <Button variant="premium" className="w-full rounded-xl h-11 font-bold">Request Review <ArrowRight className="w-4 h-4 ml-2"/></Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
