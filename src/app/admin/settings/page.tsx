"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Bell, Shield, Camera, Mail, Phone, 
  Key, Smartphone, CheckCircle2, AlertTriangle, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "profile", label: "General Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Access", icon: Shield },
];

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Mock Toggles State
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences, security, and notifications.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR TABS */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="glass-card p-3 rounded-3xl border border-border bg-background/50 flex flex-col gap-2">
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
            
            {/* PROFILE SETTINGS */}
            {activeTab === "profile" && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50">
                  <h2 className="text-xl font-bold">Public Profile</h2>
                  <p className="text-sm text-muted-foreground">This information will be displayed publicly.</p>
                </div>
                
                <div className="p-6 space-y-8">
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-6">
                    <div className="relative group cursor-pointer">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-3xl text-white font-black border-4 border-background shadow-xl">
                        AD
                      </div>
                      <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">Profile Picture</h3>
                      <p className="text-sm text-muted-foreground mb-3">PNG, JPG or GIF up to 2MB.</p>
                      <Button variant="outline" size="sm" className="rounded-lg font-bold">Change Avatar</Button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">First Name</label>
                      <input type="text" defaultValue="Admin" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Last Name</label>
                      <input type="text" defaultValue="User" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-foreground">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="email" defaultValue="admin@growfy.com" className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-foreground">Bio</label>
                      <textarea rows={4} defaultValue="Superadmin for the Growfy platform." className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none custom-scrollbar" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border-t border-border/50 bg-muted/20 flex justify-end">
                  <Button variant="premium" className="rounded-xl h-10 px-8 font-bold"><Save className="w-4 h-4 mr-2"/> Save Changes</Button>
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
                <div className="p-6 border-b border-border/50">
                  <h2 className="text-xl font-bold">Notification Preferences</h2>
                  <p className="text-sm text-muted-foreground">Decide how we communicate with you.</p>
                </div>
                
                <div className="divide-y divide-border/50">
                  
                  <div className="p-6 flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground mt-1">Receive daily digests, alerts, and system updates directly to your inbox.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setEmailAlerts(!emailAlerts)}
                      className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${emailAlerts ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${emailAlerts ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="p-6 flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold">Push Notifications</h3>
                        <p className="text-sm text-muted-foreground mt-1">Get desktop alerts for immediate actions, like new team members joining.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setPushAlerts(!pushAlerts)}
                      className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${pushAlerts ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${pushAlerts ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="p-6 flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold">SMS Alerts</h3>
                        <p className="text-sm text-muted-foreground mt-1">Receive text messages for critical security events or downtime alerts.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSmsAlerts(!smsAlerts)}
                      className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${smsAlerts ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${smsAlerts ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                </div>
              </motion.div>
            )}

            {/* SECURITY SETTINGS */}
            {activeTab === "security" && (
              <motion.div 
                key="security"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                
                {/* 2FA Card */}
                <div className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden">
                  <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">Two-Factor Authentication {twoFactor && <CheckCircle2 className="w-4 h-4 text-emerald-500"/>}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security to your account.</p>
                      </div>
                    </div>
                    <Button 
                      variant={twoFactor ? 'outline' : 'premium'} 
                      onClick={() => setTwoFactor(!twoFactor)}
                      className={`rounded-xl h-10 font-bold ${twoFactor ? 'text-red-500 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30' : ''}`}
                    >
                      {twoFactor ? 'Disable 2FA' : 'Enable 2FA'}
                    </Button>
                  </div>
                </div>

                {/* Password Card */}
                <div className="glass-card rounded-3xl border border-border bg-background/50 overflow-hidden">
                  <div className="p-6 border-b border-border/50">
                    <h2 className="text-xl font-bold">Change Password</h2>
                    <p className="text-sm text-muted-foreground">Ensure your account uses a long, random password.</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground flex items-center gap-2"><Key className="w-4 h-4"/> Current Password</label>
                      <input type="password" placeholder="Enter current password" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all max-w-md" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground flex items-center gap-2"><Key className="w-4 h-4"/> New Password</label>
                      <input type="password" placeholder="Enter new password" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all max-w-md" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground flex items-center gap-2"><Key className="w-4 h-4"/> Confirm New Password</label>
                      <input type="password" placeholder="Confirm new password" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all max-w-md" />
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 text-amber-500 max-w-md">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <p className="text-xs font-medium">You will be logged out of all active sessions across all devices once your password is changed.</p>
                    </div>
                  </div>
                  
                  <div className="p-6 border-t border-border/50 bg-muted/20">
                    <Button variant="premium" className="rounded-xl h-10 px-8 font-bold">Update Password</Button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
