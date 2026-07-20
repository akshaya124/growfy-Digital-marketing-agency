"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreVertical, CreditCard, ArrowUpRight, ArrowDownRight, FileText, Download } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

const revenueData = [
  { name: 'Jan', revenue: 45000, expenses: 12000 },
  { name: 'Feb', revenue: 52000, expenses: 14000 },
  { name: 'Mar', revenue: 48000, expenses: 15000 },
  { name: 'Apr', revenue: 61000, expenses: 18000 },
  { name: 'May', revenue: 65000, expenses: 17000 },
  { name: 'Jun', revenue: 78000, expenses: 22000 },
  { name: 'Jul', revenue: 85000, expenses: 25000 },
];

const dummyTransactions = [
  { id: "INV-2026-001", client: "TechFlow Inc", amount: "₹45,000", status: "Paid", date: "Jul 18, 2026" },
  { id: "INV-2026-002", client: "Elevate Real Estate", amount: "₹12,000", status: "Pending", date: "Jul 17, 2026" },
  { id: "INV-2026-003", client: "Bloom Health", amount: "₹85,000", status: "Paid", date: "Jul 15, 2026" },
  { id: "INV-2026-004", client: "Apex Finance", amount: "₹32,000", status: "Overdue", date: "Jul 10, 2026" },
  { id: "INV-2026-005", client: "Luxe Fashion", amount: "₹18,000", status: "Paid", date: "Jul 05, 2026" },
];

const statusColors: Record<string, string> = {
  "Paid": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "Pending": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Overdue": "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function FinancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black">Finance Overview</h1>
          <p className="text-muted-foreground mt-1">Track revenue, expenses, and manage invoices.</p>
        </div>
        <Button variant="premium" onClick={() => setIsModalOpen(true)} className="gap-2 rounded-full px-6">
          <Plus className="w-4 h-4" /> Upload Invoice
        </Button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-border relative overflow-hidden group">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
            <CreditCard className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue (YTD)</p>
          <h2 className="text-3xl font-black mb-2">₹4.2M</h2>
          <div className="flex items-center gap-1 text-sm text-emerald-500 font-bold">
            <ArrowUpRight className="w-4 h-4" /> +12.5% from last year
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-border relative overflow-hidden group">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Monthly Recurring (MRR)</p>
          <h2 className="text-3xl font-black mb-2">₹850K</h2>
          <div className="flex items-center gap-1 text-sm text-emerald-500 font-bold">
            <ArrowUpRight className="w-4 h-4" /> +5.2% from last month
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-border relative overflow-hidden group">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
            <ArrowDownRight className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Total Expenses (YTD)</p>
          <h2 className="text-3xl font-black mb-2">₹1.1M</h2>
          <div className="flex items-center gap-1 text-sm text-red-500 font-bold">
            <ArrowUpRight className="w-4 h-4" /> +2.1% from last year
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-border relative overflow-hidden group">
          <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Outstanding Invoices</p>
          <h2 className="text-3xl font-black mb-2">₹320K</h2>
          <div className="flex items-center gap-1 text-sm text-orange-500 font-bold">
            4 invoices pending
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="glass-card p-6 rounded-3xl border border-border">
        <h3 className="font-bold mb-6">Revenue vs Expenses (Monthly)</h3>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
              />
              <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="glass-card rounded-3xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-bold text-lg">Recent Transactions</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Invoice ID</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Client</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Amount</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Date</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {dummyTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4 font-mono text-sm">{tx.id}</td>
                  <td className="px-6 py-4 font-bold">{tx.client}</td>
                  <td className="px-6 py-4 font-bold text-primary">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[tx.status]}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{tx.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Download">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors" title="More">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPLOAD INVOICE MODAL (DUMMY) */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-background border border-border shadow-2xl rounded-3xl p-8 z-50"
            >
              <h2 className="text-2xl font-black mb-6">Upload Invoice</h2>
              <div className="space-y-4">
                <div className="w-full border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                  <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="font-bold">Drag and drop invoice</p>
                  <p className="text-sm text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                  <Button variant="outline" className="mt-6 rounded-full" onClick={(e) => e.preventDefault()}>Browse Files</Button>
                </div>
                <div className="flex gap-4 mt-8 pt-4 border-t border-border/50">
                  <Button variant="premium" className="w-full rounded-full h-12" onClick={() => setIsModalOpen(false)}>Upload</Button>
                  <Button variant="outline" className="w-full rounded-full h-12" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
