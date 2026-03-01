
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Reuse the logo from public (used earlier as /dsc-logo.png)
const dscLogo = '/dsc-logo.jpeg';
import Timeline from "./components/Timeline";

export default function App() {
  // Countdown to March 11, 2026
  const getCountdown = () => {
    const eventDate = new Date('2026-03-11T00:00:00');
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
    const interval = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white relative overflow-hidden scroll-smooth pt-24">
      {/* Wavy Pattern Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <svg className="absolute right-0 top-0 h-full" width="600" viewBox="0 0 600 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M600 0C600 0 500 100 500 200C500 300 600 400 600 500C600 600 500 700 500 800C500 900 600 1000 600 1100V1200H600V0Z" fill="url(#wave-gradient)" fillOpacity="0.1" />
          <defs>
            <linearGradient id="wave-gradient" x1="550" y1="0" x2="550" y2="1200">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-6 flex items-center justify-between backdrop-blur-md bg-[#0a0e1a]/70 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
            DATA CONCLAVE
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">ABOUT</a>
          <a href="#events-timeline" className="hover:text-white transition-colors">EVENTS</a>
          <a href="#speakers" className="hover:text-white transition-colors">SPEAKER</a>
          <a href="#sponsors" className="hover:text-white transition-colors">SPONSORS</a>
          <a href="#throwback" className="hover:text-white transition-colors">DC'25</a>
        </div>

        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all">
          REGISTER
        </button>
      </nav>

      {/* Hero Section with Photo Overlay */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Photo with Overlay */}
        <div className="absolute inset-0">
          {/* Simulated photo background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            <div className="absolute left-0 top-0 bottom-0 w-1/2">
              <svg width="100%" height="100%" viewBox="0 0 800 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="person-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4b5563" />
                    <stop offset="100%" stopColor="#1f2937" />
                  </linearGradient>
                </defs>
                {/* Simulated person silhouette */}
                <ellipse cx="300" cy="250" rx="120" ry="140" fill="url(#person-gradient)" opacity="0.6" />
                <rect x="180" y="380" width="240" height="400" rx="20" fill="url(#person-gradient)" opacity="0.5" />
                <circle cx="280" cy="280" r="15" fill="#374151" opacity="0.8" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a0e1a]/60 to-[#0a0e1a]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 w-full">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-br from-indigo-400 to-purple-500 shadow-[0_10px_28px_rgba(99,102,241,0.35)]">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src="/dsc-logo.png"
                    alt="Data Science Club Logo"
                    className="w-full h-full object-cover rounded-full z-10 scale-[0.88]"
                    draggable="false"
                  />
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-purple-300 font-semibold">
                  Data Science Club Presents
                </p>
                <p className="text-sm text-white/60">Department of Data Science and Business Systems</p>
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              The Ultimate Platform for Planning and Promoting Successful Events
            </h1>

            <p className="text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Data Conclave brings together industry experts, thought leaders, and enthusiasts to share knowledge, insights, and practical experience in Data Science and AI.
            </p>

            <button className="flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all">
              See more about us
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3L8 13M8 13L13 8M8 13L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section with Photo Background */}
      <section className="relative py-20">
        {/* Background Photo */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
            <svg width="100%" height="100%" viewBox="0 0 1920 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="person-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="100%" stopColor="#1f2937" />
                </linearGradient>
              </defs>
              <ellipse cx="960" cy="200" rx="180" ry="200" fill="url(#person-bg)" opacity="0.4" />
              <rect x="780" y="380" width="360" height="220" rx="30" fill="url(#person-bg)" opacity="0.3" />
              <circle cx="860" cy="260" r="25" fill="#4b5563" opacity="0.6" />
              <rect x="1050" y="320" width="80" height="120" rx="40" fill="#374151" opacity="0.5" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-[#0a0e1a]/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 text-center">
          <div className="text-xs tracking-[0.2em] text-purple-400 mb-4 uppercase font-semibold">
            The Ultimate Platform for Unforgettable Events
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Experience Data Conclave Today!
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Designed for students and aspiring professionals, Data Conclave offers a space to learn, collaborate, and explore real-world applications of data science and artificial intelligence.
          </p>

          {/* Countdown Boxes */}
          <div className="flex justify-center gap-4 lg:gap-6 mb-16">
            {[
              [countdown.days, "DAYS"],
              [countdown.hours, "HOURS"],
              [countdown.minutes, "MINUTES"],
              [countdown.seconds, "SECONDS"]
            ].map(([val, unit]) => (
              <motion.div
                key={unit}
                className="backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-white/10 rounded-2xl p-6 lg:p-8 min-w-[80px] lg:min-w-[120px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-3xl lg:text-5xl font-bold mb-2">{String(val).padStart(2, '0')}</div>
                <div className="text-[10px] lg:text-xs tracking-wider text-gray-400">{unit}</div>
              </motion.div>
            ))}
          </div>

          {/* Data Conclave 2026 - Dates only, no location or buttons */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">DATA CONCLAVE 2026</h3>
            <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M5 2a1 1 0 00-1 1v1H3a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H6V3a1 1 0 00-1-1z" />
                </svg>
                March 11–13, 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* EVENTS TIMELINE SECTION                        */}
      {/* ═══════════════════════════════════════════════ */}
      <Timeline />

      {/* Speakers Section */}
      <section id="speakers" className="relative py-24 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.24em] text-purple-300 mb-3 font-semibold">
              Featured Speakers
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-3">Meet Our Speakers</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Lineup to be finalized. These are placeholder profiles for layout preview.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Dr. Placeholder One", role: "AI Research Lead", topic: "Future of Applied AI", logo: "/dsc-logo.png" },
              { name: "Ms. Sample Two", role: "Senior Data Scientist", topic: "ML in Production", logo: "/vite.svg" },
              { name: "Mr. Demo Three", role: "Analytics Consultant", topic: "Data Storytelling", logo: "/dsc-logo.png" },
              { name: "Prof. Mock Four", role: "Academic Expert", topic: "Responsible AI Systems", logo: "/vite.svg" },
            ].map((speaker, idx) => (
              <motion.div
                key={speaker.name}
                className="rounded-2xl border border-white/10 bg-white/[.04] backdrop-blur-xl p-5 hover:bg-white/[.06] transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-br from-indigo-400 to-purple-500 mb-4">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                    <img src={speaker.logo} alt={speaker.name} className="w-[72%] h-[72%] object-contain" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold leading-tight mb-1">{speaker.name}</h3>
                <p className="text-sm text-purple-300 mb-3">{speaker.role}</p>
                <div className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/70">
                  {speaker.topic}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="relative py-20 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.24em] text-purple-300 mb-3 font-semibold">
              Our Sponsors
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">Powered By Supporters</h2>
            <p className="text-white/60">Placeholder sponsor slots. Final logos can be replaced anytime.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Title Sponsor", logo: "/dsc-logo.png" },
              { name: "Tech Partner", logo: "/vite.svg" },
              { name: "Community Partner", logo: "/dsc-logo.png" },
            ].map((sponsor, idx) => (
              <motion.div
                key={sponsor.name}
                className="rounded-2xl border border-white/10 bg-white/[.04] backdrop-blur-xl p-6 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div className="w-20 h-20 rounded-xl bg-white p-3 mb-4 flex items-center justify-center">
                  <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain" />
                </div>
                <p className="text-sm text-white/80 font-medium">{sponsor.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Throwback Section */}
      <section id="throwback" className="relative py-24 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.24em] text-purple-300 mb-3 font-semibold">
              DC'25
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">DC'25</h2>
            <p className="text-white/60">Throwback highlights from DataConclave 2025.</p>
          </div>

          <div className="relative overflow-hidden py-2">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#0a0e1a] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#0a0e1a] to-transparent" />

            <div className="dc25-track flex gap-5 w-max">
              {[...throwbackImages, ...throwbackImages].map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="shrink-0 w-[340px] sm:w-[440px] rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.08] to-white/[.03] p-2"
                >
                  <img
                    src={src}
                    alt={`DC25 throwback ${idx + 1}`}
                    className="w-full h-64 sm:h-80 rounded-xl object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-20 px-8 lg:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Text Content */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-600 bg-clip-text text-transparent pr-2">WHO</span>
              <span className="text-white/90"> WE ARE</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0 text-base lg:text-lg" style={{ lineHeight: '1.7' }}>
              Data Conclave is a comprehensive platform for organizing and promoting data science events, conferences, and other industry-related gatherings. Organized by Data Science Club and DSBS Student Association, our team of experienced professionals.
            </p>
            {/* Social links: two groups, no CTA */}
            <div className="grid gap-4 mb-4 w-full" style={{ gridTemplateColumns: '220px 1fr' }}>
              {/* Data Science Club group */}
              <div className="contents">
                <span className="text-sm font-semibold text-white/80" style={{ minWidth: '200px', display: 'inline-block' }}>Data Science Club</span>
                <div className="flex flex-row items-center gap-3">
                  <motion.a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Data Science Club Instagram"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-md transition-all hover:shadow-[0_0_0_4px_rgba(99,102,241,0.25)] hover:ring-2 hover:ring-indigo-500/40 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    whileHover={{ scale: 1.13 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400">
                      <rect x="2.5" y="2.5" width="19" height="19" rx="6" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="#"
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
                      className="w-5 h-5 text-indigo-400"
                      aria-hidden="true"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.7c0-1.83-.03-4.18-2.55-4.18-2.55 0-2.94 1.99-2.94 4.05V24h-4V8z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
              {/* DSBS Students’ Association group */}
              <div className="contents">
                <span className="text-sm font-semibold text-white/80" style={{ minWidth: '200px', display: 'inline-block' }}>DSBS Students’ Association</span>
                <div className="flex flex-row items-center gap-3">
                  <motion.a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="DSBS Students’ Association Instagram"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-md transition-all hover:shadow-[0_0_0_4px_rgba(139,92,246,0.25)] hover:ring-2 hover:ring-purple-500/40 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    whileHover={{ scale: 1.13 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400">
                      <rect x="2.5" y="2.5" width="19" height="19" rx="6" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="#"
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
                      className="w-5 h-5 text-indigo-400"
                      aria-hidden="true"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.7c0-1.83-.03-4.18-2.55-4.18-2.55 0-2.94 1.99-2.94 4.05V24h-4V8z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
          {/* RIGHT: Logo visual highlight */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div
              className="relative w-56 h-56 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden"
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
                    'conic-gradient(from 180deg at 50% 50%, #a78bfa 0deg, #6366f1 180deg, #a78bfa 360deg)',
                  opacity: 0.18,
                  filter: 'blur(8px)',
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
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold">DATA CONCLAVE</div>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          </div>

          <div className="text-sm text-gray-500">
            © 2025 Data Conclave. Organized by Data Science Club & DSBS Student Association
          </div>
        </div>
      </footer>
    </div>
  );
}
