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
      </Head>
      <Preview>{previewMessage}</Preview>

      {/* Primary font - Roboto */}
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Arial"
        webFont={{
          url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />

      {/* Brand font - Roboto Serif */}
      <Font
        fontFamily="Roboto Serif"
        fallbackFontFamily="Georgia"
        webFont={{
          url: "https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@1,8..144,800&display=swap",
          format: "woff2",
        }}
        fontWeight={800}
        fontStyle="italic"
      />

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
                serif: defaultTheme.fontFamily.sans, // override
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
                <p className="inline-flex items-center gap-1 font-brand font-bold italic text-primary">
                  Outlearn…
                </p>
              )}
            </a>
          </Section>

          {/* Main Content */}
          <Section className="font-sans">{children}</Section>

          {/* Footer */}
          <Section className="mt-12 border-t border-border pt-8">
            <Text className="font-sans text-sm text-muted-foreground">
              This email was sent by{" "}
              <a
                href={baseUrl}
                className="text-primary transition-colors hover:text-primary/80"
              >
                Outlearn Education
              </a>
            </Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  )
}
