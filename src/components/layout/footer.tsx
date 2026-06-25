"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 md:py-16 mt-20 border-t border-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="font-display text-3xl tracking-widest text-white">
              NEki Store
            </h3>
            <p className="text-sm leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">{t.footer.help}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/faq" className="hover:text-white transition-colors">{t.footer.faq}</Link></li>
              <li><Link href="/cara-order" className="hover:text-white transition-colors">{t.footer.howToOrder}</Link></li>
              <li><Link href="/pengembalian" className="hover:text-white transition-colors">{t.footer.returnsExchange}</Link></li>
              <li><Link href="/hubungi-kami" className="hover:text-white transition-colors">{t.footer.contactUs}</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">{t.footer.collections}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/collections/kaos" className="hover:text-white transition-colors">{t.nav.kaos}</Link></li>
              <li><Link href="/collections/kemeja" className="hover:text-white transition-colors">{t.nav.kemeja}</Link></li>
              <li><Link href="/collections/celana" className="hover:text-white transition-colors">{t.nav.celana}</Link></li>
              <li><Link href="/collections/new-arrivals" className="hover:text-white transition-colors">{t.section.newArrivals}</Link></li>
              <li><Link href="/collections/sale" className="hover:text-white transition-colors">{t.nav.sale}</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">{t.footer.followUs}</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
              </a>
            </div>
            
            <div className="pt-4">
              <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-3">{t.footer.subscribe}</h4>
              <form className="flex gap-2" suppressHydrationWarning>
                <Input suppressHydrationWarning type="email" placeholder={t.footer.emailPlaceholder} className="bg-gray-900 border-gray-800 text-white rounded-none focus-visible:ring-gray-700" />
                <Button type="submit" className="rounded-none bg-white text-black hover:bg-gray-200">{t.footer.register}</Button>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} NEki Store. {t.footer.allRightsReserved}
          </p>
          <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
            <span>BCA</span>
            <span>MANDIRI</span>
            <span>GOPAY</span>
            <span>OVO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
