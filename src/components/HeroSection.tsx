import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ParticleBackground } from "./ParticleBackground";
import { Zap, Globe, Mic, Code, Brain, Database, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustBadges = [
  { icon: Brain, label: "GPT-5 Level Intelligence" },
  { icon: Sparkles, label: "Multimodal Understanding" },
  { icon: Globe, label: "Real-Time Web Access" },
  { icon: Mic, label: "Voice Enabled" },
  { icon: Code, label: "100% Accurate Code" },
  { icon: Database, label: "Data Science Ready" },
  { icon: Zap, label: "Free to Start" },
];

const transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] };

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      <ParticleBackground />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-primary border border-primary/20 rounded-full bg-primary/5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Now in Public Beta
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          <span className="text-gradient-primary">The Most Accurate</span>
          <br />
          <span className="text-foreground">AI Mind Ever Built</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.35 }}
          className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Powered by Advanced AI Â· Machine Learning Â· Data Science
          <br className="hidden sm:block" />
          â€” Smarter Than Any AI Before It
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
            <Button
              size="lg"
              onClick={() => navigate("/chat")}
              className="relative bg-primary hover:bg-primary/90 text-primary-foreground font-display font-semibold text-base px-8 py-6 rounded-xl"
            >
              Start for Free
            </Button>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => toast.success("Vedix Ultra Demo is being prepared!")}
            className="border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-foreground font-display font-medium text-base px-8 py-6 rounded-xl backdrop-blur-sm"
          >
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {trustBadges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.7 + i * 0.06 }}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground border border-white/[0.06] rounded-full bg-white/[0.02] backdrop-blur-sm"
            >
              <badge.icon size={12} className="text-primary/70" />
              {badge.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
