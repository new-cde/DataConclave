import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * EventDetailCard — Full-screen overlay popup that displays
 * all event information in a clean, structured layout.
 *
 * Props:
 *   event  — event object from events.json (or null)
 *   accent — { from, to, glow } colour scheme
 *   onClose — callback to dismiss
 */
export default function EventDetailCard({ event, accent, onClose }) {
    // Prevent background scroll when modal is open
    React.useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    if (!event || !accent) return null;

    return (
        <AnimatePresence>
            {event && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Card */}
                    <motion.div
                        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-[1px] z-10"
                        style={{
                            background: `linear-gradient(135deg, ${accent.from}60, transparent 50%, ${accent.to}40)`,
                            overscrollBehavior: "contain",
                        }}
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    >
                        <div
                            className="relative rounded-2xl overflow-hidden"
                            style={{ background: "rgba(10,14,26,0.96)" }}
                        >
                            {/* Accent bar */}
                            <div
                                className="h-1 w-full"
                                style={{
                                    background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                                }}
                            />

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/[.06] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                                aria-label="Close"
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
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>

                            <div className="p-7 lg:p-8">
                                {/* ── Header: Day + Date ── */}
                                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                                    <span
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase border"
                                        style={{
                                            color: accent.from,
                                            borderColor: `${accent.from}40`,
                                            background: `${accent.from}15`,
                                        }}
                                    >
                                        <svg
                                            width="11"
                                            height="11"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                        >
                                            <path d="M5 2a1 1 0 00-1 1v1H3a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H6V3a1 1 0 00-1-1z" />
                                        </svg>
                                        {event.day}
                                    </span>
                                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide text-white/60 border border-white/10 bg-white/[.04]">
                                        {event.date}
                                    </span>
                                </div>

                                {/* ── Title ── */}
                                <div
                                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-base font-bold tracking-wide text-white mb-5 shadow-lg"
                                    style={{
                                        background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                                        boxShadow: `0 6px 28px ${accent.glow}`,
                                    }}
                                >
                                    <svg
                                        width="16"
                                        height="16"
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

                                {/* ── Theme ── */}
                                <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-white/[.04] border border-white/[.06] mb-6">
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-purple-400 shrink-0 mt-0.5"
                                    >
                                        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                                        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                                    </svg>
                                    <span className="text-white/60 text-sm leading-relaxed font-medium">
                                        {event.theme}
                                    </span>
                                </div>

                                {/* ── Divider ── */}
                                <div
                                    className="h-px w-full mb-6"
                                    style={{
                                        background: `linear-gradient(90deg, transparent, ${accent.from}45, transparent)`,
                                    }}
                                />

                                {/* ── Info Grid: Time · Duration · Mode · Speaker ── */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <InfoBubble
                                        label="Time"
                                        value={event.time}
                                        iconColor="text-indigo-400"
                                        icon={
                                            <>
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </>
                                        }
                                    />
                                    <InfoBubble
                                        label="Duration"
                                        value={event.duration}
                                        iconColor="text-amber-400"
                                        icon={
                                            <>
                                                <path d="M5 22h14" />
                                                <path d="M5 2h14" />
                                                <path d="M17 22v-4.172a2 2 0 00-.586-1.414L12 12l-4.414 4.414A2 2 0 007 17.828V22" />
                                                <path d="M7 2v4.172a2 2 0 00.586 1.414L12 12l4.414-4.414A2 2 0 0017 6.172V2" />
                                            </>
                                        }
                                    />
                                    <InfoBubble
                                        label="Mode"
                                        value={event.mode}
                                        iconColor="text-cyan-400"
                                        icon={
                                            <>
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </>
                                        }
                                    />
                                    <InfoBubble
                                        label="Speaker"
                                        value={event.speaker}
                                        iconColor="text-purple-400"
                                        icon={
                                            <>
                                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </>
                                        }
                                    />
                                </div>

                                {/* ── Description ── */}
                                <div className="px-4 py-3.5 rounded-xl bg-white/[.03] border border-white/[.06] mb-6">
                                    <div className="flex items-center gap-1.5 mb-2.5">
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-white/40"
                                        >
                                            <line x1="17" y1="10" x2="3" y2="10" />
                                            <line x1="21" y1="6" x2="3" y2="6" />
                                            <line x1="21" y1="14" x2="3" y2="14" />
                                            <line x1="17" y1="18" x2="3" y2="18" />
                                        </svg>
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                                            About
                                        </span>
                                    </div>
                                    <p className="text-white/55 text-[13px] leading-[1.75] font-normal">
                                        {event.description}
                                    </p>
                                </div>

                                {/* ── Agenda / Flow ── */}
                                {event.flow && event.flow.length > 0 && (
                                    <div className="mb-7">
                                        <div className="flex items-center gap-1.5 mb-3 px-1">
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-white/40"
                                            >
                                                <polyline points="9 11 12 14 22 4" />
                                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                            </svg>
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                                                Agenda
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2.5">
                                            {event.flow.map((step, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-start gap-3 px-3.5 py-2.5 rounded-lg bg-white/[.025] border border-white/[.05]"
                                                >
                                                    <span
                                                        className="flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold shrink-0 mt-0.5"
                                                        style={{
                                                            background: `${accent.from}20`,
                                                            color: accent.from,
                                                            border: `1px solid ${accent.from}30`,
                                                        }}
                                                    >
                                                        {i + 1}
                                                    </span>
                                                    <span className="text-white/55 text-[12px] leading-relaxed font-medium">
                                                        {step}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* ── Register Now ── */}
                                <motion.button
                                    className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide text-white cursor-pointer border-0 outline-none"
                                    style={{
                                        background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                                        boxShadow: `0 4px 24px ${accent.glow}`,
                                    }}
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Register Now
                                </motion.button>
                            </div>

                            {/* Decorative glows */}
                            <div
                                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-[.07] pointer-events-none"
                                style={{ background: accent.from }}
                            />
                            <div
                                className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full blur-3xl opacity-[.05] pointer-events-none"
                                style={{ background: accent.to }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ── small info bubble used in the 2×2 grid ── */
function InfoBubble({ label, value, icon, iconColor }) {
    return (
        <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg bg-white/[.03] border border-white/[.06]">
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${iconColor} shrink-0 mt-0.5`}
            >
                {icon}
            </svg>
            <div className="min-w-0">
                <div className="text-[9px] uppercase tracking-widest text-white/30 font-semibold mb-0.5">
                    {label}
                </div>
                <div className="text-[11px] text-white/65 font-medium leading-snug">
                    {value}
                </div>
            </div>
        </div>
    );
}
