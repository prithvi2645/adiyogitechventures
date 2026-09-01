export type ProcessStep = {
  number: string;
  sanskrit: string;
  title: string;
  description: string;
  duration: string;
  deliverable: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    sanskrit: "Shravana",
    title: "Listen",
    description:
      "We start by understanding the business, not the brief. Who buys from you, what stops them, and what a win actually looks like in numbers. Most projects change shape in this conversation, and that is the point.",
    duration: "Week 1",
    deliverable: "Discovery document and scope",
  },
  {
    number: "02",
    sanskrit: "Manana",
    title: "Shape",
    description:
      "Architecture, user journeys and wireframes. We decide what to build and, just as importantly, what to leave out of version one so you launch sooner and learn faster.",
    duration: "Week 1 - 2",
    deliverable: "Wireframes and technical plan",
  },
  {
    number: "03",
    sanskrit: "Darshana",
    title: "Design",
    description:
      "Visual design in Figma, grounded in a real design system rather than one-off screens. You see clickable prototypes before a single line of production code is written.",
    duration: "Week 2 - 4",
    deliverable: "Design system and prototype",
  },
  {
    number: "04",
    sanskrit: "Nirmana",
    title: "Build",
    description:
      "Weekly builds on a live staging URL. You watch the product grow instead of waiting in silence for a big reveal, and course corrections cost hours rather than weeks.",
    duration: "Week 4 - 12",
    deliverable: "Staging build, updated weekly",
  },
  {
    number: "05",
    sanskrit: "Pariksha",
    title: "Test",
    description:
      "Cross-device QA, accessibility checks, performance budgets and load testing. We break it deliberately before your customers find the cracks accidentally.",
    duration: "Final 2 weeks",
    deliverable: "QA report and fixes",
  },
  {
    number: "06",
    sanskrit: "Poshana",
    title: "Launch & Nurture",
    description:
      "Deployment, monitoring, analytics and training for your team. Then we stay on to maintain and improve, because launch day is the beginning of the product, not the end of it.",
    duration: "Ongoing",
    deliverable: "Live product and care plan",
  },
];
