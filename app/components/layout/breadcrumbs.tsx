/**
 * let's do breadcrumbs!
 *
 * this is much-refined over version of the past few years
 *
 */

import { ChevronRightIcon } from "lucide-react"
import { useMatches, type UIMatch } from "react-router"
import { cn } from "~/lib/utils"

export type BreadcrumbLink = {
  to?: string
  label: string
  key?: string
}

// Infer the return type of a loader that may have zero or one argument
type InferLoaderReturn<T> = T extends () => Promise<infer R>
  ? R
  : T extends (args: infer _Arg) => Promise<infer R>
    ? R
    : never

export function addCrumbs<LoaderFn>(
  fn: (data: InferLoaderReturn<LoaderFn>) => BreadcrumbLink | BreadcrumbLink[]
) {
  return {
    breadcrumb: (match: UIMatch<unknown>) => {
      const data = match.data as InferLoaderReturn<LoaderFn>
      const result = fn(data)
      const links = Array.isArray(result) ? result : [result]

      return links.map((link, idx) => {
        const key = link.key || `${idx}-${link.label}`
        return link.to ? (
          <div key={key}>
            <a href={link.to}>{link.label}</a>
          </div>
        ) : (
          <div key={key}>{link.label}</div>
        )
      })
    },
  }
}

interface BreadcrumbProps {
  className?: string
}

export const Breadcrumbs = ({ className }: BreadcrumbProps) => {
  const matches = useMatches()

  const crumbs = matches.flatMap((match) => {
    const { breadcrumb } = (match.handle ?? {}) as {
      breadcrumb?: (m: typeof match) => ReturnType<typeof addCrumbs>
    }

    if (!breadcrumb) return []
    const nodes = breadcrumb(match)
    return Array.isArray(nodes) ? nodes : [nodes]
  })

  return (
    <div className={cn("text-foreground/70", className)}>
      <nav className="mx-auto flex" aria-label="Breadcrumb">
        {crumbs.length === 0 ? (
          <ol className="flex items-center space-x-1.5 text-sm">
            <li>&nbsp;</li>
          </ol>
        ) : (
          <ol className="flex items-center space-x-1.5 text-sm">
            {crumbs.map((crumb, index) => (
              <li
                key={index}
                className={`flex flex-row items-center ${index === 0 ? "font-semibold" : ""}`}
              >
                {index !== 0 && (
                  <ChevronRightIcon className="mr-1.5 h-4 w-4 flex-shrink-0 opacity-60" />
                )}
                <span>{crumb}</span>
              </li>
            ))}
          </ol>
        )}
      </nav>
    </div>
  )
}
