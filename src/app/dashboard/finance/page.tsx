"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, 
  FileText, Download, X, Search, Filter, CheckCircle2, AlertTriangle,
  Receipt
} from "lucide-react";
import { Button } from "@/components/ui/button";

type InvoiceItem = {
  description: string;
  amount: number;
};

type Invoice = {
  id: string;
  number: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  items: InvoiceItem[];
};

const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-2026-042",
    amount: 4500.00,
    date: "Oct 01, 2026",
    dueDate: "Oct 15, 2026",
    status: "Pending",
    items: [
      { description: "E-Commerce Web App Development - Phase 2", amount: 3500.00 },
      { description: "UI/UX Design Revisions", amount: 1000.00 }
    ]
  },
  {
    id: "2",
    number: "INV-2026-041",
    amount: 1250.00,
    date: "Sep 15, 2026",
    dueDate: "Sep 30, 2026",
    status: "Overdue",
    items: [
      { description: "Q3 Marketing Campaign Setup", amount: 750.00 },
      { description: "Ad Copywriting", amount: 500.00 }
    ]
  },
  {
    id: "3",
    number: "INV-2026-039",
    amount: 6800.00,
    date: "Aug 01, 2026",
    dueDate: "Aug 15, 2026",
    status: "Paid",
    items: [
      { description: "E-Commerce Web App Development - Phase 1", amount: 5000.00 },
      { description: "Initial Brand Identity Design", amount: 1800.00 }
    ]
  },
  {
    id: "4",
    number: "INV-2026-035",
    amount: 950.00,
    date: "Jul 15, 2026",
    dueDate: "Jul 30, 2026",
    status: "Paid",
    items: [
      { description: "Monthly SEO Retainer - July", amount: 950.00 }
    ]
  },
];

export default function ClientFinancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = mockInvoices.filter(inv => 
    inv.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
      
      {/* HEADER & KPIs */}
      <div className="mb-8 shrink-0">
        <h1 className="text-3xl font-black mb-2 text-foreground">Billing & Invoices</h1>
        <p className="text-muted-foreground mb-6">Manage your payments, view invoices, and track your project spend.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="glass-card p-6 rounded-2xl border border-border bg-background/50">
            <h3 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-500"/> Total Outstanding</h3>
            <div className="text-3xl font-black mb-2">$5,750.00</div>
            <p className="text-xs text-muted-foreground">2 invoices pending</p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-border bg-background/50">
            <h3 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Total Paid</h3>
            <div className="text-3xl font-black mb-2">$7,750.00</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3 text-emerald-500" /> +$950 this month
            </p>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-background/50 backdrop-blur-md p-2 rounded-xl border border-border shrink-0">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search invoices..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" 
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="bg-background rounded-lg flex-1 sm:flex-none"><Filter className="w-4 h-4 mr-2"/> Filters</Button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex gap-6 min-h-0 relative">
        
        {/* INVOICES LIST */}
        <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar pr-2 pb-8 ${selectedInvoice ? 'mr-[440px] hidden xl:block' : ''}`}>
          <div className="glass-card rounded-2xl border border-border bg-background/50 overflow-hidden">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/30 sticky top-0 z-10 text-muted-foreground border-b border-border/50">
                <tr>
                  <th className="p-4 font-semibold w-1/3">Invoice Number</th>
                  <th className="p-4 font-semibold w-1/6">Date</th>
                  <th className="p-4 font-semibold w-1/6 text-right">Amount</th>
                  <th className="p-4 font-semibold w-1/6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredInvoices.map((invoice) => (
                  <tr 
                    key={invoice.id} 
                    onClick={() => setSelectedInvoice(invoice)}
                    className={`transition-colors cursor-pointer group
                      ${selectedInvoice?.id === invoice.id ? 'bg-primary/5' : 'hover:bg-muted/30'}`}
                  >
                    <td className="p-4 font-bold flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                        ${invoice.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 
                          invoice.status === 'Overdue' ? 'bg-rose-500/10 text-rose-500' : 
                          'bg-amber-500/10 text-amber-500'}`}>
                        <Receipt className="w-4 h-4" />
                      </div>
                      <span className="group-hover:text-primary transition-colors">{invoice.number}</span>
                    </td>
                    <td className="p-4 text-muted-foreground">{invoice.date}</td>
                    <td className="p-4 font-black text-right">${invoice.amount.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider inline-block min-w-[70px]
                        ${invoice.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 
                          invoice.status === 'Overdue' ? 'bg-rose-500/10 text-rose-500' : 
                          'bg-amber-500/10 text-amber-500'}`}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SLIDE-OUT SIDE PANEL (Master-Detail) */}
        <AnimatePresence>
          {selectedInvoice && (
            <>
              {/* Mobile Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedInvoice(null)}
                className="fixed inset-0 bg-black/40 z-40 xl:hidden backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="fixed xl:absolute inset-y-0 right-0 w-full md:w-[440px] z-50 bg-background/95 backdrop-blur-2xl border-l border-border shadow-2xl flex flex-col"
              >
                {/* Panel Header */}
                <div className="p-6 border-b border-border/50 flex justify-between items-start bg-muted/20">
                  <div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3 inline-block
                      ${selectedInvoice.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 
                        selectedInvoice.status === 'Overdue' ? 'bg-rose-500/10 text-rose-500' : 
                        'bg-amber-500/10 text-amber-500'}`}>
                      {selectedInvoice.status}
                    </span>
                    <h2 className="text-xl font-black mb-1">{selectedInvoice.number}</h2>
                    <p className="text-xs text-muted-foreground">Issued: {selectedInvoice.date}</p>
                  </div>
                  <button onClick={() => setSelectedInvoice(null)} className="p-2 bg-background rounded-full hover:bg-muted text-muted-foreground transition-colors shadow-sm border border-border">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Panel Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                  
                  <div className="bg-background border border-border rounded-2xl p-6 shadow-sm mb-6">
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Amount Due</p>
                        <p className="text-3xl font-black">${selectedInvoice.amount.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Due Date</p>
                        <p className="font-bold">{selectedInvoice.dueDate}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-4">Itemized Breakdown</p>
                      <div className="space-y-4">
                        {selectedInvoice.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm items-start gap-4">
                            <span className="font-medium">{item.description}</span>
                            <span className="font-bold shrink-0">${item.amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedInvoice.status !== 'Paid' && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 text-amber-600 mb-6">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <p className="text-xs font-medium">Please remit payment by {selectedInvoice.dueDate} to avoid late fees or service interruptions.</p>
                    </div>
                  )}
                  {selectedInvoice.status === 'Paid' && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3 text-emerald-600 mb-6">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <p className="text-xs font-medium">This invoice was paid in full. Thank you for your business!</p>
                    </div>
                  )}

                </div>

                {/* Panel Footer Actions */}
                <div className="p-6 border-t border-border/50 bg-background/80 space-y-3">
                  <Button variant="outline" className="w-full rounded-xl h-12 font-bold shadow-lg shadow-primary/20">
                    <Download className="w-4 h-4 mr-2"/> Download PDF Invoice
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
