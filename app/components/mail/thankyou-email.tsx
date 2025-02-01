/**
 * Thank you email
 */

import { Section, Text } from "@react-email/components"
import { EmailLayout } from "./layout"

interface ThankyouEmailProps {
  recipientName: string
  message: string
}

export const ThankyouEmail = ({
  recipientName,
  message,
}: ThankyouEmailProps) => {
  const previewMessage = `Thanks for contacting Outlearn.`

  return (
    <EmailLayout previewMessage={previewMessage}>
      <Section className="rounded-md border border-primary font-sans">
        <Text className="my-5 font-sans text-2xl font-light">
          Hello <strong>{recipientName}</strong>!
        </Text>

        <Text>{message}</Text>
      </Section>
    </EmailLayout>
  )
}
