import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, TrendingDown, DollarSign, PieChart, 
  BarChart3, Wallet, ArrowUpRight, ArrowDownRight,
  RefreshCw, Share2, X, Target, Briefcase
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const assets = [
  { name: "Bitcoin", symbol: "BTC", price: "$68,422.50", change: "+4.2%", up: true, allocation: "45%" },
  { name: "Ethereum", symbol: "ETH", price: "$3,842.12", change: "+2.1%", up: true, allocation: "25%" },
  { name: "S&P 500 ETF", symbol: "VOO", price: "$512.30", change: "-0.4%", up: false, allocation: "20%" },
  { name: "NVIDIA Corp", symbol: "NVDA", price: "$824.10", change: "+8.9%", up: true, allocation: "10%" }
];

export function FinanceDashboard({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed inset-x-6 bottom-6 top-20 z-[150] bg-[#080808]/95 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl flex flex-col overflow-hidden"
    >
      <div className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-primary/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
            <TrendingUp className="text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl">Finance Intelligence</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Real-time Market & Portfolio Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" size="sm" className="hidden sm:flex border-white/10 hover:bg-white/5 h-10 rounded-xl px-6 gap-2 text-[10px] font-bold uppercase tracking-widest">
              <RefreshCw size={14} /> Refresh Data
           </Button>
           <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all"><X /></button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
           <div className="w-16 h-16 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
           <p className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.4em] animate-pulse">Syncing Markets...</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
             {/* Stats Cards */}
             <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Portfolio Value", value: "$1,242,500", detail: "+2.4% today", up: true, icon: Wallet },
                  { label: "Active Positions", value: "14", detail: "Across 4 exchanges", up: true, icon: Briefcase },
                  { label: "Risk Level", value: "Moderate", detail: "Balanced profile", up: true, icon: Target }
                ].map(stat => (
                  <div key={stat.label} className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-3">
                     <div className="flex items-center justify-between">
                        <stat.icon size={18} className="text-neutral-500" />
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full", stat.up ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}>{stat.detail}</span>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-display font-bold text-foreground mt-1">{stat.value}</p>
                     </div>
                  </div>
                ))}
             </div>

             {/* Asset Allocation */}
             <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center gap-6">
                <div className="relative w-32 h-32">
                   <div className="absolute inset-0 rounded-full border-8 border-primary/20 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]" />
                   <div className="absolute inset-0 rounded-full border-t-8 border-l-8 border-primary transition-all duration-1000" style={{ transform: 'rotate(45deg)' }} />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <PieChart size={32} className="text-primary" />
                   </div>
                </div>
                <div className="text-center">
                   <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Global Allocation</p>
                   <p className="text-lg font-bold text-foreground mt-1">Diversified Tech</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Market Watch */}
            <div className="space-y-6">
               <div className="flex items-center justify-between px-2">
                  <h4 className="font-display font-bold text-lg">Market Watch</h4>
                  <button className="text-[10px] font-bold text-primary uppercase tracking-widest">Edit List</button>
               </div>
               <div className="space-y-2">
                  {assets.map(asset => (
                     <div key={asset.symbol} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between group hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-xs group-hover:bg-primary/10 group-hover:text-primary transition-all">{asset.symbol[0]}</div>
                           <div>
                              <p className="text-sm font-bold text-foreground">{asset.name}</p>
                              <p className="text-[10px] text-neutral-500 font-mono">{asset.symbol} â€¢ {asset.allocation}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-bold font-mono text-foreground">{asset.price}</p>
                           <p className={cn("text-[10px] font-bold flex items-center justify-end gap-1", asset.up ? "text-green-500" : "text-red-500")}>
                              {asset.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                              {asset.change}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* AI Predictions */}
            <div className="p-10 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex flex-col gap-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <TrendingUp size={120} className="rotate-12" />
               </div>
               <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
                     <Wand2 size={14} /> Vedix Forecasting Engine
                  </div>
                  <h4 className="text-3xl font-display font-bold leading-tight">Optimistic growth predicted for <span className="text-primary underline underline-offset-8">AI Infrastructure</span> in Q3.</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed max-w-md">Our neural forecasting suggests a 12.4% upside for silicon-based assets. Risk factor: SEC regulatory updates in mid-May.</p>
               </div>
               <div className="mt-auto flex flex-wrap gap-3">
                  <Button 
                    onClick={async () => {
                      try {
                        const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/finance`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ query: "Give a market outlook and portfolio optimization advice for a tech-heavy portfolio with BTC, ETH, VOO, and NVDA.", context: "portfolio analysis" }),
                        });
                        const data = await res.json();
                        const el = document.getElementById('finance-ai-report');
                        if (el) { el.textContent = data.text; el.style.display = 'block'; }
                      } catch { /* offline */ }
                    }}
                    className="rounded-xl h-12 px-6 bg-primary text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20"
                  >Generate AI Report</Button>
                  <Button variant="outline" className="rounded-xl h-12 px-6 border-white/10 text-[10px] font-bold uppercase tracking-widest">Execute Hedge</Button>
               </div>
               <p id="finance-ai-report" className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto custom-scrollbar mt-4" style={{display:'none'}}></p>
            </div>
          </div>
        </div>
      )}

      <div className="h-16 px-10 border-t border-white/5 flex items-center justify-between text-[9px] font-bold text-neutral-600 uppercase tracking-[0.2em]">
         <span>Data feed: Bloomberg Terminal Link active</span>
         <span className="flex items-center gap-2">
            <DollarSign size={10} /> Latency: 4ms | Secure Encryption: RSA-4096
         </span>
      </div>
    </motion.div>
  );
}

const Wand2 = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(className)}>
     <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.21 1.21 0 0 0 1.72 0L21.64 5.36a1.21 1.21 0 0 0 0-1.72Z"/>
     <path d="m14 7 3 3"/>
     <path d="M5 6v4"/>
     <path d="M19 14v4"/>
     <path d="M10 2v2"/>
     <path d="M7 8H3"/>
     <path d="M21 16h-4"/>
     <path d="M11 19v3"/>
  </svg>
);
