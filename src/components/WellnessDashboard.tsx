import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Sun, Moon, Wind, Activity, 
  Brain, Sparkles, Smile, X, ArrowUpRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const moodhistory = [
  { day: "Mon", score: 85, mood: "Calm" },
  { day: "Tue", score: 72, mood: "Focused" },
  { day: "Wed", score: 90, mood: "Elevated" },
  { day: "Thu", score: 65, mood: "Tired" },
  { day: "Fri", score: 88, mood: "Inspired" }
];

export function WellnessDashboard({ onClose }: { onClose: () => void }) {
  const [pulse, setPulse] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => p + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-y-10 left-10 right-10 z-[180] bg-[#080808]/95 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl flex overflow-hidden"
    >
      <div className="flex-1 flex flex-col p-10 gap-10 overflow-y-auto custom-scrollbar">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Heart className="text-primary" size={24} fill="currentColor" fillOpacity={0.2} />
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl">Wellness Intelligence</h3>
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Biometric & Emotional Analysis</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all"><X /></button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           {[
             { label: "Stress Level", value: "Low", detail: "Optimal zone", icon: Wind, color: "text-green-500" },
             { label: "Focus Score", value: "92/100", detail: "Top 5% today", icon: Brain, color: "text-primary" },
             { label: "Rest Quality", value: "8.2h", detail: "Deep sleep +12%", icon: Moon, color: "text-blue-500" },
             { label: "Vital Pulse", value: `${pulse} BPM`, detail: "Resting stable", icon: Activity, color: "text-red-500" }
           ].map(stat => (
             <div key={stat.label} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                   <stat.icon size={20} className={stat.color} />
                   <ArrowUpRight size={14} className="text-neutral-600" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-2xl font-bold mt-1">{stat.value}</p>
                   <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mt-1">{stat.detail}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-[400px]">
           <div className="lg:col-span-2 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 flex flex-col gap-8">
              <h4 className="font-display font-bold text-xl">Emotional Trajectory</h4>
              <div className="flex-1 flex items-end justify-between gap-4 pt-10 px-4">
                 {moodhistory.map(m => (
                    <div key={m.day} className="flex-1 flex flex-col items-center gap-4 group">
                       <div className="w-full relative">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${m.score}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-primary/20 group-hover:bg-primary/40 rounded-t-2xl transition-all relative"
                          >
                             <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                          </motion.div>
                       </div>
                       <div className="text-center">
                          <p className="text-xs font-bold">{m.day}</p>
                          <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest group-hover:text-primary transition-colors">{m.mood}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/10 flex flex-col gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Smile size={120} />
              </div>
              <div className="space-y-4 relative z-10">
                 <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em]">
                    <Sparkles size={14} /> AI Recommendation
                 </div>
                 <h4 className="text-3xl font-display font-bold leading-tight">Time for a <span className="text-primary italic">5-minute</span> cognitive reset.</h4>
                 <p className="text-sm text-neutral-400 leading-relaxed">Your focus levels are dipping after 4 hours of high-intensity coding. Vedix recommends a breathwork session.</p>
              </div>
              <div className="mt-auto space-y-3 relative z-10">
                 <Button className="w-full h-14 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20">Start Breathwork</Button>
                 <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 text-xs font-bold uppercase tracking-widest">Schedule Break</Button>
              </div>
           </div>
        </div>
      </div>

      <div className="w-96 border-l border-white/5 bg-black/40 p-10 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
         <h4 className="font-display font-bold text-lg">Daily Journaling</h4>
         <div className="space-y-4">
            <textarea 
               id="wellness-journal"
               placeholder="How are you feeling today?" 
               className="w-full h-32 bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-sm outline-none focus:border-primary/50 transition-all resize-none"
            />
            <Button 
              size="sm" 
              onClick={async () => {
                const el = document.getElementById('wellness-journal') as HTMLTextAreaElement;
                if (!el?.value.trim()) return;
                try {
                  const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/wellness`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query: el.value, mood: "journaling" }),
                  });
                  const data = await res.json();
                  const affirmation = document.getElementById('wellness-affirmation');
                  if (affirmation) affirmation.textContent = data.text?.slice(0, 300) || "AI response received.";
                } catch { /* offline */ }
              }}
              className="w-full rounded-xl h-10 bg-primary hover:bg-primary/90 text-white text-[10px] font-bold uppercase tracking-widest"
            >Ask Vedix Wellness AI</Button>
         </div>

         <div className="mt-auto p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2"><Sun size={12}/> AI Insight</p>
            <p id="wellness-affirmation" className="text-sm font-serif italic text-neutral-300 max-h-40 overflow-y-auto custom-scrollbar">"You are capable of building systems that change logic itself."</p>
         </div>
      </div>
    </motion.div>
  );
}
