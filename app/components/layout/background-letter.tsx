import React from "react"
import { cn } from "~/lib/utils"

interface BackgroundLetterProps {
  className?: string
  children: string | React.ReactNode | React.ReactNode[]
}

const BackgroundLetter: React.FC<BackgroundLetterProps> = ({
  children,
  className,
}) => {
  const baseClasses =
    "absolute inset-0 flex items-center justify-center text-primary/50 text-[150vw] select-none pointer-events-none stroke-indigo-300"
  return (
    <div className={cn(baseClasses, className)} aria-hidden="true">
      {children}
    </div>
  )
}

export default BackgroundLetter
