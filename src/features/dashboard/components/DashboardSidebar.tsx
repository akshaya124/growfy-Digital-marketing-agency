import React from 'react';
import Link from 'next/link';

export function DashboardSidebar() {
  return (
    <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-md hidden md:flex flex-col h-screen fixed top-0 left-0">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Growfy OS
        </h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Basic links for Phase 1 simulation */}
        <Link href="/dashboard" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">Dashboard</Link>
        <Link href="/dashboard/crm" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">CRM</Link>
        <Link href="/dashboard/projects" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">Projects</Link>
        <Link href="/dashboard/tasks" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">Tasks</Link>
        <Link href="/dashboard/files" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">File Manager</Link>
        <Link href="/dashboard/team" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">Team</Link>
        <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">Settings</Link>
      </nav>
      <div className="p-4 border-t border-white/10 text-xs text-white/40">
        &copy; 2026 Growfy Production
      </div>
    </aside>
  );
}
