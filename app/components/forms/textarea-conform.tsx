import { getTextareaProps, type FieldMetadata } from "@conform-to/react"
import type { ComponentProps } from "react"
import { Textarea } from "~/components/ui/textarea"

export const TextareaConform = ({
  meta,
  ...props
}: {
  meta: FieldMetadata<string | null | undefined>
} & ComponentProps<typeof Textarea>) => {
  return (
    <Textarea
      {...getTextareaProps(meta, { ariaAttributes: true })}
      key={`key-${meta.id}`}
      {...props}
    />
  )
}
