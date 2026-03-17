import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, ShieldAlert, CheckCircle, Scale, 
  Search, Download, Share2, X, AlertTriangle, Info
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const clauses = [
  { title: "Termination Rights", status: "caution", text: "Section 4.2 allows immediate termination without notice under specific conditions.", risk: "High" },
  { title: "Indemnification", status: "warning", text: "Broad indemnification clause may expose user to third-party liabilities.", risk: "Medium" },
  { title: "Data Privacy", status: "safe", text: "Compliance with GDPR and CCPA is explicitly stated in Section 9.1.", risk: "Low" },
  { title: "Jurisdiction", status: "info", text: "Governing law is set to the State of Delaware, USA.", risk: "N/A" }
];

export function LegalAnalyzer({ onClose }: { onClose: () => void }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<boolean>(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  const analyze = async () => {
    setAnalyzing(true);
    setReport(false);
    setAiReport(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/legal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "Analyze a standard service agreement for risks, liabilities, and compliance issues." }),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setAiReport(data.text);
      setReport(true);
    } catch {
      setAiReport("Error: Could not reach AI server.");
      setReport(true);
    }
    setAnalyzing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed inset-y-10 left-10 right-10 z-[170] bg-[#0d0d0d]/95 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl flex overflow-hidden"
    >
      <div className="w-96 border-r border-white/5 p-10 flex flex-col gap-8 bg-black/40 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Scale className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl">Legal Intelligence</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Document Analysis & Risk Audit</p>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 text-center group hover:border-primary/50 transition-all cursor-pointer">
           <FileText className="text-neutral-600 group-hover:text-primary transition-colors" size={40} />
           <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Upload PDF or DOCX</p>
        </div>

        <div className="space-y-4">
           <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest ml-1">Compliance Standard</label>
           <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-neutral-400 outline-none">
              <option>GDPR / CCPA</option>
              <option>ISO 27001</option>
              <option>HIPAA Compliance</option>
           </select>
        </div>

        <Button onClick={analyze} disabled={analyzing} className="w-full h-14 rounded-2xl bg-primary text-white font-bold uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/20 gap-3">
           {analyzing ? "Analyzing Clauses..." : "Audit Document"}
        </Button>

        <div className="mt-auto space-y-4">
           <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-1">
                 <ShieldAlert size={12} /> Pro Tip
              </div>
              <p className="text-[10px] text-neutral-400 leading-relaxed italic">Vedix checks for 400+ common legal pitfalls and hidden liabilities.</p>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-black/20">
           <div className="flex items-center gap-6">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Document Context: service_agreement.pdf</span>
           </div>
           <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all"><X /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
           {analyzing && (
              <div className="flex flex-col items-center justify-center py-40 gap-6">
                 <div className="w-16 h-16 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
                 <p className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.4em] animate-pulse">Running Neural Audit...</p>
              </div>
           )}

           {report && !analyzing ? (
              <div className="space-y-10 max-w-4xl mx-auto">
                 <div className="grid grid-cols-3 gap-6">
                    <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20">
                       <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2"><AlertTriangle size={12}/> High Risk</p>
                       <p className="text-3xl font-display font-bold">02</p>
                       <p className="text-[10px] text-neutral-500 mt-1">Clauses found</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-yellow-500/10 border border-yellow-500/20">
                       <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-2 flex items-center gap-2"><AlertTriangle size={12}/> Warnings</p>
                       <p className="text-3xl font-display font-bold">05</p>
                       <p className="text-[10px] text-neutral-500 mt-1">Minor issues</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-green-500/10 border border-green-500/20">
                       <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2 flex items-center gap-2"><CheckCircle size={12}/> Safe</p>
                       <p className="text-3xl font-display font-bold">12</p>
                       <p className="text-[10px] text-neutral-500 mt-1">Verified clauses</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="font-display font-bold text-xl mb-6">Detailed Clause Breakdown</h4>
                    {clauses.map((c, i) => (
                       <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={c.title} 
                        className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex items-start justify-between gap-8 group"
                       >
                          <div className="space-y-3">
                             <div className="flex items-center gap-3">
                                {c.status === 'caution' && <div className="w-2 h-2 rounded-full bg-red-500" />}
                                {c.status === 'warning' && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
                                {c.status === 'safe' && <div className="w-2 h-2 rounded-full bg-green-500" />}
                                <span className="font-bold text-sm">{c.title}</span>
                             </div>
                             <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl">{c.text}</p>
                          </div>
                          <div className="text-right shrink-0">
                             <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-1">Risk Impact</p>
                             <span className={cn(
                                "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                                c.risk === 'High' ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                                c.risk === 'Medium' ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" :
                                c.risk === 'Low' ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-white/5 text-neutral-500"
                             )}>{c.risk}</span>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </div>
           ) : (
              <div className="flex flex-col items-center justify-center py-40 gap-8 opacity-20">
                 <FileText size={80} className="text-neutral-500" />
                 <p className="text-sm font-bold uppercase tracking-[0.4em] text-neutral-500">Scan Required to Generate Audit</p>
              </div>
           )}
        </div>

        <footer className="h-20 border-t border-white/5 bg-black/40 px-10 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <Info size={14} className="text-neutral-500" />
              <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Vedix AI Legal is an assistant tool, not a law firm.</span>
           </div>
           <div className="flex items-center gap-4">
              <Button variant="outline" className="h-10 px-6 rounded-xl border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest">Share Hub</Button>
              <Button className="h-10 px-6 rounded-xl bg-white text-black hover:bg-white/90 text-[10px] font-bold uppercase tracking-widest">Download Report</Button>
           </div>
        </footer>
      </div>
    </motion.div>
  );
}
