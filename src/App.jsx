
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Reuse the logo from public (used earlier as /dsc-logo.jpeg)
const dscLogo = '/dsc-logo.jpeg';
import Timeline from "./components/Timeline";
import NeuralRing from "./components/NeuralRing.jsx";

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

      <div className="ai-grid"></div>
      <div className="relative z-10">
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
        <nav className="fixed top-0 left-0 right-0 z-50 px-5 lg:px-16 py-4 lg:py-6 flex items-center justify-between backdrop-blur-md bg-[#0a0e1a]/70 border-b border-white/10">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="text-xl lg:text-2xl font-bold tracking-tight flex items-center gap-2">
              DATA CONCLAVE
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">ABOUT</a>
            <a href="#events-timeline" className="hover:text-white transition-colors">EVENTS</a>
            <a href="#speakers" className="hover:text-white transition-colors">SPEAKER</a>
            <a href="#sponsors" className="hover:text-white transition-colors">SPONSORS</a>
            <a href="#throwback" className="hover:text-white transition-colors">DC'25</a>
          </div>

          <button className="px-5 lg:px-8 py-2.5 lg:py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-xs lg:text-sm font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all">
            REGISTER
          </button>
        </nav>


        {/* Hero Section with Photo Overlay */}
        <section className="relative min-h-screen flex items-center 
bg-gradient-to-br from-[#05080F] via-[#0A1424] to-[#020617] overflow-hidden pt-20 lg:pt-0">

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full 
    grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center py-12 lg:py-0">

            {/* LEFT — TEXT */}
            <div className="text-center lg:text-left">

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >

                <p className="text-sm tracking-wide text-[#00C2FF] mb-4">
                  11 – 13 MARCH 2026
                </p>

                <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6
          bg-gradient-to-r from-[#00C2FF] via-white to-[#2563EB]
          bg-clip-text text-transparent">
                  Data Conclave 26'
                </h1>

                <p className="text-[#9CA3AF] leading-relaxed mb-10 max-w-xl text-lg">
                  A premier technology and data intelligence summit bringing together
                  industry pioneers, researchers, and innovators shaping the future of AI and analytics.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-full
            bg-gradient-to-r from-[#00C2FF] to-[#2563EB]
            font-semibold tracking-wide
            shadow-lg shadow-cyan-500/20
            hover:shadow-cyan-500/40
            hover:scale-105
            transition-all duration-300">
                    Register Now
                  </button>
                </div>

              </motion.div>
            </div>

            {/* RIGHT — RING (Centered Cleanly) */}
            <div className="flex justify-center items-center order-first lg:order-last">
              <div className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] h-[320px] sm:h-[400px] lg:h-[500px]">
                <NeuralRing />
              </div>
            </div>
          </div>
          {/* Soft glow behind ring */}
          <div className="absolute right-[20%] top-1/2 -translate-y-1/2
    w-[500px] h-[500px] rounded-full
    bg-[#00C2FF]/10 blur-3xl" />

          <div className="absolute bottom-0 left-0 right-0 h-40 
bg-gradient-to-b from-transparent to-[#05080F]" />
        </section>
        {/* Countdown Section with Photo Background */}
        <section className="bg-[#05080F] border-t border-white/5 py-24">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/60 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 text-center">
            <div className="text-xs tracking-[0.2em] text-purple-400 mb-4 uppercase font-semibold">
              The Ultimate Platform for Unforgettable Events
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Experience Data Conclave Today!
            </h2>

            <p className="text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Whether you're planning a small business conference or a large-scale festival, Data Conclave has you covered with cutting-edge tools and seamless experiences for your attendees.
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
                { name: "Dr. Placeholder One", role: "AI Research Lead", topic: "Future of Applied AI", logo: "/dsc-logo.jpeg" },
                { name: "Ms. Sample Two", role: "Senior Data Scientist", topic: "ML in Production", logo: "/vite.svg" },
                { name: "Mr. Demo Three", role: "Analytics Consultant", topic: "Data Storytelling", logo: "/dsc-logo.jpeg" },
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
                { name: "Title Sponsor", logo: "/dsc-logo.jpeg" },
                { name: "Tech Partner", logo: "/vite.svg" },
                { name: "Community Partner", logo: "/dsc-logo.jpeg" },
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
              {/* Social icons and CTA */}
              <motion.div
                className="flex items-center gap-4 mb-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } }
                }}
              >
                {/* Instagram */}
                <motion.a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-md transition-all hover:shadow-[0_0_0_4px_rgba(139,92,246,0.25)] hover:ring-2 hover:ring-purple-500/40 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  whileHover={{ scale: 1.13 }}
                  whileTap={{ scale: 0.97 }}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  {/* Instagram SVG */}
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="6" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                  </svg>
                </motion.a>
                {/* LinkedIn */}
                <motion.a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-md transition-all hover:shadow-[0_0_0_4px_rgba(99,102,241,0.25)] hover:ring-2 hover:ring-indigo-500/40 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  whileHover={{ scale: 1.13 }}
                  whileTap={{ scale: 0.97 }}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  {/* LinkedIn SVG */}
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-400">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="7.5" y="10.5" width="2.5" height="6" rx="1.2" fill="currentColor" />
                    <rect x="11.5" y="10.5" width="2.5" height="6" rx="1.2" fill="currentColor" />
                    <circle cx="8.75" cy="8.25" r="1.25" fill="currentColor" />
                  </svg>
                </motion.a>
              </motion.div>
              <motion.button
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-semibold shadow-lg hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_16px_2px_rgba(139,92,246,0.25)] transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
              >
                CONTACT
              </motion.button>
            </motion.div>
            {/* RIGHT: Logo visual highlight */}
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="relative w-56 h-56 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 shadow-xl" style={{ boxShadow: '0 0 32px 0 rgba(139,92,246,0.18), 0 0 0 8px rgba(99,102,241,0.10)' }}>
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'conic-gradient(from 180deg at 50% 50%, #a78bfa 0deg, #6366f1 180deg, #a78bfa 360deg)', opacity: 0.18, filter: 'blur(8px)' }}></div>
                <img
                  src={dscLogo}
                  alt="Data Science Club Logo"
                  className="w-36 h-36 object-contain rounded-full z-10 shadow-lg"
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
    </div>
  );
}
