import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: 0,
    desc: "Get started with the basics",
    features: ["50 messages/day", "GPT-4 level model", "Basic web search", "File uploads up to 10MB"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 12,
    yearlyPrice: 10,
    desc: "For power users who demand more",
    features: ["Unlimited messages", "All Vedix models incl. Ultra", "Real-time web search", "Code interpreter", "Image generation", "Memory & voice mode", "Priority speed"],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: null,
    desc: "Custom solutions for teams",
    features: ["All Pro features", "Custom model fine-tuning", "Full API access", "Team workspaces", "SSO & integrations", "SLA guarantee"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const navigate = useNavigate();

  return (
    <section id="pricing" className="relative py-24 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-sm ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-primary" : "bg-white/10"}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${annual ? "translate-x-6" : "translate-x-0.5"}`} />
            </button>
            <span className={`text-sm ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              Annual <span className="text-primary text-xs font-medium">Save 20%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.highlighted
                  ? "glass-card border-primary/30 glow-primary"
                  : "glass-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-primary text-primary-foreground rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-xl font-semibold text-foreground">{plan.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">{plan.desc}</p>

              <div className="mb-6">
                {plan.price !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-foreground">
                      ${annual && plan.yearlyPrice ? plan.yearlyPrice : plan.price}
                    </span>
                    {plan.price > 0 && <span className="text-sm text-muted-foreground">/mo</span>}
                    {annual && plan.yearlyPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">${plan.price}</span>
                    )}
                  </div>
                ) : (
                  <span className="font-display text-2xl font-bold text-foreground">Custom</span>
                )}
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-success mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => {
                  if (plan.name === "Enterprise") {
                    navigate("/contact");
                  } else {
                    navigate("/chat");
                  }
                }}
                className={`w-full font-display font-medium ${
                  plan.highlighted
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-white/[0.05] hover:bg-white/[0.08] text-foreground border border-white/[0.06]"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
