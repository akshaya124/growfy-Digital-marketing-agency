"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, FolderKanban, FileText, CheckSquare, 
  MessageSquare, CreditCard, BarChart2, LifeBuoy, User,
  Menu, X, LogOut, Bell, CalendarDays
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Files", href: "/dashboard/files", icon: FileText },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Communication", href: "/dashboard/communication", icon: MessageSquare },
  { name: "Finance", href: "/dashboard/finance", icon: CreditCard },
  { name: "Content Calendar", href: "/dashboard/content-calendar", icon: CalendarDays },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart2 },
  { name: "Support", href: "/dashboard/support", icon: LifeBuoy },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex -mt-20">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 bg-background/50 backdrop-blur-xl border-r border-border z-40">
        <div className="h-20 flex items-center px-8 border-b border-border/50">
          <Link href="/" className="text-3xl font-black bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Growfy</Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Main Menu</div>
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
        <Link href="/" className="text-xl font-black bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Growfy</Link>
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
                <Link href="/" className="text-2xl font-black bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Growfy</Link>
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
        {/* Dashboard Topbar */}
        <header className="h-20 border-b border-border/50 flex items-center justify-between px-8 bg-background/50 backdrop-blur-md sticky top-0 z-30 hidden lg:flex">
          <h2 className="text-xl font-bold">Client Dashboard</h2>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right">
                <p className="text-sm font-bold">John Doe</p>
                <p className="text-xs text-muted-foreground">Nova E-Commerce</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                JD
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
  );
}
