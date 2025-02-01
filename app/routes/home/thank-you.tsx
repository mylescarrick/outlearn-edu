import { Heading } from "~/components/layout/heading"
import { HomeSection } from "~/components/layout/home-section"
import { Page } from "~/components/layout/page"
import { PageContent } from "~/components/layout/page-content"
import { PageHeader } from "~/components/layout/page-heading"

export default function ThankYou() {
  return (
    <Page addContainer>
      <PageHeader>
        <Heading>Thank you!</Heading>
      </PageHeader>
      <PageContent>
        <p className="text-slate-600">
          Thanks for getting in touch! We'll get back to you shortly.
        </p>
      </PageContent>
    </Page>
  )
}
