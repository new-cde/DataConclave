
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DayEvents from "./components/DayEvents";

export default function App() {
  const [countdown, setCountdown] = useState({ days: 10, hours: 4, minutes: 34, seconds: 28 });
  const [timelineEvents, setTimelineEvents] = useState([]);

  // Fetch events from JSON
  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => setTimelineEvents(data))
      .catch(err => console.error('Failed to load events:', err));
  }, []);

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
    <div className="min-h-screen bg-[#0a0e1a] text-white relative overflow-hidden scroll-smooth">
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
      <nav className="relative z-50 px-8 lg:px-16 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
            DATA CONCLAVE
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">ABOUT</a>
          <a href="#events" className="hover:text-white transition-colors">EVENTS</a>
          <a href="#" className="hover:text-white transition-colors">SPEAKER</a>
          <a href="#" className="hover:text-white transition-colors">TICKET</a>
          <a href="#" className="hover:text-white transition-colors">BLOGS</a>
        </div>

        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all">
          CONTACT
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

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:col-start-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-xs lg:text-sm tracking-[0.2em] text-purple-400 mb-6 font-semibold uppercase">
                9 JUNE 2023 • LIMITED SEAT
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                The Ultimate Platform for Planning and Promoting Successful Events
              </h1>

              <p className="text-gray-400 leading-relaxed mb-8 max-w-xl">
                Data Conclave is a leading event and conference platform organized by Data Science Club and DSBS Student Association that brings together industry experts, thought leaders, and enthusiasts to share knowledge and insights.
              </p>

              <button className="flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all">
                See more about us
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3L8 13M8 13L13 8M8 13L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex gap-4 mt-8">
                {['f', 't', 'in', 'ig'].map((icon) => (
                  <a key={icon} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-sm">
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Featured Event Card on Left */}
          <div className="lg:col-start-1 lg:row-start-1">
            <motion.div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-xs text-gray-400 mb-2">9 JUNE 2023 • LIMITED SEAT</div>
              <h3 className="text-2xl font-bold mb-4">Get Inside in The Philosopher's Mind</h3>
              <button className="px-6 py-3 rounded-full border border-white/30 text-sm font-medium hover:bg-white/10 transition-all">
                BUY TICKETS
              </button>
            </motion.div>
          </div>
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
      
      {/* EVENTS-CARDS SECTION                        */}
      <DayEvents />

      {/* ═══════════════════════════════════════════════ */}
      {/* EVENTS TIMELINE SECTION                        */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="events-timeline" className="relative py-24 px-8 lg:px-16 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs tracking-[0.3em] text-purple-400 mb-4 uppercase font-semibold">
              Our Journey
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold">
              EVENT <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">TIMELINE</span>
            </h2>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Central Dashed Line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, #6366f180 0px, #6366f180 8px, transparent 8px, transparent 20px)',
              }}
            ></div>
            {/* Mobile left line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px md:hidden"
              style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, #6366f180 0px, #6366f180 8px, transparent 8px, transparent 20px)',
              }}
            ></div>

            {/* Timeline Items */}
            <div className="space-y-0">
              {timelineEvents.map((event, index) => {
                const isLeft = event.side === 'left';

                return (
                  <div key={event.id} className="relative flex items-start md:items-center min-h-[180px]">

                    {/* ─── DESKTOP LAYOUT ─── */}
                    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] w-full items-center gap-0">

                      {/* LEFT column */}
                      <div className={`flex ${isLeft ? 'justify-end pr-10' : 'justify-end pr-10'}`}>
                        {isLeft ? (
                          <motion.div
                            className="max-w-sm w-full"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                          >
                            {/* Title Badge */}
                            <div className="inline-block px-5 py-2 rounded-md text-sm font-bold tracking-wide text-white mb-3"
                              style={{ background: 'linear-gradient(135deg, #c0566b 0%, #d4687a 100%)' }}
                            >
                              {event.title}
                            </div>
                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {event.description}
                            </p>
                            {/* Meta */}
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2.5a1 1 0 011 1V8l2.15 1.29a1 1 0 01-1.03 1.71l-2.62-1.57A1 1 0 017 8.5V4.5a1 1 0 011-1z" /></svg>
                                {event.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M7 8a3 3 0 100-6 3 3 0 000 6zM7 9c-3.314 0-6 1.343-6 3v1h12v-1c0-1.657-2.686-3-6-3z" /></svg>
                                {event.speaker}
                              </span>
                            </div>
                          </motion.div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      {/* CENTER — Dot + Date Label */}
                      <div className="flex flex-col items-center relative z-10">
                        {/* Glowing dot */}
                        <div className="relative">
                          <div className="w-4 h-4 rounded-full border-2 border-[#c0566b] bg-[#0a0e1a] z-10 relative"></div>
                          <div className="absolute inset-0 w-4 h-4 rounded-full bg-[#c0566b] blur-md opacity-60"></div>
                        </div>
                        {/* Date label */}
                        <motion.div
                          className="mt-2 text-xl lg:text-2xl font-bold text-white/90 whitespace-nowrap"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                          {event.dateLabel}
                        </motion.div>
                      </div>

                      {/* RIGHT column */}
                      <div className={`flex ${!isLeft ? 'justify-start pl-10' : 'justify-start pl-10'}`}>
                        {!isLeft ? (
                          <motion.div
                            className="max-w-sm w-full"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                          >
                            {/* Title Badge */}
                            <div className="inline-block px-5 py-2 rounded-md text-sm font-bold tracking-wide text-white mb-3"
                              style={{ background: 'linear-gradient(135deg, #c0566b 0%, #d4687a 100%)' }}
                            >
                              {event.title}
                            </div>
                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {event.description}
                            </p>
                            {/* Meta */}
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2.5a1 1 0 011 1V8l2.15 1.29a1 1 0 01-1.03 1.71l-2.62-1.57A1 1 0 017 8.5V4.5a1 1 0 011-1z" /></svg>
                                {event.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M7 8a3 3 0 100-6 3 3 0 000 6zM7 9c-3.314 0-6 1.343-6 3v1h12v-1c0-1.657-2.686-3-6-3z" /></svg>
                                {event.speaker}
                              </span>
                            </div>
                          </motion.div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>

                    {/* ─── MOBILE LAYOUT ─── */}
                    <div className="md:hidden flex items-start w-full">
                      {/* Dot */}
                      <div className="flex flex-col items-center mr-6 mt-1 relative z-10 shrink-0" style={{ marginLeft: '16px' }}>
                        <div className="relative">
                          <div className="w-4 h-4 rounded-full border-2 border-[#c0566b] bg-[#0a0e1a] z-10 relative"></div>
                          <div className="absolute inset-0 w-4 h-4 rounded-full bg-[#c0566b] blur-md opacity-60"></div>
                        </div>
                      </div>
                      {/* Card */}
                      <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                      >
                        <div className="text-lg font-bold text-white/90 mb-2">{event.dateLabel}</div>
                        <div className="inline-block px-4 py-1.5 rounded-md text-xs font-bold tracking-wide text-white mb-2"
                          style={{ background: 'linear-gradient(135deg, #c0566b 0%, #d4687a 100%)' }}
                        >
                          {event.title}
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 mb-8">
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2.5a1 1 0 011 1V8l2.15 1.29a1 1 0 01-1.03 1.71l-2.62-1.57A1 1 0 017 8.5V4.5a1 1 0 011-1z" /></svg>
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M7 8a3 3 0 100-6 3 3 0 000 6zM7 9c-3.314 0-6 1.343-6 3v1h12v-1c0-1.657-2.686-3-6-3z" /></svg>
                            {event.speaker}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom cap */}
            <div className="hidden md:flex justify-center mt-4">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-20 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">WHO WE ARE</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Data Conclave is a comprehensive platform for organizing and promoting data science events, conferences, and other industry-related gatherings. Organized by Data Science Club and DSBS Student Association, our team of experienced professionals is dedicated to providing unparalleled event management services that help you streamline your event planning process and maximize your ROI.
              </p>
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all">
                CONTACT
              </button>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">Benefits of Choosing Data Conclave</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🌐", title: "Global Network", desc: "Connect with data professionals worldwide" },
                  { icon: "🔧", title: "Advanced Tools", desc: "Cutting-edge ML/AI platforms" },
                  { icon: "🎨", title: "Customizable Pages", desc: "Tailored event experiences" },
                  { icon: "📢", title: "Powerful Marketing", desc: "Reach your target audience" }
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className="backdrop-blur-md bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-white/10 rounded-2xl p-6 text-center hover:from-purple-500/20 hover:to-indigo-500/20 transition-all"
                  >
                    <div className="text-4xl mb-3">{benefit.icon}</div>
                    <div className="font-semibold mb-2">{benefit.title}</div>
                    <div className="text-xs text-gray-400">{benefit.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

          <div className="flex gap-3">
            {['f', 't', 'in', 'ig'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-xs"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}