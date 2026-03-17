import { motion } from "framer-motion";
import {
  Globe, Code, BarChart3, Image, FileText, Mic,
  Brain, Users, Calculator, PenTool, Languages, Layers,
  ShieldCheck, Search, Database, Share2, FolderOpen, 
  Presentation, Layout, History, Lightbulb, TrendingUp, Zap
} from "lucide-react";

const features = [
  { icon: Globe, title: "Real-Time Web Search", desc: "Live internet search with cited sources, date stamps, and URL scanning animation." },
  { icon: Code, title: "Code Interpreter", desc: "Run Python, JS, TypeScript, Bash, and SQL in a dark terminal sandbox with colored output." },
  { icon: BarChart3, title: "Data Science & ML", desc: "Advanced statistical analysis, ML models, and interactive chart visualizations from your data." },
  { icon: Image, title: "Image Generation", desc: "Generate photorealistic art or edit existing images (upscale, remove background, change styles)." },
  { icon: FileText, title: "Document Intelligence", desc: "PDF, Word, PPT analysisâ€”extract tables, summarize, or translate structured data instantly." },
  { icon: Mic, title: "Voice Conversations", desc: "Pulsing waveform orb for real-time speech-to-text with multiple natural voice styles." },
  { icon: Brain, title: "Memory & Context", desc: "Persistent memory panel to view and edit saved preferences, projects, and communication tone." },
  { icon: Users, title: "Multi-Agent Workflows", desc: "Autonomous agents that browse, code, and execute multi-step tasks on a live agent task board." },
  { icon: Calculator, title: "Math & Science Solver", desc: "Step-by-step KaTeX solutions for algebra, calculus, physics, and bio with accordion steps." },
  { icon: PenTool, title: "Writing Assistant", desc: "Specialized modes for Blogs, Essays, Legal Drafts, and Scripts with targeted tone rules." },
  { icon: Languages, title: "150+ Languages", desc: "Translation with dialect options, flag selectors, and cultural context explanations." },
  { icon: Layers, title: "Canvas Mode", desc: "Split-screen Monaco editor for live document/code collaboration with one-click export." },
  { icon: Share2, title: "API Playground", desc: "Postman-style interface for testing Vedix APIs with request builders and code snippets." },
  { icon: FolderOpen, title: "Projects & Workspace", desc: "Organize chats into color-coded folders with shared memory and PDF/Markdown export." },
  { icon: Layout, title: "Explore Library", desc: "Curated prompt template cards by category (Coding, Finance, Legal) with instantTry It buttons." },
  { icon: ShieldCheck, title: "Accuracy Indicators", desc: "Confidence badges, fact-check buttons, and source footnotes on every AI response." },
  { icon: Presentation, title: "Presentation Builder", desc: "Generate PPTX structures from topics with titles, speaker notes, and design layout suggestions." },
  { icon: Lightbulb, title: "Brainstorming Maps", desc: "Interactive visual mind maps with expandable branches, color-coded nodes, and export." },
  { icon: History, title: "AI Time Machine", desc: "Immersive historical deep-dives with timelines, primary source quotes, and map context." },
  { icon: TrendingUp, title: "SEO Strategy", desc: "Analyze keywords, suggest content ideas, and scores meta descriptions for performance." },
  { icon: Database, title: "Formula Helper", desc: "Plain-English requests to perfect Excel or Google Sheets formulas with logic explanations." },
  { icon: Zap, title: "Coding Assistant", desc: "Full IDE intelligence for debugging, refactoring, and generating pull requests." },
  { icon: Search, title: "Summarization Tool", desc: "Digest books, research papers, or YouTube URLs into key points and actionable takeaways." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Everything You Need. <span className="text-gradient-primary">Nothing You Don't.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            A complete World-Level AI ecosystem with specialized tools for every professional and creative workflow.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-hover p-6 group cursor-default h-full flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                <f.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                {f.desc}
              </p>
              <div className="mt-4 pt-4 border-t border-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    Learn More <Zap size={10} />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
