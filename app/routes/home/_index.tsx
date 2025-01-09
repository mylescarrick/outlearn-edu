import {
  ClipboardListIcon,
  ShieldIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"
import { Link } from "react-router"
import type { Route } from "../+types/home"
import { HomeSection } from "~/components/layout/home-section"
import { Wordmark } from "~/components/layout/wordmark"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

const services = [
  {
    icon: ClipboardListIcon,
    title: "Tech strategic planning",
    description:
      "Develop comprehensive technology roadmaps aligned with your educational goals",
  },
  {
    icon: ShieldIcon,
    title: "Risk analysis",
    description:
      "Identify and mitigate privacy and technology risks before they impact your institution",
  },
  {
    icon: TrendingUpIcon,
    title: "Project reviews",
    description:
      "Expert evaluation of technology initiatives and implementation strategies",
  },
  {
    icon: UsersIcon,
    title: "Tech leadership",
    description:
      "Guidance and support for technology leadership in educational settings",
  },
]

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Outlearn" },
    { name: "description", content: "Outlearn Education" },
  ]
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HomeSection className="bg-blank/70">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 py-16 text-center md:py-24">
          <div className="rounded-lg p-6">
            <h1 className="font-serif text-5xl font-extralight md:text-6xl lg:text-7xl">
              Expert ed tech strategy & guidance
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              <Wordmark /> helps schools make smart technology decisions,
              safeguard valuable data and systems, and achieve long-term
              sustainable innovation
            </p>
            <div className="mt-6 flex flex-col justify-center gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link to="/contact">Reach out for a chat</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/services">Learn more</Link>
              </Button>
            </div>
          </div>
        </div>
      </HomeSection>

      {/* Services Section */}
      <HomeSection>
        <div className="container mx-auto px-5 py-24">
          {/* Services */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-bolder font-serif text-3xl sm:text-4xl md:text-5xl">
              How we can help
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Comprehensive technology solutions for educational institutions
            </p>
          </div>
          <div className="grid gap-6 pt-12 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-blank/40"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent" />
                <CardHeader className="relative flex flex-col space-y-3 text-center">
                  <service.icon className="mx-auto h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                  <CardDescription className="">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </HomeSection>

      {/* Karten Section */}
      <HomeSection>
        <Card className="w-full rounded-none border-none bg-blank/50 shadow-none">
          {/* Karten */}
          <div className="container mx-auto px-5">
            <CardHeader className="relative items-center text-center">
              <CardTitle className="text-2xl font-semibold">
                Introducing Karten
              </CardTitle>
              <CardDescription className="max-w-[600px] text-base">
                A powerful service for technology teams in schools to plan,
                prioritise, track progress, and keep risk in check. Coming soon.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative flex justify-center pb-6">
              <Button asChild>
                <Link to="https://karten.app">Join the Waitlist</Link>
              </Button>
            </CardContent>
          </div>
        </Card>
      </HomeSection>

      {/* Expertise Section */}
      <HomeSection>
        <div className="container mx-auto px-5 py-24">
          {/* Expertise */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl">
                Real industry expertise
              </h2>
              <p className="text-lg text-muted-foreground">
                <Wordmark variant="full" /> is led by Myles Carrick, an
                experienced ed tech leader and current CIO at Knox Grammar
                School. With extensive experience in educational technology, we
                understand the unique challenges schools face.
              </p>
              <div className="">
                <Button variant="secondary" asChild>
                  <Link to="/about">Learn more</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-secondary/30">
                <img
                  src="https://placehold.co/600x400"
                  alt="Placeholder"
                  className="object-cover mix-blend-overlay"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </HomeSection>
    </>
  )
}
