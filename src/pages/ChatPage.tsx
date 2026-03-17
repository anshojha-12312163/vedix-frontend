import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Plus, MessageSquare, Search as SearchIcon, Globe,
  MoreVertical, Copy, RefreshCw, ThumbsUp, ThumbsDown, Share2, Volume2,
  Sparkles, Cpu, Zap, Eye, Code, FlaskConical, ChevronDown, Mic, X,
  Terminal, Brain, Trash2, Save, Layout, ChevronLeft, Pin, Pencil, Paperclip, Users, Table, Calculator
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AgentBoard } from "@/components/AgentBoard";
import { FormulaHelper } from "@/components/FormulaHelper";
import { MathSolver } from "@/components/MathSolver";
import { ImageStudio } from "@/components/ImageStudio";
import { FinanceDashboard } from "@/components/FinanceDashboard";
import { VideoIntelligence } from "@/components/VideoIntelligence";
import { LegalAnalyzer } from "@/components/LegalAnalyzer";
import { WellnessDashboard } from "@/components/WellnessDashboard";
import { Image as ImageIcon, TrendingUp, Presentation, FolderOpen, Video, Scale, Heart } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isCode?: boolean;
}

const models = [
  { name: "Vedix Ultra", desc: "Maximum intelligence for complex problems", icon: Sparkles, speed: 5, intel: 5, ctx: "100K", tier: "Flagship" },
  { name: "Vedix Pro", desc: "Fast and smart for everyday tasks", icon: Cpu, speed: 4, intel: 4, ctx: "64K", tier: "Standard" },
  { name: "Vedix Flash", desc: "Instant responses for simple questions", icon: Zap, speed: 5, intel: 3, ctx: "32K", tier: "Fast" },
  { name: "Vedix Vision", desc: "Image and video understanding", icon: Eye, speed: 3, intel: 4, ctx: "32K", tier: "Multimodal" },
  { name: "Vedix Code", desc: "Programming and development", icon: Code, speed: 4, intel: 5, ctx: "64K", tier: "Specialized" },
  { name: "Vedix Science", desc: "Math, physics, and chemistry", icon: FlaskConical, speed: 3, intel: 5, ctx: "64K", tier: "Specialized" },
  { name: "Vedix Research", desc: "Deep web search and analysis", icon: SearchIcon, speed: 2, intel: 5, ctx: "100K", tier: "Research" },
];

