import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Yantra } from "@/components/background/Yantra";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center py-32">
      <Container>
        <div className="relative mx-auto max-w-xl text-center">
          <Yantra className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-20 mix-blend-screen" />

          <div className="relative">
            <p className="font-display text-8xl text-sacred sm:text-9xl">404</p>

            <h1 className="mt-4 font-display text-3xl text-ash-50 sm:text-4xl">
              This path leads nowhere
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ash-400">
              The page you were looking for has moved, been renamed, or never
              existed. Let us set you back on the road.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="btn-sacred inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white"
              >
                <Home className="h-4 w-4" />
                Back to home
              </Link>
              <Link
                href="/services"
                className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm text-ash-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Browse services
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
