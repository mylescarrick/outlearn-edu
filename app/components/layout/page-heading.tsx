/**
 * PageHeader – a wrapper for a styled <Heading/> component
 */

import type React from "react"
import { Breadcrumbs } from "./breadcrumbs"
import { cn } from "~/lib/utils"

// Page heading extends div
interface PageHeaderProps extends React.HTMLProps<HTMLDivElement> {
  showBreadcrumbs?: boolean
  innerWrapperClassName?: string
  outerWrapperClassName?: string
}

const outerWrapperBaseClasses = "flex flex-col space-y-2 mt-2.5"
const innerWrapperBaseClasses = "py-6 px-0 text-foreground"

export const PageHeader = ({
  showBreadcrumbs = true,
  ...props
}: PageHeaderProps) => {
  return (
    <header
      className={cn(outerWrapperBaseClasses, props.outerWrapperClassName)}
    >
      {showBreadcrumbs && <Breadcrumbs />}
      <div className={cn(innerWrapperBaseClasses, props.innerWrapperClassName)}>
        {props.children}
      </div>
    </header>
  )
}

// Support splitting up the Heading into left/right

export const HeadingSplitter = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
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
