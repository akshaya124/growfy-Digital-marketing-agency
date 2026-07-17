"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, FileText, Image as ImageIcon, Video, 
  FileEdit, UploadCloud, Search, Filter, MoreVertical,
  X, Download, Share2, Trash2, HardDrive
} from "lucide-react";
import { Button } from "@/components/ui/button";

type FileItem = {
  id: string;
  name: string;
  type: "folder" | "pdf" | "image" | "video" | "figma";
  size: string;
  date: string;
  uploader: string;
  items?: number; // for folders
};

const mockFiles: FileItem[] = [
  { id: "f1", name: "Brand Guidelines", type: "folder", size: "--", date: "Sep 01, 2026", uploader: "Admin", items: 12 },
  { id: "f2", name: "Invoices (Q3)", type: "folder", size: "--", date: "Oct 01, 2026", uploader: "System", items: 3 },
  { id: "1", name: "Homepage_Mockups_v3.fig", type: "figma", size: "45.2 MB", date: "Oct 12, 2026", uploader: "Sarah J." },
  { id: "2", name: "Q3_Marketing_Strategy.pdf", type: "pdf", size: "2.4 MB", date: "Oct 15, 2026", uploader: "Emily R." },
  { id: "3", name: "Hero_Background_Final.jpg", type: "image", size: "8.1 MB", date: "Oct 16, 2026", uploader: "Sarah J." },
  { id: "4", name: "Campaign_Teaser.mp4", type: "video", size: "124 MB", date: "Oct 18, 2026", uploader: "Admin" },
  { id: "5", name: "Client_Contract_Signed.pdf", type: "pdf", size: "1.1 MB", date: "Sep 05, 2026", uploader: "John Doe" },
];

