import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SpotlightNavbar } from "@/components/SpotlightNavbar";

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="fixed top-4 left-0 right-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <SpotlightNavbar defaultActiveIndex={4} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Let's <span className="text-gradient-primary">Connect</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Have questions about Vedix AI? Our team is here to help you build the future.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@vedix.ai", color: "text-primary" },
                { icon: Phone, label: "Phone", value: "+1 (555) 000-0000", color: "text-accent" },
                { icon: MapPin, label: "Office", value: "San Francisco, CA", color: "text-primary" },
                { icon: MessageSquare, label: "Support", value: "24/7 AI Assistance", color: "text-accent" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors">
                    <item.icon className={cn("w-5 h-5", item.color)} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-white/[0.06] relative overflow-hidden group">
               <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
               <h3 className="text-lg font-semibold text-foreground mb-2">Immediate Assistance?</h3>
               <p className="text-sm text-muted-foreground mb-4">
                 Our AI agents are available 24/7 in the chat interface for instant support.
               </p>
               <Button 
                variant="outline" 
                onClick={() => navigate("/chat")}
                className="rounded-full border-white/[0.1] hover:bg-white/[0.05]"
               >
                 Go to Chat
               </Button>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl relative"
          >
            <form 
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent! We'll get back to you soon.");
                (e.target as HTMLFormElement).reset();
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">First Name</label>
                  <Input 
                    required
                    placeholder="John" 
                    className="bg-white/[0.03] border-white/[0.08] rounded-xl focus:ring-primary/20" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Last Name</label>
                  <Input 
                    required
                    placeholder="Doe" 
                    className="bg-white/[0.03] border-white/[0.08] rounded-xl focus:ring-primary/20" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                <Input 
                  required
                  type="email" 
                  placeholder="john@example.com" 
                  className="bg-white/[0.03] border-white/[0.08] rounded-xl focus:ring-primary/20" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Message</label>
                <Textarea 
                  required
                  placeholder="How can we help you?" 
                  rows={5}
                  className="bg-white/[0.03] border-white/[0.08] rounded-xl focus:ring-primary/20 resize-none" 
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold glow-primary transition-all"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// Helper for cn (could also import from @/lib/utils if needed, but keeping it standalone for simplicity in new files)
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
