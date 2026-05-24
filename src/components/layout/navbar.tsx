"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, User, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/context/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchDialog } from "@/components/search/search-dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Koleksi", href: "/collections/all" },
  { label: "Kaos", href: "/collections/kaos" },
  { label: "Kemeja", href: "/collections/kemeja" },
  { label: "Celana", href: "/collections/celana" },
  { label: "Sale", href: "/collections/sale" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
  const totalQuantity = cart.totalQuantity;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <SheetTrigger render={<button className="p-2 -ml-2" aria-label="Buka menu" />}>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-0 border-r-0">
              <SheetHeader className="p-6 text-left border-b border-border">
                <SheetTitle className="font-display text-2xl tracking-wider">
                  TOKO FASHION
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-6 space-y-6">
                {NAV_LINKS.map((link) => (
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
          {NAV_LINKS.map((link) => (
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
            TOKO FASHION
          </Link>
        </div>

        {/* Icons */}
        <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
          <SearchDialog />
          <Link href="/account" className="p-2 hover:opacity-70 transition-opacity hidden md:block" aria-label="Akun">
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
