import { useLayoutEffect, useRef, useState, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";
import portrait from "./assets/portrait-placeholder.png";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = "atharvashimpis8@gmail.com";

const services = [
  { title: "MERN Stack Developer",       tags: ["MongoDB", "Express", "React", "Node.js", "Full-Stack Apps"] },
  { title: "Java & Spring Boot",          tags: ["Java", "Spring Boot", "REST APIs", "Backend Systems"] },
  { title: "AI-Integrated Applications", tags: ["Gemini API", "Smart Features", "Automation"] },
  { title: "Python & SQL Handling",       tags: ["Python", "SQL", "Database Handling"] },
];

const projects = [
  {
    name: "NeighbourHub", status: "Live-ready concept",
    description: "A real-time MERN stack community notice board for posts, local updates, and smarter category suggestions.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "Gemini API"],
    link: "https://github.com/atharva133-dev/NeighbourHubb",
  },
  {
    name: "VBS", status: "Secure banking app",
    description: "Virtual Banking System with account flows, transaction handling, and structured backend persistence.",
    tags: ["Java", "Spring Boot", "SQL"],
    link: "https://github.com/atharva133-dev/VBS",
  },
  { name: "Coming Soon", status: "In progress", description: "New project launching soon.", tags: [], muted: true },
  { name: "Coming Soon", status: "In progress", description: "Reserved slot for the next shipped build.", tags: [], muted: true },
];

const statement = "From idea to launch I build clean, scalable web apps that solve real problems, backed by strong fundamentals and a focus on shipping fast without cutting corners.";

const StarIcon = forwardRef(function StarIcon({ className = "" }, ref) {
  return (
    <svg ref={ref} className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <path d="M50 0C50 0 55 38 62 50C69 62 100 50 100 50C100 50 62 55 50 62C38 69 50 100 50 100C50 100 45 62 38 50C31 38 0 50 0 50C0 50 38 45 50 38C62 31 50 0 50 0Z" />
    </svg>
  );
});

function Tags({ items }) {
  if (!items.length) return <span className="tags-muted">In progress</span>;
  return <span className="tags-text">{items.join(" • ")}</span>;
}

export default function App() {
  const appRef          = useRef(null);
  const heroRef         = useRef(null);
  const softwareRef     = useRef(null);
  const engineerRef     = useRef(null);
  // The ONE photo element — fixed, travels the whole page
  const photoRef        = useRef(null);
  const photoCardRef    = useRef(null);
  const frontRef        = useRef(null);
  const backRef         = useRef(null);
  const heroPhotoSlotRef = useRef(null);
  const aboutPhotoSlotRef = useRef(null);
  const starLeftRef     = useRef(null);
  const starRightRef    = useRef(null);
  const statementRef    = useRef(null);
  const wordRefs        = useRef([]);
  const [navOpen, setNavOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  useLayoutEffect(() => {
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Helper: get viewport rect of an element
      const getRect = (el) => el.getBoundingClientRect();

      if (noMotion) {
        gsap.set(photoRef.current, { scale: 1 });
        return;
      }

      const heroSlotR  = getRect(heroPhotoSlotRef.current);
      const photoR     = getRect(photoRef.current);
      const initX = heroSlotR.left + heroSlotR.width  / 2 - (photoR.left + photoR.width  / 2);
      const initY = heroSlotR.top  + heroSlotR.height / 2 - (photoR.top  + photoR.height / 2);
      const initScale = Math.min(heroSlotR.width / photoR.width, heroSlotR.height / photoR.height);
      gsap.set(photoRef.current, { x: initX, y: initY, scale: initScale });

      const aboutSlotR = getRect(aboutPhotoSlotRef.current);
      const targetX = aboutSlotR.left + aboutSlotR.width  / 2 - (photoR.left + photoR.width  / 2);
      const targetY = aboutSlotR.top  + aboutSlotR.height / 2 - (photoR.top  + photoR.height / 2);
      const targetScale = Math.min(aboutSlotR.width / photoR.width, aboutSlotR.height / photoR.height);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=150%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onLeave: () => {
              gsap.set(photoRef.current, {
                position: "absolute",
                top: window.scrollY,
                left: window.scrollX,
              });
            },
            onEnterBack: () => {
              gsap.set(photoRef.current, {
                position: "fixed",
                top: 0,
                left: 0,
              });
            }
          },
        });

        tl
          .to([softwareRef.current, engineerRef.current],
            { yPercent: -120, opacity: 0.12, duration: 1, ease: "none" }, 0)
          .to(starLeftRef.current,
            { x: -80, y: -150, opacity: 0, rotate: -20, duration: 1, ease: "none" }, 0)
          .to(starRightRef.current,
            { x: 80, y: -120, opacity: 0, rotate:  24, duration: 1, ease: "none" }, 0)
          // Travel + scale — scrubbed with scroll
          .to(photoRef.current, {
            x: targetX,
            y: targetY,
            scale: targetScale,
            duration: 1,
            ease: "none",
          }, 0)
          // Z-pop: card surges towards viewer at mid-flip then settles back
          .to(photoCardRef.current, { z: 140, duration: 0.5, ease: "none" }, 0)
          .to(photoCardRef.current, { z: 0,   duration: 0.5, ease: "none" }, 0.5)
          // Front face flips away (0→180), back face flips into view (180→360)
          .to(frontRef.current, { rotateY: 180, duration: 1, ease: "none" }, 0)
          .fromTo(backRef.current, { rotateY: 180 }, { rotateY: 360, duration: 1, ease: "none" }, 0);
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=120%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onLeave: () => {
              gsap.set(photoRef.current, {
                position: "absolute",
                top: window.scrollY,
                left: window.scrollX,
              });
            },
            onEnterBack: () => {
              gsap.set(photoRef.current, {
                position: "fixed",
                top: 0,
                left: 0,
              });
            }
          },
        });
        tl
          .to([softwareRef.current, engineerRef.current],
            { yPercent: -90, opacity: 0.15, duration: 1, ease: "none" }, 0)
          .to(".hero-star",
            { y: -90, opacity: 0, duration: 1, ease: "none" }, 0)
          // Travel + scale — scrubbed with scroll
          .to(photoRef.current, {
            x: targetX,
            y: targetY,
            scale: targetScale,
            duration: 1,
            ease: "none",
          }, 0)
          // Z-pop mid-flip
          .to(photoCardRef.current, { z: 100, duration: 0.5, ease: "none" }, 0)
          .to(photoCardRef.current, { z: 0,   duration: 0.5, ease: "none" }, 0.5)
          // Front face flips away (0→180), back face flips into view (180→360)
          .to(frontRef.current, { rotateY: 180, duration: 1, ease: "none" }, 0)
          .fromTo(backRef.current, { rotateY: 180 }, { rotateY: 360, duration: 1, ease: "none" }, 0);
      });

      /* ── WORD REVEAL — pinned, scrubbed ── */
      const wordsFiltered = wordRefs.current.filter(Boolean);
      const total = wordsFiltered.length;
      gsap.set(wordsFiltered, { opacity: 0.13, color: "#b0aca5" });

      const stmtTl = gsap.timeline({
        scrollTrigger: {
          trigger: statementRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
      wordsFiltered.forEach((word, i) => {
        stmtTl.fromTo(
          word,
          { opacity: 0.13, color: "#b0aca5" },
          { opacity: 1, color: "#0f0f0f", ease: "none", duration: 1 / total },
          i / total,
        );
      });

      /* ── SCROLL REVEALS ── */
      gsap.utils.toArray(".reveal-row").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 44 }, {
          opacity: 1, y: 0, duration: 0.72, delay: i * 0.04, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray(".draw-line").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, {
          scaleX: 1, duration: 0.82, transformOrigin: "left center", ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.76, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (statusMessage) {
      setStatusMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const project = formData.project.trim();

    if (!name || !email || !project) {
      setStatusMessage("Something went wrong. Try again.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatusMessage("Something went wrong. Try again.");
      return;
    }

    if (!accessKey) {
      setStatusMessage("Something went wrong. Try again.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message: project,
          subject: `New project inquiry from ${name}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error("Submission failed");
      }

      setFormData({ name: "", email: "", project: "" });
      setStatusMessage("Message sent! I'll get back to you soon.");
    } catch {
      setStatusMessage("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { label: "About Me", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact",  href: "#contact" },
  ];

  const words = statement.split(" ");

  return (
    <div ref={appRef} className="app-root">
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── THE ONE PHOTO — fixed, travels from hero to about ── */}
      <div ref={photoRef} className="traveling-photo" aria-hidden="true">
        <div ref={photoCardRef} className="portrait-card">
          <div ref={frontRef} className="portrait-face portrait-front">
            <img src={portrait} alt="Atharva" />
          </div>
          <div ref={backRef} className="portrait-face portrait-back">
            <img src={portrait} alt="Atharva" />
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="dynamic-island" aria-label="Primary navigation">
        <a href="#hero" className="island-name">Atharva</a>
        <button className="island-btn" aria-label="Toggle menu" aria-expanded={navOpen}
          onClick={() => setNavOpen(v => !v)}>
          {navOpen ? <X size={17} strokeWidth={2.8} /> : <span className="dots">···</span>}
        </button>
        {navOpen && (
          <div className="island-menu" role="menu">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} role="menuitem" className="island-menu-item"
                onClick={() => setNavOpen(false)}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      <main>
        {/* ── HERO ── */}
        <section id="hero" ref={heroRef} className="hero-section">
          <div className="hero-content">

            {/* Computer— z-index 1, behind photo slot */}
            <div className="hero-row hero-row-back" ref={softwareRef}>
              <StarIcon ref={starLeftRef} className="hero-star hero-star-left" />
              <span>Computer</span>
            </div>

            {/* ENGINEER — z-index 3, in front of photo slot */}
            <div className="hero-row hero-row-front" ref={engineerRef}>
              <span>Engineer</span>
              <StarIcon ref={starRightRef} className="hero-star hero-star-right" />
            </div>

            {/* Hero photo slot — invisible spacer that marks photo's start position */}
            <div ref={heroPhotoSlotRef} className="hero-photo-slot" />

          </div>
          <p className="hero-year">©2026</p>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="about-section">
          <div className="about-grid">

            {/* LEFT: Hey! + bio */}
            <div className="about-left">
              <h2 className="about-hey">Hey!</h2>
              <p className="about-bio">
                I'm Atharva, a computer<br />
                engineering student at DBIT,<br />
                currently building<br />
                NeighbourHub.
              </p>
            </div>

            {/* MIDDLE: photo slot (empty, just holds space for traveling photo) */}
            <div ref={aboutPhotoSlotRef} className="about-photo-slot" aria-hidden="true" />

            {/* RIGHT: description */}
            <div className="about-right fade-up">
              <p>I'm a computer engineering student and full-stack developer with a strong focus on building real-time, scalable applications.</p>
              <p>I've built NeighbourHub, a real-time MERN stack community notice board platform, and VBS (Virtual Banking System), a secure banking application built with Java, Spring Boot, and SQL with more projects in the works.</p>
              <a href="#contact" className="get-started-btn">
                Get Started <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ── STATEMENT ── */}
        <section ref={statementRef} className="statement-section">
          <p className="statement-text" aria-label={statement}>
            {words.map((w, i) => (
              <span key={i} ref={el => { if (el) wordRefs.current[i] = el; }}
                className="statement-word">
                {w}{i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="services-section">
          <h2 className="services-heading reveal-row">Services</h2>
          <div className="services-list">
            {services.map(s => (
              <article key={s.title} className="service-row reveal-row">
                <div className="draw-line" aria-hidden="true" />
                <span className="service-title">{s.title}</span>
                <Tags items={s.tags} />
              </article>
            ))}
            <div className="service-bottom-line" aria-hidden="true" />
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="projects-section">
          <h2 className="projects-heading reveal-row">Projects</h2>
          <div className="projects-grid">
            {projects.map(p => (
              <article key={p.name + p.description}
                className={`project-card fade-up${p.muted ? " is-muted" : ""}`}>
                <div>
                  <span className="project-status">{p.status}</span>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.description}</p>
                </div>
                <div className="project-footer">
                  <Tags items={p.tags} />
                  {!p.muted && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="project-link" aria-label={`View ${p.name} on GitHub`}>
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="contact-section">
          <div className="contact-inner">
            <div className="contact-copy fade-up">
              <h2 className="contact-heading">Let's talk.</h2>
              <p className="contact-sub">Have a project or need help? Fill out the form, and we'll get back to you soon.</p>
              <div className="social-row" aria-label="Social links">
                <a href="https://instagram.com/" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="https://www.linkedin.com/in/atharva-shimpi-b6a4a4251/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
                <a href="https://github.com/atharva133-dev" aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={18} /></a>
              </div>
            </div>
            <form className="contact-form fade-up" onSubmit={handleSubmit}>
              <label><span>Name</span><input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter your name" required /></label>
              <label><span>Email</span><input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required /></label>
              <label>
                <span>Your Project</span>
                <textarea name="project" value={formData.project} onChange={handleChange} placeholder="Tell us about your project" rows={5} required />
              </label>
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Submit"}</button>
              {statusMessage && <p role="status">{statusMessage}</p>}
            </form>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer-section">
          <div className="footer-bg-text fade-up">Atharva</div>
          <div className="footer-content">
            <div className="footer-left fade-up">
              <h3 className="footer-heading">Scaling 
Start-ups for Growth</h3>
            </div>
            <div className="footer-center fade-up">
              <h4 className="footer-subheading">Quick Links</h4>
              <nav className="footer-nav">
                <a href="#hero">Home</a>
                <a href="#about">About Me</a>
                <a href="#services">Services</a>
                <a href="#projects">Works</a>
                <a href="#contact">Contact</a>
              </nav>
            </div>
            <div className="footer-right fade-up">
              <h4 className="footer-subheading">Contact</h4>
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-email">{CONTACT_EMAIL}</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
