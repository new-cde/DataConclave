import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dayEvents = [
    {
        id: 1,
        day: "DAY 1",
        date: "March 10, 2026",
        title: "Workshop",
        theme: "Foundations of Data Science & Applied Analytics",
        time: "10:00 AM – 4:00 PM",
        duration: "6 hours",
        mode: "Offline (On-campus)",
        speaker: "Mr. Arjun Rao – Data Scientist, Industry Professional",
        short: "Hands-on Data Science Workshop",
        flow: [
            "Introduction to Data Science and real-world use cases",
            "Data preprocessing and Exploratory Data Analysis (EDA)",
            "Hands-on session using Python (NumPy, Pandas)",
            "Mini case study and interactive Q&A"
        ],
        details:
            "This workshop focuses on building strong foundations in Data Science through practical, hands-on sessions. Participants will gain exposure to essential tools, workflows, and problem-solving techniques used in real-world data projects."
    },

    {
        id: 2,
        day: "DAY 2",
        date: "March 11, 2026",
        title: "Hackathon",
        theme: "Solving Real-World Problems Using Data",
        time: "9:00 AM – 9:00 PM",
        duration: "12 hours",
        mode: "Offline (Team-based)",
        speaker: "Mentors from academia and industry",
        short: "Innovation-driven Hackathon",
        flow: [
            "Problem statement release",
            "Team formation and ideation",
            "Data analysis and model development",
            "Final presentation and judging"
        ],
        details:
            "The hackathon encourages innovation, teamwork, and applied problem-solving. Teams will work on real-world problem statements and develop data-driven solutions within a limited time frame, enhancing collaboration and technical skills."
    },

    {
        id: 3,
        day: "DAY 3",
        date: "March 12, 2026",
        title: "Technical Talks",
        theme: "Trends & Careers in Data Science",
        time: "10:30 AM – 4:30 PM",
        duration: "3 sessions (60–75 mins each)",
        mode: "Offline",
        speaker: "Industry experts & academicians",
        short: "2–3 Expert Technical Talks",
        flow: [
            "AI & Machine Learning in Industry",
            "From Data Science to MLOps",
            "Career paths in Analytics & Research",
            "Interactive Q&A sessions"
        ],
        details:
            "Day 3 features technical talks delivered by industry professionals and academicians. These sessions focus on emerging trends, real-world applications, and career guidance in Data Science, AI, and related domains."
    },

    {
        id: 4,
        day: "DAY 4",
        date: "March 13, 2026",
        title: "Talk & Panel Discussion",
        theme: "Careers, Research & the Future of Data Science",
        time: "11:00 AM – 3:30 PM",
        duration: "1 Technical Talk + Panel Discussion",
        mode: "Offline",
        speaker: "Industry & Academic Experts",
        short: "Expert Talk & Panel Discussion",
        flow: [
            "Technical Talk: Building a Career in Data Science",
            "Panel discussion with industry and academic experts",
            "Audience interaction and open discussion",
            "Closing remarks"
        ],
        details:
            "The final day includes a technical talk followed by a panel discussion featuring experts from academia and industry. The session focuses on career opportunities, research paths, industry expectations, and the future scope of Data Science."
    }
];

export default function DayEvents() {
    const [openIdx, setOpenIdx] = useState(null);

    return (
        <section id="events" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-white mb-2">
                    4 DAYS. 4 EXPERIENCES
                </h2>
                <p className="text-lg text-white/70">March 10–13, 2026</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {dayEvents.map((event, idx) => (
                    <motion.div
                        key={event.day}
                        className={
                            `relative group backdrop-blur-md bg-gradient-to-br from-primary/10 to-primaryDark/10 border border-white/10 rounded-2xl p-8 flex flex-col text-left text-white shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ` +
                            `hover:scale-105 hover:shadow-2xl hover:from-indigo-500/20 hover:to-purple-500/20`
                        }
                        style={{ boxShadow: '0 4px 32px 0 rgba(139,92,246,0.10), 0 1.5px 8px 0 rgba(99,102,241,0.10)' }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        onClick={() => setOpenIdx(idx)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') setOpenIdx(idx); }}
                    >
                        {/* Accent bar/dot for day */}
                        <div className="absolute left-0 top-6 h-8 w-1.5 rounded-r-full bg-gradient-to-b from-primary to-primaryDark"></div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-block w-3 h-3 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 shadow-md`}></span>
                            <span className="text-xs font-bold tracking-wide uppercase text-white/70">{event.day}</span>
                        </div>
                        <div className="text-lg font-semibold text-white/90 mb-1">{event.date}</div>
                        <div className="text-2xl font-extrabold mb-2 bg-gradient-to-br from-indigo-400 to-purple-400 bg-clip-text text-transparent">{event.title}</div>
                        <div className="text-white/70 mb-2 line-clamp-2">{event.theme}</div>
                        <div className="flex-1">
                            <div className="text-white/60 text-sm mb-2">{event.short || event.description}</div>
                        </div>
                        <motion.button
                            className="mt-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 text-white font-medium text-sm shadow-md transition-all duration-200 hover:from-purple-500 hover:to-indigo-500 hover:scale-105 focus:outline-none"
                            whileHover={{ scale: 1.07 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={e => { e.stopPropagation(); setOpenIdx(idx); }}
                            tabIndex={0}
                        >
                            Register
                        </motion.button>
                    </motion.div>
                ))}
            </div>
            <AnimatePresence>
                {openIdx !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpenIdx(null)}
                    >
                        <motion.div
                            className="bg-[#0a0e1a] border border-white/10 rounded-2xl p-0 max-w-lg w-full mx-4 relative shadow-2xl overflow-hidden"
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Gradient header/accent */}
                            <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
                            <button
                                className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-bold z-10"
                                onClick={() => setOpenIdx(null)}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                            <div className="p-8 pt-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 shadow-md"></span>
                                    <span className="text-xs font-bold tracking-wide uppercase text-white/70">{dayEvents[openIdx].day}</span>
                                    <span className="ml-auto text-sm font-semibold text-white/60">{dayEvents[openIdx].date}</span>
                                </div>
                                <div className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{dayEvents[openIdx].title}</div>
                                <div className="text-white/80 mb-3 text-base font-medium">{dayEvents[openIdx].theme}</div>
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <div className="flex items-center gap-1 text-sm text-primaryDark font-semibold">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        {dayEvents[openIdx].time}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-primary font-semibold">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
                                        {dayEvents[openIdx].duration}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-white/60 font-semibold">
                                        <svg
                                            className="w-4 h-4 flex-shrink-0 text-rimary translate-y-[1px]"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 21s-6-5.33-6-10a6 6 0 1112 0c0 4.67-6 10-6 10z"
                                            />
                                            <circle cx="12" cy="11" r="2.5" />
                                        </svg>
                                        {dayEvents[openIdx].mode}
                                    </div>
                                </div>
                                <div className="mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span className="text-sm text-white/80 font-semibold">{dayEvents[openIdx].speaker}</span>
                                </div>
                                <div className="text-white/80 mb-4 text-sm">{dayEvents[openIdx].details}</div>
                                <div className="mb-2 text-white/80 font-semibold">Event Flow:</div>
                                <ul className="list-disc pl-5 text-white/70 mb-4 text-sm space-y-1">
                                    {dayEvents[openIdx].flow.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                                <motion.button
                                    className="mt-4 w-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-white font-semibold text-base shadow-lg transition-all duration-200 hover:from-purple-500 hover:to-indigo-500 hover:scale-105 focus:outline-none"
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.98 }}
                                    tabIndex={0}
                                >
                                    Register Now
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}