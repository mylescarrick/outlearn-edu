import { Section, Text } from "@react-email/components"
import { EmailLayout } from "./layout"

interface ThankyouEmailProps {
  recipientName: string
  comment?: string
}

export const ThankyouEmail = ({
  recipientName,
  comment,
}: ThankyouEmailProps) => {
  const previewMessage = `Thanks for contacting Outlearn.`

  return (
    <EmailLayout previewMessage={previewMessage}>
      <Section className="rounded-md border border-primary font-sans">
        <Text className="my-5 font-sans text-2xl font-light">
          Hello <strong>{recipientName}</strong>!
        </Text>

        <Text>Thanks for getting in touch with us</Text>

        <Text className="mt-4">
          We've received your message and will get back to you as soon as
          possible. For your records, here's what you sent us:
        </Text>

        <Section className="my-4 rounded border border-gray-200 bg-gray-50 p-4">
          <Text className="italic text-gray-700">{comment}</Text>
        </Section>

        <Text className="mt-4">
          Best regards,
          <br />
          The Outlearn Team
        </Text>
      </Section>
    </EmailLayout>
  )
}
