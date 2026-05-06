import Image from "next/image";

import { theme } from "@/lib/theme";

type BrandLockupProps = {
  size?: "header" | "footer";
};

export function BrandLockup({ size = "header" }: BrandLockupProps) {
  const isFooter = size === "footer";

  return (
    <div className={`flex min-w-0 items-center ${isFooter ? "gap-2.5 sm:gap-3" : "gap-3 sm:gap-4"}`}>
      <Image
        src={theme.brand.logoSrc}
        alt={theme.brand.logoAlt}
        width={1536}
        height={1024}
        className={isFooter ? "h-10 w-auto sm:h-12" : "h-11 w-auto sm:h-12"}
        priority={!isFooter}
      />
      <div className="min-w-0">
        <p className="truncate font-serif text-lg font-semibold tracking-[0.02em] text-brand-primary sm:text-xl">
          {theme.brand.lockupName}
        </p>
        <p className={`text-xs uppercase tracking-[0.2em] text-brand-muted ${isFooter ? "mt-0.5" : "mt-1"}`}>
          {theme.brand.lockupSubtitle}
        </p>
      </div>
    </div>
  );
}
