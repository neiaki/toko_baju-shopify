"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X, Minus, Plus, Tag } from "lucide-react";
import { useCart } from "@/lib/context/cart-context";
import { formatPrice } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { cart, removeItem, updateQuantity, applyDiscount, total } = useCart();
  const { items, totalQuantity, subtotal, discountAmount } = cart;
  const [isOpen, setIsOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountStatus, setDiscountStatus] = useState<"idle" | "success" | "error">("idle");

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountCode.trim()) return;
    
    const success = applyDiscount(discountCode);
    setDiscountStatus(success ? "success" : "error");
  };

  const handleCheckout = () => {
    if (cart.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    } else {
      alert("Checkout URL tidak tersedia.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger render={<button className="p-2 hover:opacity-70 transition-opacity relative" aria-label="Keranjang" />}>
        <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
        {totalQuantity > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-brand-red text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-scale-in">
            {totalQuantity}
          </span>
        )}
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="font-display text-2xl tracking-wider flex items-center justify-between">
            <span>Keranjang Belanja</span>
            <span className="text-sm font-body font-normal text-muted-foreground tracking-normal bg-secondary px-2 py-1 rounded">
              {totalQuantity} Item
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium">Keranjang masih kosong</p>
            <p className="text-muted-foreground text-sm max-w-[250px]">
              Kelihatannya Anda belum menambahkan barang ke keranjang belanja Anda.
            </p>
            <Button 
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-none px-8 uppercase tracking-wider font-bold"
            >
              Mulai Belanja
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  {/* Item Image */}
                  <Link 
                    href={`/products/${item.handle}`} 
                    className="relative w-20 h-24 bg-secondary flex-shrink-0 border border-border"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>

                  {/* Item Details */}
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link 
                          href={`/products/${item.handle}`} 
                          className="font-medium text-sm hover:underline"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.variantTitle}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-brand-red transition-colors p-1"
                        aria-label="Hapus item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-border h-8">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 flex items-center justify-center hover:bg-secondary transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      {/* Item Price */}
                      <div className="text-right">
                        {item.compareAtPrice && (
                          <div className="text-xs text-muted-foreground line-through">
                            {formatPrice(item.compareAtPrice * item.quantity)}
                          </div>
                        )}
                        <div className={item.compareAtPrice ? "text-brand-red font-semibold text-sm" : "font-semibold text-sm"}>
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="p-6 bg-secondary/30 border-t border-border space-y-4">
              {/* Discount Code */}
              <form onSubmit={handleApplyDiscount} className="flex gap-2 relative">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Kode diskon (coba 'DISKON10')" 
                    className="pl-9 bg-background rounded-none border-border"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value);
                      setDiscountStatus("idle");
                    }}
                  />
                </div>
                <Button type="submit" variant="outline" className="rounded-none border-border">
                  Terapkan
                </Button>
                
                {discountStatus === "error" && (
                  <p className="absolute -bottom-5 left-0 text-[10px] text-brand-red font-medium">
                    Kode diskon tidak valid
                  </p>
                )}
                {discountStatus === "success" && (
                  <p className="absolute -bottom-5 left-0 text-[10px] text-green-600 font-medium">
                    Diskon berhasil diterapkan!
                  </p>
                )}
              </form>

              {/* Summary */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Diskon</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border/50">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="pt-4">
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-none h-12 text-sm uppercase tracking-widest font-bold"
                >
                  Checkout ({formatPrice(total)})
                </Button>
                <p className="text-[10px] text-center text-muted-foreground mt-3 tracking-wide">
                  Pajak dan ongkos kirim dihitung saat checkout
                </p>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
