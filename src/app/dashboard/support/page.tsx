"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LifeBuoy, Send, MessageSquare, Clock, 
  CheckCircle2, Plus, AlertCircle, X, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Ticket = {
  id: string;
  subject: string;
  status: "Open" | "In Progress" | "Resolved";
  date: string;
  department: string;
  messages: { sender: string, text: string, time: string, isAgency: boolean }[];
};

const mockTickets: Ticket[] = [
  {
    id: "TKT-1042",
    subject: "Cannot access the staging environment",
    status: "Open",
    date: "2 hours ago",
    department: "Technical",
    messages: [
      { sender: "John Doe", text: "Hi team, I am trying to access the staging link you sent yesterday but it is giving me a 403 Forbidden error.", time: "2 hours ago", isAgency: false },
      { sender: "Support Agent", text: "Hello John, looking into this right now. It seems your IP might not be whitelisted. Can you send me your public IP?", time: "1 hour ago", isAgency: true }
    ]
  },
  {
    id: "TKT-1038",
    subject: "Requesting a change to the homepage hero image",
    status: "In Progress",
    date: "Yesterday",
    department: "Design",
    messages: [
      { sender: "John Doe", text: "Can we swap the current hero image for the one labeled 'v2' in the Drive folder?", time: "Yesterday", isAgency: false },
      { sender: "Sarah J.", text: "Sure thing! I will update the Figma file and push the changes to staging by EOD.", time: "Yesterday", isAgency: true }
    ]
  },
  {
    id: "TKT-0985",
    subject: "Billing inquiry for Q3 invoice",
    status: "Resolved",
    date: "Oct 01, 2026",
    department: "Billing",
    messages: [
      { sender: "John Doe", text: "I have a question about a line item on the Q3 invoice.", time: "Oct 01", isAgency: false },
      { sender: "Finance Team", text: "Hi John, that line item corresponds to the extra revisions requested on the logo design. Let me know if you need a detailed breakdown.", time: "Oct 01", isAgency: true },
      { sender: "John Doe", text: "Ah, understood. Thank you!", time: "Oct 02", isAgency: false }
    ]
  }
];

export default function ClientSupportPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  
  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto relative overflow-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-black mb-2 text-foreground">Support & Helpdesk</h1>
          <p className="text-muted-foreground">Submit requests and track the status of your support tickets.</p>
        </div>
      </div>

      <div className="flex-1 flex gap-8 min-h-0 relative">
        
        {/* NEW TICKET FORM (Left) */}
        <div className={`w-full lg:w-[400px] shrink-0 transition-all duration-500 ${selectedTicket ? 'hidden lg:block lg:w-[350px]' : ''}`}>
          <div className="glass-card p-6 rounded-3xl border border-border bg-background/50 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus className="w-5 h-5 text-primary"/> New Ticket</h2>
            
            <form className="space-y-4 flex-1 flex flex-col">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Department</label>
                <select className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option>Technical Support</option>
                  <option>Design & Content</option>
                  <option>Billing & Account</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Subject</label>
                <input type="text" placeholder="Brief summary of the issue" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              
              <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-sm font-bold text-foreground">Message</label>
                <textarea placeholder="Describe your request in detail..." className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none flex-1 min-h-[150px] custom-scrollbar" />
              </div>

              <Button variant="premium" className="w-full rounded-xl h-11 font-bold shadow-lg shadow-primary/20 mt-4">
                <Send className="w-4 h-4 mr-2" /> Submit Ticket
              </Button>
            </form>
          </div>
        </div>

        {/* TICKETS LIST (Right) */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar pr-2 pb-8 ${selectedTicket ? 'hidden' : 'block'}`}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><LifeBuoy className="w-5 h-5 text-primary"/> Recent Tickets</h2>
          
          <div className="space-y-4">
            {mockTickets.map((ticket) => (
              <div 
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className="glass-card p-5 rounded-2xl border border-border bg-background/50 hover:border-primary/50 hover:bg-background/80 transition-all cursor-pointer group hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{ticket.id}</span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="text-xs font-bold text-muted-foreground">{ticket.department}</span>
                    </div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors leading-tight">{ticket.subject}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0
                    ${ticket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                      ticket.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                      'bg-orange-500/10 text-orange-500 border-orange-500/20'}`}>
                    {ticket.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> Last updated: {ticket.date}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5"/> {ticket.messages.length} messages</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SLIDE-OUT TICKET VIEW (Master-Detail) */}
        <AnimatePresence>
          {selectedTicket && (
            <>
              {/* Mobile Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedTicket(null)}
                className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="absolute inset-y-0 right-0 w-full lg:w-[calc(100%-380px)] z-50 bg-background/95 backdrop-blur-3xl border border-border shadow-2xl rounded-3xl flex flex-col overflow-hidden"
              >
                {/* Panel Header */}
                <div className="p-6 border-b border-border/50 bg-muted/20 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border
                        ${selectedTicket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                          selectedTicket.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                          'bg-orange-500/10 text-orange-500 border-orange-500/20'}`}>
                        {selectedTicket.status}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground uppercase">{selectedTicket.id}</span>
                    </div>
                    <h2 className="text-xl font-bold">{selectedTicket.subject}</h2>
                  </div>
                  <button onClick={() => setSelectedTicket(null)} className="p-2 bg-background rounded-full hover:bg-muted text-muted-foreground transition-colors shadow-sm border border-border shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                  {selectedTicket.messages.map((msg, idx) => (
                    <div key={idx} className={`flex items-end gap-3 max-w-[85%] ${!msg.isAgency ? 'ml-auto flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-tr flex items-center justify-center text-[10px] text-white font-bold shrink-0 shadow-sm mb-1
                        ${!msg.isAgency ? 'from-blue-500 to-cyan-500' : 'from-primary to-purple-500'}`}>
                        {!msg.isAgency ? 'JD' : 'AG'}
                      </div>
                      <div className={`flex flex-col ${!msg.isAgency ? 'items-end' : 'items-start'}`}>
                        <div className={`flex items-baseline gap-2 mb-1 px-1 ${!msg.isAgency ? 'flex-row-reverse' : ''}`}>
                          <span className="text-xs font-bold text-muted-foreground">{msg.sender}</span>
                          <span className="text-[10px] text-muted-foreground/60">{msg.time}</span>
                        </div>
                        <div className={`p-4 rounded-2xl ${
                          !msg.isAgency 
                            ? 'bg-primary text-primary-foreground rounded-br-sm shadow-md shadow-primary/20' 
                            : 'bg-muted/50 border border-border/50 text-foreground rounded-bl-sm'
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Area */}
                {selectedTicket.status !== 'Resolved' ? (
                  <div className="p-4 border-t border-border/50 bg-background/80">
                    <div className="relative flex items-end gap-2 bg-muted/30 border border-border rounded-2xl p-2 focus-within:border-primary transition-colors">
                      <textarea 
                        placeholder="Reply to this ticket..." 
                        className="flex-1 bg-transparent border-none focus:outline-none resize-none text-sm py-2 px-2 max-h-32 custom-scrollbar min-h-[40px]"
                        rows={1}
                      />
                      <Button variant="premium" size="icon" className="w-10 h-10 rounded-xl shadow-md shrink-0"><Send className="w-4 h-4"/></Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-t border-border/50 bg-emerald-500/5 text-center">
                    <p className="text-sm font-medium text-emerald-500 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> This ticket is resolved and closed to new replies.
                    </p>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