export default function ClientFilesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const filteredFiles = mockFiles.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder": return <Folder className="w-8 h-8 text-blue-500 fill-blue-500/20" />;
      case "pdf": return <FileText className="w-8 h-8 text-rose-500" />;
      case "image": return <ImageIcon className="w-8 h-8 text-emerald-500" />;
      case "video": return <Video className="w-8 h-8 text-purple-500" />;
      case "figma": return <FileEdit className="w-8 h-8 text-orange-500" />;
      default: return <FileText className="w-8 h-8 text-muted-foreground" />;
    }
  };

  const getFileColorBg = (type: string) => {
    switch (type) {
      case "folder": return "bg-blue-500/10";
      case "pdf": return "bg-rose-500/10";
      case "image": return "bg-emerald-500/10";
      case "video": return "bg-purple-500/10";
      case "figma": return "bg-orange-500/10";
      default: return "bg-muted";
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-black mb-2 text-foreground">My Files</h1>
          <p className="text-muted-foreground">Access your deliverables, invoices, and brand assets.</p>
        </div>
        
        <div className="flex items-center gap-6 w-full md:w-auto">
          {/* Storage Indicator */}
          <div className="hidden sm:block text-right">
            <div className="text-sm font-bold flex items-center justify-end gap-2 mb-1"><HardDrive className="w-4 h-4 text-primary"/> 2.4 GB used</div>
            <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[24%]"></div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">10 GB total storage</p>
          </div>
          
          <Button variant="premium" className="rounded-xl h-11 w-full md:w-auto font-bold shadow-lg shadow-primary/20">
            <UploadCloud className="w-5 h-5 mr-2" /> Upload File
          </Button>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-background/50 backdrop-blur-md p-2 rounded-xl border border-border shrink-0">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search files..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" 
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="bg-background rounded-lg flex-1 sm:flex-none"><Filter className="w-4 h-4 mr-2"/> Type Filter</Button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex gap-6 min-h-0 relative">
        
        {/* FILES GRID */}
        <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar pr-2 pb-8 ${selectedFile ? 'mr-[400px] hidden xl:block' : ''}`}>
          
          {/* FOLDERS SECTION */}
          {filteredFiles.some(f => f.type === 'folder') && (
            <>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Folders</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                {filteredFiles.filter(f => f.type === 'folder').map((folder) => (
                  <div 
                    key={folder.id} 
                    onClick={() => setSelectedFile(folder)}
                    className={`glass-card p-4 rounded-2xl border transition-all duration-300 cursor-pointer group hover:bg-background/80 flex flex-col items-center text-center
                      ${selectedFile?.id === folder.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-border bg-background/50 hover:border-primary/30'}`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-3">
                      <Folder className="w-8 h-8 text-blue-500 fill-blue-500/20" />
                    </div>
                    <h3 className="font-bold text-sm truncate w-full group-hover:text-primary transition-colors">{folder.name}</h3>
                    <p className="text-[10px] text-muted-foreground mt-1">{folder.items} items</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* RECENT FILES SECTION */}
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Recent Files</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.filter(f => f.type !== 'folder').map((file) => (
              <div 
                key={file.id} 
                onClick={() => setSelectedFile(file)}
                className={`glass-card p-4 rounded-2xl border transition-all duration-300 cursor-pointer group hover:bg-background/80 flex items-center gap-4
                  ${selectedFile?.id === file.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-border bg-background/50 hover:border-primary/30'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getFileColorBg(file.type)}`}>
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{file.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md uppercase font-bold">{file.type}</span>
                    <span className="text-[10px] text-muted-foreground">{file.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* SLIDE-OUT SIDE PANEL (Master-Detail) */}
        <AnimatePresence>
          {selectedFile && (
            <>
              {/* Mobile Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedFile(null)}
                className="fixed inset-0 bg-black/40 z-40 xl:hidden backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="fixed xl:absolute inset-y-0 right-0 w-full md:w-[400px] z-50 bg-background/95 backdrop-blur-2xl border-l border-border shadow-2xl flex flex-col"
              >
                {/* Panel Header */}
                <div className="p-6 border-b border-border/50 flex justify-between items-start">
                  <h2 className="text-lg font-bold">File Details</h2>
                  <button onClick={() => setSelectedFile(null)} className="p-2 bg-muted/50 rounded-full hover:bg-muted text-muted-foreground transition-colors shadow-sm">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Panel Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col items-center">
                  
                  {/* Large Icon Preview */}
                  <div className={`w-32 h-32 rounded-3xl flex items-center justify-center mb-6 shadow-inner ${getFileColorBg(selectedFile.type)}`}>
                     {getFileIcon(selectedFile.type)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-center break-all mb-2">{selectedFile.name}</h3>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider bg-muted px-3 py-1 rounded-lg mb-8">
                    {selectedFile.type === 'folder' ? 'Directory' : selectedFile.type}
                  </p>

                  {/* Metadata List */}
                  <div className="w-full space-y-4 bg-muted/30 p-4 rounded-2xl border border-border/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Size</span>
                      <span className="font-bold">{selectedFile.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Uploaded</span>
                      <span className="font-bold">{selectedFile.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Modified By</span>
                      <span className="font-bold">{selectedFile.uploader}</span>
                    </div>
                    {selectedFile.type === 'folder' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contents</span>
                        <span className="font-bold">{selectedFile.items} items</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Panel Footer Actions */}
                <div className="p-6 border-t border-border/50 bg-background/80 space-y-3">
                  {selectedFile.type !== 'folder' && (
                    <Button variant="premium" className="w-full rounded-xl h-12 font-bold shadow-lg shadow-primary/20">
                      <Download className="w-5 h-5 mr-2"/> Download File
                    </Button>
                  )}
                  {selectedFile.type === 'folder' && (
                    <Button variant="premium" className="w-full rounded-xl h-12 font-bold shadow-lg shadow-primary/20">
                      <Folder className="w-5 h-5 mr-2"/> Open Folder
                    </Button>
                  )}
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-xl h-11"><Share2 className="w-4 h-4 mr-2"/> Share</Button>
                    <Button variant="outline" className="flex-1 rounded-xl h-11 text-red-500 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30"><Trash2 className="w-4 h-4 mr-2"/> Delete</Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
