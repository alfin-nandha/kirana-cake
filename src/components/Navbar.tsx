"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useStore } from "./StoreProvider";

export default function Navbar() {
  const store = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!store) return null;

  const navLinks = [
    { label: "Beranda", href: "/#home" },
    { label: "Tentang", href: "/#about" },
    { label: "Produk", href: "/products" },
    { label: "Hubungi Kami", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/90 dark:bg-brand-dark-bg/90 backdrop-blur-md border-b border-brand-highlight/30 dark:border-brand-dark-border/60 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt={store.name}
            width={40}
            height={40}
            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
          />
          <span className="text-brand-heading dark:text-brand-highlight font-semibold text-lg tracking-wide transition-colors">
            {store.name.split(" by ")[0]}
            <span className="text-brand-button dark:text-brand-dark-muted"> by Mimi</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-text dark:text-brand-dark-muted hover:text-brand-button dark:hover:text-brand-highlight text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <a
            href={store.tokopediaUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-button hover:opacity-90 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brand-button/30 hover:-translate-y-0.5"
          >
            Beli di Tokopedia
          </a>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="text-brand-heading dark:text-brand-highlight transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-bg dark:bg-brand-dark-surface border-t border-brand-highlight/20 dark:border-brand-dark-border px-6 py-4 flex flex-col gap-4 transition-colors">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-brand-text dark:text-brand-dark-muted hover:text-brand-button text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={store.tokopediaUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-button hover:opacity-90 text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center transition-all"
          >
            Beli di Tokopedia
          </a>
        </div>
      )}
    </nav>
  );
}
