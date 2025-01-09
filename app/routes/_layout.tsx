import { format } from "date-fns"
import {
  ClipboardListIcon,
  ShieldIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"
import { Link, Outlet } from "react-router"
import type { Route } from "./+types/home"
import BackgroundLetter from "~/components/layout/background-letter"
import { HomeSection } from "~/components/layout/home-section"
import { O } from "~/components/layout/o"
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
]

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Outlearn" },
    { name: "description", content: "Outlearn Education" },
  ]
}

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <div className="fixed inset-0 z-0 bg-primary/20">
        <BackgroundLetter>
          <O
            className="h-auto w-screen"
            pathClassName="fill-primary/10 stroke-[0.1] stroke-primary/15"
          />
        </BackgroundLetter>
      </div>
      <div className="relative flex flex-grow flex-col">
        {/* Header remains sticky */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto grid grid-cols-1 items-center justify-between px-5 md:grid-cols-2">
            <Link
              to="/"
              className="flex py-3 font-brand text-2xl font-light text-primary"
            >
              <Wordmark variant="dot" />
            </Link>
            <nav className="flex items-center justify-end gap-6">
              <Link
                to="/services"
                className="py-5 text-sm font-medium hover:text-primary"
              >
                Services
              </Link>
              <Link
                to="/about"
                className="py-5 text-sm font-medium hover:text-primary"
              >
                About
              </Link>
              <Link
                to="/ideas"
                className="py-5 text-sm font-medium hover:text-primary"
              >
                Ideas
              </Link>
              <Button variant="secondary" asChild className="py-8">
                <Link to="/contact">Get in touch</Link>
              </Button>
            </nav>
          </div>
        </header>
        <Outlet />
        {/* Footer */}
        <footer className="relative bottom-0 border-t bg-muted/50 backdrop-blur-sm">
          <div className="container mx-auto flex flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                © {format(new Date(), "yyyy")} <Wordmark variant="full" />.
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
    </div>
  )
}
