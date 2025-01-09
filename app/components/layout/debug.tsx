import { Heading } from "~/components/layout/heading"
// import { useCurrentContext } from '~/hooks/use-current-context'
import { cn } from "~/lib/utils"

/**
 * A simple component for displaying a chunk of stringified JSON
 * for debugging
 */
type DebugProps = {
  children?: string | object | null | undefined
  value?: string | object | null | undefined
  className?: string
  title?: string
  showInProduction?: boolean
}

export const Debug = (
  props: DebugProps = {
    showInProduction: false,
  }
) => {
  const { children, className, title } = props
  let debugContent = children || props.value || ""
  if (typeof debugContent === "object")
    debugContent = JSON.stringify(debugContent, null, 2)

  // const { config } = useCurrentContext()

  // showMe ? if not production or showInProduction is true
  // const showMe = config?.environment !== 'production' || props.showInProduction
  const showMe = true

  return showMe ? (
    <div
      className={cn(
        "mt-5 flex h-48 flex-col space-y-3 rounded-md border-2 border-secondary/80 p-5 text-xs",
        className
      )}
    >
      {title && (
        <Heading
          level="h4"
          className="text-base text-foreground/60 lg:text-base"
        >
          {title}
        </Heading>
      )}
      <pre className="h-full overflow-y-scroll whitespace-pre-wrap break-words break-all font-mono text-foreground">
        {debugContent}
      </pre>
    </div>
  ) : null
}
