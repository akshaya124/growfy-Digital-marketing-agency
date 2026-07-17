"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Building, Phone, Calendar, Search, Filter, 
  Plus, MoreVertical, Flame, ArrowRight, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stages = [
  { id: "new", name: "New Leads", color: "bg-blue-500" },
  { id: "contacted", name: "Contacted", color: "bg-orange-500" },
  { id: "proposal", name: "Proposal Sent", color: "bg-purple-500" },
  { id: "negotiation", name: "Negotiation", color: "bg-rose-500" },
  { id: "won", name: "Closed Won", color: "bg-emerald-500" }
];

const leads = [
  { id: 1, name: "Sarah Jenkins", company: "Apex Tech", val: "$15,000", score: 92, stage: "proposal", date: "Oct 24", avatar: "SJ" },
  { id: 2, name: "David Alaba", company: "Zenith E-Commerce", val: "$45,000", score: 88, stage: "negotiation", date: "Oct 22", avatar: "DA" },
  { id: 3, name: "Michael Chang", company: "Nova Inc", val: "$8,500", score: 45, stage: "new", date: "Today", avatar: "MC" },
  { id: 4, name: "Elena Rodriguez", company: "Pulse Marketing", val: "$12,000", score: 76, stage: "contacted", date: "Yesterday", avatar: "ER" },
  { id: 5, name: "John Doe", company: "Doe Enterprises", val: "$120,000", score: 98, stage: "won", date: "Oct 15", avatar: "JD" },
];

export default function CrmPage() {
  const [activeTab, setActiveTab] = useState("Pipeline");

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. CRM HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2">CRM Module</h1>
          <p className="text-muted-foreground">Manage your sales pipeline, contacts, and lead scoring.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="premium" className="flex-1 md:flex-none rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Lead
          </Button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-border mb-8 overflow-x-auto hide-scrollbar pb-2">
        {["Pipeline", "Companies", "Contacts", "Activities", "Reports"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. FILTERS BAR */}
      {activeTab === "Pipeline" && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search leads or companies..." className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="bg-background rounded-lg flex items-center gap-2"><Filter className="w-4 h-4"/> Filters</Button>
            <Button variant="outline" size="sm" className="bg-background rounded-lg flex items-center gap-2"><Building className="w-4 h-4"/> B2B Leads</Button>
          </div>
        </div>
      )}

      {/* 4. KANBAN PIPELINE VIEW */}
      {activeTab === "Pipeline" && (
        <div className="flex-1 overflow-x-auto hide-scrollbar pb-4">
          <div className="flex gap-6 min-w-max h-full">
            {stages.map(stage => {
              const stageLeads = leads.filter(l => l.stage === stage.id);
              
              return (
                <div key={stage.id} className="w-80 flex flex-col bg-muted/30 rounded-2xl border border-border/50 max-h-full">
                  {/* Stage Header */}
                  <div className="p-4 border-b border-border/50 flex items-center justify-between sticky top-0 bg-background/50 backdrop-blur-md rounded-t-2xl">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${stage.color}`}></div>
                      <h3 className="font-bold text-sm">{stage.name}</h3>
                      <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-bold text-muted-foreground">{stageLeads.length}</span>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground"><MoreVertical className="w-4 h-4" /></button>
                  </div>

                  {/* Stage Cards */}
                  <div className="p-3 overflow-y-auto custom-scrollbar flex-1 space-y-3">
                    {stageLeads.map(lead => (
                      <div key={lead.id} className="glass-card bg-background border border-border p-4 rounded-xl cursor-grab hover:border-primary/50 transition-colors shadow-sm group">
                        
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                              {lead.avatar}
                            </div>
                            <div>
                              <h4 className="font-bold text-sm leading-tight">{lead.name}</h4>
                              <p className="text-xs text-muted-foreground">{lead.company}</p>
                            </div>
                          </div>
                          {/* Lead Score */}
                          <div className={`flex items-center gap-1 text-xs font-bold px-1.5 py-0.5 rounded-md ${lead.score > 80 ? 'bg-orange-500/10 text-orange-500' : 'bg-muted text-muted-foreground'}`}>
                            <Flame className={`w-3 h-3 ${lead.score > 80 ? 'fill-orange-500' : ''}`} /> {lead.score}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="font-black text-primary">{lead.val}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3"/> {lead.date}</div>
                        </div>

                        <div className="flex items-center justify-between border-t border-border pt-3">
                          <div className="flex gap-2">
                            <button className="w-7 h-7 rounded-md bg-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-muted-foreground"><Phone className="w-3 h-3" /></button>
                            <button className="w-7 h-7 rounded-md bg-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-muted-foreground"><MessageSquare className="w-3 h-3" /></button>
                          </div>
                          <button className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                            View <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Quick Lead */}
                  <div className="p-3 border-t border-border/50 sticky bottom-0 bg-background/50 backdrop-blur-md rounded-b-2xl">
                    <button className="w-full py-2 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Plus className="w-3 h-3" /> Quick Add
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 5. CONTACTS / CLIENTS DATA GRID VIEW */}
      {activeTab === "Contacts" && (
        <div className="flex-1 flex flex-col bg-background rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20">
            <h2 className="font-bold">All Contacts (42)</h2>
            <div className="flex gap-2">
               <Button variant="outline" size="sm" className="h-8 text-xs bg-background">Export</Button>
            </div>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 sticky top-0 z-10 text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4 font-semibold w-12"><input type="checkbox" className="rounded border-border bg-background" /></th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Company</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Last Activity</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  { name: "Sarah Jenkins", role: "CEO", company: "Apex Tech", status: "Active Client", last: "Today, 10:30 AM", avatar: "SJ" },
                  { name: "David Alaba", role: "Marketing Dir", company: "Zenith E-Commerce", status: "Negotiating", last: "Yesterday", avatar: "DA" },
                  { name: "John Doe", role: "Founder", company: "Doe Enterprises", status: "Active Client", last: "Oct 24", avatar: "JD" },
                  { name: "Elena Rodriguez", role: "CMO", company: "Pulse Marketing", status: "Cold Lead", last: "Oct 12", avatar: "ER" },
                ].map((contact, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4"><input type="checkbox" className="rounded border-border bg-background" /></td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {contact.avatar}
                        </div>
                        <div>
                          <p className="font-bold">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium">{contact.company}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${contact.status === 'Active Client' ? 'bg-emerald-500/10 text-emerald-500' : contact.status === 'Negotiating' ? 'bg-orange-500/10 text-orange-500' : 'bg-muted text-muted-foreground'}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{contact.last}</td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">View Profile</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PLACEHOLDER FOR OTHER TABS */}
      {(activeTab !== "Pipeline" && activeTab !== "Contacts") && (
        <div className="flex-1 glass-card border border-border rounded-2xl flex flex-col items-center justify-center text-center p-12">
          <Users className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-bold mb-2">{activeTab} Module</h2>
          <p className="text-muted-foreground text-sm max-w-sm">
            This section handles {activeTab.toLowerCase()}. 
          </p>
        </div>
      )}
      
    </div>
  );
}
