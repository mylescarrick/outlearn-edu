import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ClipboardListIcon,
  ShieldIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { Logotype } from "~/components/layout/logotype";

const services = [
  {
    icon: ClipboardListIcon,
    title: "Strategic Planning",
    description:
      "Develop comprehensive technology roadmaps aligned with your educational goals",
  },
  {
    icon: ShieldIcon,
    title: "Risk Management",
    description:
      "Identify and mitigate technology risks before they impact your institution",
  },
  {
    icon: TrendingUpIcon,
    title: "Project Reviews",
    description:
      "Expert evaluation of technology initiatives and implementation strategies",
  },
  {
    icon: UsersIcon,
    title: "ICT Leadership",
    description:
      "Guidance and support for technology leadership in educational settings",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Outlearn" },
    { name: "description", content: "Outlearn Education" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-5 items-center justify-between grid grid-cols-1 md:grid-cols-2">
          <Link
            to="/"
            className="font-light text-2xl text-primary font-brand flex py-1"
          >
            <Logotype variant="full" />
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/services"
              className="text-sm font-medium hover:text-primary"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Link>
            <Link
              to="/ideas"
              className="text-sm font-medium hover:text-primary"
            >
              Ideas
            </Link>
            <Button variant="secondary" asChild>
              <Link to="/contact">Get in touch</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 bg-secondary/30" />
          <div className="container mx-auto relative flex flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
            <div className="rounded-lg bg-background/95 p-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif">
                Expert ed tech strategy & guidance
              </h1>
              <p className="mt-4 max-w-[700px] text-lg text-muted-foreground sm:text-xl mx-auto">
                <Logotype /> helps schools make smart technology decisions,
                safeguard valuable data and systems, and achieve long-term
                sustainable innovation
              </p>
              <div className="mt-6 flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">Schedule a Consultation</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/services">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-24 px-5">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bolder sm:text-4xl md:text-5xl font-serif">
              Our services
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Comprehensive technology solutions for educational institutions
            </p>
          </div>
          <div className="grid gap-6 pt-12 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-primary/10 transition-colors hover:border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent" />
                <CardHeader className="relative text-center flex flex-col space-y-3">
                  <service.icon className="h-10 w-10 text-primary mx-auto" />
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                  <CardDescription className="">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="">
          <Card className="rounded-none border-x-none bg-gradient-to-r from-secondary/30 via-transparent to-primary/10">
            <div className="container mx-auto px-5">
              <CardHeader className="relative items-center text-center">
                <CardTitle className="text-2xl font-bold">
                  Introducing Karten
                </CardTitle>
                <CardDescription className="max-w-[600px] text-base">
                  A powerful service for technology teams in schools to plan,
                  manage risk, and track their growth. Coming soon.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative flex justify-center pb-6">
                <Button asChild>
                  <Link to="https://karten.education">Join the Waitlist</Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </section>

        <section className="container mx-auto py-24 px-5">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-serif">
                Real industry expertise
              </h2>
              <p className="text-lg text-muted-foreground">
                Outlearn Education is led by Myles Carrick, an experienced ed
                tech leader and current CIO at Knox Grammar School. With
                extensive experience in educational technology, we understand
                the unique challenges schools face.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
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
        </section>
      </main>

      <footer className="border-t bg-muted/50">
        <div className="container mx-auto flex flex-col gap-4 py-8 px-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              © {format(new Date(), "yyyy")} Outlearn Education.
            </p>
          </div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
