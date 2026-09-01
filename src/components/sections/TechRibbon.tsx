import { Container } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "React Native",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma",
  "Supabase",
  "Firebase",
  "AWS",
  "Vercel",
  "Stripe",
  "Razorpay",
  "Sanity",
  "Figma",
  "Docker",
  "GraphQL",
];

export default function TechRibbon() {
  return (
    <section className="relative py-16">
      <Container>
        <Reveal>
          <p className="mb-9 text-center text-xs uppercase tracking-[0.28em] text-ash-500">
            Built with tools we trust
          </p>
        </Reveal>
      </Container>

      <div className="marquee-mask relative flex overflow-hidden">
        {/* Two identical tracks; the animation translates by -50% for a seamless loop */}
        <div className="marquee-track flex shrink-0 items-center gap-3 pr-3">
          {[...stack, ...stack].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="glass whitespace-nowrap rounded-full px-6 py-3 text-sm text-ash-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
