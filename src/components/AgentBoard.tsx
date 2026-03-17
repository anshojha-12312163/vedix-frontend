import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, CheckCircle2, Circle, Clock, Loader2, 
  Terminal, Search, Code, Cpu, ShieldCheck, X, Plus
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AgentTask {
  id: string;
  agent: string;
  task: string;
  status: "pending" | "running" | "completed" | "failed";
  type: "search" | "code" | "analyse" | "protect";
  subtasks: string[];
}

const initialTasks: AgentTask[] = [
  {
    id: "1",
    agent: "Spider-Bot",
    task: "Scraping competitor pricing data",
    status: "completed",
    type: "search",
    subtasks: ["Visit Site A", "Extract Tables", "Validate JSON"]
  },
  {
    id: "2",
    agent: "Logic-G",
    task: "Refactoring AuthController.ts",
    status: "running",
    type: "code",
    subtasks: ["Analyze complexity", "Apply DRY patterns", "Unit testing"]
  },
  {
    id: "3",
    agent: "Guard-X",
    task: "Real-time vulnerability scan",
    status: "pending",
    type: "protect",
    subtasks: ["Check SQLi", "Audit dependencies"]
  }
];

export function AgentBoard({ onClose }: { onClose: () => void }) {
  const [tasks, setTasks] = useState<AgentTask[]>(initialTasks);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prev => prev.map(t => {
        if (t.status === "running") {
           // Simulate progress logic could go here
        }
        return t;
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "search": return <Search size={14} />;
      case "code": return <Code size={14} />;
      case "analyse": return <Cpu size={14} />;
      case "protect": return <ShieldCheck size={14} />;
      default: return <Bot size={14} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed inset-4 sm:inset-10 z-[110] bg-[#0c0c0c]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
    >
      <div className="h-20 flex items-center justify-between px-10 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
            <Bot className="text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl">Agent Workflow Board</h2>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Autonomous Multi-Agent Systems</p>
          </div>
        </div>
        <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all">
          <X />
        </button>
      </div>

      <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col gap-6 group hover:border-primary/30 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                    {getTypeIcon(task.type)}
                  </div>
                  <span className="text-xs font-bold text-neutral-300">{task.agent}</span>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
                  task.status === "completed" ? "bg-green-500/10 text-green-500" :
                  task.status === "running" ? "bg-primary/10 text-primary animate-pulse" :
                  "bg-neutral-500/10 text-neutral-500"
                )}>
                  {task.status}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm mb-2">{task.task}</h3>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: task.status === "completed" ? "100%" : task.status === "running" ? "65%" : "0%" }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {task.subtasks.map((sub, i) => (
                  <div key={i} className="flex items-center gap-3 text-[11px] text-neutral-500">
                    {task.status === "completed" ? <CheckCircle2 size={12} className="text-green-500" /> : <Circle size={12} />}
                    {sub}
                  </div>
                ))}
              </div>
              
              {task.status === "running" && (
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-primary">
                   <Loader2 size={12} className="animate-spin" /> Tail log: sys.process.334...
                </div>
              )}
            </div>
          ))}
          
          <button 
            onClick={async () => {
              const taskInput = prompt("Describe the task for the new agent:");
              if (!taskInput) return;
              try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/agent`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ task: taskInput, agents: ["Researcher", "Coder", "Analyst", "Guard"] }),
                });
                const data = await response.json();
                setTasks(prev => [...prev, {
                  id: Date.now().toString(),
                  agent: "AI-Agent",
                  task: taskInput.slice(0, 50),
                  status: "completed" as const,
                  type: "analyse" as const,
                  subtasks: [data.text?.slice(0, 100) || "Task completed"]
                }]);
              } catch { /* offline */ }
            }}
            className="border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center gap-4 group hover:border-primary/50 transition-all p-8 opacity-50 hover:opacity-100"
          >
             <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary/10 transition-all">
                <Plus className="group-hover:text-primary" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest">Deploy New Agent</span>
          </button>
        </div>
      </div>
      
      <div className="h-16 px-10 bg-black/40 border-t border-white/5 flex items-center justify-center">
         <p className="text-[10px] font-mono text-neutral-600">Active Agents: 12 | Parallel Tasks: 4 | Global Latency: 42ms</p>
      </div>
    </motion.div>
  );
}
