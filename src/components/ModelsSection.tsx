import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Zap, Cpu, Eye, Code, FlaskConical, Search, Sparkles } from "lucide-react";

const models = [
  { name: "Vedix Ultra", desc: "Maximum intelligence for complex problems", icon: Sparkles, speed: 3, intel: 5, ctx: "100K", tier: "Flagship" },
  { name: "Vedix Pro", desc: "Fast and smart for everyday tasks", icon: Cpu, speed: 4, intel: 4, ctx: "64K", tier: "Standard" },
  { name: "Vedix Flash", desc: "Instant responses for simple questions", icon: Zap, speed: 5, intel: 3, ctx: "32K", tier: "Fast" },
  { name: "Vedix Vision", desc: "Image and video understanding", icon: Eye, speed: 3, intel: 4, ctx: "32K", tier: "Multimodal" },
  { name: "Vedix Code", desc: "Programming and development", icon: Code, speed: 4, intel: 5, ctx: "64K", tier: "Specialized" },
  { name: "Vedix Science", desc: "Math, physics, and chemistry", icon: FlaskConical, speed: 3, intel: 5, ctx: "64K", tier: "Specialized" },
  { name: "Vedix Research", desc: "Deep web search and analysis", icon: Search, speed: 2, intel: 5, ctx: "100K", tier: "Research" },
];

function RatingBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`h-1 w-4 rounded-full ${i < value ? "bg-primary" : "bg-white/[0.06]"}`}
        />
      ))}
    </div>
  );
}

export function ModelsSection() {
  const navigate = useNavigate();
  return (
    <section id="models" className="relative py-24 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose Your Model
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Seven specialized models, each optimized for different tasks.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {models.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                toast.success(`Starting chat with ${m.name}`);
                navigate("/chat", { state: { selectedModel: m.name } });
              }}
              className="glass-card-hover p-5 flex flex-col gap-4 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <m.icon size={20} className="text-primary" />
                </div>
                <span className="text-[10px] font-mono font-medium tracking-wider uppercase text-primary/70 border border-primary/20 rounded-full px-2 py-0.5">
                  {m.tier}
                </span>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">{m.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
              </div>
              <div className="space-y-2 mt-auto pt-3 border-t border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Speed</span>
                  <RatingBar value={m.speed} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Intel</span>
                  <RatingBar value={m.intel} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Context</span>
                  <span className="text-xs font-mono text-muted-foreground">{m.ctx}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
