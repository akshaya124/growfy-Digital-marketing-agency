"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, 
  Wallet, TrendingUp, Download, Filter, MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";

// --- Mock Data ---
const chartData = [
  { name: "Jan", revenue: 4000, expenses: 2400 },
  { name: "Feb", revenue: 3000, expenses: 1398 },
  { name: "Mar", revenue: 5000, expenses: 3800 },
  { name: "Apr", revenue: 8780, expenses: 3908 },
  { name: "May", revenue: 6890, expenses: 4800 },
  { name: "Jun", revenue: 9390, expenses: 3800 },
  { name: "Jul", revenue: 11490, expenses: 4300 },
];

const transactions = [
  { id: "TRX-001", client: "Acme Corp", date: "Jul 15, 2026", amount: "$4,500.00", status: "Completed", type: "Income" },
  { id: "TRX-002", client: "Globex Inc", date: "Jul 14, 2026", amount: "$1,200.00", status: "Pending", type: "Income" },
  { id: "TRX-003", client: "AWS Services", date: "Jul 12, 2026", amount: "$850.00", status: "Completed", type: "Expense" },
  { id: "TRX-004", client: "Stark Ind.", date: "Jul 10, 2026", amount: "$8,900.00", status: "Overdue", type: "Income" },
  { id: "TRX-005", client: "Figma", date: "Jul 08, 2026", amount: "$145.00", status: "Completed", type: "Expense" },
];

const kpis = [
  { title: "Total Revenue", value: "$84,250", trend: "+12.5%", isPositive: true, icon: DollarSign, color: "from-emerald-500 to-teal-500" },
  { title: "Total Expenses", value: "$22,400", trend: "-2.4%", isPositive: true, icon: Wallet, color: "from-rose-500 to-pink-500" },
  { title: "Net Profit", value: "$61,850", trend: "+18.2%", isPositive: true, icon: TrendingUp, color: "from-primary to-purple-500" },
  { title: "Pending Invoices", value: "$14,500", trend: "5 awaiting", isPositive: false, icon: CreditCard, color: "from-amber-500 to-orange-500" },
];

export default function FinanceDashboard() {
  const [timeRange, setTimeRange] = useState("6M");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Financial Overview</h1>
          <p className="text-muted-foreground mt-1">Track your revenue, expenses, and overall financial health.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-10"><Filter className="w-4 h-4 mr-2"/> Filter</Button>
          <Button variant="premium" className="rounded-xl h-10"><Download className="w-4 h-4 mr-2"/> Export CSV</Button>
        </div>
      </div>

      {/* KPIS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass-card p-6 rounded-3xl border border-border bg-background/50 hover:bg-background/80 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${kpi.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white shadow-lg`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${kpi.isPositive ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-500 bg-amber-500/10 border-amber-500/20'}`}>
                {kpi.isPositive ? <ArrowUpRight className="w-3 h-3"/> : <ArrowDownRight className="w-3 h-3"/>}
                {kpi.trend}
              </span>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-muted-foreground mb-1">{kpi.title}</h3>
              <div className="text-3xl font-black">{kpi.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* CHART SECTION */}
        <div className="lg:col-span-2 glass-card rounded-3xl border border-border bg-background/50 flex flex-col h-[500px]">
          <div className="p-6 border-b border-border/50 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">Revenue vs Expenses</h2>
              <p className="text-sm text-muted-foreground">Monthly cashflow analysis</p>
            </div>
            <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
              {['1M', '3M', '6M', '1Y'].map((range) => (
                <button 
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${timeRange === range ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 p-6 pb-2 min-h-0 relative">
            {/* Chart Gradient Defs */}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '16px', border: '1px solid hsl(var(--border))', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="glass-card rounded-3xl border border-border bg-background/50 flex flex-col h-[500px]">
          <div className="p-6 border-b border-border/50 flex justify-between items-center">
            <h2 className="text-lg font-bold">Recent Transactions</h2>
            <button className="text-primary hover:bg-primary/10 p-2 rounded-xl transition-colors"><MoreHorizontal className="w-5 h-5"/></button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            <div className="space-y-1">
              {transactions.map((trx) => (
                <div key={trx.id} className="p-4 flex items-center justify-between rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50 cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${trx.type === 'Income' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                      {trx.type === 'Income' ? <ArrowDownRight className="w-5 h-5"/> : <ArrowUpRight className="w-5 h-5"/>}
                    </div>
                    <div>
                      <p className="font-bold text-sm group-hover:text-primary transition-colors">{trx.client}</p>
                      <p className="text-xs text-muted-foreground">{trx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-sm ${trx.type === 'Income' ? 'text-emerald-500' : 'text-foreground'}`}>
                      {trx.type === 'Income' ? '+' : '-'}{trx.amount}
                    </p>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${trx.status === 'Completed' ? 'text-emerald-500' : trx.status === 'Pending' ? 'text-amber-500' : 'text-rose-500'}`}>
                      {trx.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-border/50">
            <Button variant="outline" className="w-full rounded-xl text-xs font-bold h-10">View All Transactions</Button>
          </div>
        </div>

      </div>
    </div>
  );
}
