
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Timeline from "./components/Timeline";

export default function App() {
  const [countdown, setCountdown] = useState({ days: 10, hours: 4, minutes: 34, seconds: 28 });
  const throwbackImages = [
    "/dc25/DC251.jpeg",
    "/dc25/DC252.jpeg",
    "/dc25/DC253.jpeg",
    "/dc25/DC254.jpeg",
    "/dc25/DC255.jpeg",
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        return { days, hours, minutes, seconds };
      });
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
                    src="/dsc-logo.jpeg"
                    alt="Data Science Club Logo"
                    className="w-[74%] h-[74%] object-contain"
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

          {/* Innovation Summit 2025 */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">INNOVATION SUMMIT 2025</h3>

            <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M5 2a1 1 0 00-1 1v1H3a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H6V3a1 1 0 00-1-1z" />
                </svg>
                October 15-17, 2025
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a4 4 0 118 0c0 1.76-1.12 3.25-2.67 3.84l.67 5.16H6l.67-5.16A4.002 4.002 0 014 4z" clipRule="evenodd" />
                </svg>
                Tokyo, Japan
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 rounded-full border border-white/30 text-sm font-semibold hover:bg-white/10 transition-all">
                VIEW DETAILS
              </button>
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all">
                BUY TICKET
              </button>
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">WHO WE ARE</h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Data Conclave is a comprehensive platform for organizing and promoting data science events, conferences, and other industry-related gatherings. Organized by Data Science Club and DSBS Student Association, our team of experienced professionals is dedicated to providing unparalleled event management services that help you streamline your event planning process and maximize your ROI.
          </p>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all">
            CONTACT
          </button>
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
