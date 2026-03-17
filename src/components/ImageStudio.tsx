import { motion, AnimatePresence } from "framer-motion";
import { 
  Image as ImageIcon, Download, Share2, Wand2, 
  Trash2, X, Sparkles, Layers, Sliders, Maximize
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const styles = [
  { name: "Photorealistic", id: "photo" },
  { name: "Digital Art", id: "digital" },
  { name: "Cyberpunk", id: "cyber" },
  { name: "Oil Painting", id: "oil" },
  { name: "Anime", id: "anime" },
  { name: "3D Render", id: "3d" }
];

export function ImageStudio({ onClose }: { onClose: () => void }) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("photo");
  const [aiDescription, setAiDescription] = useState<string | null>(null);

  const generate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setGeneratedImage(null);
    setAiDescription(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/image/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Style: ${selectedStyle}. ${prompt}`, action: "generate" }),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setAiDescription(data.text);
      setGeneratedImage("https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop");
      toast.success("Image concept generated!");
    } catch {
      toast.error("Backend offline");
    }
    setGenerating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed inset-y-10 left-10 right-10 z-[140] bg-[#0c0c0c]/95 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl flex overflow-hidden"
    >
      {/* Sidebar Controls */}
      <div className="w-80 border-r border-white/5 p-8 flex flex-col gap-8 custom-scrollbar overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
            <ImageIcon className="text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg">Image Studio</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Generative AI Engine</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Image Style</label>
          <div className="grid grid-cols-2 gap-2">
            {styles.map(s => (
              <button 
                key={s.id}
                onClick={() => setSelectedStyle(s.id)}
                className={cn(
                  "px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border",
                  selectedStyle === s.id ? "bg-primary/20 border-primary/30 text-primary" : "bg-white/[0.02] border-white/5 text-neutral-500 hover:bg-white/[0.05]"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Resolution</label>
          <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-neutral-400 outline-none">
            <option>1024 x 1024 (1:1)</option>
            <option>1920 x 1080 (16:9)</option>
            <option>1080 x 1920 (9:16)</option>
          </select>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Enhancements</label>
              <Sparkles size={12} className="text-primary" />
           </div>
           <div className="space-y-2">
              {["Upscale (4K)", "Face Restoration", "Style Transfer", "Background Removal"].map(item => (
                 <label key={item} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-neutral-400 group cursor-pointer hover:bg-white/5">
                    {item}
                    <div className="w-8 h-4 rounded-full bg-neutral-800 relative">
                       <div className="absolute left-1 top-1 bottom-1 w-2 rounded-full bg-neutral-600" />
                    </div>
                 </label>
              ))}
           </div>
        </div>

        <div className="mt-auto">
          <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-widest h-12 rounded-2xl">
             View Art Gallery
          </Button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col bg-black/40">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 z-10">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
                 <Layers size={14} /> Layers (1)
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
                 <Sliders size={14} /> Adjustments
              </div>
           </div>
           <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all"><X /></button>
        </header>

        <div className="flex-1 flex items-center justify-center p-12 overflow-hidden relative">
           <AnimatePresence mode="wait">
              {generating ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6"
                >
                   <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                   <div className="text-center space-y-2">
                      <p className="text-xl font-display font-bold text-foreground">Dreaming in Pixels...</p>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest animate-pulse">Rendering Diffusions v8.2</p>
                   </div>
                </motion.div>
              ) : generatedImage ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 max-h-full"
                >
                   <img src={generatedImage} alt="Generated" className="object-contain max-h-[60vh] rounded-[2rem]" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                      <Button className="rounded-full w-12 h-12 p-0 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20"><Download size={20} /></Button>
                      <Button className="rounded-full w-12 h-12 p-0 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20"><Share2 size={20} /></Button>
                      <Button className="rounded-full w-12 h-12 p-0 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20"><Maximize size={20} /></Button>
                      <Button variant="destructive" className="rounded-full w-12 h-12 p-0 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-xl border border-red-500/20" onClick={() => setGeneratedImage(null)}><Trash2 size={20} /></Button>
                   </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-8 opacity-30 select-none"
                >
                   <div className="w-32 h-32 rounded-[2.5rem] border-2 border-dashed border-white/10 flex items-center justify-center">
                      <ImageIcon size={48} className="text-neutral-500" />
                   </div>
                   <p className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-500">Canvas Ready for Generation</p>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        <div className="p-10 border-t border-white/5 bg-[#080808]/50">
           <div className="max-w-4xl mx-auto relative">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic solarpunk city with floating gardens and neon rivers, 8k resolution, cinematic lighting..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 pr-40 text-sm focus:border-primary/50 focus:ring-4 ring-primary/5 outline-none resize-none h-24 transition-all"
              />
              <Button 
                onClick={generate}
                disabled={generating || !prompt.trim()}
                className="absolute right-3 bottom-3 top-3 px-8 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 h-auto"
              >
                 <Wand2 size={16} /> Generate Art
              </Button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
