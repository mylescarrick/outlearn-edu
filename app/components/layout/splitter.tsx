import type { ReactNode } from "react"
import { cn } from "~/lib/utils"

export const Splitter = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode | ReactNode[]
}) => (
  <div
    className={cn(
      "flex flex-col justify-between space-y-3 sm:flex-row sm:space-y-0",
      className
    )}
  >
    {children}
  </div>
)
