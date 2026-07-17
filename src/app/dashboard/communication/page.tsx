"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, Hash, MessageCircle, Phone, Video, 
  MoreVertical, Smile, Paperclip, Send,
  Users, Image as ImageIcon, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Channel = {
  id: string;
  name: string;
  type: "channel" | "dm";
  unread?: number;
  active?: boolean;
};

const mockChannels: Channel[] = [
  { id: "c1", name: "general", type: "channel" },
  { id: "c2", name: "design-updates", type: "channel", unread: 3, active: true },
  { id: "c3", name: "development", type: "channel" },
  { id: "c4", name: "billing", type: "channel" },
];

const mockDMs: Channel[] = [
  { id: "d1", name: "Admin (PM)", type: "dm", unread: 1 },
  { id: "d2", name: "Sarah J. (Designer)", type: "dm" },
];

const mockMessages = [
  {
    id: "m1",
    sender: "Admin",
    avatar: "AD",
    color: "from-primary to-purple-500",
    time: "10:24 AM",
    isClient: false,
    text: "Hey John! We just uploaded the newest batch of wireframes to the Files section. Let me know what you think of the new hero section layout.",
  },
  {
    id: "m2",
    sender: "John Doe",
    avatar: "JD",
    color: "from-blue-500 to-cyan-500",
    time: "10:30 AM",
    isClient: true,
    text: "Looking at them now. The hero section is great, but could we try a darker background for the pricing table?",
  },
  {
    id: "m3",
    sender: "Sarah J.",
    avatar: "SJ",
    color: "from-emerald-500 to-teal-500",
    time: "10:35 AM",
    isClient: false,
    text: "Absolutely! I can whip up a quick dark mode variant for that section.",
  },
  {
    id: "m4",
    sender: "Sarah J.",
    avatar: "SJ",
    color: "from-emerald-500 to-teal-500",
    time: "11:15 AM",
    isClient: false,
    text: "Here is a quick preview of the dark pricing table.",
    attachment: {
      type: "image",
      name: "pricing_dark_variant.jpg",
      size: "1.2 MB"
    }
  },
  {
    id: "m5",
    sender: "John Doe",
    avatar: "JD",
    color: "from-blue-500 to-cyan-500",
    time: "11:20 AM",
    isClient: true,
    text: "Perfect! That's exactly what I had in mind. Approved! 🚀",
  }
];

