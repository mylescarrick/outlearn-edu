import { useInputControl, type FieldMetadata } from "@conform-to/react"
import Turnstile from "react-turnstile"

type TurnstileConformProps = {
  meta: FieldMetadata<string>
  sitekey: string
  onError?: () => void
}

export function TurnstileConform({
  meta,
  sitekey,
  onError,
}: TurnstileConformProps) {
  const magic = useInputControl(meta)

  return (
    <Turnstile
      sitekey={sitekey}
      onVerify={(token) => {
        magic.change(token)
      }}
      onError={onError}
    />
  )
}
