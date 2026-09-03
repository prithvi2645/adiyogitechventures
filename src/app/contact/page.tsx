import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your website or app project. Free 30-minute consultation, honest advice, and a reply within one working day.",
  alternates: { canonical: "/contact" },
};

const promises = [
  "A reply within one working day",
  "A free 30-minute scoping call",
  "An honest opinion, even if it means less work for us",
  "A fixed written quote before anything begins",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are"
        highlight="building"
        description="The more you share, the more useful our first reply will be. If you would rather just talk, call or email us directly - the details are on the right."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <Section className="pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <ContactForm />
            </Reveal>

            <aside className="space-y-6">
              <Reveal delay={90}>
                <div className="glass rounded-3xl p-8">
                  <h2 className="mb-6 font-display text-2xl text-ash-50">
                    Reach us directly
                  </h2>
                  <ul className="space-y-5 text-sm">
                    <li>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="group flex items-start gap-4"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-500/25 bg-brand-500/10">
                          <Mail className="h-4 w-4 text-brand-300" />
                        </span>
                        <span>
                          <span className="block text-xs text-ash-500">Email</span>
                          <span className="text-ash-100 transition-colors group-hover:text-brand-300">
                            {site.contact.email}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={site.contact.phoneHref}
                        className="group flex items-start gap-4"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-500/25 bg-brand-500/10">
                          <Phone className="h-4 w-4 text-brand-300" />
                        </span>
                        <span>
                          <span className="block text-xs text-ash-500">Phone</span>
                          <span className="text-ash-100 transition-colors group-hover:text-brand-300">
                            {site.contact.phone}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={site.contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-4"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                          <MessageCircle className="h-4 w-4 text-ash-400" />
                        </span>
                        <span>
                          <span className="block text-xs text-ash-500">
                            WhatsApp
                          </span>
                          <span className="text-ash-200 transition-colors group-hover:text-brand-300">
                            Message us
                          </span>
                        </span>
                      </a>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <MapPin className="h-4 w-4 text-ash-400" />
                      </span>
                      <span>
                        <span className="block text-xs text-ash-500">Studio</span>
                        <span className="text-ash-200">
                          {site.contact.address}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <Clock className="h-4 w-4 text-ash-400" />
                      </span>
                      <span>
                        <span className="block text-xs text-ash-500">Hours</span>
                        <span className="text-ash-200">{site.contact.hours}</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="glass rounded-3xl p-8">
                  <h2 className="mb-5 font-display text-2xl text-ash-50">
                    What happens next
                  </h2>
                  <ul className="space-y-3.5">
                    {promises.map((p, i) => (
                      <li key={p} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-[10px] font-medium text-brand-300">
                          {i + 1}
                        </span>
                        <span className="text-ash-300">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
