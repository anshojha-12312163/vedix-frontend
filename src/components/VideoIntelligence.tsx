import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, Play, Pause, FastForward, Rewind, 
  Search, List, Clock, Shield, X, Scan, Cpu
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const timelineHighlights = [
  { time: "00:12", label: "Object Detected: Brand Logo", confidence: "99.2%" },
  { time: "00:45", label: "Sentiment Shift: High Engagement", confidence: "87.5%" },
  { time: "01:20", label: "Text Detection: 'Vedix Future'", confidence: "94.1%" },
  { time: "02:15", label: "Action: Speech Start", confidence: "98.8%" }
];

export function VideoIntelligence({ onClose }: { onClose: () => void }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<"highlights" | "objects" | "transcript">("highlights");

  const startAnalysis = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "Perform a deep temporal analysis of this video at S3:/v/vedix_01 for brand alignment and sentiment spikes.", videoDescription: "Product promotional video with tech-futuristic themes." }),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      toast.success("Temporal analysis complete.");
      // In a real app, we'd update the UI with data.text
      console.log('Video Analysis:', data.text);
    } catch {
      toast.error("Backend offline");
    }
    setAnalyzing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-10 z-[160] bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl flex overflow-hidden"
    >
      <div className="flex-1 flex flex-col border-r border-white/5 bg-black/40">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Video className="text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">AI Video Intelligence</h3>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Deep Temporal Analysis Engine</p>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col p-10 gap-8 min-h-0">
           <div className="aspect-video bg-white/[0.03] border border-white/10 rounded-[2rem] relative group flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Analysis Overlay Effect */}
              {analyzing && (
                <motion.div 
                  initial={{ top: "-100%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-1 bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.8)] z-20"
                />
              )}

              <Video size={64} className="text-neutral-700 opacity-20" />
              
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                 <div className="flex items-center gap-4">
                    <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-white/20 bg-black/40 backdrop-blur-md"><Rewind size={20} /></Button>
                    <Button className="w-14 h-14 rounded-full p-0 bg-primary text-white shadow-xl shadow-primary/20"><Play size={24} fill="white" /></Button>
                    <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-white/20 bg-black/40 backdrop-blur-md"><FastForward size={20} /></Button>
                 </div>
                 <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-[10px] font-mono font-bold">00:12 / 04:45</div>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <Button onClick={startAnalysis} disabled={analyzing} className="flex-1 h-14 rounded-2xl bg-primary text-white font-bold uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/20 gap-3">
                 {analyzing ? <Cpu className="animate-spin" size={18} /> : <Scan size={18} />}
                 {analyzing ? "Analyzing Frames..." : "Run Deep Analysis"}
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl border-white/10 px-8 flex flex-col items-center justify-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Storage</span>
                 <span className="text-xs font-bold text-foreground">S3: /v/vedix_01</span>
              </Button>
           </div>
        </div>
      </div>

      <div className="w-[450px] flex flex-col bg-[#080808]">
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5">
           <div className="flex gap-4">
              {["highlights", "objects", "transcript"].map(tab => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-all",
                    activeTab === tab ? "text-primary border-b-2 border-primary pb-2" : "text-neutral-500 hover:text-white"
                  )}
                 >
                    {tab}
                 </button>
              ))}
           </div>
           <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all"><X /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6">
           {activeTab === "highlights" && (
             <div className="space-y-4">
                {timelineHighlights.map((hl, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
                  >
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-primary">{hl.time}</span>
                        <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{hl.confidence} confidence</span>
                     </div>
                     <p className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors">{hl.label}</p>
                  </motion.div>
                ))}
             </div>
           )}

           {activeTab === "objects" && (
              <div className="flex flex-wrap gap-2">
                 {["Face", "Laptop", "Sky", "Building", "Car", "Tree", "Logo"].map(obj => (
                   <div key={obj} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-neutral-400">
                      {obj}
                   </div>
                 ))}
              </div>
           )}

           {activeTab === "transcript" && (
              <div className="space-y-6 font-serif italic text-neutral-400 leading-relaxed text-sm">
                 <p>"Welcome to the future of interaction. Vedix is not just an interface, it's a cognitive partner dedicated to accelerating your workflow."</p>
                 <p>"We've integrated temporal consistency modules that ensure every pixel of analysis is accurate across multiple frames..."</p>
              </div>
           )}
        </div>

        <div className="p-8 border-t border-white/5 bg-black/40">
           <div className="flex items-center justify-between text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Shield size={12} className="text-green-500" /> Export Ready</span>
              <span>MP4 â€¢ 4K â€¢ 60FPS</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
