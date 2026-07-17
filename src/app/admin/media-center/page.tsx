"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Image as ImageIcon, Loader2, Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db, storage } from "@/lib/firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

interface MediaItem {
  id: string;
  url: string;
  createdAt: any;
  title: string;
  category: string;
  type: string;
  storagePath?: string;
}

const CATEGORIES = [
  "Homepage Reels",
  "About Gallery",
  "Design Slider",
  "Marketing Slider",
  "Media Slider"
];

export default function MediaCenter() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedMedia: MediaItem[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMedia.push({ id: doc.id, ...doc.data() } as MediaItem);
      });
      setMedia(fetchedMedia);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isReel = activeTab === "Homepage Reels";

    if (isReel && !file.type.startsWith('video/')) {
      alert("Please upload a valid video file for Reels.");
      return;
    }

    if (!isReel && !file.type.startsWith('image/')) {
      alert("Please upload a valid image file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      alert("File is too large. Please upload a file under 20MB.");
      return;
    }

    setUploading(true);
    setProgress(0);

    const storageRef = ref(storage, `media/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (error) => {
        console.error("Upload error:", error);
        alert("Error uploading file");
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, "gallery"), {
            url: downloadURL,
            title: file.name,
            category: activeTab,
            type: isReel ? 'video' : 'image',
            storagePath: uploadTask.snapshot.ref.fullPath,
            createdAt: serverTimestamp(),
          });
          setUploading(false);
          setProgress(0);
          fetchMedia(); // Refresh list
        } catch (err) {
          console.error("Error adding doc:", err);
          setUploading(false);
        }
      }
    );
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      if (item.storagePath) {
        const fileRef = ref(storage, item.storagePath);
        await deleteObject(fileRef).catch(console.error); // Ignore error if file doesn't exist
      }
      await deleteDoc(doc(db, "gallery", item.id));
      setMedia(media.filter(m => m.id !== item.id));
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file");
    }
  };

  const filteredMedia = media.filter(m => m.category === activeTab);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Media Center</h1>
          <p className="text-muted-foreground mt-1">Manage all visual assets across your digital ecosystem.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input 
            type="file" 
            accept={activeTab === "Homepage Reels" ? "video/*" : "image/*"} 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange} 
          />
          <Button 
            variant="premium" 
            className="rounded-xl h-10 w-full md:w-auto"
            onClick={handleUploadClick}
            disabled={uploading}
          >
            {uploading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Uploading {Math.round(progress)}%</>
            ) : (
              <><Plus className="w-4 h-4 mr-2"/> Upload to {activeTab}</>
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {CATEGORIES.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all whitespace-nowrap border
              ${activeTab === tab 
                ? 'bg-primary/10 border-primary/20 text-primary shadow-sm' 
                : 'bg-background border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="col-span-full glass-card p-12 rounded-3xl border border-border bg-background/50 text-center flex flex-col items-center">
            {activeTab === "Homepage Reels" ? (
              <VideoIcon className="w-12 h-12 text-muted-foreground opacity-50 mb-4" />
            ) : (
              <ImageIcon className="w-12 h-12 text-muted-foreground opacity-50 mb-4" />
            )}
            <h3 className="text-xl font-bold">No Media Found</h3>
            <p className="text-muted-foreground mt-2">Upload your first file to {activeTab}.</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredMedia.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                key={item.id}
                className="glass-card rounded-2xl border border-border bg-background/50 overflow-hidden relative group"
              >
                <div className="aspect-[4/5] bg-black relative">
                  {item.type === 'video' ? (
                    <video 
                      src={item.url} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted loop autoPlay playsInline
                    />
                  ) : (
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="text-white font-medium text-sm truncate mb-2">{item.title}</p>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full backdrop-blur-md bg-red-500/80 hover:bg-red-500"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
