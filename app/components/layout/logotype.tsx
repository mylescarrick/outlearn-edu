/**
 * Our logotype component
 * the 'full' variant includes the full name of the brand
 */

import { cn } from "~/lib/utils";

export const Logotype = ({
  variant,
  className,
}: { variant?: "full"; className?: string } = {}) => {
  const baseClasses = "inline-flex items-center gap-1 text-primary font-brand";
  return (
    <span className={cn(baseClasses, className)}>
      <span className="">Outlearn</span>
      {variant === "full" && <span className="text-primary/60">Education</span>}
    </span>
  );
};
