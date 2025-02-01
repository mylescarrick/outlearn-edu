// https://github.com/edmundhung/conform/blob/main/examples/shadcn-ui/src/components/conform/Input.tsx

import { getInputProps, type FieldMetadata } from "@conform-to/react"
import type { ComponentProps } from "react"
import { Input } from "../ui/input"

export const InputConform = ({
  meta,
  type,
  ...props
}: {
  meta: FieldMetadata<string | number | File>
  type: Parameters<typeof getInputProps>[1]["type"]
} & ComponentProps<typeof Input>) => {
  return (
    <Input
      {...getInputProps(meta, { type, ariaAttributes: true })}
      {...props}
    />
  )
}
