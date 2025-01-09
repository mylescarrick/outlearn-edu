/**
 * Our homepage has sections that are center-aligned and designed
 * to sit on top of a bg image.
 */

import React from "react"
import { cn } from "~/lib/utils"

interface HomeSectionProps {
  className?: string
  children: React.ReactNode
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  children,
  className,
}) => {
  const baseClasses =
    "relative flex items-center justify-center text-center bg-background/60 z-10"
  return <section className={cn(baseClasses, className)}>{children}</section>
}
