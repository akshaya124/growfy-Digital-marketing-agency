"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Plus, Mail, Phone, MapPin, Calendar, 
  Briefcase, Activity, CheckCircle2, MessageSquare, 
  Edit, Trash2, Loader2, Save, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { db, storage } from "@/lib/firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "On Leave" | "Remote";
  avatarColor: string;
  initials: string;
  avatarUrl?: string;
  storagePath?: string;
  performance: number;
  recentActivity: any[];
};

export default function TeamManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Add State
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", role: "", department: "", email: "", location: "" });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const q = query(collection(db, "team"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedTeam: TeamMember[] = [];
      querySnapshot.forEach((doc) => {
        fetchedTeam.push({ id: doc.id, ...doc.data() } as TeamMember);
      });
      setTeam(fetchedTeam);
    } catch (error) {
      console.error("Error fetching team:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (member: TeamMember) => {
    if (!confirm(`Are you sure you want to delete ${member.name}?`)) return;
    try {
      if (member.storagePath) {
        const fileRef = ref(storage, member.storagePath);
        await deleteObject(fileRef).catch(console.error);
      }
      await deleteDoc(doc(db, "team", member.id));
      setTeam(team.filter(m => m.id !== member.id));
      if (selectedMember?.id === member.id) setSelectedMember(null);
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member");
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role || !file) {
      alert("Please provide at least a name, role, and a photo.");
      return;
    }

    setUploading(true);
    setProgress(0);

    const storageRef = ref(storage, `team/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      (error) => {
        console.error("Upload error:", error);
        alert("Error uploading image");
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const initials = formData.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
          const colors = ["from-purple-500 to-indigo-500", "from-blue-500 to-cyan-500", "from-emerald-500 to-teal-500", "from-orange-500 to-red-500", "from-pink-500 to-rose-500"];
          const randColor = colors[Math.floor(Math.random() * colors.length)];

          await addDoc(collection(db, "team"), {
            ...formData,
            avatarUrl: downloadURL,
            storagePath: uploadTask.snapshot.ref.fullPath,
            createdAt: serverTimestamp(),
            status: "Active",
            avatarColor: randColor,
            initials,
            performance: 100,
            recentActivity: []
          });
          setUploading(false);
          setIsAdding(false);
          setFormData({ name: "", role: "", department: "", email: "", location: "" });
          setFile(null);
          fetchTeam(); 
        } catch (err) {
          console.error("Error adding doc:", err);
          setUploading(false);
        }
      }
    );
  };

  const filteredTeam = team.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col xl:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* LEFT PANEL */}
      <div className="w-full xl:w-1/3 flex flex-col bg-background border border-border rounded-3xl overflow-hidden glass-card shadow-sm h-full">
        <div className="p-6 border-b border-border/50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-black">Team Directory</h1>
            <Button variant="premium" size="sm" className="rounded-xl h-9 px-3" onClick={() => { setIsAdding(true); setSelectedMember(null); }}>
              <Plus className="w-4 h-4 mr-1"/> Add
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search members..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
          {loading ? (
            <div className="flex justify-center p-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : filteredTeam.map((member) => (
            <div 
              key={member.id}
              onClick={() => { setSelectedMember(member); setIsAdding(false); }}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 border border-transparent
                ${selectedMember?.id === member.id 
                  ? 'bg-primary/5 border-primary/20 shadow-sm' 
                  : 'hover:bg-muted/50 hover:border-border/50'}`}
            >
              {member.avatarUrl ? (
                 <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full object-cover shadow-md shrink-0" />
              ) : (
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${member.avatarColor} flex items-center justify-center text-white font-bold shadow-md shrink-0`}>
                  {member.initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">{member.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{member.role}</p>
              </div>
            </div>
          ))}
          {!loading && filteredTeam.length === 0 && (
            <div className="text-center py-10 text-muted-foreground text-sm">No team members found.</div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full xl:w-2/3 bg-background border border-border rounded-3xl overflow-hidden glass-card shadow-sm h-full flex flex-col relative">
        <AnimatePresence mode="wait">
          
          {isAdding ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-y-auto p-8">
                <div className="flex justify-between items-center border-b border-border/50 pb-6 mb-6">
                  <h2 className="text-2xl font-black">Add New Member</h2>
                  <Button variant="ghost" onClick={() => setIsAdding(false)}><X className="w-5 h-5"/></Button>
                </div>
                
                <div className="space-y-6 max-w-xl">
                  <div>
                    <label className="text-sm font-bold text-muted-foreground block mb-2">Profile Photo *</label>
                    <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Full Name *</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" placeholder="e.g. John Doe"/>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Role/Designation *</label>
                      <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" placeholder="e.g. Senior Dev"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Department</label>
                      <input type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Location</label>
                      <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-muted-foreground block mb-2">Email Address</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" />
                  </div>
                  
                  <Button variant="premium" className="w-full mt-4 h-12" onClick={handleSave} disabled={uploading}>
                    {uploading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Uploading {Math.round(progress)}%</> : <><Save className="w-4 h-4 mr-2"/> Save Member</>}
                  </Button>
                </div>
             </motion.div>
          ) : selectedMember ? (
            <motion.div key={selectedMember.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-8 border-b border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl h-9 w-9 p-0 hover:text-red-500 hover:border-red-500/50" onClick={() => handleDelete(selectedMember)}><Trash2 className="w-4 h-4"/></Button>
                </div>
                
                <div className="flex items-start gap-6">
                  {selectedMember.avatarUrl ? (
                     <img src={selectedMember.avatarUrl} alt={selectedMember.name} className="w-24 h-24 rounded-full object-cover shadow-xl ring-4 ring-background shrink-0" />
                  ) : (
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${selectedMember.avatarColor} flex items-center justify-center text-white text-3xl font-black shadow-xl ring-4 ring-background shrink-0`}>
                      {selectedMember.initials}
                    </div>
                  )}
                  <div className="mt-2">
                    <h2 className="text-3xl font-black">{selectedMember.name}</h2>
                    <p className="text-lg text-primary font-medium">{selectedMember.role}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4"/> {selectedMember.department || "N/A"}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {selectedMember.location || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
              <h2 className="text-xl font-bold mb-2 text-foreground">No Member Selected</h2>
              <p className="text-sm text-center">Select a team member to view or add a new one.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
