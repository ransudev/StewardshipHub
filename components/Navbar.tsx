"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/game", label: "Game" },
  { href: "/gallery", label: "Gallery" },
  { href: "/facts", label: "Facts" },
  { href: "/about", label: "About" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const isHomeTop = pathname === "/" && !isScrolled;
  const hideOnHero = pathname === "/" && !isScrolled;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-50 w-full border-b border-[var(--border)] backdrop-blur-md transition-all duration-300",
        isHomeTop
          ? "bg-black/20"
          : "bg-[color:color-mix(in_srgb,var(--background)_90%,transparent)] shadow-[0_10px_24px_rgba(10,20,12,0.35)]"
        ,
        hideOnHero ? "pointer-events-none -translate-y-2 opacity-0" : "pointer-events-auto translate-y-0 opacity-100"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-2 text-2xl font-bold transition-colors duration-200",
            isHomeTop
              ? "text-[color:color-mix(in_srgb,var(--card)_88%,var(--accent)_12%)] hover:text-[var(--card)]"
              : "text-[var(--foreground)] hover:text-[var(--primary)]"
          )}
        >
          <span
            className={cn(
              "rounded-full p-2 backdrop-blur transition-colors duration-300",
              isHomeTop
                ? "bg-[color:color-mix(in_srgb,var(--card)_22%,transparent)] text-[var(--card)]"
                : "bg-[color:color-mix(in_srgb,var(--secondary)_70%,var(--card)_30%)] text-[var(--primary)]"
            )}
          >
            <Leaf className="h-5 w-5" />
          </span>
          Stewardship Hub
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "border-b-2 border-transparent py-1 text-sm font-semibold transition-colors duration-200",
                isHomeTop
                  ? "text-[color:color-mix(in_srgb,var(--foreground)_85%,var(--card)_15%)] hover:text-[var(--primary)]"
                  : "text-[var(--foreground)] hover:text-[var(--primary)]",
                isActive(link.href) && "border-[var(--primary)] text-[var(--primary)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
