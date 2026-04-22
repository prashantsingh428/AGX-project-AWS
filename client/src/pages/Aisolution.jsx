import { useState, useEffect, useRef } from "react";

// ── Images — matched exactly to document content ────────────────────────────
// Hero BG: "How to Leverage AI for Business Growth" style — AI hands + tech
// AI Marketing: "Ways to use AI in marketing" — ad optimization, content, A/B testing
// Automation: Marketing automation hub diagram style
// Analytics: Predictive analytics dashboard
// Scaling: "Scalability as Engine for Growth"
// LLM: Two robots facing (LLM model comparison)

const IMGS = {
    heroBg1: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=85&fit=crop",
    heroBg2: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=85&fit=crop",
    heroBg3: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=85&fit=crop",
    // AI Marketing — matches "Ways to use AI in marketing" (ad optimization, targeting)
    aiMarketing: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=85&fit=crop",
    // Automation — matches "Marketing Automation hub" (workflows, campaigns, mail)
    automation: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&q=85&fit=crop",
    // Analytics — matches "Predictive analytics for marketing" (data, charts)
    analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85&fit=crop",
    // Scaling — matches "Scalability as Engine for Growth"
    scaling: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85&fit=crop",
    // LLM — matches "Two AI robots / LLM models" concept
    llm: "https://images.unsplash.com/photo-1655720031554-a929595ffad7?w=900&q=85&fit=crop",
};

// ── Hooks ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, vis];
}

// ── Reveal animation ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, dir = "up" }) {
    const [ref, vis] = useInView();
    const transforms = {
        up: `translateY(${vis ? 0 : 36}px)`,
        down: `translateY(${vis ? 0 : -36}px)`,
        left: `translateX(${vis ? 0 : -36}px)`,
        right: `translateX(${vis ? 0 : 36}px)`,
    };
    return (
        <div ref={ref} style={{
            opacity: vis ? 1 : 0,
            transform: transforms[dir] || transforms.up,
            transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        }}>
            {children}
        </div>
    );
}

// ── Counter ─────────────────────────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 1600 }) {
    const [val, setVal] = useState(0);
    const [ref, vis] = useInView(0.5);
    useEffect(() => {
        if (!vis) return;
        let n = 0;
        const step = to / (duration / 16);
        const t = setInterval(() => {
            n += step;
            if (n >= to) { setVal(to); clearInterval(t); }
            else setVal(Math.floor(n));
        }, 16);
        return () => clearInterval(t);
    }, [vis, to, duration]);
    return <span ref={ref}>{val}{suffix}</span>;
}

// ── Tag pill ─────────────────────────────────────────────────────────────────
function Tag({ children, color = "#4f46e5" }) {
    return (
        <span style={{
            display: "inline-block",
            background: `${color}15`, border: `1px solid ${color}30`,
            color, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
            textTransform: "uppercase", padding: "4px 12px", borderRadius: 99,
        }}>{children}</span>
    );
}

// ── Gradient text ─────────────────────────────────────────────────────────
function GT({ children, g = "linear-gradient(135deg,#4f46e5,#06b6d4,#10b981)" }) {
    return (
        <span style={{
            background: g, WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>{children}</span>
    );
}

// ── Check / Cross ──────────────────────────────────────────────────────────
function Check({ text, color = "#10b981" }) {
    return (
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "#475569", lineHeight: 1.55 }}>
            <span style={{ color, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
            <span>{text}</span>
        </div>
    );
}
function Cross({ text }) {
    return (
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "#94a3b8", lineHeight: 1.55 }}>
            <span style={{ color: "#f87171", fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✕</span>
            <span style={{ textDecoration: "line-through" }}>{text}</span>
        </div>
    );
}

// ── Result box ────────────────────────────────────────────────────────────
function ResultBox({ text, color = "#4f46e5" }) {
    return (
        <div style={{
            marginTop: 20, padding: "13px 16px",
            background: `${color}0d`, border: `1px solid ${color}28`,
            borderRadius: 10, fontSize: 14, fontWeight: 600, color,
        }}>{text}</div>
    );
}

// ── Section divider ───────────────────────────────────────────────────────
function Divider() {
    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 1, padding: "0 24px" }}>
            <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(99,102,241,.18),transparent)" }} />
        </div>
    );
}

