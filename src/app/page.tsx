import Hero from "@/components/sections/Hero";
import TechRibbon from "@/components/sections/TechRibbon";
import Services from "@/components/sections/Services";
import Values from "@/components/sections/Values";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";
import { faqs } from "@/content/faq";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <TechRibbon />
      <Services />
      <Values />
      <Process />
      <Work />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
