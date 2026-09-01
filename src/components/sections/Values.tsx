import { Eye, Gauge, HandHeart, KeyRound } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";

const values = [
  {
    icon: Eye,
    sanskrit: "Satya",
    title: "We tell you the truth",
    body: "If a feature will not earn its cost, we say so before you pay for it. We have talked clients out of more work than we have talked them into, and they keep coming back.",
  },
  {
    icon: Gauge,
    sanskrit: "Shakti",
    title: "Speed is a feature",
    body: "Every build ships with a performance budget. Slow sites lose customers quietly, so we treat load time as seriously as we treat layout.",
  },
  {
    icon: KeyRound,
    sanskrit: "Svatantrya",
    title: "You own everything",
    body: "Code, designs, domains and accounts transfer to you on completion. No proprietary platform, no lock-in, no leverage held over your head.",
  },
  {
    icon: HandHeart,
    sanskrit: "Seva",
    title: "We stay after launch",
    body: "Thirty days of free support as standard, and care plans if you want us to keep tending the thing we built together.",
  },
];

export default function Values() {
  return (
    <Section id="values">
      <Container>
        <SectionHeading
          eyebrow="Why Adiyogi"
          title="Craft, offered with"
          highlight="integrity"
          description="Adiyogi is the first yogi - the one who gave the method away freely. That posture shapes how we work: share what we know, build what genuinely helps, and leave the client stronger than we found them."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 70}>
              <Spotlight className="halo-card glass relative h-full overflow-hidden rounded-2xl p-8">
                <div className="relative z-10 flex gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent-400/25 bg-gradient-to-br from-accent-400/15 to-transparent">
                    <value.icon className="h-5 w-5 text-accent-300" />
                  </span>
                  <div>
                    <span className="mb-1 block font-display text-sm italic text-accent-400/80">
                      {value.sanskrit}
                    </span>
                    <h3 className="mb-3 font-display text-2xl text-ash-50">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ash-400">
                      {value.body}
                    </p>
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
