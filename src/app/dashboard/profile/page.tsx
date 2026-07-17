"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Bell, Shield, Camera, Mail, Phone, 
  Key, Save, Building, MapPin, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "personal", label: "Personal Details", icon: User },
  { id: "company", label: "Company Profile", icon: Building },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Access", icon: Shield },
];

export default function ClientProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  
  // Mock Toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black mb-1 text-foreground">Account Profile</h1>
        <p className="text-muted-foreground">Manage your personal information, company details, and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR TABS */}
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

        {/* MAIN CONTENT AREA */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            
            {/* PERSONAL DETAILS */}
            {activeTab === "personal" && (
              <motion.div 
                key="personal"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/20">
                  <h2 className="text-xl font-bold">Personal Details</h2>
                  <p className="text-sm text-muted-foreground">This information is used to personalize your dashboard experience.</p>
                </div>
                
                <div className="p-6 space-y-8">
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-6">
                    <div className="relative group cursor-pointer">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-3xl text-white font-black shadow-xl">
                        JD
                      </div>
                      <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Profile Photo</h3>
                      <p className="text-xs text-muted-foreground mb-3">Upload a new avatar. Max size 2MB.</p>
                      <Button variant="outline" size="sm" className="rounded-lg font-bold">Upload Image</Button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">First Name</label>
                      <input type="text" defaultValue="John" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-foreground">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="email" defaultValue="john@novainc.com" className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-foreground">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border-t border-border/50 bg-background flex justify-end">
                  <Button variant="premium" className="rounded-xl h-10 px-8 font-bold"><Save className="w-4 h-4 mr-2"/> Save Changes</Button>
                </div>
              </motion.div>
            )}

            {/* COMPANY PROFILE */}
            {activeTab === "company" && (
              <motion.div 
                key="company"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/20">
                  <h2 className="text-xl font-bold">Company Profile</h2>
                  <p className="text-sm text-muted-foreground">The billing and public details for your organization.</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Company Name</label>
                    <input type="text" defaultValue="Nova E-Commerce Inc." className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="url" defaultValue="https://novainc.com" className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Billing Address</label>
                    <div className="relative flex items-start">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <textarea rows={3} defaultValue="123 Innovation Drive\nSuite 400\nSan Francisco, CA 94105" className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all resize-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Tax ID / VAT Number</label>
                    <input type="text" defaultValue="US-123456789" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all" />
                  </div>
                </div>

                <div className="p-6 border-t border-border/50 bg-background flex justify-end">
                  <Button variant="premium" className="rounded-xl h-10 px-8 font-bold"><Save className="w-4 h-4 mr-2"/> Update Company</Button>
                </div>
              </motion.div>
            )}

            {/* NOTIFICATIONS SETTINGS */}
            {activeTab === "notifications" && (
              <motion.div 
                key="notifications"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/20">
                  <h2 className="text-xl font-bold">Notification Preferences</h2>
                  <p className="text-sm text-muted-foreground">Manage how you receive project updates and invoices.</p>
                </div>
                
                <div className="divide-y divide-border/50">
                  <div className="p-6 flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0"><Mail className="w-5 h-5" /></div>
                      <div>
                        <h3 className="font-bold">Email Notifications</h3>
                        <p className="text-xs text-muted-foreground mt-1">Receive daily digests, invoice alerts, and major project milestones.</p>
                      </div>
                    </div>
                    <button onClick={() => setEmailAlerts(!emailAlerts)} className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${emailAlerts ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${emailAlerts ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="p-6 flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0"><Bell className="w-5 h-5" /></div>
                      <div>
                        <h3 className="font-bold">In-App Push Alerts</h3>
                        <p className="text-xs text-muted-foreground mt-1">Get immediate browser notifications when someone mentions you in chat.</p>
                      </div>
                    </div>
                    <button onClick={() => setPushAlerts(!pushAlerts)} className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${pushAlerts ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${pushAlerts ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="p-6 flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0"><Phone className="w-5 h-5" /></div>
                      <div>
                        <h3 className="font-bold">SMS Notifications</h3>
                        <p className="text-xs text-muted-foreground mt-1">Receive texts for highly critical events (e.g. overdue invoices).</p>
                      </div>
                    </div>
                    <button onClick={() => setSmsAlerts(!smsAlerts)} className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${smsAlerts ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${smsAlerts ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
               <motion.div 
                key="security"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/20">
                  <h2 className="text-xl font-bold">Change Password</h2>
                  <p className="text-sm text-muted-foreground">Ensure your account is using a strong password.</p>
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
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2"><Key className="w-4 h-4"/> Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all max-w-md" />
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
