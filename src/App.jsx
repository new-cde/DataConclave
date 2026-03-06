
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timeline from "./components/Timeline";
import NeuralRing from "./components/NeuralRing";
const dscLogo = '/dsc-logo.png';

const NAV_SECTIONS = [
  { id: 'about', label: 'ABOUT', href: '#' },
  { id: 'events-timeline', label: 'EVENTS', href: '#events-timeline' },
  { id: 'speakers', label: 'SPEAKERS', href: '#speakers' },
  { id: 'throwback', label: "DC'25", href: '#throwback' },
];

export default function App() {
  // Active section for navbar highlight
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});

  // Countdown to March 12, 2026
  const getCountdown = () => {
    const eventDate = new Date('2026-03-12T00:00:00');
    const now = new Date();
    let diff = Math.max(0, eventDate - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);
    return { days, hours, minutes, seconds };
  };
  const [countdown, setCountdown] = useState(getCountdown());
  const throwbackImages = [
    "/dc25/DC251.jpeg",
    "/dc25/DC252.jpeg",
    "/dc25/DC253.jpeg",
    "/dc25/DC254.jpeg",
    "/dc25/DC255.jpeg",
  ];

  useEffect(() => {
    // Map section ids to DOM nodes
    NAV_SECTIONS.forEach(({ id }) => {
      sectionRefs.current[id] = document.getElementById(id);
    });
    const handleScroll = () => {
      // fallback for browsers without IntersectionObserver
      let found = 'about';
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const { id } = NAV_SECTIONS[i];
        const el = sectionRefs.current[id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            found = id;
            break;
          }
        }
      }
      setActiveSection(found);
    };
    // You may want to add event listeners here if needed
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140; // navbar offset
      let current = 'about';

      for (const { id } of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white relative scroll-smooth overflow-x-hidden
bg-[radial-gradient(circle_at_top_right,#1e293b_0%,#0A1424_40%,#020617_100%)]">  <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="absolute right-0 top-0 h-full" width="600" viewBox="0 0 600 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M600 0C600 0 500 100 500 200C500 300 600 400 600 500C600 600 500 700 500 800C500 900 600 1000 600 1100V1200H600V0Z" fill="url(#wave-gradient)" fillOpacity="0.1" />
          <defs>
            <linearGradient id="wave-gradient" x1="550" y1="0" x2="550" y2="1200">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-16 py-4 sm:py-5 lg:py-6 flex items-center justify-between backdrop-blur-md bg-slate-900/20 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="text-xl lg:text-2xl font-bold tracking-tight flex items-center gap-2">
            DATA CONCLAVE
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#05080F] via-[#0A1424] to-[#020617]"></div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium">
          {NAV_SECTIONS.map(({ id, label, href }) => (
            <a
              key={id}
              href={href}
              className={
                `relative px-2 py-1 transition-all duration-200
                ${activeSection === id
                  ? 'text-white font-semibold'
                  : 'text-gray-400'}
                `
              }
              style={{
                transition: 'color 0.2s, box-shadow 0.2s',
              }}
              onClick={e => {
                // Smooth scroll
                const el = document.getElementById(id);
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  window.history.replaceState(null, '', href);
                }
              }}
            >
              <span>{label}</span>
              {activeSection === id && (
                <span
                  className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full
             bg-gradient-to-r from-white/60 via-white to-white/60
             origin-left will-change-transform"
                  style={{
                    transform: activeSection === id ? 'scaleX(1)' : 'scaleX(0)',
                    opacity: activeSection === id ? 1 : 0,
                    transition:
                      'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), ' +
                      'opacity 0.5s ease-out',
                  }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Register Button */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScne-RYUP2bqjw4778mci4fDJEhRtCVFUObiPjGcR3dl-2Xyg/viewform?usp=publish-editor"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-block"
        >
          <button className="px-5 lg:px-8 py-2.5 lg:py-3 rounded-full bg-gradient-to-r from--[#00C2FF] to-[#2563EB]
  text-xs lg:text-sm font-semibold
  shadow-lg shadow-cyan-500/20
  hover:shadow-primary/40
  hover:scale-105
  transition-all duration-300">
            REGISTER
          </button>
        </a>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
              {NAV_SECTIONS.map(({ id, label, href }, idx) => (
                <motion.a
                  key={id}
                  href={href}
                  className={`text-2xl font-semibold${activeSection === id ? 'text-white' : 'text-gray-400'
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={e => {
                    const el = document.getElementById(id);
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      window.history.replaceState(null, '', href);
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  {label}
                </motion.a>
              ))}
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLScne-RYUP2bqjw4778mci4fDJEhRtCVFUObiPjGcR3dl-2Xyg/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-8 py-3 rounded-full bg-primary-gradient
                text-xs lg:text-sm font-semibold
                shadow-lg shadow-cyan-500/20
                hover:shadow-primary/40
                hover:scale-105
                transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: NAV_SECTIONS.length * 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                REGISTER
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Hero Section with Photo Overlay */}
      <section className="relative pt-24 pb-10 lg:pt-28 lg:pb-10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full 
          grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center py-0 lg:py-0">
          {/* LEFT — TEXT */}
          <div className="text-center lg:text-left">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-6
          bg-gradient-to-r from-[#00C2FF] via-white to-[#2563EB]
          bg-clip-text text-transparent">
                Data Conclave '26
              </h1>

              <p className="text-cyan leading-relaxed mb-10 max-w-xl text-base sm:text-lg mx-auto lg:mx-0">
                A premier technology and data intelligence summit bringing together
                industry pioneers, researchers, and innovators shaping the future of AI and analytics.
              </p>
              <div className="flex flex-col items-center lg:items-start gap-2 mt-3">
                <p className="text-sm tracking-wide text-cyan mb-3 text-center lg:text-left">                  12 – 13 MARCH 2026
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScne-RYUP2bqjw4778mci4fDJEhRtCVFUObiPjGcR3dl-2Xyg/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-full
                    bg-gradient-to-r from-[#00C2FF] to-[#2563EB]
                    font-semibold tracking-wide
                    shadow-lg shadow-cyan-500/20
                    hover:shadow-primary/40
                    hover:scale-105
                    transition-all duration-300"
                >
                  Register Now
                </a>
              </div>

            </motion.div>
          </div>

          {/* RIGHT — RING (Centered Cleanly) */}
          <div className="relative flex justify-center items-center order-first lg:order-last">
            <div className="relative w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[420px] aspect-square lg:-translate-x-12">
              <NeuralRing />
            </div>
          </div>
        </div>
        {/* Soft glow behind ring */}
        <div className="absolute right-[30%] top-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00C2FF]/10 blur-3xl invisible lg:visible" />
      </section>
      {/* Countdown Section with Photo Background */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        {/* Background Photo */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.06),transparent_70%)]" />
        <svg width="100%" height="100%" viewBox="0 0 1920 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="person-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
          <div className="text-xs tracking-[0.2em] text-cyan/300 mb-4 uppercase font-semibold">
            Where Data, Ideas, and Innovation Converge
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Experience Data Conclave Today!
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            A technical workshop and knowledge-sharing event bringing together students and experts to explore emerging trends in data science, artificial intelligence, and analytics through interactive sessions and discussions.
          </p>

          {/* Countdown Boxes */}
          <div className="flex justify-center gap-2 sm:gap-3 lg:gap-6 mb-16 px-2 sm:px-0 overflow-x-auto">
            {[
              [countdown.days, "DAYS"],
              [countdown.hours, "HOURS"],
              [countdown.minutes, "MINUTES"],
              [countdown.seconds, "SECONDS"]
            ].map(([val, unit]) => {
              const formatted = String(val).padStart(2, '0');
              return (
                <motion.div
                  key={unit}
                  className="backdrop-blur-md bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 rounded-2xl p-2 sm:p-3 lg:p-6 min-w-[50px] sm:min-w-[80px] lg:min-w-[130px] min-h-[50px] sm:min-h-[80px] lg:min-h-[130px] flex flex-col items-center shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ boxSizing: 'border-box' }}
                >
                  <div
                    className="relative flex items-center justify-center mb-1 sm:mb-2"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={formatted}
                        initial={{ rotateX: 90, opacity: 0, zIndex: 1 }}
                        animate={{ rotateX: 0, opacity: 1, zIndex: 2 }}
                        exit={{ rotateX: -90, opacity: 0, zIndex: 1 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="text-xl sm:text-2xl lg:text-4xl font-bold text-white"
                        style={{ fontVariantNumeric: 'tabular-nums', userSelect: 'none' }}
                      >
                        {formatted}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="text-[9px] sm:text-[11px] lg:text-xs tracking-wider text-gray-400">{unit}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Data Conclave 2026 - Dates only, no location or buttons */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">DATA CONCLAVE 2026</h3>
            <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M5 2a1 1 0 00-1 1v1H3a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H6V3a1 1 0 00-1-1z" />
                </svg>
                March 12–13, 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* EVENTS TIMELINE SECTION                        */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="events-timeline">
        <Timeline />
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300 mb-3 font-semibold">
              Featured Speakers
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              <span className="text-white/90"> Meet Our </span>
              <span className="bg-gradient-to-r from-[#00C2FF] to-[#2563EB] bg-clip-text text-transparent pr-2">Speakers</span>
            </h2>

            <p className="text-white/60 max-w-2xl mx-auto">
              Esteemed speakers delivering insightful workshops, technical talks, and panel discussions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Rasul Meeran Moideen", role: "Business Intelligence Developer - Tableau", topic: "Workshop", logo: "/speakers/rasul.jpeg" },
              { name: "Poornashri Anandakrishnan", role: "HR Executive - HCL", topic: "Technical Talk + Panel Discussion", logo: "/speakers/poornashri.jpeg" },
              { name: "Guna Roobene S", role: "Legal Associate - HCL", topic: "Technical Talk + Panel Discussion", logo: "/speakers/guna.jpeg" },
              { name: "Santhosh", role: "Manager of Teams - DHL", topic: "Technical Talk + Panel Discussion", logo: "/speakers/santosh.jpeg" },
              { name: "Sai Anirudh", role: "Product Manager - Aivirex Innovations", topic: "Technical Talk", logo: "/speakers/sai.jpeg" },
              { name: "Jasim Mohammed", role: "Founder & CEO - Neur XR", topic: "Panel Discussion", logo: "/speakers/jasim.jpeg" },
              { name: "Nitesh Prabhuram JP", role: "Founder & CEO - Gritscape", topic: "Panel Discussion", logo: "/speakers/nitesh.jpeg" },
            ].map((speaker, idx) => (
              <motion.div
                key={speaker.name}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/[.06] transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-br from-cyan-400 to-blue-500 mb-4">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                    <img src={speaker.logo} alt={speaker.name} className="w-[72%] h-[72%] object-contain" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold leading-tight mb-1">{speaker.name}</h3>
                <p className="text-sm text-cyan-300 mb-3">{speaker.role}</p>
                <div className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/70">
                  {speaker.topic}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Throwback Section */}
      <section id="throwback" className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300 mb-3 font-semibold">
              DATA CONCLAVE ARCHIVES
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-[#00C2FF] to-[#2563EB] bg-clip-text text-transparent pr-2">DC '25</span>

            </h2>
            <p className="text-white/60">A look back at key moments, sessions, and experiences from Data Conclave 2025.</p>
          </div>

          <div className="relative overflow-hidden py-2">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#0a0e1a] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#0a0e1a] to-transparent" />

            <div className="dc25-track flex gap-5 w-max">
              {[...throwbackImages, ...throwbackImages].map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="shrink-0 w-[280px] sm:w-[340px] md:w-[440px] rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.08] to-white/[.03] p-2"
                >
                  <img
                    src={src}
                    alt={`DC 25 throwback ${idx + 1}`}
                    className="w-full h-64 sm:h-80 rounded-xl object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Text Content */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-[#00C2FF] to-[#2563EB] bg-clip-text text-transparent pr-2">WHO</span>
              <span className="text-white/90"> WE ARE</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0 text-base lg:text-lg" style={{ lineHeight: '1.7' }}>
              The Data Science Club is a student-led technical community focused on exploring data science, machine learning, and analytics through workshops, projects, hackathons, and industry interactions.
              <br /><br />
              The DSBS Students’ Association represents students of the Data Science and Business Systems department, organizing academic, technical, and cultural initiatives to promote collaboration, leadership, and holistic development.
            </p>
            {/* Social links: two groups, no CTA */}
            <div className="grid gap-4 mb-4 w-full" style={{ gridTemplateColumns: '150px 1fr' }}>
              {/* Data Science Club group */}
              <div className="contents">
                <span className="text-base font-semibold text-white/80 min-w-[120px] sm:min-w-[150px] inline-block">Data Science Club</span>
                <div className="flex flex-row items-center gap-3">
                  <motion.a
                    href="https://www.instagram.com/dsc_dsbs?igsh=aGQzamlxMWtuYzVi"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Data Science Club Instagram"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-md transition-all hover:shadow-[0_0_0_4px_rgba(99,102,241,0.25)] hover:ring-2 hover:ring-indigo-500/40 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    whileHover={{ scale: 1.13 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
                      <rect x="2.5" y="2.5" width="19" height="19" rx="6" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/company/the-data-science-club-srmist/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Data Science Club LinkedIn"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-md transition-all hover:shadow-[0_0_0_4px_rgba(99,102,241,0.25)] hover:ring-2 hover:ring-indigo-500/40 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    whileHover={{ scale: 1.13 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-primaryDark"
                      aria-hidden="true"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.7c0-1.83-.03-4.18-2.55-4.18-2.55 0-2.94 1.99-2.94 4.05V24h-4V8z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
              {/* DSBS Students’ Association group */}
              <div className="contents">
                <span className="text-base font-semibold text-white/80 min-w-[120px] sm:min-w-[150px] inline-block">DSBS Students’ Association</span>
                <div className="flex flex-row items-center gap-3">
                  <motion.a
                    href="https://www.instagram.com/dsbs_students_association?igsh=MTRlemJpbG9pZmp6Yw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="DSBS Students’ Association Instagram"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-md transition-all hover:shadow-[0_0_0_4px_rgba(139,92,246,0.25)] hover:ring-2 hover:ring-purple-500/40 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    whileHover={{ scale: 1.13 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
                      <rect x="2.5" y="2.5" width="19" height="19" rx="6" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/company/dsbs-students-association-srmist/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="DSBS Students’ Association LinkedIn"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-md transition-all hover:shadow-[0_0_0_4px_rgba(99,102,241,0.25)] hover:ring-2 hover:ring-indigo-500/40 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    whileHover={{ scale: 1.13 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-primaryDark"
                      aria-hidden="true"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.7c0-1.83-.03-4.18-2.55-4.18-2.55 0-2.94 1.99-2.94 4.05V24h-4V8z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div

            className="flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="flex flex-col md:flex-row items-center gap-12">

              {/* Data Science Club Logo */}
              <div
                className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full flex items-center justify-center
                 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden"
                style={{
                  boxShadow:
                    '0 0 32px 0 rgba(139,92,246,0.18), 0 0 0 8px rgba(99,102,241,0.10)',
                }}
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,0.8) 0deg, rgba(14,165,233,0.8) 180deg, rgba(34,211,238,0.8) 360deg)',
                    opacity: 0.22,
                    filter: 'blur(10px)',
                  }}
                />

                {/* Masked circular logo */}
                <img
                  src="/dsc-logo.png"
                  alt="Data Science Club Logo"
                  className="w-full h-full object-cover rounded-full z-10 scale-[0.88]"
                  draggable="false"
                />
              </div>

              {/* DSBS Students’ Association Logo  */}
              <div
                className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full flex items-center justify-center
                 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden"
                style={{
                  boxShadow:
                    '0 0 32px 0 rgba(59,130,246,0.18), 0 0 0 8px rgba(37,99,235,0.10)',
                }}
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,0.8) 0deg, rgba(14,165,233,0.8) 180deg, rgba(34,211,238,0.8) 360deg)',
                    opacity: 0.22,
                    filter: 'blur(10px)',
                  }}
                />

                {/* Masked circular logo */}
                <img
                  src="/dsbs-assoc-logo.jpeg"
                  alt="DSBS Students’ Association Logo"
                  className="w-full h-full object-cover rounded-full z-10 scale-[0.88]"
                  draggable="false"
                />
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold">DATA CONCLAVE</div>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          </div>

          <div className="text-sm text-gray-500">
            © 2026 Data Conclave. Organized by Data Science Club & DSBS Student Association
          </div>
        </div>
      </footer>
    </div>
  );
}
