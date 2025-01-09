import React from "react"
import { cn } from "~/lib/utils"

interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
  level?: ElementType
  className?: string
  children?: React.ReactNode
}

type ElementType = keyof typeof styles

const styles = {
  h1: "text-3xl font-semibold leading-snug tracking-[0.01em]",
  h2: "text-2xl font-semibold leading-snug tracking-[0.01em]",
  h3: "text-xl font-semibold leading-snug tracking-normal",
  h4: "text-lg font-medium leading-snug tracking-normal",

  // SH1
  h5: "text-lg font-semibold leading-snug tracking-[0.01em]",
  // SH2
  h6: "text-foreground font-medium leading-snug tracking-normal",
}

const baseClasses = "font-brand text-foreground/85"

const headingClasses = (level?: ElementType, overrides?: string) => {
  const levelClasses = styles[levelElementType(level)]
  return cn(baseClasses, levelClasses, overrides)
}

const levelElementType = (level?: ElementType) => {
  return level || "h1"
}

export const Heading = (props: HeadingProps) => {
  const { className, level, children, ...rest } = props
  const mergedClassName = headingClasses(level, className)
  return React.createElement(
    levelElementType(level),
    {
      className: mergedClassName,
      ...rest,
    },
    children
  )
}
