"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: { id: string; src: string; alt: string }[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail Strip */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px]">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "relative w-16 h-20 md:w-20 md:h-24 flex-shrink-0 border-2 transition-all duration-200",
              selectedIndex === index
                ? "border-brand-black dark:border-white"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div
        className="relative flex-1 aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[selectedIndex]?.src || ""}
          alt={images[selectedIndex]?.alt || "Product image"}
          fill
          className={cn(
            "object-cover transition-transform duration-300",
            isZoomed && "scale-150"
          )}
          style={
            isZoomed
              ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
              : undefined
          }
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Zoom hint */}
        <div
          className={cn(
            "absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full transition-opacity duration-300",
            isZoomed ? "opacity-0" : "opacity-100"
          )}
        >
          Hover untuk zoom
        </div>
      </div>
    </div>
  );
}
