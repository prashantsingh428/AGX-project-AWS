import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import aiInfinityComplete from "../assets/ai-infinity-complete.png"
import PlansModal from "../components/Modals/PlansModal"

gsap.registerPlugin(ScrollTrigger)

const BoldStatementSection = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageWrapRef = useRef(null)
  const imageRef = useRef(null)
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ================= TEXT ENTRANCE ================= */
      gsap.fromTo(
        textRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      )

      /* ================= IMAGE ENTRANCE ================= */
      gsap.fromTo(
        imageWrapRef.current,
        {
          x: 80,
          opacity: 0,
          rotateY: -15,
          rotateX: 10,
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top 80%",
          },
        }
      )

      /* ================= FLOATING LOOP ================= */
      gsap.to(imageWrapRef.current, {
        y: 12,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      /* ================= PARALLAX ON SCROLL ================= */
      gsap.to(imageWrapRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ================= MOUSE 3D TILT ================= */
  const handleMouseMove = (e) => {
    if (!imageWrapRef.current) return;
    const bounds = imageWrapRef.current.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top

    const rotateY = gsap.utils.mapRange(0, bounds.width, -10, 10, x)
    const rotateX = gsap.utils.mapRange(0, bounds.height, 10, -10, y)

    gsap.to(imageWrapRef.current, {
      rotateX,
      rotateY,
      duration: 0.6,
      ease: "power3.out",
    })
  }

  const resetTilt = () => {
    if (!imageWrapRef.current) return;
    gsap.to(imageWrapRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
    })
  }


  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#040a14]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ================= TEXT ================= */}
          <div ref={textRef} className="space-y-8">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase">
              AI-Powered Marketing Infrastructure
            </p>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="text-white">Scale Smarter.</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Grow Faster.
              </span>
              <br />
              <span className="text-white">With AI.</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
              We help brands automate, optimize, and scale marketing using AI-driven systems.
            </p>

            <button
              onClick={() => setIsPlansModalOpen(true)}
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-primary/30"
            >
              Book a Free Strategy Call
            </button>

            {/* ================= QUICK HIGHLIGHTS ================= */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm font-medium">No Setup Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm font-medium">Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm font-medium">Results in 30 Days</span>
              </div>
            </div>

            { }
            <div className="pt-6 border-t border-white/10">
              <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-5">How It Works</p>
              <div className="space-y-4">

                <div className="flex items-start gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0 group-hover:bg-primary/30 group-hover:scale-110 transition-all step-pulse" style={{ animationDelay: '0s' }}>1</div>
                    <div className="w-px h-6 bg-gradient-to-b from-primary/40 to-transparent mt-1"></div>
                  </div>
                  <div className="pt-1">
                    <h5 className="text-white font-bold text-sm mb-1">Analyze & Audit</h5>
                    <p className="text-gray-400 text-xs leading-relaxed">We deep-dive into your brand, competitors, and market to uncover growth opportunities using AI-driven data analysis.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold text-sm flex-shrink-0 group-hover:bg-purple-600/30 group-hover:scale-110 transition-all step-pulse" style={{ animationDelay: '0.3s' }}>2</div>
                    <div className="w-px h-6 bg-gradient-to-b from-purple-500/40 to-transparent mt-1"></div>
                  </div>
                  <div className="pt-1">
                    <h5 className="text-white font-bold text-sm mb-1">Strategize & Build</h5>
                    <p className="text-gray-400 text-xs leading-relaxed">We craft a custom AI-powered growth roadmap — from ad automation to content pipelines — tailored to your goals.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-pink-600/20 border border-pink-500/40 flex items-center justify-center text-pink-400 font-bold text-sm flex-shrink-0 group-hover:bg-pink-600/30 group-hover:scale-110 transition-all step-pulse" style={{ animationDelay: '0.6s' }}>3</div>
                  </div>
                  <div className="pt-1">
                    <h5 className="text-white font-bold text-sm mb-1">Launch & Scale</h5>
                    <p className="text-gray-400 text-xs leading-relaxed">We execute, optimize, and scale your campaigns with real-time AI analytics — driving 10x growth on autopilot.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: FEATURES ================= */}
          <div
            ref={imageWrapRef}
            className="space-y-5"
          >
            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform icon-float" style={{ animationDelay: '0s' }}>
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold mb-1">AI Ad Campaigns</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Smart targeting & automated bidding powered by machine learning models.</p>
              </div>

              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform icon-float" style={{ animationDelay: '0.5s' }}>
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold mb-1">Content Engine</h4>
                <p className="text-gray-400 text-sm leading-relaxed">LLM-powered content generation for blogs, social media & email copy.</p>
              </div>

              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 hover:border-pink-500/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-pink-600/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform icon-float" style={{ animationDelay: '1s' }}>
                  <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold mb-1">Analytics & Insights</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Predictive analytics dashboards with real-time performance tracking.</p>
              </div>

              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform icon-float" style={{ animationDelay: '1.5s' }}>
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold mb-1">Brand Identity</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Data-driven branding with AI-crafted visual & messaging systems.</p>
              </div>
            </div>

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 bg-gray-900/60 backdrop-blur rounded-2xl p-4 sm:p-6 border border-white/10 shadow-xl">
              <div className="text-center">
                <p className="text-2xl sm:text-4xl font-bold text-primary">300%</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">ROI Increase</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  50%
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">Cost Reduction</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-4xl font-bold text-primary">24/7</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">Automation</p>
              </div>
            </div>

            {/* ================= TESTIMONIAL ================= */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
                <div>
                  <p className="text-white font-semibold text-sm">Priyanshu Shrivastav</p>
                  <p className="text-gray-500 text-xs">Director and Founder, Ai GrowthExa</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic">"AI GrowthExa transformed our digital presence completely. Our ad spend efficiency improved by 3x within the first quarter."</p>
              <div className="flex gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* ================= TRUST BANNER ================= */}
            <div className="flex items-center justify-center gap-3 py-3 opacity-60">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
              <p className="text-gray-400 text-xs font-medium tracking-wider uppercase whitespace-nowrap">Trusted by 50+ brands worldwide</p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
            </div>
          </div>

        </div>
      </div>
      <PlansModal isOpen={isPlansModalOpen} onClose={() => setIsPlansModalOpen(false)} />
      <style>{`
        @keyframes icon-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes step-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 12px 4px rgba(99, 102, 241, 0.15); }
        }
        .icon-float {
          animation: icon-float 3s ease-in-out infinite;
        }
        .step-pulse {
          animation: step-pulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default BoldStatementSection


