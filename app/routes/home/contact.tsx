import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { data, redirect } from "react-router"
import type { Route } from "./+types/contact"
import { ContactForm, contactFormSchema } from "~/components/contact-form"
import { Heading } from "~/components/layout/heading"
import { Page } from "~/components/layout/page"
import { PageContent } from "~/components/layout/page-content"
import { PageHeader } from "~/components/layout/page-heading"
import { ThankyouEmail } from "~/components/mail/thankyou-email"
import { sendReactEmail } from "~/lib/email.server"
import { verifyTurnstileToken } from "~/lib/turnstile.server"

export const loader = async ({ request }: Route.LoaderArgs) => {
  return null
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema: contactFormSchema })

  if (submission.status !== "success") {
    return data(submission.reply())
  }

  const turnstileVerification = await verifyTurnstileToken(
    submission.value.turnstileToken
  )

  if (!turnstileVerification.success) {
    return data({
      ...submission.reply({
        formErrors: ["Security check failed. Please try again."],
      }),
    })
  }

  await sendReactEmail(
    <ThankyouEmail
      recipientName={submission.value.name || "there"}
      comment={submission.value.comment}
    />,
    {
      sender: "Myles Carrick // Outlearn Education <myles@outlearn.education>",
      to: [submission.value.email],
      bcc: ["Myles Carrick <myles@outlearn.education>"],
      subject: "Outlearn :: thanks for getting in touch",
    }
  )

  return redirect("/thank-you")
}

export default function Contact() {
  const [form, fields] = useForm<ContactForm>({
    defaultValue: {
      email: "",
      name: "",
      comment: "",
    },

    onValidate({ formData }) {
      const validationResult = parseWithZod(formData, {
        schema: contactFormSchema,
      })
      console.debug("Validation result", validationResult)
      return validationResult
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  })

  return (
    <Page>
      <PageHeader>
        <Heading>Get in touch</Heading>
      </PageHeader>
      <PageContent>
        <ContactForm form={form} fields={fields} className="max-w-3xl" />
      </PageContent>
    </Page>
  )
}
