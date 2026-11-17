"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, FolderKanban, CheckSquare, Calendar, 
  Video, MessageSquare, UploadCloud, TrendingUp, Clock, 
  User, Menu, X, LogOut, Bell
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const sidebarLinks = [
  { name: "Dashboard", href: "/team", icon: LayoutDashboard },
  { name: "Assigned Projects", href: "/team/projects", icon: FolderKanban },
  { name: "Assigned Tasks", href: "/team/tasks", icon: CheckSquare },
  { name: "Calendar", href: "/team/calendar", icon: Calendar },
  { name: "Meetings", href: "/team/meetings", icon: Video },
  { name: "Chat", href: "/team/chat", icon: MessageSquare },
  { name: "File Upload", href: "/team/files", icon: UploadCloud },
  { name: "Performance", href: "/team/performance", icon: TrendingUp },
  { name: "Attendance", href: "/team/attendance", icon: Clock },
  { name: "Profile", href: "/team/profile", icon: User },
];

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <ProtectedRoute allowedRoles={["TEAM_MEMBER", "ADMIN"]}>
      <div className="min-h-screen bg-background flex -mt-20">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 bg-background/50 backdrop-blur-xl border-r border-border z-40">
        <div className="h-20 flex items-center px-8 border-b border-border/50">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Growfy Workspace</Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">My Workspace</div>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-border/50">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-40 flex items-center justify-between px-4">
        <Link href="/" className="text-xl font-black bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Workspace</Link>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-foreground">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* MOBILE SIDEBAR MODAL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-background border-r border-border z-50 flex flex-col shadow-2xl"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-border/50">
                <Link href="/" className="text-xl font-black text-primary">Growfy Workspace</Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-muted-foreground"><X className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                      <link.icon className="w-5 h-5" />
                      {link.name}
                    </Link>
                  )
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 lg:ml-72 pt-16 lg:pt-0 w-full min-h-screen relative z-10 flex flex-col">
        {/* Topbar */}
        <header className="h-20 border-b border-border/50 flex items-center justify-between px-8 bg-background/50 backdrop-blur-md sticky top-0 z-30 hidden lg:flex">
          <div className="flex items-center gap-4">
             {/* Clock in/out widget */}
             <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg flex items-center gap-3">
               <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
               </span>
               <span className="text-emerald-500 font-bold text-sm">Clocked In (09:12 AM)</span>
             </div>
             <button className="text-xs font-bold px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors">Clock Out</button>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors relative">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right">
                <p className="text-sm font-bold">Marcus Chen</p>
                <p className="text-xs text-muted-foreground">Frontend Dev</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                MC
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Page Content */}
        <div className="flex-1 p-6 lg:p-8 bg-primary/[0.02]">
          {children}
        </div>
      </main>
 
    </div>
    </ProtectedRoute>
  );
}