export default function ChatPage() {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [voiceActive, setVoiceActive] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [showAgentBoard, setShowAgentBoard] = useState(false);
  const [showFormulaHelper, setShowFormulaHelper] = useState(false);
  const [showMathSolver, setShowMathSolver] = useState(false);
  const [showImageStudio, setShowImageStudio] = useState(false);
  const [showFinance, setShowFinance] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showWellness, setShowWellness] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [webSearchActive, setWebSearchActive] = useState(false);
  const [hoveredMsg, setHoveredMsg] = useState<string | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>(["Vedix Sandbox v1.0.4", "System initialized. Waiting for execution..."]);
  const [memories, setMemories] = useState([
    { id: "1", text: "Prefers Python for data analysis", category: "Coding" },
    { id: "2", text: "Communication tone: Professional & Concise", category: "Tone" },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialModel = models.find(m => m.name === location.state?.selectedModel) || models[0];
  const [selectedModel, setSelectedModel] = useState(initialModel);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Hello! I'm Vedix AI. I've been upgraded with World-Level intelligence. How can I assist you today?",
          timestamp: new Date(),
        }
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const history = messages
        .filter(m => m.id !== "welcome") // Skip the static welcome message to ensure user starts history
        .map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        }));

      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: input,
          model: selectedModel.name,
          history: history
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI response");
      }
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.text,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage = error instanceof Error ? error.message : "AI Server Offline";
      toast.error(`${errorMessage}. Please check backend logs.`);
    }
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden font-sans">
      {/* Voice Mode Overlay */}
      <AnimatePresence>
        {voiceActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-3xl flex flex-col items-center justify-center p-8"
          >
            <button 
              onClick={() => setVoiceActive(false)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X size={24} className="text-foreground" />
            </button>
            
            <div className="flex flex-col items-center gap-16">
              <div className="relative">
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-primary rounded-full blur-[80px]"
                />
                <div className="relative w-56 h-56 rounded-full bg-gradient-to-tr from-primary via-accent to-primary p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <div className="flex items-center gap-1.5 h-16">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [10, 60, 15, 80, 10] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                          className="w-1.5 bg-primary rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-display font-bold text-foreground">Listening...</h2>
                <p className="text-muted-foreground text-lg">Vedix is ready for your voice command</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full border-r border-white/5 bg-[#080808] flex flex-col overflow-hidden shrink-0 z-40"
          >
            <div className="p-6 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles size={18} className="text-white" />
                </div>
                <span className="font-display font-bold text-lg">Vedix AI</span>
              </Link>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg text-neutral-500 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
            </div>

            <div className="px-4 mb-6">
              <Button 
                onClick={() => setMessages([{ id: Date.now().toString(), role: "assistant", content: "New chat started.", timestamp: new Date() }])}
                className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] flex items-center gap-3 justify-start text-sm font-medium transition-all group"
              >
                <Plus size={18} className="text-primary group-hover:rotate-90 transition-all duration-300" />
                New Conversation
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-8 custom-scrollbar">
              <div>
                <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em] mb-4 ml-2">Recent Sessions</p>
                <div className="space-y-1">
                  {["Deep Learning Paper", "Financial Analysis", "Code Review: API", "Marketing Strategy"].map((item) => (
                    <button key={item} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all group">
                      <MessageSquare size={16} className="text-neutral-600 group-hover:text-primary transition-colors" />
                      <span className="truncate">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/5">
               <div className="flex items-center gap-3 px-2 py-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center text-[10px] font-bold">JD</div>
                  <div className="flex-1 min-w-0">
                     <p className="text-sm font-bold truncate">Professional User</p>
                     <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Ultra Tier</p>
                  </div>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><MoreVertical size={16} /></button>
               </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-6 border-b border-white/5 bg-background/50 backdrop-blur-3xl z-30 shrink-0">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <Layout size={20} className="text-primary" />
              </button>
            )}
            <div className="relative">
              <button 
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
              >
                <selectedModel.icon size={18} className="text-primary" />
                <span className="text-sm font-bold">{selectedModel.name}</span>
                <ChevronDown size={14} className={cn("text-neutral-500 transition-transform", modelDropdownOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {modelDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-3 w-80 rounded-3xl border border-white/10 bg-[#121212]/95 backdrop-blur-2xl p-2 z-[60] shadow-2xl"
                  >
                    {models.map((m) => (
                      <button
                        key={m.name}
                        onClick={() => { setSelectedModel(m); setModelDropdownOpen(false); }}
                        className={cn("w-full flex items-start gap-4 p-4 rounded-2xl transition-all group", selectedModel.name === m.name ? "bg-primary/10" : "hover:bg-white/5")}
                      >
                        <div className={cn("p-2.5 rounded-xl transition-colors", selectedModel.name === m.name ? "bg-primary text-white" : "bg-white/5 text-neutral-400 group-hover:bg-white/10")}>
                          <m.icon size={18} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold">{m.name}</p>
                          <p className="text-[10px] text-neutral-500 leading-tight mt-1">{m.desc}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowMemory(!showMemory)}
              className={cn("p-3 rounded-2xl border transition-all relative", showMemory ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white")}
            >
              <Brain size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </button>
            <button 
              onClick={() => setShowTerminal(!showTerminal)}
              className={cn("p-3 rounded-2xl border transition-all", showTerminal ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white")}
            >
              <Terminal size={20} />
            </button>
            <button 
              onClick={() => setShowAgentBoard(!showAgentBoard)}
              className={cn("p-3 rounded-2xl border transition-all", showAgentBoard ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white")}
            >
              <Users size={20} />
            </button>
            <button 
              onClick={() => setShowFormulaHelper(!showFormulaHelper)}
              className={cn("p-3 rounded-2xl border transition-all", showFormulaHelper ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white")}
            >
              <Table size={20} />
            </button>
            <button 
              onClick={() => setShowMathSolver(!showMathSolver)}
              className={cn("p-3 rounded-2xl border transition-all", showMathSolver ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white")}
            >
              <Calculator size={20} />
            </button>
            <button 
              onClick={() => setShowImageStudio(!showImageStudio)}
              className={cn("p-3 rounded-2xl border transition-all", showImageStudio ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white")}
            >
              <ImageIcon size={20} />
            </button>
            <button 
              onClick={() => setShowFinance(!showFinance)}
              className={cn("p-3 rounded-2xl border transition-all", showFinance ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white")}
            >
              <TrendingUp size={20} />
            </button>
            <button 
              onClick={() => setShowVideo(!showVideo)}
              className={cn("p-3 rounded-2xl border transition-all", showVideo ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white")}
            >
              <Video size={20} />
            </button>
            <button 
              onClick={() => setShowLegal(!showLegal)}
              className={cn("p-3 rounded-2xl border transition-all", showLegal ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white")}
            >
              <Scale size={20} />
            </button>
            <button 
              onClick={() => setShowWellness(!showWellness)}
              className={cn("p-3 rounded-2xl border transition-all", showWellness ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white")}
            >
              <Heart size={20} />
            </button>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <button 
               onClick={() => setWebSearchActive(!webSearchActive)}
               className={cn("flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all", webSearchActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/5 text-neutral-400 hover:bg-white/10")}
            >
               <SearchIcon size={16} />
               <span>Web Intelligence</span>
            </button>
          </div>
        </header>

        {/* Content Split */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredMsg(msg.id)}
                  onMouseLeave={() => setHoveredMsg(null)}
                  className={cn("flex gap-8 group relative", msg.role === "user" ? "bg-white/[0.02] border border-white/[0.04] p-6 rounded-3xl" : "")}
                >
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg", msg.role === "assistant" ? "bg-primary text-white" : "bg-neutral-800 text-neutral-400")}>
                    {msg.role === "assistant" ? <Sparkles size={20} /> : <span className="font-bold">U</span>}
                  </div>
                  <div className="flex-1 space-y-4 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">{msg.role === "assistant" ? "System Agent" : "Requester"}</span>
                      {msg.role === "assistant" && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-widest">Verified</span>}
                    </div>
                    <div className="text-neutral-200 text-base leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                    </div>
                    {msg.content.includes("```") && (
                      <button 
                        onClick={() => {
                          setShowTerminal(true);
                          setTerminalOutput([...terminalOutput, `> Executing block...`, `[OK] Finished in 240ms`]);
                          toast.success("Sandbox initialized");
                        }}
                        className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest hover:bg-primary/20 transition-all flex items-center gap-2 mt-4"
                      >
                        <Terminal size={14} /> Run in Sandbox
                      </button>
                    )}
                    {msg.role === "assistant" && (
                      <div className={cn("flex items-center gap-2 pt-4 transition-opacity", hoveredMsg === msg.id ? "opacity-100" : "opacity-0")}>
                        <button className="p-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl"><Copy size={16} /></button>
                        <button className="p-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl"><RefreshCw size={16} /></button>
                        <div className="w-[1px] h-4 bg-white/10 mx-2" />
                        <button className="p-2 text-neutral-500 hover:text-green-500 hover:bg-white/5 rounded-xl"><ThumbsUp size={16} /></button>
                        <button className="p-2 text-neutral-500 hover:text-red-500 hover:bg-white/5 rounded-xl"><ThumbsDown size={16} /></button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} className="h-10" />
            </div>
          </div>

          {/* Terminal Panel */}
          <AnimatePresence>
            {showTerminal && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 450, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex-none bg-[#0a0a0a] border-l border-white/5 flex flex-col overflow-hidden"
              >
                <div className="h-14 flex items-center justify-between px-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Terminal size={16} className="text-primary" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Sandbox.sh</span>
                  </div>
                  <button onClick={() => setShowTerminal(false)} className="p-2 hover:bg-white/5 rounded-xl"><X size={18} /></button>
                </div>
                <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto custom-scrollbar space-y-2">
                  {terminalOutput.map((l, i) => (
                    <div key={i} className={cn("leading-relaxed", l.startsWith(">") ? "text-primary" : l.startsWith("[OK]") ? "text-success" : "text-neutral-500")}>{l}</div>
                  ))}
                  <div className="text-white animate-pulse">_</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Memory Panel */}
          <AnimatePresence>
            {showMemory && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="absolute right-0 top-0 bottom-0 w-80 bg-[#111] border-l border-white/10 p-8 z-50 shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <Brain size={24} className="text-primary" />
                    <h3 className="font-display font-bold text-xl">Cognitive Memory</h3>
                  </div>
                  <button onClick={() => setShowMemory(false)}><X size={24} /></button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-6">
                  {memories.map((m) => (
                    <div key={m.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 group relative hover:border-primary/50 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-primary px-3 py-1 rounded-full bg-primary/10 uppercase tracking-widest">{m.category}</span>
                        <button onClick={() => setMemories(memories.filter(x => x.id !== m.id))} className="opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} className="text-red-500" /></button>
                      </div>
                      <p className="text-sm text-neutral-300 leading-relaxed">{m.text}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-4 rounded-2xl border border-dashed border-white/20 text-[11px] font-bold uppercase tracking-widest text-neutral-500 hover:border-primary hover:text-primary transition-all">Add Knowledge Point</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showAgentBoard && <AgentBoard onClose={() => setShowAgentBoard(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {showFormulaHelper && <FormulaHelper onClose={() => setShowFormulaHelper(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {showMathSolver && <MathSolver onClose={() => setShowMathSolver(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {showImageStudio && <ImageStudio onClose={() => setShowImageStudio(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {showFinance && <FinanceDashboard onClose={() => setShowFinance(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {showVideo && <VideoIntelligence onClose={() => setShowVideo(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {showLegal && <LegalAnalyzer onClose={() => setShowLegal(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {showWellness && <WellnessDashboard onClose={() => setShowWellness(false)} />}
        </AnimatePresence>

        {/* Input Bar */}
        <div className="p-6 bg-background/50 backdrop-blur-3xl border-t border-white/5 shrink-0">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-2xl group-hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100" />
            <div className="relative flex items-center gap-2 p-2 rounded-[2rem] bg-[#121212] border border-white/10 hover:border-white/20 transition-all focus-within:ring-2 ring-primary/20">
              <button onClick={() => setVoiceActive(true)} className="p-4 text-neutral-500 hover:text-primary transition-colors hover:bg-white/[0.03] rounded-2xl"><Mic size={22} /></button>
              <button className="p-4 text-neutral-500 hover:text-white transition-colors hover:bg-white/[0.03] rounded-2xl"><Paperclip size={22} /></button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder={`Tell ${selectedModel.name} anything...`}
                className="flex-1 bg-transparent border-none focus:ring-0 text-foreground text-base py-4 px-2"
              />
              <Button size="icon" onClick={handleSend} disabled={!input.trim()} className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"><Send size={24} /></Button>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-4 px-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
            <span>Accuracy Score: 98.4%</span>
            <span>Vedix AI can produce inaccuracies.</span>
            <span>Fact-Check Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
