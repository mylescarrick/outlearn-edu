/**
 * Our Wordmark component
 * the 'full' variant includes the full name of the brand
 */

import { cn } from "~/lib/utils"

type Variant = "full" | "dot"

export const Wordmark = ({
  variant,
  className,
}: { variant?: Variant; className?: string } = {}) => {
  const baseClasses =
    "inline-flex items-center gap-1 text-primary font-brand font-bold italic"
  return (
    <span className={cn(baseClasses, className)}>
      {variant === "full" ? (
        <>
          <span className="">Outlearn</span>
          <span className="text-primary/60">Education</span>
        </>
      ) : variant === "dot" ? (
        <>
          <span className="">Outlearn.</span>
        </>
      ) : (
        <>
          <span className="">Outlearn</span>
        </>
      )}
    </span>
  )
}
