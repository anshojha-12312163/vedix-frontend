import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Phone, Mail, Lock, Eye, EyeOff, Chrome, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-300, 300], [8, -8]), { stiffness: 150, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-8, 8]), { stiffness: 150, damping: 30 });

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/chat");
    }, 1800);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        console.log('Google login success, verifying with backend...', tokenResponse);
        // Note: useGoogleLogin by default returns an access token if flow is implicit 'token'.
        // For ID tokens, we usually need 'auth-code' flow or use the @react-oauth/google standard Button.
        // However, we can also use 'id_token' if we want.
        // For simplicity in this demo, we'll manually fetch user info if needed, 
        // OR we can use the credential from the standard button.
        // Let's assume we want to call our backend /api/auth/google.
        
        // Mocking the backend call for now since we don't have a real Client ID yet
        // In reality: 
        // const res = await fetch('http://localhost:3001/api/auth/google', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ credential: tokenResponse.access_token })
        // });
        // const data = await res.json();
        
        toast.success("Welcome, " + "User" + "! Access Granted.");
        navigate("/chat");
      } catch (err) {
        toast.error("Authentication failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      toast.error("Google Login Failed");
      setLoading(false);
    }
  });

  const socialButtonTilt = {
    initial: { rotateX: 0, rotateY: 0, scale: 1 },
    hover: (isGoogle: boolean) => ({
      rotateX: 15,
      rotateY: isGoogle ? -15 : 15,
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    })
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans bg-[#020204]">
      {/* High-End Unique 3D Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas3DBackground />
        
        {/* Dynamic Nebulas */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-indigo-600/20 blur-[140px]"
        />
        <motion.div
           animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-cyan-500/15 blur-[140px]"
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="relative z-10 w-full max-w-[440px] mx-4"
      >
        {/* Floating Effect Shadow */}
        <div className="absolute -inset-10 bg-violet-600/5 blur-[100px] rounded-full pointer-events-none opacity-50" />
        
        {/* Card glow */}
        <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/[0.15] via-white/[0.02] to-white/[0.1] pointer-events-none" />
        
        <div className="relative rounded-[2.5rem] bg-black/40 backdrop-blur-3xl border border-white/[0.08] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
          
          {/* Logo + Title */}
          <div className="flex flex-col items-center gap-7 mb-10 relative z-10">
            <motion.div
              animate={{ 
                rotateY: [0, 180, 360],
                boxShadow: ["0 0 20px rgba(124,58,237,0.3)", "0 0 50px rgba(6,182,212,0.4)", "0 0 20px rgba(124,58,237,0.3)"]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-violet-600 via-violet-500 to-cyan-400 flex items-center justify-center shadow-2xl relative"
            >
              <Sparkles size={28} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <div className="absolute inset-0 rounded-[1.25rem] border border-white/20" />
            </motion.div>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold text-white tracking-tight">Vedix <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Intelligence</span></h1>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-[0.3em]">The Nexus of Thought</p>
            </div>
          </div>
          
          {/* ... existing card contents (social, divider, form, footer) ... */}
          {/* Note: I'm keeping the internal structure the same but wrapping it in the new premium styles */}
          <div className="relative z-10">
          
          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8" style={{ perspective: "1000px" }}>
            <motion.button
              whileHover="hover"
              variants={socialButtonTilt}
              custom={true}
              onClick={() => googleLogin()}
              disabled={loading}
              className="relative flex items-center justify-center gap-2.5 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-violet-500/40 transition-all duration-300 group shadow-lg disabled:opacity-50"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Chrome size={16} className="text-neutral-500 group-hover:text-white transition-colors relative z-10" />
              <span className="text-xs font-semibold text-neutral-500 group-hover:text-white transition-colors relative z-10">Google</span>
            </motion.button>
            <motion.button
              whileHover="hover"
              variants={socialButtonTilt}
              custom={false}
              className="relative flex items-center justify-center gap-2.5 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 group shadow-lg"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Phone size={16} className="text-neutral-500 group-hover:text-white transition-colors relative z-10" />
              <span className="text-xs font-semibold text-neutral-500 group-hover:text-white transition-colors relative z-10">Phone No</span>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/[0.06]" />
            <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-[0.25em]">or enter credentials</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/[0.06]" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-500 ml-1 uppercase tracking-wider">Cloud Identity</label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within/input:text-violet-400 transition-colors" size={16} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="nexus@id.vedix.ai"
                  className="w-full h-12 bg-white/[0.02] border border-white/[0.08] rounded-xl pl-11 pr-4 text-sm text-white outline-none focus:border-violet-500/40 focus:bg-white/[0.04] transition-all placeholder:text-neutral-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-neutral-500 ml-1 uppercase tracking-wider">Encryption Key</label>
                <a href="#" className="text-[10px] font-bold text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-wider">Recalibrate?</a>
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within/input:text-violet-400 transition-colors" size={16} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  className="w-full h-12 bg-white/[0.02] border border-white/[0.08] rounded-xl pl-11 pr-11 text-sm text-white outline-none focus:border-violet-500/40 focus:bg-white/[0.04] transition-all placeholder:text-neutral-700 font-mono"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-13 rounded-xl bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-600 hover:bg-pos-100 bg-size-200 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-500 gap-3 group"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : (
                <>
                  Establish Connection
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <span className="text-xs text-neutral-600">New to the nexus? </span>
            <a href="#" className="text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-wider">Initiate Identity</a>
          </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom brand */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-10">
        <div className="flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[9px] font-bold text-neutral-600 uppercase tracking-[0.4em]"
          >
            Vedix Global Network v2.0.4
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function Canvas3DBackground() {
  const canvasRef = (el: HTMLCanvasElement | null) => {
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    el.width = width;
    el.height = height;

    // Drifting Neural Nodes
    const nodes: {x: number, y: number, vx: number, vy: number, s: number}[] = [];
    for (let i = 0; i < 60; i++) {
       nodes.push({
         x: Math.random() * width,
         y: Math.random() * height,
         vx: (Math.random() - 0.5) * 0.4,
         vy: (Math.random() - 0.5) * 0.4,
         s: Math.random() * 1.5 + 0.5
       });
    }

    // Floating Glass Shards
    const shards: {x: number, y: number, r: number, points: {x: number, y: number}[], v: number, rv: number}[] = [];
    for (let i = 0; i < 8; i++) {
       const pts = [];
       const sides = 3 + Math.floor(Math.random() * 3);
       const radius = 40 + Math.random() * 60;
       for(let j=0; j<sides; j++) {
          const angle = (j / sides) * Math.PI * 2;
          const dist = radius * (0.6 + Math.random() * 0.4);
          pts.push({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
       }
       shards.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * Math.PI * 2,
          points: pts,
          v: 0.1 + Math.random() * 0.2,
          rv: (Math.random() - 0.5) * 0.005
       });
    }

    let mouse = { x: width/2, y: height/2 };
    const handlePointer = (e: MouseEvent) => {
       mouse.x = e.clientX;
       mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handlePointer);

    let animationFrame: number;

    const animate = () => {
      ctx.fillStyle = '#020204';
      ctx.fillRect(0, 0, width, height);

      // Draw Neural Network
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
      ctx.lineWidth = 0.5;
      nodes.forEach((n, i) => {
         n.x += n.vx + (mouse.x - width/2) * 0.0005;
         n.y += n.vy + (mouse.y - height/2) * 0.0005;
         if(n.x < 0) n.x = width; if(n.x > width) n.x = 0;
         if(n.y < 0) n.y = height; if(n.y > height) n.y = 0;

         ctx.fillStyle = `rgba(139, 92, 246, ${0.1 + n.s * 0.1})`;
         ctx.beginPath();
         ctx.arc(n.x, n.y, n.s, 0, Math.PI * 2);
         ctx.fill();

         for(let j=i+1; j<nodes.length; j++) {
            const n2 = nodes[j];
            const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
            if(dist < 150) {
              ctx.globalAlpha = 1 - dist/150;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
         }
      });
      ctx.globalAlpha = 1;

      // Draw Glass Shards
      shards.forEach(s => {
         s.x += s.v * Math.cos(s.r) + (mouse.x - width/2) * 0.0003;
         s.y += s.v * Math.sin(s.r) + (mouse.y - height/2) * 0.0003;
         s.r += s.rv;
         if(s.x < -100) s.x = width + 100; if(s.x > width + 100) s.x = -100;
         if(s.y < -100) s.y = height + 100; if(s.y > height + 100) s.y = -100;

         ctx.save();
         ctx.translate(s.x, s.y);
         ctx.rotate(s.r);
         
         // Glass fill
         ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
         ctx.beginPath();
         ctx.moveTo(s.points[0].x, s.points[0].y);
         s.points.forEach(p => ctx.lineTo(p.x, p.y));
         ctx.closePath();
         ctx.fill();

         // Glass outline
         ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
         ctx.lineWidth = 1;
         ctx.stroke();

         // Lighting highlight
         const gradient = ctx.createLinearGradient(-50, -50, 50, 50);
         gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
         gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
         gradient.addColorStop(1, 'rgba(6, 182, 212, 0.1)');
         ctx.fillStyle = gradient;
         ctx.fill();

         ctx.restore();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      el.width = width;
      el.height = height;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointer);
    };
  };

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
