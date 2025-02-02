import {
  Container,
  Font,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
import type { ReactNode } from "react"
import defaultTheme from "tailwindcss/defaultTheme"
import { Wordmark } from "../layout/wordmark"

interface EmailProps {
  previewMessage: string
  children: ReactNode | ReactNode[]
  baseUrl?: string
  logoUrl?: string
}

export const EmailLayout = ({
  previewMessage,
  children,
  baseUrl,
  logoUrl,
}: EmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>{previewMessage}</title>
        {/* Roboto */}
        <link
          href="https://fonts.gstatic.com/s/roboto/v47/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBHMdazQ.woff2"
          rel="stylesheet"
          type="font/woff2"
        />
        {/* Roboto Serif */}
        <link
          href="https://fonts.gstatic.com/s/robotoserif/v15/R70kjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepO9CRLLcmv0wAqC0Q4MVaR-qf2CgAehahh23Obv-KoE.woff2"
          rel="stylesheet"
          type="font/woff2"
        />
      </Head>
      <Preview>{previewMessage}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                background: "hsl(220 16% 96%)",
                foreground: "hsl(220 16% 30%)",
                blank: "hsl(0 0% 100%)",
                card: "hsl(220 16% 98%)",
                "card-foreground": "hsl(220 16% 20%)",
                primary: "hsl(213 32% 52%)",
                "primary-foreground": "hsl(220 16% 98%)",
                secondary: "hsl(220 16% 90%)",
                "secondary-foreground": "hsl(213 32% 52%)",
                muted: "hsl(220 10% 92%)",
                "muted-foreground": "hsl(220 16% 40%)",
                accent: "hsl(179 25% 65%)",
                "accent-foreground": "hsl(220 16% 20%)",
                destructive: "hsl(354 42% 56%)",
                "destructive-foreground": "hsl(220 16% 98%)",
                border: "hsl(220 16% 85%)",
              },
              fontFamily: {
                sans: ["Roboto", ...defaultTheme.fontFamily.sans],
                serif: ["Roboto", ...defaultTheme.fontFamily.sans],
                brand: ["Roboto Serif", ...defaultTheme.fontFamily.serif],
              },
            },
          },
        }}
      >
        <Container className="bg-blank px-6 pb-12 pt-8 text-foreground">
          <Section className="mb-8">
            <a href={baseUrl} title="Visit Outlearn" className="inline-block">
              {logoUrl ? (
                <Img
                  src={logoUrl}
                  alt="Logo"
                  width={200}
                  height={35}
                  className="max-w-[200px]"
                />
              ) : (
                <Wordmark variant="dot" />
              )}
            </a>
          </Section>

          {/* Main Content */}
          <Section className="font-sans">{children}</Section>

          {/* Footer */}
          <Section className="mt-12 border-t border-border pt-8">
            <Text className="font-sans text-xs text-muted-foreground">
              This email was sent by{" "}
              <a
                href={baseUrl}
                className="text-primary transition-colors hover:text-primary/80"
              >
                Outlearn Education.
              </a>
            </Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  )
}
