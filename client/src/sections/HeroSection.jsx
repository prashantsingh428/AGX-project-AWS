import { Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ChevronDown, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import heroVideo from "../assets/220941_medium.mp4"
import { useTranslation } from "react-i18next"

const HeroSection = () => {
  const { t } = useTranslation()
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)
  const insightsBarRef = useRef(null)
  const secondaryRef = useRef(null)
  const location = useLocation()

  const [textIndex, setTextIndex] = useState(0)

  const shufflingTexts = [
    "AI-Driven Growth, IT & Marketing Agency",
    "LLM-Powered Marketing Automation",
    "Performance-First Ad Management",
    "Data-Driven Brand Identities",
    "Predictive Analytics & Insights",
    "Intelligent Growth Infrastructure"
  ]

  useEffect(() => {
    if (!titleRef.current || !textRef.current || !buttonsRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

    tl.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(
        insightsBarRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1 },
        "-=1"
      )
      .fromTo(
        secondaryRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1.2 },
        "-=0.8"
      )

    // Text shuffling interval
    const interval = setInterval(() => {
      gsap.to(textRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setTextIndex((prev) => (prev + 1) % shufflingTexts.length)
          gsap.fromTo(textRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          )
        }
      })
    }, 2500) // 2s pause + 0.5s animation = 2.5s total cycle

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-end justify-start overflow-visible pt-40 border-b-[20px] border-white">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* All overlays removed to show the original video as requested */}
      </div>

      <div className="container mx-auto px-4 md:px-0 relative z-20">
        {/* Main Content Box (Overlapping Bottom Edge) */}
        <div
          ref={buttonsRef}
          className="w-full max-w-lg bg-primary/30 backdrop-blur-xl p-8 md:p-12 text-white shadow-2xl transition-all transform translate-y-[40%] border border-white/10"
        >
          <div ref={titleRef}>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-4 uppercase">
              AI GrowthExa
            </h1>
            <h2 className="text-xl md:text-2xl font-light opacity-90 mb-10">
              Empower • Scale • Succeed
            </h2>
          </div>

          <div ref={textRef} className="opacity-80">
            <p className="text-lg md:text-xl font-light leading-relaxed">
              Where Data Thinks. AI Acts. Brands Grow.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/contact"
              state={{ background: location }}
              className="px-8 py-3 bg-primary text-white hover:bg-primary/90 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Get Your Growth Plan
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Insights Bar (Bottom Right) */}
      <div
        ref={insightsBarRef}
        className="absolute bottom-10 right-10 z-30 hidden lg:flex items-center gap-10 text-white/70 font-medium tracking-wide"
      >
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="flex flex-col items-center justify-center cursor-pointer group h-12"
          title="Scroll Down"
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -5 }}
              animate={{
                opacity: [0.2, 1, 0.2],
                y: [0, 5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center -mt-2.5 first:mt-0"
            >
              <ChevronDown
                className="w-5 h-5 text-primary brightness-150 group-hover:text-white transition-colors"
                strokeWidth={3}
              />
            </motion.div>
          ))}
        </button>
        {[
          "AI Growth Engine",
          "10X AI Growth.",
          "AI lab",
          "Exa Intelligence 360"
        ].map((item, i) => (
          <a
            key={i}
            href="#"
            className="text-[13px] uppercase tracking-[0.1em] nav-link-hover hover:text-white transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right-Center Message Block */}
      <div
        ref={secondaryRef}
        className="absolute top-1/2 right-12 md:right-20 -translate-y-1/2 z-20 max-w-sm hidden xl:block"
      >
        <div className="w-16 h-1 bg-primary mb-8 animate-pulse" />
        <h3 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
          {t('hero.secondary_title')}
        </h3>
        <p className="text-white/80 text-lg leading-relaxed mb-10 font-light">
          {t('hero.secondary_description')}
        </p>
        <Link
          to="/services"
          className="group flex items-center gap-3 text-white font-medium hover:text-primary transition-colors"
        >
          <span className="text-sm uppercase tracking-widest nav-link-hover">{t('hero.secondary_cta')}</span>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