// ── Section image card ────────────────────────────────────────────────────
function SectionImg({ src, alt, accent = "#4f46e5" }) {
    return (
        <div style={{
            borderRadius: 20, overflow: "hidden",
            boxShadow: `0 20px 56px ${accent}1a, 0 0 0 1px #e2e8f0`,
            aspectRatio: "4/3",
        }}>
            <img src={src} alt={alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
    );
}

// ── Animated automation steps ─────────────────────────────────────────────
function AutoSteps() {
    const [step, setStep] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setStep(s => (s + 1) % 5), 1800);
        return () => clearInterval(t);
    }, []);
    const steps = [
        { icon: "📩", label: "Lead Captured", color: "#4f46e5", bg: "#ede9fe" },
        { icon: "🤖", label: "AI Qualifies", color: "#0ea5e9", bg: "#e0f2fe" },
        { icon: "📧", label: "Auto Email", color: "#10b981", bg: "#d1fae5" },
        { icon: "💬", label: "WhatsApp", color: "#f59e0b", bg: "#fef3c7" },
        { icon: "🎯", label: "Converted!", color: "#8b5cf6", bg: "#f5f3ff" },
    ];
    return (
        <div style={{
            background: "linear-gradient(135deg,#0f172a,#1e1b4b)",
            borderRadius: 16, padding: "24px 20px",
            border: "1px solid #1e293b",
        }}>
            <p style={{ fontSize: 11, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", marginBottom: 20 }}>
                Automation Flow — Live 24/7
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, overflowX: "auto" }}>
                {steps.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 12,
                                background: step === i ? s.color : `${s.color}22`,
                                border: `2px solid ${step === i ? s.color : s.color + "44"}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 20, transition: "all 0.4s",
                                transform: step === i ? "scale(1.15)" : "scale(1)",
                                boxShadow: step === i ? `0 6px 20px ${s.color}50` : "none",
                            }}>{s.icon}</div>
                            <span style={{
                                fontSize: 10, color: step === i ? s.color : "#475569",
                                fontWeight: 700, textAlign: "center", maxWidth: 68, lineHeight: 1.2,
                                transition: "all 0.4s",
                            }}>{s.label}</span>
                        </div>
                        {i < steps.length - 1 && (
                            <div style={{
                                width: 28, height: 2, flexShrink: 0,
                                background: step > i ? "linear-gradient(90deg,#4f46e5,#0ea5e9)" : "#1e293b",
                                transition: "all 0.4s", margin: "0 2px 14px",
                            }} />
                        )}
                    </div>
                ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 16 }}>
                <span style={{
                    background: `${steps[step].color}22`, color: steps[step].color,
                    padding: "4px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700,
                    transition: "all 0.4s",
                }}>Step {step + 1}/5 — {steps[step].label}</span>
            </div>
        </div>
    );
}

// ── Animated bar chart (predictive analytics) ─────────────────────────────
function BarChart() {
    const [ref, vis] = useInView();
    const bars = [
        { m: "Jan", actual: 60, forecast: 65, color: "#4f46e5" },
        { m: "Feb", actual: 70, forecast: 72, color: "#4f46e5" },
        { m: "Mar", actual: 65, forecast: 80, color: "#0ea5e9" },
        { m: "Apr", actual: 0, forecast: 88, color: "#10b981" },
        { m: "May", actual: 0, forecast: 94, color: "#10b981" },
    ];
    return (
        <div ref={ref} style={{
            background: "linear-gradient(135deg,#0f172a,#0c1a2e)",
            borderRadius: 16, padding: "24px 20px",
            border: "1px solid #1e293b",
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", margin: 0 }}>Campaign Performance Forecast</p>
                <span style={{ background: "#10b98122", color: "#10b981", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>AI Predicted ✓</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 110 }}>
                {bars.map((b, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 }}>
                        <div style={{ display: "flex", gap: 3, alignItems: "flex-end", width: "100%", justifyContent: "center" }}>
                            {b.actual > 0 && (
                                <div style={{
                                    width: "40%", maxWidth: 16,
                                    height: vis ? `${b.actual}px` : "0px",
                                    background: "#4f46e5aa", borderRadius: "3px 3px 0 0",
                                    transition: `height 0.8s ease ${i * 120}ms`,
                                }} />
                            )}
                            <div style={{
                                width: "40%", maxWidth: 16,
                                height: vis ? `${b.forecast}px` : "0px",
                                background: b.actual > 0 ? `${b.color}44` : b.color,
                                borderRadius: "3px 3px 0 0",
                                border: b.actual === 0 ? `1px dashed ${b.color}` : "none",
                                transition: `height 0.8s ease ${i * 120}ms`,
                            }} />
                        </div>
                        <span style={{ fontSize: 9, color: "#64748b", fontWeight: 600 }}>{b.m}</span>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 9, height: 9, background: "#4f46e5aa", borderRadius: 2 }} />
                    <span style={{ fontSize: 10, color: "#64748b" }}>Actual</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 9, height: 9, border: "1px dashed #10b981", borderRadius: 2 }} />
                    <span style={{ fontSize: 10, color: "#64748b" }}>AI Forecast</span>
                </div>
            </div>
        </div>
    );
}

// ── Hero section with full BG image slider ────────────────────────────────
function HeroSection({ navH = 72 }) {
    const [cur, setCur] = useState(0);
    const [paused, setPaused] = useState(false);
    const bgs = [IMGS.heroBg1, IMGS.heroBg2, IMGS.heroBg3];

    useEffect(() => {
        if (paused) return;
        const t = setInterval(() => setCur(c => (c + 1) % bgs.length), 5000);
        return () => clearInterval(t);
    }, [paused]);

    return (
        <section
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{
                position: "relative",
                height: `calc(100vh - ${navH}px)`,
                minHeight: 560, maxHeight: 860,
                marginTop: navH,
                overflow: "hidden",
                display: "flex", alignItems: "center",
            }}
        >
            {/* BG images */}
            {bgs.map((src, i) => (
                <div key={i} style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover", backgroundPosition: "center",
                    opacity: cur === i ? 1 : 0,
                    transition: "opacity 1.4s ease", zIndex: 0,
                }} />
            ))}
            {/* Overlay */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "linear-gradient(135deg,rgba(8,8,28,.88) 0%,rgba(8,16,48,.72) 50%,rgba(5,25,18,.80) 100%)",
            }} />
            {/* Dots */}
            <div style={{
                position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
                display: "flex", gap: 8, zIndex: 10,
            }}>
                {bgs.map((_, i) => (
                    <button key={i} onClick={() => setCur(i)} style={{
                        width: i === cur ? 26 : 8, height: 8, borderRadius: 4,
                        background: i === cur ? "#a78bfa" : "rgba(255,255,255,.28)",
                        border: "none", cursor: "pointer", transition: "all 0.4s", padding: 0,
                    }} />
                ))}
            </div>

            {/* Content */}
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 5, width: "100%", paddingBottom: 48 }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                    gap: 48, alignItems: "center",
                }}>
                    {/* Left */}
                    <div>
                        <Reveal>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20,
                                background: "rgba(99,102,241,.18)", border: "1px solid rgba(99,102,241,.35)",
                                color: "#a5b4fc", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
                                padding: "5px 14px", borderRadius: 99, textTransform: "uppercase",
                            }}>
                                <span style={{ width: 7, height: 7, background: "#10b981", borderRadius: "50%", animation: "pulse 2s infinite", display: "inline-block" }} />
                                AI Solutions — AI Growth Exa
                            </div>
                        </Reveal>

                        <Reveal delay={80}>
                            <h1 style={{
                                fontSize: "clamp(32px,4.8vw,58px)", fontWeight: 900,
                                lineHeight: 1.08, letterSpacing: "-0.03em",
                                color: "#f8fafc", marginBottom: 18,
                            }}>
                                Where Intelligence<br />
                                Meets{" "}
                                <span style={{
                                    background: "linear-gradient(135deg,#a78bfa,#06b6d4,#34d399)",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                                }}>Scalable Growth</span>
                            </h1>
                        </Reveal>

                        <Reveal delay={160}>
                            <p style={{
                                fontSize: "clamp(14px,1.5vw,17px)", color: "#94a3b8",
                                lineHeight: 1.7, maxWidth: 460, marginBottom: 28, fontWeight: 300,
                            }}>
                                AI is not a buzzword — it's our foundation. While traditional agencies
                                react to data, we <strong style={{ color: "#c7d2fe" }}>predict, automate, and optimize</strong> before
                                problems even appear.
                            </p>
                        </Reveal>

                        <Reveal delay={220}>
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                                <button className="btnP">🎯 Customize Your AI Plan</button>
                                <button className="btnO">📞 Book Strategy Call</button>
                            </div>
                        </Reveal>

                        <Reveal delay={300}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, maxWidth: 400 }}>
                                {[
                                    { val: 3, sfx: "x", label: "Faster Decisions", col: "#a78bfa" },
                                    { val: 40, sfx: "%", label: "Lower Ad Spend", col: "#34d399" },
                                    { val: 24, sfx: "/7", label: "Always On", col: "#06b6d4" },
                                ].map((s, i) => (
                                    <div key={i} style={{
                                        textAlign: "center", padding: "12px 6px",
                                        background: "rgba(255,255,255,.06)",
                                        border: "1px solid rgba(255,255,255,.1)",
                                        borderRadius: 12, backdropFilter: "blur(8px)",
                                    }}>
                                        <div style={{ fontSize: "clamp(24px,2.8vw,34px)", fontWeight: 900, color: s.col, lineHeight: 1 }}>
                                            <Counter to={s.val} suffix={s.sfx} />
                                        </div>
                                        <div style={{ fontSize: 10, color: "#64748b", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right — image with floating badge */}
                    <Reveal dir="right" delay={200}>
                        <div style={{ position: "relative" }}>
                            <div style={{
                                borderRadius: 20, overflow: "hidden",
                                boxShadow: "0 28px 72px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.07)",
                                aspectRatio: "4/3",
                            }}>
                                <img src={bgs[cur]} alt="AI Growth Intelligence"
                                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 1.4s" }} />
                            </div>
                            <div style={{
                                position: "absolute", bottom: 14, left: 14, right: 14,
                                background: "rgba(10,10,30,.88)", backdropFilter: "blur(12px)",
                                border: "1px solid rgba(167,139,250,.3)", borderRadius: 12,
                                padding: "10px 14px", display: "flex", alignItems: "center", gap: 10,
                            }}>
                                <span style={{ width: 8, height: 8, background: "#10b981", borderRadius: "50%", animation: "pulse 2s infinite", flexShrink: 0, display: "block" }} />
                                <span style={{ fontSize: 13, color: "#f8fafc", fontWeight: 600 }}>AI Engine Running</span>
                                <span style={{ fontSize: 11, color: "#64748b", marginLeft: "auto" }}>24/7 · 0 downtime</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

// ── Two-column section ─────────────────────────────────────────────────────
function TwoColSection({ tag, tagColor = "#4f46e5", title, titleGrad, sub, wrongItems, rightItems, resultText, resultColor = "#4f46e5", imgSrc, imgAlt, reverse = false, bg, extra }) {
    return (
        <section style={{ background: bg || "transparent", padding: "80px 0" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                    gap: 52, alignItems: "center",
                }}>
                    <Reveal dir={reverse ? "right" : "left"} delay={100}>
                        <div style={{ order: reverse ? 2 : 1 }}>
                            <Tag color={tagColor}>{tag}</Tag>
                            <h2 style={{
                                fontSize: "clamp(24px,3.2vw,38px)", fontWeight: 800, color: "#0f172a",
                                margin: "14px 0 14px", lineHeight: 1.18, letterSpacing: "-0.02em",
                            }}>
                                {title}<br /><GT g={`linear-gradient(135deg,${tagColor},${tagColor === "#4f46e5" ? "#06b6d4" : tagColor === "#0ea5e9" ? "#10b981" : tagColor === "#10b981" ? "#06b6d4" : "#ef4444"})`}>{titleGrad}</GT>
                            </h2>
                            {sub && <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, marginBottom: 20 }}>{sub}</p>}
                            {wrongItems && (
                                <>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Before AI ❌</p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 }}>
                                        {wrongItems.map((t, i) => <Cross key={i} text={t} />)}
                                    </div>
                                </>
                            )}
                            {rightItems && (
                                <>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: tagColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>With Our AI ✓</p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                                        {rightItems.map((t, i) => <Check key={i} text={t} color={tagColor} />)}
                                    </div>
                                </>
                            )}
                            {resultText && <ResultBox text={resultText} color={resultColor} />}
                        </div>
                    </Reveal>

                    <Reveal dir={reverse ? "left" : "right"} delay={200}>
                        <div style={{ order: reverse ? 1 : 2, display: "flex", flexDirection: "column", gap: 14 }}>
                            {imgSrc && <SectionImg src={imgSrc} alt={imgAlt} accent={tagColor} />}
                            {extra}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

// ── Service card ──────────────────────────────────────────────────────────
function ServiceCard({ icon, tag, title, desc, points, cta, accent = "#4f46e5", delay = 0 }) {
    const [hov, setHov] = useState(false);
    const [ref, vis] = useInView();
    return (
        <div ref={ref}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                background: hov ? "#fafbff" : "#fff",
                border: `1.5px solid ${hov ? accent + "55" : "#e2e8f0"}`,
                borderRadius: 18, padding: "26px 24px",
                transition: "all 0.35s ease",
                transform: hov ? "translateY(-7px)" : vis ? "translateY(0)" : "translateY(28px)",
                opacity: vis ? 1 : 0,
                boxShadow: hov ? `0 18px 48px ${accent}18` : "none",
                transitionDelay: `${delay}ms`,
                display: "flex", flexDirection: "column",
            }}>
            <div style={{
                width: 50, height: 50, borderRadius: 13,
                background: `${accent}12`, fontSize: 22,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 14,
            }}>{icon}</div>
            <Tag color={accent}>{tag}</Tag>
            <h3 style={{ fontSize: 19, fontWeight: 800, color: "#0f172a", margin: "10px 0 8px", letterSpacing: "-0.01em" }}>{title}</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 16, flexGrow: 1 }}>{desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {points.map((p, i) => <Check key={i} text={p} color={accent} />)}
            </div>
            <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #f1f5f9", fontSize: 13, fontWeight: 700, color: accent, cursor: "pointer" }}>
                {cta} →
            </div>
        </div>
    );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function AISolutions() {
    // Detect navbar height dynamically, fallback 72px
    const [navH, setNavH] = useState(72);
    useEffect(() => {
        const nav = document.querySelector("nav, header, [role='navigation']");
        if (nav) setNavH(nav.offsetHeight || 72);
    }, []);

    const services = [
        { icon: "🧠", tag: "AI Marketing", accent: "#4f46e5", title: "AI-Based Marketing", desc: "Traditional marketing relies on assumptions. Our AI analyzes millions of signals, finds high-intent audiences, and optimizes in real time.", points: ["High-intent audience targeting", "Real-time message optimization", "Reduce wasted ad spend"], cta: "Get Better ROI", delay: 0 },
        { icon: "⚡", tag: "Automation", accent: "#0ea5e9", title: "Automation Systems", desc: "Manual follow-ups and disconnected tools make growth fragile. Our AI-powered automation runs 24/7 without human intervention.", points: ["Lead capture & qualification", "CRM & sales workflow automation", "Email & WhatsApp follow-ups"], cta: "Run Growth 24/7", delay: 100 },
        { icon: "📊", tag: "Analytics", accent: "#10b981", title: "Predictive Analytics", desc: "We don't ask 'what happened?' — we predict 'what will happen?' Optimize budgets before issues arise.", points: ["Campaign performance forecasting", "Early drop-off detection", "Improved customer LTV"], cta: "Predict Before Problems", delay: 200 },
        { icon: "🚀", tag: "Scaling", accent: "#f59e0b", title: "Smart Scaling", desc: "Scaling fails when systems aren't ready. We strengthen funnels first, automate, then scale profitably.", points: ["Funnel strengthening first", "AI performance saturation detection", "Only profitable expansion"], cta: "Scale Sustainably", delay: 0 },
        { icon: "🤖", tag: "LLM Models", accent: "#8b5cf6", title: "LLM Growth Models", desc: "Beyond tools — we build models. LLM-based systems personalize messaging at scale and align marketing with sales.", points: ["Right message, right audience", "Sales intelligence alignment", "Competitive AI advantage"], cta: "Build Your Model", delay: 100 },
        { icon: "🎯", tag: "Real Outcomes", accent: "#ef4444", title: "What You Can Expect", desc: "Measurable, trackable improvements across your entire marketing and sales funnel.", points: ["Lower customer acquisition costs", "Faster data-backed decisions", "Reduced manual dependency"], cta: "See Case Studies", delay: 200 },
    ];

    return (
        <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#fff", color: "#1e293b", overflowX: "hidden" }}>
            <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .btnP { background:linear-gradient(135deg,#4f46e5,#0ea5e9); color:#fff; font-weight:700;
          padding:14px 28px; border-radius:10px; border:none; cursor:pointer; font-size:15px;
          transition:all 0.25s; font-family:inherit; box-shadow:0 6px 20px rgba(79,70,229,.3); }
        .btnP:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(79,70,229,.4); }
        .btnO { background:transparent; border:2px solid rgba(165,180,252,.6); color:#a5b4fc;
          font-weight:700; padding:12px 26px; border-radius:10px; cursor:pointer; font-size:15px;
          transition:all 0.25s; font-family:inherit; }
        .btnO:hover { background:rgba(99,102,241,.1); transform:translateY(-2px); }
        * { box-sizing:border-box; margin:0; padding:0; }
        @media (max-width:640px) {
          .btnP,.btnO { padding:12px 20px; font-size:14px; }
        }
      `}</style>

            {/* HERO */}
            <HeroSection navH={navH} />

            {/* ── AI MARKETING ── */}
            <Divider />
            <TwoColSection
                tag="AI-Based Marketing" tagColor="#4f46e5"
                title="Smarter Decisions." titleGrad="Better Results."
                sub="Traditional marketing is based on assumptions. By the time insights arrive, the opportunity is already gone."
                wrongItems={["Based on assumptions", "Slow to adapt", "Dependent on manual analysis"]}
                rightItems={["Analyze large datasets instantly", "Identify high-intent audiences", "Optimize messaging in real time", "Reduce wasted ad spend"]}
                resultText="👉 Result: Faster decisions. Higher accuracy. Better ROI."
                imgSrc={IMGS.aiMarketing} imgAlt="Ways to use AI in marketing"
            />

            {/* ── AUTOMATION ── */}
            <Divider />
            <TwoColSection
                tag="Automation Systems" tagColor="#0ea5e9"
                title="Growth That Runs" titleGrad="24/7"
                sub="Manual follow-ups, disconnected tools, human-dependent processes — these make growth slow, inconsistent, and fragile."
                wrongItems={["Manual follow-ups slow you down", "Disconnected tools create gaps", "Human-dependent processes fail at scale"]}
                rightItems={["Lead capture & AI qualification", "CRM & sales workflow automation", "Email & WhatsApp follow-ups", "Funnel-based intelligent nurturing"]}
                resultText="👉 Your growth continues even when your team is offline."
                resultColor="#0ea5e9"
                imgSrc={IMGS.automation} imgAlt="Marketing Automation Systems"
                reverse={true}
                extra={<AutoSteps />}
            />

            {/* ── PREDICTIVE ANALYTICS ── */}
            <Divider />
            <TwoColSection
                tag="Predictive Analytics" tagColor="#10b981"
                title="Know Before" titleGrad="You Spend"
                sub="Instead of asking 'What happened?' we focus on 'What will happen next?' Predict, then act — not react."
                rightItems={["Forecast campaign performance", "Identify drop-off points early", "Optimize budgets proactively", "Improve customer lifetime value (LTV)"]}
                resultText="👉 Less risk. More confidence. Smarter investments."
                resultColor="#10b981"
                imgSrc={IMGS.analytics} imgAlt="Predictive Analytics Dashboard"
                extra={<BarChart />}
            />

            {/* ── SMART SCALING ── */}
            <Divider />
            <TwoColSection
                tag="Smart Scaling" tagColor="#f59e0b"
                title="Growth Without" titleGrad="Breaking Systems"
                sub="Most brands increase budgets — but their systems can't handle it. We scale differently — systematically."
                wrongItems={["Increase budget, systems break", "No saturation detection", "Random expansion decisions"]}
                rightItems={["Strengthen funnels first", "Automate critical processes", "AI detects performance saturation", "Expand only what's profitable"]}
                resultText="👉 Controlled. Sustainable. Profitable growth."
                resultColor="#f59e0b"
                imgSrc={IMGS.scaling} imgAlt="Scalability as Engine for Growth"
                reverse={true}
                extra={
                    <div style={{
                        background: "#fff", border: "1.5px solid #fde68a", borderRadius: 16, padding: "20px",
                        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
                    }}>
                        {[
                            { step: "01", label: "Strengthen Funnels", icon: "🏗️", color: "#f59e0b" },
                            { step: "02", label: "Automate Processes", icon: "⚙️", color: "#0ea5e9" },
                            { step: "03", label: "Detect Saturation", icon: "🔍", color: "#10b981" },
                            { step: "04", label: "Scale Profitably", icon: "📈", color: "#4f46e5" },
                        ].map((s, i) => (
                            <div key={i} style={{
                                background: `${s.color}0d`, border: `1px solid ${s.color}25`,
                                borderRadius: 10, padding: "12px", textAlign: "center",
                            }}>
                                <div style={{ fontSize: 22, marginBottom: 5 }}>{s.icon}</div>
                                <div style={{ fontSize: 10, color: s.color, fontWeight: 700, marginBottom: 3 }}>STEP {s.step}</div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                }
            />

            {/* ── LLM GROWTH MODELS ── */}
            <Divider />
            <TwoColSection
                tag="LLM Growth Models" tagColor="#8b5cf6"
                title="The Future of" titleGrad="Marketing is Here"
                sub="Beyond tools — we build models. LLM-based growth models personalize messaging at scale and align marketing with sales intelligence."
                rightItems={["Personalize messaging at scale", "Improve content & ad relevance", "Enhance customer journey experiences", "Align marketing with sales intelligence"]}
                resultText="👉 This is where AI becomes a competitive advantage."
                resultColor="#8b5cf6"
                imgSrc={IMGS.llm} imgAlt="LLM AI Growth Models"
                extra={
                    <div style={{
                        background: "linear-gradient(135deg,#f5f3ff,#eff6ff)",
                        border: "1px solid #c7d2fe", borderRadius: 14, padding: "18px 20px",
                    }}>
                        <p style={{ fontSize: 13, color: "#4338ca", fontWeight: 700, marginBottom: 12 }}>These models help brands speak:</p>
                        {["✅ The right message", "🎯 To the right audience", "⚡ At exactly the right time"].map((t, i) => (
                            <p key={i} style={{ fontSize: 14, color: "#4f46e5", fontWeight: 600, marginBottom: 6 }}>{t}</p>
                        ))}
                        <p style={{ fontSize: 12, color: "#6366f1", fontStyle: "italic", marginTop: 10 }}>This is where AI becomes a competitive advantage — not just technology.</p>
                    </div>
                }
            />

            {/* ── SERVICE CARDS ── */}
            <Divider />
            <section style={{ background: "#f8fafc", padding: "80px 0" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: 52 }}>
                            <Tag color="#4f46e5">All Services</Tag>
                            <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: "#0f172a", margin: "14px 0 10px", letterSpacing: "-0.02em" }}>
                                AI Solutions Built to <GT>Scale</GT>
                            </h2>
                            <p style={{ fontSize: 16, color: "#64748b", maxWidth: 460, margin: "0 auto" }}>Each service is designed to compound — they work better together.</p>
                        </div>
                    </Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 18 }}>
                        {services.map(s => <ServiceCard key={s.title} {...s} />)}
                    </div>
                </div>
            </section>

            {/* ── AI vs TRADITIONAL ── */}
            <Divider />
            <section style={{ padding: "80px 0" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: 44 }}>
                            <Tag color="#4f46e5">Comparison</Tag>
                            <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, color: "#0f172a", margin: "14px 0" }}>
                                AI vs <GT>Traditional</GT> Marketing
                            </h2>
                        </div>
                    </Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18, maxWidth: 760, margin: "0 auto" }}>
                        <Reveal dir="left" delay={100}>
                            <div style={{ background: "#fff5f5", border: "1.5px solid #fecaca", borderRadius: 16, padding: "26px 22px" }}>
                                <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626", marginBottom: 18 }}>❌ Traditional Marketing</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {["Assumption-based decisions", "Slow to adapt to market changes", "Manual analysis required", "Insights arrive too late"].map((t, i) => <Cross key={i} text={t} />)}
                                </div>
                            </div>
                        </Reveal>
                        <Reveal dir="right" delay={200}>
                            <div style={{ background: "#f5f3ff", border: "1.5px solid #c7d2fe", borderRadius: 16, padding: "26px 22px" }}>
                                <div style={{ fontSize: 16, fontWeight: 800, color: "#4f46e5", marginBottom: 18 }}>✅ AI-Driven Marketing</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {["Data-driven predictions", "Real-time adaptation always", "Fully automated analysis", "Predict before problems arise"].map((t, i) => <Check key={i} text={t} />)}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section style={{
                background: "linear-gradient(135deg,#0f172a,#1e1b4b,#0f2a3a)",
                padding: "88px 0", textAlign: "center", position: "relative", overflow: "hidden",
            }}>
                <div style={{
                    position: "absolute", width: 500, height: 500, borderRadius: "50%",
                    background: "radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%)",
                    top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
                }} />
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <Reveal>
                        <Tag color="#a78bfa">The Future is Now</Tag>
                        <h2 style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 900, color: "#f8fafc", margin: "18px 0 14px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                            Ready to Upgrade from<br />
                            <span style={{ background: "linear-gradient(135deg,#a78bfa,#06b6d4,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Traditional Marketing?</span>
                        </h2>
                        <p style={{ fontSize: 17, color: "#94a3b8", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7, fontWeight: 300 }}>
                            AI is no longer optional. It's the difference between staying relevant and falling behind.
                        </p>
                        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                            <button className="btnP">🎯 Customize Your AI Growth Plan</button>
                            <button className="btnO">📞 Book an AI Strategy Call</button>
                        </div>
                        <p style={{ marginTop: 22, fontSize: 12, color: "#475569" }}>No commitment required · Free 30-min strategy call</p>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
