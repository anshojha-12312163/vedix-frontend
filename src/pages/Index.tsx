import { Link } from "react-router-dom";
import { SpotlightNavbar } from "@/components/SpotlightNavbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ModelsSection } from "@/components/ModelsSection";
import { PricingSection } from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 left-0 right-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <SpotlightNavbar />
        </div>
      </div>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ModelsSection />
      <PricingSection />
      <footer className="border-t border-white/[0.04] py-16 bg-black/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-left">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">V</span>
                </div>
                <span className="font-display font-bold text-sm">Vedix AI</span>
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Building the most accurate AI mind ever built. Smarter than anything before it.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link to="/chat" className="hover:text-primary">Chat Explorer</Link></li>
                <li><a href="#features" className="hover:text-primary">Features</a></li>
                <li><a href="#models" className="hover:text-primary">Models</a></li>
                <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Twitter</a></li>
                <li><a href="#" className="hover:text-primary">Discord</a></li>
                <li><a href="#" className="hover:text-primary">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-muted-foreground">
              Â© 2026 Vedix AI. All rights reserved.
            </p>
            <div className="flex gap-4">
               <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full border border-white/[0.04] bg-white/[0.02]">Status: Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
