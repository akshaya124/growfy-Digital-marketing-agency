"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Users, FolderKanban, Users2, CreditCard, 
  FileEdit, Megaphone, Zap, BarChart2, Link as LinkIcon, 
  Settings, Menu, X, LogOut, Bell, Search, Film, Image as ImageIcon
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "CRM", href: "/admin/crm", icon: Users },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Team", href: "/admin/team", icon: Users2 },
  { name: "Finance", href: "/admin/finance", icon: CreditCard },
  { name: "CMS", href: "/admin/cms", icon: FileEdit },
  { name: "Media Center", href: "/admin/media-center", icon: ImageIcon },
  { name: "Marketing", href: "/admin/marketing", icon: Megaphone },
  { name: "Reports", href: "/admin/reports", icon: BarChart2 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex -mt-20">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden xl:flex w-72 flex-col fixed inset-y-0 left-0 bg-background border-r border-border z-40 shadow-2xl">
        <div className="h-20 flex items-center px-8 border-b border-border/50 bg-primary/5">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Growfy Admin</Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          <div className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Superadmin Panel</div>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-border/50 bg-muted/20">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            Logout System
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="xl:hidden fixed top-0 inset-x-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-40 flex items-center justify-between px-4">
        <Link href="/" className="text-xl font-black bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Admin Panel</Link>
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
              className="fixed inset-0 bg-black/60 z-50 xl:hidden backdrop-blur-sm"
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-background border-r border-border z-50 flex flex-col shadow-2xl"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-border/50 bg-primary/5">
                <Link href="/" className="text-xl font-black text-primary">Growfy Admin</Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-muted-foreground"><X className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
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
      <main className="flex-1 xl:ml-72 pt-16 xl:pt-0 w-full min-h-screen relative z-10 flex flex-col bg-muted/10">
        
        {/* Admin Topbar */}
        <header className="h-20 border-b border-border/50 flex items-center justify-between px-8 bg-background sticky top-0 z-30 hidden xl:flex">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Global search (Ctrl+K)..." className="w-full bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors" />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-border cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-right">
                <p className="text-sm font-bold">Admin Root</p>
                <p className="text-xs text-primary font-bold">Superadmin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold border-2 border-background shadow-md">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Page Content */}
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}
