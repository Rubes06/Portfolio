export const profile = {
  name: "Rubes",
  role: "Full-stack developer",
  intro:
    "I build web apps that people actually use: school platforms, event-staffing tools, ordering systems and identity verification, from the database to the last animation.",
    about:
    "I am a full-stack developer working with React, TypeScript, Node and MongoDB. I like products that feel fast, look intentional and solve a real problem for the people using them. My work covers school management, event staffing, online ordering and delivery, and identity and NIN verification, and it includes integrations like online payments and SMS. Every project I have built has pushed me to write cleaner code, think about real users, and care about the details. I am open to new projects, collaborations and full-time roles.",  email: "esthersokeye@gmail.com",
  github: "https://github.com/Rubes06",
  linkedin: "https://www.linkedin.com/in/esther-sokeye/",
};

export const skills = [
  "React", "TypeScript", "Node.js", "Express", "MongoDB", "Next.js",
  "Vite", "REST APIs", "Framer Motion", "Git", "Vercel", "Payments & SMS",
];

export type Project = {
  title: string;
  blurb: string;
  stack: string[];
  url: string;
};

export const projects: Project[] = [
  {
    title: "EduSync",
    blurb: "A school management platform for admins, teachers and students.",
    stack: ["MongoDB", "Express", "React", "TypeScript"],
    url: "#",
  },
  {
    title: "WaitersWarehouse",
    blurb: "Event-staffing platform that connects vendors with waiters, with SMS and online payments.",
    stack: ["React", "Termii", "Monnify"],
    url: "https://waiterswarehouse.com",
  },
  {
    title: "Royal Butler",
        blurb: "Order drinks and book Royal Butler's services for your events, with next-day delivery scheduling.",
    stack: ["React", "TypeScript", "Vite"],
    url: "https://www.royalbutler.ng/",
  },
  {
    title: "Visioneers Elementary School",
    blurb: "Website for a primary and junior secondary school.",
    stack: ["React", "TypeScript"],
    url: "https://www.visioneerselementaryschool.com/",
  },
  {
    title: "TIVS",
    blurb: "Identity and NIN verification platform with an admin dashboard: sign-in, OTP and password reset wired to a live backend.",
    stack: ["React", "TypeScript", "Vite"],
    url: "#",
  },
  {
    title: "VOTS",
    blurb: "Website for 101 Volunteers of the South.",
    stack: ["Next.js", "Vercel"],
    url: "https://vots.com.ng",
  },
];