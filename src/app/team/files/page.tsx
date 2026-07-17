"use client";

import { useState } from "react";
import { 
  FileText, Image as ImageIcon, Video, File, 
  UploadCloud, Folder, Search, Filter, MoreVertical,
  Download, Trash2, Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mockFiles = [
  { id: 1, name: "Homepage_Hero_v2.psd", size: "14.2 MB", type: "image", date: "Today, 10:24 AM", project: "Nova Inc." },
  { id: 2, name: "Q4_Content_Strategy.docx", size: "2.1 MB", type: "doc", date: "Yesterday, 04:30 PM", project: "Internal" },
  { id: 3, name: "Promo_Video_RoughCut.mp4", size: "124.5 MB", type: "video", date: "Oct 12, 2026", project: "TechFlow" },
  { id: 4, name: "Brand_Guidelines_Final.pdf", size: "8.4 MB", type: "pdf", date: "Oct 10, 2026", project: "Lumina" },
];

export default function TeamFilesPage() {
  const getIcon = (type: string) => {
    switch(type) {
      case 'image': return <ImageIcon className="w-8 h-8 text-blue-500" />;
      case 'doc': return <FileText className="w-8 h-8 text-blue-500" />;
      case 'video': return <Video className="w-8 h-8 text-purple-500" />;
      case 'pdf': return <File className="w-8 h-8 text-rose-500" />;
      default: return <File className="w-8 h-8 text-muted-foreground" />;
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-black mb-2 text-foreground">File Upload</h1>
          <p className="text-muted-foreground">Manage and share your deliverables with clients and the team.</p>
        </div>
        <Button variant="premium" className="rounded-xl shadow-lg shadow-primary/20 font-bold px-6 h-11">
          <UploadCloud className="w-5 h-5 mr-2" /> Upload New File
        </Button>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-background/50 backdrop-blur-md p-2 rounded-xl border border-border shrink-0">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search files..." className="w-full bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="bg-background rounded-lg flex-1 sm:flex-none"><Filter className="w-4 h-4 mr-2"/> Filter by Project</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-8">
        
        {/* FOLDERS GRID */}
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Folders</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["Nova Inc. Assets", "TechFlow Campaigns", "Internal Docs", "Lumina Brand"].map((folder, idx) => (
            <div key={idx} className="glass-card p-4 rounded-2xl border border-border bg-background/50 hover:border-primary/50 transition-colors cursor-pointer group flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Folder className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{folder}</h3>
            </div>
          ))}
        </div>

        {/* FILES GRID */}
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Recent Uploads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockFiles.map((file) => (
            <div key={file.id} className="glass-card rounded-2xl border border-border bg-background/50 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden flex flex-col">
              
              <div className="h-32 bg-muted/30 flex items-center justify-center relative border-b border-border/50">
                {getIcon(file.type)}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                  <Button variant="premium" size="icon" className="w-8 h-8 rounded-lg shadow-lg"><Download className="w-4 h-4"/></Button>
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg bg-background hover:bg-background"><LinkIcon className="w-4 h-4"/></Button>
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg bg-background hover:bg-rose-500 hover:text-white hover:border-rose-500"><Trash2 className="w-4 h-4"/></Button>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm truncate mb-1" title={file.name}>{file.name}</h3>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                    <span>{file.size}</span>
                    <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{file.project}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-muted-foreground border-t border-border/50 pt-3">
                  <span>Uploaded {file.date}</span>
                  <Button variant="ghost" size="icon" className="w-6 h-6 h-auto"><MoreVertical className="w-4 h-4"/></Button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
