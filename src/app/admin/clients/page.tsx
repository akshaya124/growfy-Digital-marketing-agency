"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Plus, MapPin, Briefcase, 
  Trash2, Loader2, Save, X, UserCheck, CheckCircle2, Factory, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { db, storage } from "@/lib/firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useAuth } from "@/context/AuthContext";

type ClientProfile = {
  id: string;
  name: string;
  companyName: string;
  industry: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "Inactive";
  avatarColor: string;
  initials: string;
  avatarUrl?: string;
  storagePath?: string;
  hasLoginAccess?: boolean;
  uid?: string;
};

export default function ClientManagement() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Add State
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Access State
  const [grantingAccess, setGrantingAccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: "", companyName: "", industry: "", email: "", location: "", phone: "", avatarUrl: "" });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const q = query(collection(db, "clients"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedClients: ClientProfile[] = [];
      querySnapshot.forEach((doc) => {
        fetchedClients.push({ id: doc.id, ...doc.data() } as ClientProfile);
      });
      setClients(fetchedClients);
      
      // Update selected client if it was already selected
      if (selectedClient) {
        const updated = fetchedClients.find(c => c.id === selectedClient.id);
        if (updated) setSelectedClient(updated);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (client: ClientProfile) => {
    if (!confirm(`Are you sure you want to delete ${client.name}?`)) return;
    try {
      if (client.storagePath) {
        const fileRef = ref(storage, client.storagePath);
        await deleteObject(fileRef).catch(console.error);
      }
      await deleteDoc(doc(db, "clients", client.id));
      setClients(clients.filter(m => m.id !== client.id));
      if (selectedClient?.id === client.id) setSelectedClient(null);
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client");
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.companyName) {
      alert("Please provide at least a name and company name.");
      return;
    }

    setUploading(true);
    let finalAvatarUrl = formData.avatarUrl;

    if (file) {
      try {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "xgrbbkob";
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "cmo55jxq";

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: data
        });
        
        const fileData = await res.json();
        if (fileData.secure_url) {
          finalAvatarUrl = fileData.secure_url;
        } else {
          console.error("Cloudinary error response:", fileData);
          throw new Error(fileData.error?.message || "Upload failed");
        }
      } catch (err: any) {
        console.error("Error uploading to Cloudinary:", err);
        alert(`Failed to upload image: ${err.message || err}. Saving client without image.`);
        setUploading(false);
        return;
      }
    }

    try {
      const initials = formData.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
      const colors = ["from-purple-500 to-indigo-500", "from-blue-500 to-cyan-500", "from-emerald-500 to-teal-500", "from-orange-500 to-red-500", "from-pink-500 to-rose-500"];
      const randColor = colors[Math.floor(Math.random() * colors.length)];

      await addDoc(collection(db, "clients"), {
        name: formData.name,
        companyName: formData.companyName,
        industry: formData.industry,
        email: formData.email,
        location: formData.location,
        phone: formData.phone,
        avatarUrl: finalAvatarUrl,
        createdAt: serverTimestamp(),
        status: "Active",
        avatarColor: randColor,
        initials,
        hasLoginAccess: false
      });
      
      setUploading(false);
      setIsAdding(false);
      setFormData({ name: "", companyName: "", industry: "", email: "", location: "", phone: "", avatarUrl: "" });
      setFile(null);
      fetchClients(); 
    } catch (err) {
      console.error("Error adding doc:", err);
      alert("Failed to add client");
      setUploading(false);
    }
  };

  const handleGrantAccess = async () => {
    if (!selectedClient?.email) {
      alert("This client needs an email address to grant access.");
      return;
    }

    const password = prompt(`Enter a login password for ${selectedClient.name} (minimum 6 characters):`);
    if (password === null) return; // Admin cancelled
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    
    setGrantingAccess(true);
    try {
      const response = await fetch('/api/admin/grant-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedClient.email,
          role: 'CLIENT',
          adminEmail: user?.email,
          collectionName: 'clients',
          docId: selectedClient.id,
          password: password
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to grant access');
      }
      
      alert(`Access granted successfully to ${selectedClient.name} with your specified password!`);
      fetchClients(); // Refresh to update the UI
    } catch (error: any) {
      console.error("Error granting access:", error);
      alert(error.message);
    } finally {
      setGrantingAccess(false);
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col xl:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* LEFT PANEL */}
      <div className="w-full xl:w-1/3 flex flex-col bg-background border border-border rounded-3xl overflow-hidden glass-card shadow-sm h-full">
        <div className="p-6 border-b border-border/50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-black">Client Directory</h1>
            <Button variant="premium" size="sm" className="rounded-xl h-9 px-3" onClick={() => { setIsAdding(true); setSelectedClient(null); }}>
              <Plus className="w-4 h-4 mr-1"/> Add
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
          {loading ? (
            <div className="flex justify-center p-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : filteredClients.map((client) => (
            <div 
              key={client.id}
              onClick={() => { setSelectedClient(client); setIsAdding(false); }}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 border border-transparent
                ${selectedClient?.id === client.id 
                  ? 'bg-primary/5 border-primary/20 shadow-sm' 
                  : 'hover:bg-muted/50 hover:border-border/50'}`}
            >
              {client.avatarUrl ? (
                 <img src={client.avatarUrl} alt={client.name} className="w-12 h-12 rounded-full object-cover shadow-md shrink-0" />
              ) : (
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${client.avatarColor} flex items-center justify-center text-white font-bold shadow-md shrink-0`}>
                  {client.initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">{client.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{client.companyName}</p>
              </div>
            </div>
          ))}
          {!loading && filteredClients.length === 0 && (
            <div className="text-center py-10 text-muted-foreground text-sm">No clients found.</div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full xl:w-2/3 bg-background border border-border rounded-3xl overflow-hidden glass-card shadow-sm h-full flex flex-col relative">
        <AnimatePresence mode="wait">
          
          {isAdding ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex justify-between items-center border-b border-border/50 pb-6 mb-6">
                  <h2 className="text-2xl font-black">Add New Client</h2>
                  <Button variant="ghost" onClick={() => setIsAdding(false)}><X className="w-5 h-5"/></Button>
                </div>
                
                <div className="space-y-6 max-w-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Upload Logo/Photo</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setFile(e.target.files?.[0] || null)} 
                        className="w-full text-sm bg-muted/50 border border-border rounded-lg px-4 py-2" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Or Paste Logo URL</label>
                      <input 
                        type="text" 
                        value={formData.avatarUrl} 
                        onChange={e => setFormData({...formData, avatarUrl: e.target.value})} 
                        className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" 
                        placeholder="e.g. https://images.unsplash.com/..."
                        disabled={!!file}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Contact Name *</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" placeholder="e.g. John Doe"/>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Company Name *</label>
                      <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" placeholder="e.g. Acme Corp"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Industry</label>
                      <input type="text" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" placeholder="e.g. Tech, Retail" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Location</label>
                      <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Email Address</label>
                      <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-muted-foreground block mb-2">Phone</label>
                      <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2" />
                    </div>
                  </div>
                  
                  <Button variant="premium" className="w-full mt-4 h-12" onClick={handleSave} disabled={uploading}>
                    {uploading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Saving Client...</> : <><Save className="w-4 h-4 mr-2"/> Save Client</>}
                  </Button>
                </div>
             </motion.div>
          ) : selectedClient ? (
            <motion.div key={selectedClient.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-8 border-b border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl h-9 w-9 p-0 hover:text-red-500 hover:border-red-500/50" onClick={() => handleDelete(selectedClient)}><Trash2 className="w-4 h-4"/></Button>
                </div>
                
                <div className="flex items-start gap-6">
                  {selectedClient.avatarUrl ? (
                     <img src={selectedClient.avatarUrl} alt={selectedClient.name} className="w-24 h-24 rounded-full object-cover shadow-xl ring-4 ring-background shrink-0" />
                  ) : (
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${selectedClient.avatarColor} flex items-center justify-center text-white text-3xl font-black shadow-xl ring-4 ring-background shrink-0`}>
                      {selectedClient.initials}
                    </div>
                  )}
                  <div className="mt-2">
                    <h2 className="text-3xl font-black">{selectedClient.name}</h2>
                    <p className="text-lg text-primary font-medium">{selectedClient.companyName}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Factory className="w-4 h-4"/> {selectedClient.industry || "N/A"}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {selectedClient.location || "N/A"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-muted-foreground mb-1">System Access</h4>
                    <p className="text-xs text-muted-foreground">Give this client access to log into the client portal.</p>
                  </div>
                  {selectedClient.hasLoginAccess ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Login Access Granted
                    </div>
                  ) : (
                    <Button onClick={handleGrantAccess} disabled={grantingAccess || !selectedClient.email} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all">
                      {grantingAccess ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Granting Access...</> : <><UserCheck className="w-4 h-4 mr-2"/> Grant Login Access</>}
                    </Button>
                  )}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-6 bg-muted/20 p-6 rounded-2xl border border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground font-bold mb-1">Email</p>
                    <p className="font-medium">{selectedClient.email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold mb-1">Phone</p>
                    <p className="font-medium">{selectedClient.phone || "N/A"}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
              <h2 className="text-xl font-bold mb-2 text-foreground">No Client Selected</h2>
              <p className="text-sm text-center">Select a client to view or add a new one.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
