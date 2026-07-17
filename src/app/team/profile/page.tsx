"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Shield, Camera, Mail, Phone, 
  Key, Save, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "work", label: "Work Profile", icon: Briefcase },
  { id: "security", label: "Security", icon: Shield },
];

export default function TeamProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      <div>
        <h1 className="text-3xl font-black mb-1 text-foreground">My Profile</h1>
        <p className="text-muted-foreground">Manage your internal employee profile and security settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        <aside className="w-full md:w-64 shrink-0">
          <div className="glass-card p-3 rounded-3xl border border-border bg-background/50 flex flex-col gap-2 sticky top-24">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm w-full text-left
                  ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            
            {activeTab === "personal" && (
              <motion.div 
                key="personal"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/20">
                  <h2 className="text-xl font-bold">Personal Information</h2>
                </div>
                
                <div className="p-6 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="relative group cursor-pointer">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-3xl text-white font-black shadow-xl">
                        MC
                      </div>
                      <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Avatar</h3>
                      <p className="text-xs text-muted-foreground mb-3">Visible to team members and clients.</p>
                      <Button variant="outline" size="sm" className="rounded-lg font-bold">Upload Image</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">First Name</label>
                      <input type="text" defaultValue="Marcus" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Last Name</label>
                      <input type="text" defaultValue="Chen" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-foreground">Contact Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="email" defaultValue="marcus@growfy.agency" className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-foreground">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="tel" defaultValue="+1 (555) 987-6543" className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border-t border-border/50 bg-background flex justify-end">
                  <Button variant="premium" className="rounded-xl h-10 px-8 font-bold"><Save className="w-4 h-4 mr-2"/> Save Changes</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "work" && (
              <motion.div 
                key="work"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/20">
                  <h2 className="text-xl font-bold">Work Profile</h2>
                  <p className="text-sm text-muted-foreground">Internal role details (Read-only).</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">Department</label>
                      <div className="font-bold">Engineering</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">Job Title</label>
                      <div className="font-bold">Senior Frontend Developer</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">Employee ID</label>
                      <div className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-md inline-block">EMP-1042</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">Manager</label>
                      <div className="font-bold flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[8px]">AD</div>
                        Admin
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t border-border/50">
                    <label className="text-sm font-bold text-foreground">Internal Bio</label>
                    <textarea 
                      defaultValue="Frontend specialist focusing on React, Next.js, and framer-motion animations. Coffee enthusiast." 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all resize-none min-h-[100px]" 
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-border/50 bg-background flex justify-end">
                  <Button variant="premium" className="rounded-xl h-10 px-8 font-bold"><Save className="w-4 h-4 mr-2"/> Update Bio</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
               <motion.div 
                key="security"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/20">
                  <h2 className="text-xl font-bold">Change Password</h2>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2"><Key className="w-4 h-4"/> Current Password</label>
                    <input type="password" placeholder="Enter current password" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all max-w-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2"><Key className="w-4 h-4"/> New Password</label>
                    <input type="password" placeholder="Enter new password" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all max-w-md" />
                  </div>
                </div>
                
                <div className="p-6 border-t border-border/50 bg-background flex justify-start">
                  <Button variant="premium" className="rounded-xl h-10 px-8 font-bold">Update Password</Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
