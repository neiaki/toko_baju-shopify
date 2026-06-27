"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/context/cart-context";
import { useLanguage } from "@/lib/context/language-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchDialog } from "@/components/search/search-dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";



export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { currency, setCurrency } = useCart();
  const { locale, setLocale, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.collections, href: "/collections/all" },
    { label: t.nav.kaos, href: "/collections/kaos" },
    { label: t.nav.kemeja, href: "/collections/kemeja" },
    { label: t.nav.celana, href: "/collections/celana" },
    { label: t.nav.sale, href: "/collections/sale" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="flex-1 md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger render={<button className="p-2 -ml-2" aria-label={t.nav.openMenu} />}>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-0 border-r-0">
              <SheetHeader className="p-6 text-left border-b border-border">
                <SheetTitle className="font-display text-2xl tracking-wider">
                  NEki Store
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-6 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium uppercase tracking-wide hover:text-brand-black/70 dark:hover:text-white/70 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex flex-1 items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wider text-foreground hover:text-brand-black/70 dark:hover:text-white/70 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <div className="flex-1 flex justify-center md:flex-none">
          <Link href="/" className="font-display text-2xl md:text-3xl tracking-[0.2em] font-bold text-foreground">
            NEki Store
          </Link>
        </div>

        {/* Icons */}
        <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
          {/* Language Selector */}
          <div className="flex items-center border border-border px-1.5 py-1 rounded bg-secondary/20 dark:bg-zinc-900/50">
            <button
              onClick={() => setLocale(locale === 'id' ? 'en' : 'id')}
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer text-foreground hover:opacity-70 transition-opacity px-1"
              aria-label={t.nav.selectLanguage}
              title={t.nav.selectLanguage}
            >
              <span className="text-base leading-none">{locale === 'id' ? '🇮🇩' : '🇬🇧'}</span>
              <span className="hidden sm:inline">{locale === 'id' ? 'ID' : 'EN'}</span>
            </button>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center border border-border px-1.5 py-1 rounded bg-secondary/20 dark:bg-zinc-900/50">
            <span className="text-base leading-none mr-1 font-semibold">{currency === 'IDR' ? 'Rp' : '$'}</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "IDR" | "USD")}
              className="bg-transparent text-xs font-bold uppercase tracking-wider outline-none cursor-pointer border-none ring-0 focus:ring-0 focus:border-0 text-foreground"
              aria-label={t.nav.selectCurrency}
            >
              <option value="IDR" className="bg-white dark:bg-black text-foreground">IDR</option>
              <option value="USD" className="bg-white dark:bg-black text-foreground">USD</option>
            </select>
          </div>
          <SearchDialog />
          <Link href="/account" className="p-2 hover:opacity-70 transition-opacity hidden md:block" aria-label={t.nav.account}>
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
