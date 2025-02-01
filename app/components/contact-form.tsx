import type { useForm } from "@conform-to/react"
import { Form, type FormProps } from "react-router"
import Turnstile, { useTurnstile } from "react-turnstile"
import { z } from "zod"
import { TextareaConform } from "./forms/textarea-conform"
import { TurnstileConform } from "./forms/turnstile-conform"
import { Field, FieldError } from "~/components/forms/field"
import { InputConform } from "~/components/forms/input-conform"
import { Button } from "~/components/ui/button"
import { useContext } from "~/hooks/use-context"

export const contactFormSchema = z.object({
  email: z
    .string({ message: "Forgotten to enter your email?" })
    .email("That doesn't look like an email"),
  name: z.string().optional(),
  comment: z.string().optional(),
  turnstileToken: z.string(),
})

export type ContactForm = z.infer<typeof contactFormSchema>

type ContactFormProps = {
  form: ReturnType<typeof useForm<ContactForm>>[0]
  fields: ReturnType<typeof useForm<ContactForm>>[1]
} & FormProps

export const ContactForm = ({ form, fields, ...props }: ContactFormProps) => {
  const { turnstileSiteKey } = useContext()
  const turnstile = useTurnstile()
  return (
    <Form
      method="post"
      id={form.id}
      onSubmit={form.onSubmit}
      noValidate
      className="flex flex-col gap-5"
      {...props}
    >
      <div className="grid grid-cols-1 gap-5">
        <Field className="">
          <InputConform
            meta={fields.email}
            type="email"
            placeholder="Your email"
            className="min-w-96"
            required
          />
          {fields.email.errors && (
            <FieldError>{fields.email.errors}</FieldError>
          )}
        </Field>

        <Field className="">
          <InputConform
            meta={fields.name}
            type="text"
            placeholder="Your name"
            className="min-w-96"
          />
          {fields.name.errors && <FieldError>{fields.name.errors}</FieldError>}
        </Field>

        <Field className="">
          <TextareaConform
            meta={fields.comment}
            placeholder="Comment"
            className="min-w-96"
          />
          {fields.comment.errors && (
            <FieldError>{fields.comment.errors}</FieldError>
          )}
        </Field>

        <Field>
          <TurnstileConform
            meta={fields.turnstileToken}
            sitekey={turnstileSiteKey || ""}
            onError={() => {
              turnstile.reset()
            }}
          />
        </Field>

        <div className="flex flex-row space-x-3">
          <Button type="submit">Send message</Button>
        </div>
      </div>
    </Form>
  )
}
