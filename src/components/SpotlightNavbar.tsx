"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
  defaultActiveIndex?: number;
}

export function SpotlightNavbar({
  items = [
    { label: "Features", href: "#features" },
    { label: "Models", href: "#models" },
    { label: "Pricing", href: "#pricing" },
    { label: "Explore", href: "/chat" },
    { label: "Contact", href: "/contact" },
  ],
  className,
  onItemClick,
  defaultActiveIndex = 0,
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const navigate = useNavigate();

  // Refs for the "light" positions so we can animate them imperatively
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      // Direct update for immediate feedback
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      // When mouse leaves, spring the spotlight back to the active item
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;
        
        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          }
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // Handle the "Ambience" (Active Item) Movement
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  const handleItemClick = (item: NavItem, index: number) => {
    setActiveIndex(index);
    onItemClick?.(item, index);
  };

  return (
    <div className={cn("relative flex justify-center", className)}>
      <nav
        ref={navRef}
        className={cn(
          "spotlight-nav spotlight-nav-bg glass-border spotlight-nav-shadow",
          "relative h-14 px-6 rounded-full transition-all duration-300 overflow-hidden",
          "bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]",
          "flex items-center gap-8"
        )}
      >
        {/* LOGO */}
        <Link to="/" className="relative flex items-center gap-2.5 group z-[11]">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-lg bg-primary/30 blur-md group-hover:bg-primary/50 transition-colors" />
            <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="font-display text-[10px] font-bold text-primary-foreground">V</span>
            </div>
          </div>
          <span className="font-display text-sm font-semibold text-foreground tracking-tight whitespace-nowrap">
            Vedix AI
          </span>
        </Link>

        {/* Content */}
        <ul className="relative flex items-center h-full gap-2 z-[10]">
          {items.map((item, idx) => (
            <li key={idx} className="relative h-full flex items-center justify-center">
              <a
                href={item.href}
                data-index={idx}
                onClick={(e) => {
                  const target = e.currentTarget.getAttribute('href');
                  if (target?.startsWith('#')) {
                    e.preventDefault();
                    const element = document.querySelector(target);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    e.preventDefault();
                    navigate(item.href);
                  }
                  handleItemClick(item, idx);
                }}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors duration-200 rounded-full",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/30",
                  // Active vs Inactive Text
                  activeIndex === idx
                    ? "text-black dark:text-white"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="relative z-[11] flex items-center gap-4">
          <button 
            onClick={() => navigate("/signin")}
            className="text-[11px] text-neutral-500 hover:text-foreground transition-colors font-medium"
          >
            Sign In
          </button>
          <Button
            size="sm"
            onClick={() => navigate("/signin")}
            className="h-8 px-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold text-[11px] rounded-full glow-primary"
          >
            Get Started
          </Button>
        </div>

        {/* LIGHTING LAYERS */}
        {/* 1. The Moving Spotlight (Follows Mouse) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
          style={{ 
            opacity: hoverX !== null ? 1 : 0,
            background: `
              radial-gradient(
                120px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color, rgba(255,255,255,0.15)) 0%, 
                transparent 50%
              )
            `
          }}
        />

        {/* 2. The Active State Ambience (Stays on Active) */}
        <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
            style={{
                background: `
                  radial-gradient(
                    60px circle at var(--ambience-x) 0%, 
                    var(--ambience-color, rgba(255,255,255,1)) 0%, 
                    transparent 100%
                  )
                `
            }}
        />
        
        {/* 3. Bottom Border Track (Subtle) */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200 dark:bg-white/[0.1] z-0" />
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .spotlight-nav {
          --spotlight-color: rgba(255,255,255,0.15);
          --ambience-color: rgba(255,255,255,1);
        }
      `}} />
    </div>
  ); 
}
