"use client";

import { useState } from "react";
import { 
  Hash, MessageCircle, Phone, Video, 
  MoreVertical, Smile, Paperclip, Send,
  Users, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeamChatPage() {
  const [activeChannel, setActiveChannel] = useState("general");

  return (
    <div className="h-[calc(100vh-80px)] flex bg-background/50 backdrop-blur-md rounded-3xl border border-border overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
      
      {/* LEFT SIDEBAR (CHANNELS) */}
      <div className="w-20 md:w-72 border-r border-border/50 flex flex-col bg-muted/10 shrink-0">
        
        <div className="h-16 border-b border-border/50 flex items-center justify-between px-4 md:px-6 shrink-0">
          <h2 className="hidden md:block font-black text-lg">Team Chat</h2>
          <Button variant="ghost" size="icon" className="md:hidden mx-auto"><MessageCircle className="w-5 h-5"/></Button>
        </div>

        <div className="p-4 border-b border-border/50 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Jump to..." className="w-full bg-background border border-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar py-4 px-2 md:px-4 space-y-6">
          
          <div>
            <h3 className="hidden md:block text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-3">Channels</h3>
            <div className="space-y-1">
              {[
                { id: "general", name: "general" },
                { id: "design", name: "design-team", unread: 5 },
                { id: "dev", name: "dev-squad" },
                { id: "announcements", name: "announcements" }
              ].map(channel => (
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
                  {channel.unread && <span className="md:hidden absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-background"></span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="hidden md:block text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-3">Direct Messages</h3>
            <div className="space-y-1">
              {[
                { id: "d1", name: "Sarah J." },
                { id: "d2", name: "Admin", unread: 1 },
                { id: "d3", name: "John D. (Client)" }
              ].map(dm => (
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
                  {dm.unread && <span className="md:hidden absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-background"></span>}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT MAIN WINDOW (CHAT) */}
      <div className="flex-1 flex flex-col min-w-0 bg-background relative">
        
        <div className="h-16 border-b border-border/50 flex items-center justify-between px-6 shrink-0 bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <Hash className="w-6 h-6 text-muted-foreground" />
            <div>
              <h2 className="font-bold text-lg leading-tight">{activeChannel === 'general' ? 'general' : 'design-team'}</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="w-3 h-3"/> 12 members
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

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          
          <div className="text-center my-6">
            <span className="text-xs font-bold text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">Today</span>
          </div>

          {[
            { id: 1, sender: "Sarah J.", text: "Hey team, just pushed the new assets to the repo.", time: "09:30 AM", isMe: false },
            { id: 2, sender: "Marcus C.", text: "Awesome, I'll start implementing them now. Did you include the dark mode variants?", time: "09:35 AM", isMe: true },
            { id: 3, sender: "Sarah J.", text: "Yes! They are in the /dark folder. Let me know if you need anything tweaked.", time: "09:38 AM", isMe: false },
          ].map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 max-w-[85%] ${msg.isMe ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${msg.isMe ? 'from-primary to-purple-500' : 'from-blue-500 to-cyan-500'} flex items-center justify-center text-[10px] text-white font-bold shrink-0 shadow-sm mb-1`}>
                {msg.sender.substring(0,2).toUpperCase()}
              </div>
              <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-baseline gap-2 mb-1 px-1 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs font-bold text-muted-foreground">{msg.sender}</span>
                  <span className="text-[10px] text-muted-foreground/60">{msg.time}</span>
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.isMe 
                    ? 'bg-primary text-primary-foreground rounded-br-sm shadow-md shadow-primary/20' 
                    : 'bg-muted/50 border border-border/50 text-foreground rounded-bl-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 md:p-6 border-t border-border/50 bg-background/80 backdrop-blur-sm shrink-0">
          <div className="relative flex items-end gap-2 bg-muted/30 border border-border rounded-2xl p-2 focus-within:border-primary focus-within:bg-background transition-colors">
            <div className="flex gap-1 pb-1 px-1 shrink-0">
              <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground"><Paperclip className="w-4 h-4"/></Button>
            </div>
            
            <textarea 
              placeholder={`Message #${activeChannel === 'general' ? 'general' : 'design-team'}...`}
              className="flex-1 bg-transparent border-none focus:outline-none resize-none text-sm py-2 max-h-32 custom-scrollbar min-h-[40px]"
              rows={1}
            />
            
            <div className="flex gap-1 pb-1 pr-1 shrink-0">
              <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground hidden sm:flex"><Smile className="w-4 h-4"/></Button>
              <Button variant="premium" size="icon" className="w-8 h-8 rounded-xl shadow-md"><Send className="w-4 h-4"/></Button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
