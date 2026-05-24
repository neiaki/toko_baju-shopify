import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  {
    title: "KAOS",
    href: "/collections/kaos",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    className: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    title: "KEMEJA",
    href: "/collections/kemeja",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    className: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    title: "CELANA",
    href: "/collections/celana",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    className: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    title: "AKSESORIS",
    href: "/collections/aksesoris",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80",
    className: "col-span-1 md:col-span-1 row-span-1",
  },
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-2 gap-4 h-[1200px] md:h-[600px]">
      {CATEGORIES.map((category) => (
        <Link
          key={category.title}
          href={category.href}
          className={`group relative overflow-hidden bg-gray-100 dark:bg-gray-900 block ${category.className}`}
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/20" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <h3 className="font-display text-4xl md:text-5xl text-white tracking-wider mb-2">
              {category.title}
            </h3>
            <span className="text-white text-sm font-bold uppercase tracking-widest flex items-center group-hover:underline underline-offset-4">
              Belanja Sekarang <span className="ml-2">&rarr;</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
