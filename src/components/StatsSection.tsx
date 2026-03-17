import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 200, suffix: "+", label: "AI Models Supported" },
  { value: 99.9, suffix: "%", label: "Uptime" },
  { value: 150, suffix: "+", label: "Languages" },
  { value: 10, suffix: "M+", label: "Daily Queries" },
  { value: 300, suffix: "ms", label: "Response Time", prefix: "<" },
  { value: 100, suffix: "K", label: "Token Context Window" },
];

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Number((eased * value).toFixed(value % 1 !== 0 ? 1 : 0)));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{/* label in parent */}</div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-20 border-y border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