export default function ClientCommunicationPage() {
  const [activeChannel, setActiveChannel] = useState("c2");

  return (
    <div className="h-[calc(100vh-100px)] lg:h-[calc(100vh-120px)] flex bg-background/50 backdrop-blur-md rounded-3xl border border-border overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* LEFT SIDEBAR (CHANNELS) */}
      <div className="w-20 md:w-72 border-r border-border/50 flex flex-col bg-muted/10 shrink-0">
        
        {/* Sidebar Header */}
        <div className="h-16 border-b border-border/50 flex items-center justify-between px-4 md:px-6 shrink-0">
          <h2 className="hidden md:block font-black text-lg">Messages</h2>
          <Button variant="ghost" size="icon" className="md:hidden mx-auto"><MessageCircle className="w-5 h-5"/></Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-4 px-2 md:px-4 space-y-6">
          
          {/* Channels Section */}
          <div>
            <h3 className="hidden md:block text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-3">Channels</h3>
            <div className="space-y-1">
              {mockChannels.map(channel => (
                <button 
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full flex items-center justify-center md:justify-start gap-3 p-3 md:py-2 md:px-3 rounded-xl transition-all
                    ${activeChannel === channel.id ? 'bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground font-medium'}`}
                >
                  <Hash className="w-5 h-5 md:w-4 md:h-4 shrink-0" />
                  <span className="hidden md:block truncate flex-1 text-left">{channel.name}</span>
                  {channel.unread && (
                    <span className={`hidden md:flex w-5 h-5 text-[10px] items-center justify-center rounded-full font-bold
                      ${activeChannel === channel.id ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                      {channel.unread}
                    </span>
                  )}
                  {/* Mobile Unread Dot */}
                  {channel.unread && <span className="md:hidden absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-background"></span>}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Messages Section */}
          <div>
            <h3 className="hidden md:block text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-3">Direct Messages</h3>
            <div className="space-y-1">
              {mockDMs.map(dm => (
                <button 
                  key={dm.id}
                  onClick={() => setActiveChannel(dm.id)}
                  className={`w-full flex items-center justify-center md:justify-start gap-3 p-3 md:py-2 md:px-3 rounded-xl transition-all relative
                    ${activeChannel === dm.id ? 'bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground font-medium'}`}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-muted-foreground to-muted flex items-center justify-center text-[8px] text-white font-bold shrink-0">
                    {dm.name.substring(0,2).toUpperCase()}
                  </div>
                  <span className="hidden md:block truncate flex-1 text-left">{dm.name}</span>
                  {dm.unread && (
                    <span className={`hidden md:flex w-5 h-5 text-[10px] items-center justify-center rounded-full font-bold
                      ${activeChannel === dm.id ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                      {dm.unread}
                    </span>
                  )}
                  {/* Mobile Unread Dot */}
                  {dm.unread && <span className="md:hidden absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-background"></span>}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT MAIN WINDOW (CHAT) */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-border/50 flex items-center justify-between px-6 shrink-0 bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <Hash className="w-6 h-6 text-muted-foreground" />
            <div>
              <h2 className="font-bold text-lg leading-tight">design-updates</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="w-3 h-3"/> 4 members
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><Phone className="w-5 h-5"/></Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><Video className="w-5 h-5"/></Button>
            <div className="w-px h-6 bg-border mx-2 self-center"></div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><MoreVertical className="w-5 h-5"/></Button>
          </div>
        </div>

        {/* Messages History */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          
          <div className="text-center my-6">
            <span className="text-xs font-bold text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">Today</span>
          </div>

          {mockMessages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 max-w-[85%] ${msg.isClient ? 'ml-auto flex-row-reverse' : ''}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${msg.color} flex items-center justify-center text-[10px] text-white font-bold shrink-0 shadow-sm mb-1`}>
                {msg.avatar}
              </div>

              {/* Message Content */}
              <div className={`flex flex-col ${msg.isClient ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-baseline gap-2 mb-1 px-1 ${msg.isClient ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs font-bold text-muted-foreground">{msg.sender}</span>
                  <span className="text-[10px] text-muted-foreground/60">{msg.time}</span>
                </div>
                
                <div className={`p-4 rounded-2xl ${
                  msg.isClient 
                    ? 'bg-primary text-primary-foreground rounded-br-sm shadow-md shadow-primary/20' 
                    : 'bg-muted/50 border border-border/50 text-foreground rounded-bl-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  
                  {/* Rich Attachment Mockup */}
                  {msg.attachment && (
                    <div className="mt-3 bg-background border border-border rounded-xl p-3 flex gap-4 max-w-sm">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="font-bold text-sm text-foreground truncate">{msg.attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{msg.attachment.size}</p>
                        <button className="text-xs font-bold text-primary text-left mt-1 hover:underline">Download</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Message Input Area */}
        <div className="p-4 md:p-6 border-t border-border/50 bg-background/80 backdrop-blur-sm shrink-0">
          <div className="relative flex items-end gap-2 bg-muted/30 border border-border rounded-2xl p-2 focus-within:border-primary focus-within:bg-background transition-colors">
            <div className="flex gap-1 pb-1 px-1 shrink-0">
              <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground"><Paperclip className="w-4 h-4"/></Button>
            </div>
            
            <textarea 
              placeholder="Message #design-updates..." 
              className="flex-1 bg-transparent border-none focus:outline-none resize-none text-sm py-2 max-h-32 custom-scrollbar min-h-[40px]"
              rows={1}
            />
            
            <div className="flex gap-1 pb-1 pr-1 shrink-0">
              <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground hidden sm:flex"><Smile className="w-4 h-4"/></Button>
              <Button variant="premium" size="icon" className="w-8 h-8 rounded-xl shadow-md"><Send className="w-4 h-4"/></Button>
            </div>
          </div>
          <div className="flex justify-between px-2 mt-2">
            <p className="text-[10px] text-muted-foreground hidden sm:block"><strong>Return</strong> to send, <strong>Shift + Return</strong> to add a new line</p>
          </div>
        </div>

      </div>

    </div>
  );
}
