/**
 * PageContent – a wrapper for body stuff
 * (usually sits below a Heading)
 */

import { cn } from "~/lib/utils"

interface PageContentProps extends React.HTMLProps<HTMLDivElement> {}

export const PageContent = (props: PageContentProps) => {
  return (
    <div
      className={cn(
        "max-w-8xl mx-auto min-h-max flex-grow px-0 py-4",
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
