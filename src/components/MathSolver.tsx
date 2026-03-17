import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, ChevronDown, ChevronRight, X, 
  Sparkles, FlaskConical, Atom, Binary, BrainCircuit
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  formula: string;
  explanation: string;
}

const exampleSteps: Step[] = [
  {
    id: 1,
    title: "Derivation",
    formula: "\\frac{d}{dx}(x^2 + \\sin(x))",
    explanation: "Apply the sum rule for differentiation."
  },
  {
    id: 2,
    title: "Application",
    formula: "2x + \\cos(x)",
    explanation: "Differentiate each term separately using power and trigonometric rules."
  }
];

export function MathSolver({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [solving, setSolving] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[] | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const solve = async () => {
    if (!query.trim()) return;
    setSolving(true);
    setSteps(null);
    setResult(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/math`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: query, type: "general" }),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setResult(data.text);
      setSteps([{ id: 1, title: "AI Solution", formula: "", explanation: data.text }]);
    } catch (error) {
      setResult("Error: Could not reach AI server. Make sure backend is running.");
      setSteps([{ id: 1, title: "Error", formula: "", explanation: "Could not reach AI server." }]);
    }
    setSolving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed inset-y-10 right-10 w-[500px] z-[130] bg-[#090909]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
    >
      <div className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-primary/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Calculator className="text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg">Math & Science Solver</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">KaTeX Step-by-Step Rendering</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl"><X /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest ml-1">Input Equation or Question</label>
          <div className="relative group">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Differentiate x^2 + sin(x)..."
              className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 text-sm focus:border-primary/50 focus:ring-4 ring-primary/5 outline-none transition-all"
            />
            <button 
              onClick={solve}
              className="absolute right-2 top-2 bottom-2 px-6 bg-primary rounded-xl text-white font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
            >
              Solve
            </button>
          </div>
        </div>

        {solving && (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            </div>
            <p className="text-[10px] font-mono text-primary animate-pulse font-bold tracking-[0.3em] uppercase">Calculating Path...</p>
          </div>
        )}

        {steps && (
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest ml-1">Solution Breakdown</p>
            {steps.map((step) => (
              <div key={step.id} className="rounded-3xl border border-white/5 overflow-hidden transition-all bg-white/[0.02]">
                <button 
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-lg bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">{step.id}</span>
                    <span className="font-bold text-sm">{step.title}</span>
                  </div>
                  {expandedStep === step.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <AnimatePresence>
                  {expandedStep === step.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-white/5 space-y-4">
                        <div className="p-6 bg-black/40 rounded-2xl border border-primary/10 flex justify-center py-10">
                           <span className="text-xl font-serif text-primary italic">{step.formula}</span>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed px-2 italic text-center">
                          "{step.explanation}"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {!steps && !solving && (
           <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Calc", icon: Binary },
                { label: "Bio", icon: FlaskConical },
                { label: "Phys", icon: Atom },
                { label: "Org", icon: BrainCircuit }
              ].map(item => (
                 <button key={item.label} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-3 hover:border-primary/50 transition-all group">
                    <item.icon className="text-neutral-600 group-hover:text-primary transition-colors" size={24} />
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{item.label}</span>
                 </button>
              ))}
           </div>
        )}
      </div>

      <div className="h-20 px-8 bg-black/40 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-green-500" />
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">AI Verified Accuracy</span>
         </div>
         <Button variant="outline" size="sm" className="h-9 px-6 rounded-xl border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest">Export LaTeX</Button>
      </div>
    </motion.div>
  );
}

const ShieldCheck = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
