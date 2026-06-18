"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl uppercase tracking-wider mb-2">
            {isLogin ? "Masuk" : "Daftar"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Masuk ke akun Toko Fashion Anda" 
              : "Buat akun untuk checkout lebih cepat dan lihat riwayat pesanan"}
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()} suppressHydrationWarning>
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input placeholder="Nama Depan" className="rounded-none bg-background border-border h-12" />
              </div>
              <div className="space-y-2">
                <Input placeholder="Nama Belakang" className="rounded-none bg-background border-border h-12" />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Input suppressHydrationWarning type="email" placeholder="Email" className="rounded-none bg-background border-border h-12" />
          </div>
          
          <div className="space-y-2">
            <Input suppressHydrationWarning type="password" placeholder="Password" className="rounded-none bg-background border-border h-12" />
          </div>

          <Button className="w-full bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-none h-12 mt-6 font-bold uppercase tracking-widest text-sm">
            {isLogin ? "Masuk" : "Daftar"}
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-border pt-8">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-medium hover:underline"
          >
            {isLogin 
              ? "Belum punya akun? Daftar di sini" 
              : "Sudah punya akun? Masuk di sini"}
          </button>
        </div>
      </div>
    </div>
  );
}
