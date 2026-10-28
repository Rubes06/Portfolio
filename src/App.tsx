import { useEffect, useRef, useState } from "react";
import {
  motion,AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { profile, projects, skills } from "./data";

/* Each letter of the name lifts and lights up as the cursor gets close. */
function Letter({ ch, i, mx, my }: { ch: string; i: number; mx: MotionValue<number>; my: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);
  const dist = useTransform([mx, my], ([x, y]: number[]) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2)) : 999;
  });
  const y = useSpring(useTransform(dist, [0, 200], [-26, 0]), { stiffness: 300, damping: 18 });
  const rotate = useSpring(useTransform(dist, [0, 200], [-8, 0]), { stiffness: 300, damping: 18 });
  const color = useTransform(dist, [0, 180], ["#FFD23F", "#EDEBFF"]);
  return (
    <motion.span
      ref={ref}
      className="letter"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15 + i * 0.045, type: "spring", stiffness: 120, damping: 14 }}
    >
      <motion.span style={{ y, rotate, color, display: "inline-block" }}>{ch === " " ? "\u00A0" : ch}</motion.span>
    </motion.span>
  );
}

function Rotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="rotator">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ display: "inline-block" }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Hero({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  return (
    <header className="hero">
      <p className="badge"><span className="dot" /> Open to new projects</p>
      <h1 aria-label={profile.name}>
        {profile.name.split("").map((c, i) => (
          <Letter key={i} ch={c} i={i} mx={mx} my={my} />
        ))}
      </h1>
      <motion.p className="role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        <Rotator words={["Full-stack developer", "React & TypeScript", "Builder of real products"]} />
      </motion.p>
      <motion.p className="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
        {profile.intro}
      </motion.p>
      <motion.div className="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <a href="#work" className="btn solid">See my work <ArrowDown size={18} /></a>
        <a href="#contact" className="btn">Contact me</a>
      </motion.div>
    </header>
  );
}

function Marquee() {
  const row = [...skills, ...skills];
  return (
    <div className="marquee" aria-label="Skills">
      <div className="track">
        {row.map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section className="projects" id="work">
      <h2>Selected work</h2>
            {[...projects].sort((a, b) => Number(a.url === "#") - Number(b.url === "#")).map((p) => (
        <motion.a
          key={p.title}
          className="row"
          href={p.url}
          target={p.url.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          initial="rest"
          whileHover="hover"
          whileFocus="hover"
        >
          <motion.span className="fill" variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }} transition={{ duration: 0.35, ease: [0.7, 0, 0.2, 1] }} />
          <motion.div className="rowin" variants={{ rest: { x: 0 }, hover: { x: 18 } }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
            <div className="meta">
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <ul>{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <motion.span variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }}>
              <ArrowUpRight size={36} />
            </motion.span>
          </motion.div>
        </motion.a>
      ))}
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };
  return (
    <footer className="contact" id="contact">
      <h2>Let's build something.</h2>
      <a className="mail" href={`mailto:${profile.email}`}><Mail size={28} /> {profile.email}</a>
      <div className="actions">
        <button onClick={copy} aria-live="polite">
          {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? "Copied" : "Copy email"}
        </button>
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
      </div>
    </footer>
  );
}

export default function App() {
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const gx = useSpring(mx, { stiffness: 80, damping: 20 });
  const gy = useSpring(my, { stiffness: 80, damping: 20 });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const move = (e: PointerEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <motion.div className="glow" style={{ x: gx, y: gy }} />
      <main>
        <Hero mx={mx} my={my} />
        <section className="about">
          <h2>About</h2>
          <p>{profile.about}</p>
        </section>
        <Marquee />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
