import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Calculator, Table, Copy, Check, 
  ChevronRight, Lightbulb, Zap, X, Wand2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const examples = [
  "Sum values in column B if column C contains 'Paid'",
  "Calculate VLOOKUP for user ID across sheet2",
  "Calculate monthly growth rate from A2 to A12",
  "Calculate standard deviation of revenue column"
];

export function FormulaHelper({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateFormula = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/formula`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: query, platform: "Excel/Google Sheets" }),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setResult(data.text);
      toast.success("Formula generated!");
    } catch {
      setResult("Error: Could not reach AI server.");
      toast.error("Backend offline");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 40 }}
      className="fixed bottom-32 right-10 z-[120] w-[400px] bg-[#0f0f0f]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-primary/5">
        <div className="flex items-center gap-2">
          <Table size={18} className="text-primary" />
          <h3 className="font-display font-bold text-sm">Spreadsheet Intelligence</h3>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl"><X size={16} /></button>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 block">Describe your logic</label>
          <div className="relative group">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Sum column B if status is 'verified'..."
              className="w-full h-24 bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm focus:border-primary/50 focus:ring-4 ring-primary/5 outline-none resize-none transition-all"
            />
            <button 
              onClick={generateFormula}
              className="absolute bottom-3 right-3 p-2 bg-primary rounded-xl text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Wand2 size={16} />
            </button>
          </div>
        </div>

        {!result && !loading && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-2">Try these:</p>
            {examples.map((ex, i) => (
              <button 
                key={i} 
                onClick={() => setQuery(ex)}
                className="w-full text-left px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-neutral-400 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all flex items-center gap-2"
              >
                <Lightbulb size={12} /> {ex}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="py-10 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <p className="text-[10px] font-mono text-primary animate-pulse">Analyzing structures...</p>
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-2xl bg-primary/5 border border-primary/20 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Excel / Sheets Formula</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  toast.success("Formula copied!");
                }}
                className="p-1.5 hover:bg-primary/10 rounded-lg text-primary transition-all"
              >
                <Copy size={14} />
              </button>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-sm text-green-400 border border-green-500/10 break-all">
              {result}
            </div>
            <p className="text-[10px] text-neutral-500 leading-relaxed font-medium">
              Note: Replace A:A or B:B with your actual spreadsheet ranges.
            </p>
          </motion.div>
        )}
      </div>

      <div className="h-12 flex items-center justify-center bg-black/40 border-t border-white/5">
        <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-[0.2em] flex items-center gap-2">
          <Zap size={10} /> Powered by Vedix Logic Core 4
        </p>
      </div>
    </motion.div>
  );
}
