interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  className?: string;
}

import Link from "next/link";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8",
        className
      )}
    >
      <div>
        <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group flex items-center text-sm font-semibold uppercase tracking-wider text-foreground hover:text-brand-black/70 dark:hover:text-white/70 transition-colors"
        >
          {action.label}
          <span className="ml-2 transform transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      )}
    </div>
  );
}
