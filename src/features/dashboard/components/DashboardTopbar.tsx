import React from 'react';
import { Button } from '@/components/ui/button';

export function DashboardTopbar() {
  return (
    <header className="h-16 border-b border-white/10 bg-black/30 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        {/* Global Search / Command Palette trigger */}
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-sm text-white/50 transition-colors w-64 text-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span>Search...</span>
          <kbd className="ml-auto text-xs bg-white/10 px-1.5 py-0.5 rounded text-white/60">Ctrl+K</kbd>
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Actions */}
        <Button variant="premium" size="sm">
          + New Project
        </Button>

        {/* Notification Center Trigger */}
        <button className="relative p-2 text-white/70 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(124,58,237,0.8)]"></span>
        </button>

        {/* Profile Menu */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border border-white/20 cursor-pointer"></div>
      </div>
    </header>
  );
}
