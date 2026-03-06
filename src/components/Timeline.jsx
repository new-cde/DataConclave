import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/* ─── accent palette per card index ─── */
const accents = [
  {
    from: "#22d3ee", // Cyan
    to: "#0ea5e9",
    glow: "rgba(34,211,238,0.28)"
  },
  {
    from: "#06b6d4",   // Day 2 – Teal Cyan
    to: "#3b82f6",
    glow: "rgba(6,182,212,0.28)"
  },
  {
    from: "#38bdf8",   // Day 3 – Sky Blue
    to: "#0284c7",
    glow: "rgba(56,189,248,0.28)"
  }
];
export default function Timeline() {
    const [events, setEvents] = useState([]);
    const sectionRef = useRef(null);
    const [scrollBounds, setScrollBounds] = useState({ start: 0, end: 1 });
    const { scrollY } = useScroll();

    useEffect(() => {
        const updateBounds = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const height = rect.height;
            const centerOffset = window.innerHeight / 2;
            const start = top - centerOffset;
            const end = top + height - centerOffset;
            setScrollBounds({ start, end: end <= start ? start + 1 : end });
        };

        updateBounds();
        window.addEventListener("resize", updateBounds);
        return () => window.removeEventListener("resize", updateBounds);
    }, [events.length]);

    const centerProgress = useTransform(
        scrollY,
        [scrollBounds.start, scrollBounds.end],
        [0, 1],
        { clamp: true }
    );
    const lineProgress = useSpring(centerProgress, {
        stiffness: 140,
        damping: 26,
        mass: 0.25,
    });
    const lineColor = useTransform(
        centerProgress,
        [0, 1],
        ["#22d3ee", "#0ea5e9"]
    );

    useEffect(() => {
        fetch("/events.json")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Failed to load timeline events:", err));
    }, []);

    if (events.length === 0) return null;

    return (
        <section
            id="events-timeline"
            ref={sectionRef}
            className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-16 overflow-hidden"
        >
            {/* ── ambient glows ── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/[.04] rounded-full blur-[180px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/[.06] rounded-full blur-[160px] pointer-events-none" />

            <div className="max-w-6xl mx-auto">
                {/* ── Section Header ── */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-2">
                        <span className="text-white/90"> 3 </span>
                        <span className="bg-gradient-to-r from-[#00C2FF] to-[#2563EB] bg-clip-text text-transparent pr-2"> DAYS. </span>
                        <span className="text-white/90"> 3 </span>
                        <span className="bg-gradient-to-r from-[#00C2FF] to-[#2563EB] bg-clip-text text-transparent pr-2"> EXPERIENCES </span>
                    </div>

                    <p className="text-base md:text-lg text-white/70 mb-6">March 12-13, 2026</p>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[11px] tracking-[0.25em] text-primary uppercase font-semibold">
                            Schedule
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight">
                        EVENT{" "}
                        <span className="bg-gradient-to-r from-[#00C2FF] to-[#2563EB] bg-clip-text text-transparent">
                            TIMELINE
                        </span>
                    </h2>
                    <p className="mt-4 text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
                        Three power-packed days of workshops, hackathons, talks &amp; panels
                    </p>
                </motion.div>

                {/* ── Timeline Rail ── */}
                <div className="relative">
                    {/* Vertical dashed line — desktop center */}
                    <div
                        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(to bottom,rgba(34,211,238,.35) 0px,rgba(34,211,238,.35) 6px,transparent 6px,transparent 18px)",
                        }}
                    />
                    <motion.div
                        className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block origin-top pointer-events-none"
                        style={{
                            scaleY: lineProgress,
                            backgroundColor: lineColor,
                            boxShadow: "0 0 14px rgba(236,72,153,0.38)",
                        }}
                    />
                    {/* Vertical dashed line — mobile left */}
                    <div
                        className="absolute left-5 top-0 bottom-0 w-px md:hidden"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(to bottom,rgba(99,102,241,.35) 0px,rgba(99,102,241,.35) 6px,transparent 6px,transparent 18px)",
                        }}
                    />
                    <motion.div
                        className="absolute left-5 top-0 bottom-0 w-[2px] md:hidden origin-top pointer-events-none"
                        style={{
                            scaleY: lineProgress,
                            backgroundColor: lineColor,
                            boxShadow: "0 0 12px rgba(236,72,153,0.36)",
                        }}
                    />

                    {/* ── Cards ── */}
                    <div className="flex flex-col gap-16 md:gap-20">
                        {events.map((event, index) => {
                            const isLeft = event.side === "left";
                            const accent = accents[index % accents.length];

                            return (
                                <div
                                    key={event.id}
                                    className="relative flex items-start md:items-center"
                                >
                                    {/* ─── DESKTOP ─── */}
                                    <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] w-full items-center">
                                        {/* LEFT side */}
                                        <div className="flex justify-end pr-8">
                                            {isLeft ? (
                                                <TimelineBubbleCard
                                                    event={event}
                                                    index={index}
                                                    accent={accent}
                                                    animateFrom="left"
                                                />
                                            ) : (
                                                <div />
                                            )}
                                        </div>

                                        {/* CENTER dot */}
                                        <div className="flex flex-col items-center relative z-10">
                                            <TimelineNode
                                                index={index}
                                                total={events.length}
                                                accent={accent}
                                                progress={centerProgress}
                                            />
                                        </div>

                                        {/* RIGHT side */}
                                        <div className="flex justify-start pl-8">
                                            {!isLeft ? (
                                                <TimelineBubbleCard
                                                    event={event}
                                                    index={index}
                                                    accent={accent}
                                                    animateFrom="right"
                                                />
                                            ) : (
                                                <div />
                                            )}
                                        </div>
                                    </div>

                                    {/* ─── MOBILE ─── */}
                                    <div className="md:hidden flex items-start w-full">
                                        <div
                                            className="flex flex-col items-center mr-5 mt-2 relative z-10 shrink-0"
                                            style={{ marginLeft: "12px" }}
                                        >
                                            <TimelineNode
                                                index={index}
                                                total={events.length}
                                                accent={accent}
                                                progress={centerProgress}
                                                mobile
                                            />
                                        </div>

                                        <TimelineBubbleCard
                                            event={event}
                                            index={index}
                                            accent={accent}
                                            animateFrom="right"
                                            mobile
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom cap */}
                    <div className="hidden md:flex justify-center mt-8">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineNode({ index, total, accent, progress, mobile = false }) {
    const threshold = total > 1 ? index / (total - 1) : 1;
    const nodeFill = useTransform(
        progress,
        [Math.max(0, threshold - 0.08), threshold],
        ["#0a0e1a", accent.from]
    );
    const nodeScale = useTransform(
        progress,
        [Math.max(0, threshold - 0.06), threshold],
        [1, 1.08]
    );
    const glowOpacity = useTransform(
        progress,
        [Math.max(0, threshold - 0.08), threshold],
        [0.25, 0.75]
    );

    return (
        <motion.div
            className="relative"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: index * 0.1,
            }}
            style={{ scale: nodeScale }}
        >
            <motion.div
                className={`${mobile ? "w-4 h-4 border-2" : "w-5 h-5 border-[2.5px]"} rounded-full z-10 relative`}
                style={{
                    borderColor: accent.from,
                    backgroundColor: nodeFill,
                }}
            />
            <motion.div
                className="absolute -inset-1 rounded-full blur-md"
                style={{ background: accent.from, opacity: glowOpacity }}
            />
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════
   Glassmorphic Bubble Card with hover side detail panel
   ══════════════════════════════════════════════════ */
function TimelineBubbleCard({
    event,
    index,
    accent,
    animateFrom,
    mobile = false,
}) {
    const [hovered, setHovered] = useState(false);
    const xOffset = animateFrom === "left" ? -60 : 60;
    const isLeftCard = event.side === "left";

    return (
        <motion.div
            className={`${mobile ? "flex-1 mb-4" : "max-w-md w-full"} relative overflow-visible`}
            initial={{ opacity: 0, x: xOffset }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <motion.div
                className="relative rounded-2xl p-[1px] overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${accent.from}40, transparent 60%, ${accent.to}30)`,
                }}
                animate={{
                    boxShadow: hovered
                        ? `0 0 30px ${accent.glow}, 0 0 60px ${accent.glow}, 0 8px 32px rgba(0,0,0,.4)`
                        : `0 0 0px transparent, 0 2px 12px rgba(0,0,0,.2)`,
                    scale: hovered ? 1.03 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Glass background */}
                <motion.div
                    className="relative rounded-2xl backdrop-blur-xl overflow-hidden"
                    animate={{
                        background: hovered
                            ? "rgba(14,18,36,0.92)"
                            : "rgba(12,16,32,0.88)",
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Top accent bar */}
                    <motion.div
                        className="w-full"
                        animate={{ height: hovered ? "4px" : "3px" }}
                        transition={{ duration: 0.3 }}
                        style={{
                            background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                        }}
                    />

                    <div className="p-6 lg:p-7">
                        {/* ── Row 1: Day + Date ── */}
                        <div className="flex flex-wrap items-center gap-2.5 mb-4">
                            <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase border"
                                style={{
                                    color: accent.from,
                                    borderColor: `${accent.from}35`,
                                    background: `${accent.from}12`,
                                }}
                            >
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                >
                                    <path d="M5 2a1 1 0 00-1 1v1H3a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H6V3a1 1 0 00-1-1z" />
                                </svg>
                                {event.day}
                            </span>

                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide text-white/60 border border-white/10 bg-white/5">
                                {event.date}
                            </span>
                        </div>

                        {/* ── Row 2: Title ── */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold tracking-wide text-white mb-3 shadow-lg"
                            style={{
                                background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                                boxShadow: `0 4px 20px ${accent.glow}`,
                            }}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                            {event.title}
                        </div>

                        {/* ── Row 3: Theme ── */}
                        <div className="flex items-start gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/[.06] mb-4">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary shrink-0 mt-0.5"
                            >
                                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                            </svg>
                            <span className="text-white/55 text-xs leading-relaxed font-medium">
                                {event.theme}
                            </span>
                        </div>

                        {/* ── Row 4: Time + Speaker ── */}
                        <div className="flex flex-col gap-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border-primary/25 text-primary/90 w-fit">
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-primaryDark shrink-0"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span className="text-[11px] font-semibold tracking-wide">
                                    {event.time}
                                </span>
                            </div>

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primaryDark/10 border-primaryDark/25 text-primaryDark/90 w-fit">
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-primaryDark shrink-0"
                                >
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <span className="text-[11px] font-semibold tracking-wide"
                                style={{color: accent.from}}>
                                    {event.speaker}
                                </span>
                            </div>
                        </div>

                        {event.day === "DAY 3" && event.flow?.length > 0 && (
                            <div className="mt-4 rounded-xl bg-white/[.03] border border-white/[.06] p-3">
                                <div className="text-[10px] uppercase tracking-widest text-white/35 font-semibold mb-2">
                                    Day 3 Schedule
                                </div>
                                <ul className="space-y-1.5 text-[11px] text-white/70 leading-relaxed">
                                    {event.flow.map((slot, i) => (
                                        <li key={i}>{slot}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {mobile && (
                            <div className="mt-4 rounded-lg border border-white/[.06] bg-white/[.03] px-3 py-2.5">
                                <div className="text-[10px] uppercase tracking-widest text-white/35 font-semibold mb-1.5">
                                    Description
                                </div>
                                <p className="text-[11px] text-white/60 leading-relaxed">
                                    {event.description}
                                </p>
                            </div>
                        )}

                        <motion.div
                            className="flex items-center justify-center gap-1.5 mt-4 pt-3"
                            style={{
                                borderTop: "1px solid rgba(255,255,255,0.04)",
                            }}
                            animate={{ opacity: hovered ? 1 : 0.8 }}
                            transition={{ duration: 0.25 }}
                        >
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLScne-RYUP2bqjw4778mci4fDJEhRtCVFUObiPjGcR3dl-2Xyg/viewform?usp=publish-editor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                            >
                                <button
                                    className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    style={{
                                        background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                                        boxShadow: `0 8px 24px ${accent.glow}`,
                                    }}
                                >
                                    Register
                                </button>
                            </a>
                        </motion.div>
                    </div>

                    {/* Decorative corner glow */}
                    <motion.div
                        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                        style={{ background: accent.from }}
                        animate={{ opacity: hovered ? 0.15 : 0.06 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </motion.div>

            {!mobile && (
                <motion.div
                    className={`hidden md:block absolute top-0 z-20 h-full w-full pointer-events-none ${isLeftCard ? "left-full ml-4" : "right-full mr-4"}`}
                    initial={false}
                    animate={{
                        opacity: hovered ? 1 : 0,
                        x: hovered ? 0 : isLeftCard ? -20 : 20,
                    }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                >
                    <div className="h-full rounded-2xl border border-white/10 bg-[#0b1020]/95 p-6 backdrop-blur-xl shadow-2xl">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-2">
                            Description
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">
                            {event.description}
                        </p>
                        {event.flow && event.flow.length > 0 && (
                            <ul className="mt-4 space-y-2 text-xs text-white/60">
                                {event.flow.slice(0, 3).map((step, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span
                                            className="mt-[2px] inline-block h-1.5 w-1.5 rounded-full"
                                            style={{ background: accent.from }}
                                        />
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
