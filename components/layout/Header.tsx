"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#client-work" },
  { name: "Learn Python", href: "/learn/python" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

type Theme = "light" | "dark";
let cachedTheme: Theme | undefined;
function getTheme(): Theme {
  if (cachedTheme) return cachedTheme;
  try { cachedTheme = localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark"; }
  catch { cachedTheme = "dark"; }
  return cachedTheme;
}
function subscribeTheme(notify: () => void) {
  const storageChanged = (event: StorageEvent) => {
    if (event.key === "portfolio-theme" || event.key === null) {
      cachedTheme = event.newValue === "light" ? "light" : "dark";
      notify();
    }
  };
  window.addEventListener("storage", storageChanged);
  window.addEventListener("portfolio-theme-change", notify);
  return () => {
    window.removeEventListener("storage", storageChanged);
    window.removeEventListener("portfolio-theme-change", notify);
  };
}
function subscribeScroll(notify: () => void) {
  window.addEventListener("scroll", notify, { passive: true });
  return () => window.removeEventListener("scroll", notify);
}
const serverTheme = (): Theme => "dark";
const getScrolled = () => window.scrollY > 20;
const serverScrolled = () => false;

export function Header({ compact = false }: { compact?: boolean }) {
  const items = compact ? [{ name: "Portfolio", href: "/#home" }, { name: "Learning guide", href: "#learning-guide" }] : navItems;
  const linkHref = (href: string) => href.startsWith("#") ? (compact ? "/learn/python" : "/") + href : href;
  const isScrolled = useSyncExternalStore(subscribeScroll, getScrolled, serverScrolled);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, getTheme, serverTheme);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); }, [theme]);
  useEffect(() => {
    const media = window.matchMedia(compact ? "(min-width: 768px)" : "(min-width: 1280px)");
    const closeOnDesktop = () => { if (media.matches) setIsMobileMenuOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, [compact]);
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("button, a")?.focus());
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setIsMobileMenuOpen(false); }
      if (event.key !== "Tab") return;
      const items = menuRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => { cancelAnimationFrame(frame); document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", handleKey); trigger?.focus(); };
  }, [isMobileMenuOpen]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    cachedTheme = next;
    try { localStorage.setItem("portfolio-theme", next); } catch { /* Switching still works without storage. */ }
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }
  function navigate(event: React.MouseEvent<HTMLAnchorElement>, hash: string) {
    setIsMobileMenuOpen(false);
    if (!hash.startsWith("#") || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const section = document.querySelector(hash);
    if (section) {
      event.preventDefault();
      section.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      history.replaceState(null, "", hash);
    }
  }

  return <>
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .55 }} className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className={cn("pointer-events-auto flex items-center justify-between gap-4 px-5 py-3 rounded-full border border-border w-full max-w-6xl transition-colors", isScrolled ? "bg-card/90 backdrop-blur-xl shadow-lg" : "bg-card/70 backdrop-blur-md")}>
        <Link href="/#home" onClick={event => navigate(event, "#home")} aria-label="Nisan Awa, home" className="flex items-center gap-2 group"><span className="w-9 h-9 rounded-full bg-foreground text-background grid place-items-center font-black text-sm">NA</span><span className="text-sm font-bold tracking-widest uppercase">Nisan</span></Link>
        <nav aria-label="Main navigation" className={cn("hidden items-center gap-1", compact ? "md:flex" : "xl:flex")}>{items.map(item => <Link key={item.name} href={linkHref(item.href)} onClick={event => navigate(event, item.href)} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-full transition-colors">{item.name}</Link>)}</nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} aria-label="Toggle light and dark theme" className="text-foreground w-11 h-11 grid place-items-center hover:bg-secondary rounded-full border border-border">{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button ref={triggerRef} aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation" className={cn("w-11 h-11 grid place-items-center text-foreground hover:bg-secondary rounded-full", compact ? "md:hidden" : "xl:hidden")} onClick={() => setIsMobileMenuOpen(open => !open)}>{isMobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
    </motion.header>
    <AnimatePresence>{isMobileMenuOpen && <motion.div ref={menuRef} role="dialog" aria-modal="true" aria-label="Site navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={cn("fixed inset-3 z-[60] bg-card/95 backdrop-blur-2xl rounded-3xl border border-border flex flex-col items-center justify-start overflow-y-auto p-6", compact ? "md:hidden" : "xl:hidden")}>
      <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close navigation" className="absolute top-5 right-5 w-11 h-11 grid place-items-center text-muted-foreground hover:text-primary"><X size={28} /></button>
      <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col items-center gap-4 py-14 my-auto">{items.map(item => <Link key={item.name} href={linkHref(item.href)} onClick={event => navigate(event, item.href)} className="text-2xl sm:text-3xl font-bold text-muted-foreground hover:text-primary">{item.name}</Link>)}</nav>
    </motion.div>}</AnimatePresence>
  </>;
}
