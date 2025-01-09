/**
 * Simple page bits
 */

import type React from "react"
import { cn } from "~/lib/utils"

interface PageProps extends React.HTMLProps<HTMLDivElement> {
  addContainer?: boolean
}

export const Page = (
  { addContainer = true, ...props }: PageProps = {
    addContainer: true,
  }
) => {
  const baseClass = addContainer ? "container mx-auto flex-grow px-4" : ""
  return (
    <main className={cn(baseClass, props.className)}>{props.children}</main>
  )
}
