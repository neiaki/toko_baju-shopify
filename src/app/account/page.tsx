"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/context/language-context";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (email === "admin" && password === "admin123") {
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("Email atau password salah. Hint: admin / admin123");
      }
    } else {
      // Mock register
      if (email && password) {
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("Harap isi semua data");
      }
    }
  };

  if (isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-md text-center">
          <h1 className="font-display text-4xl uppercase tracking-wider mb-4">
            Selamat Datang, Admin!
          </h1>
          <p className="text-muted-foreground mb-8">
            Anda berhasil masuk.
          </p>
          <Button 
            onClick={() => router.push("/")}
            className="w-full bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-none h-12 uppercase tracking-widest font-bold"
          >
            Kembali ke Beranda
          </Button>
          <Button 
            variant="outline"
            onClick={() => { setIsLoggedIn(false); setEmail(""); setPassword(""); }}
            className="w-full mt-4 rounded-none h-12 uppercase tracking-widest font-bold"
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl uppercase tracking-wider mb-2">
            {isLogin ? "Masuk" : "Daftar"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Masuk ke akun NEki Store Anda" 
              : "Buat akun untuk checkout lebih cepat dan lihat riwayat pesanan"}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleAuth} suppressHydrationWarning>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm text-center">
              {error}
            </div>
          )}
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
            <Input 
              suppressHydrationWarning 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email atau Username" 
              className="rounded-none bg-background border-border h-12" 
            />
          </div>
          
          <div className="space-y-2">
            <Input 
              suppressHydrationWarning 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              className="rounded-none bg-background border-border h-12" 
            />
          </div>

          <Button type="submit" className="w-full bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-none h-12 mt-6 font-bold uppercase tracking-widest text-sm">
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
