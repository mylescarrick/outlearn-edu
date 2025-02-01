import { Markdown } from "@react-email/components"
import { Link } from "react-router"
import { Heading } from "~/components/layout/heading"
import { Page } from "~/components/layout/page"
import { PageContent } from "~/components/layout/page-content"
import { PageHeader } from "~/components/layout/page-heading"
import { Wordmark } from "~/components/layout/wordmark"
import { Button } from "~/components/ui/button"

const markdownContent = `
Myles Carrick is an accomplished technology leader with significant experience in driving strategic innovation and operational excellence across education, corporate, and technology sectors. As the Chief Information Officer at Knox Grammar School, Myles oversees the strategic direction and delivery of technology solutions to enhance learning outcomes and operational efficiency at one of Australia’s leading independent schools.

His career highlights include:
- **Transformational leadership**: Leading Knox Grammar's digital evolution, Myles has implemented cutting-edge solutions in cloud technologies, security, and modern workplace platforms like Microsoft Teams and M365.
- **Education sector expertise**: As Head of Engineering at Intellischool, he built innovative data analytics platforms for K-12 education, and during his tenure at Newington College, he introduced numerous "education firsts," such as a move to AWS in 2013 and the integration of advanced learning management systems (LMS), including Canvas LMS implemented in 2011.
- **Enterprise IT leadership**: At Domain Group, Myles led large-scale transformations in enterprise IT, including billing platforms, integrations, and governance frameworks, leveraging tools like Microsoft Dynamics 365, Salesforce, and Zuora.
- **Customer Success and change management**: At Instructure, he drove customer success initiatives for the APAC region, focusing on large-scale LMS implementations, technical integrations, and change consulting for enterprise clients.

Myles holds an Executive MBA from the University of Technology Sydney and a Master of Information Technology from Charles Sturt University. He is also experienced in AWS, Microsoft Azure, and Google Cloud Platform (GCP) and is skilled with modern Ruby and TypeScript frameworks.

Myles's consulting services offer expertise in:
- **Digital Transformation Strategy**: Helping organisations leverage emerging technologies to drive efficiency and innovation.
- **Education Technology**: Building platforms, managing transitions, and delivering impactful solutions for schools and universities.
- **Custom Software Engineering**: Designing scalable, secure, and user-focused applications tailored to client needs.
- **Change and Risk Management**: Ensuring smooth transitions with minimal disruption while maintaining compliance.
- **Keynote Speaking and Thought Leadership**: Myles is a sought-after speaker at industry conferences and events, sharing insights on digital transformation, education technology, and innovative leadership.

As a thought leader passionate about the intersection of technology, education, and innovation, Myles is dedicated to helping organisations navigate the future with confidence.
`

export default function About() {
  return (
    <Page>
      <PageHeader>
        <Heading>
          <Wordmark /> is Myles Carrick
        </Heading>
      </PageHeader>
      <PageContent className="flex flex-col space-y-9">
        <div className="prose prose-neutral">
          <Markdown>{markdownContent}</Markdown>
        </div>
        <div className="justify-left flex">
          <Button size="lg" asChild>
            <Link to="/contact">Reach out for a chat</Link>
          </Button>
        </div>
      </PageContent>
    </Page>
  )
}
