/**
 * A "description" for use alongside Heading – usually within the PageHeading component
 */

import type React from "react"
import { cn } from "~/lib/utils"

interface PageDescriptionProps extends React.HTMLProps<HTMLParagraphElement> {
  className?: string
}

const baseClasses = "mt-2 max-w-4xl border text-sm text-foreground/60"

export const PageDescription = ({ ...props }: PageDescriptionProps) => {
  return <p className={cn(baseClasses, props.className)}>{props.children}</p>
}
