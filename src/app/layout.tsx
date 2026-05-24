import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/context/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/shared/announcement-bar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TOKO FASHION | Premium Urban Streetwear",
  description: "Temukan koleksi streetwear urban terbaik dengan harga terjangkau. Dirancang untuk generasi muda yang berani tampil beda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${bebasNeue.variable} dark`} suppressHydrationWarning>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
