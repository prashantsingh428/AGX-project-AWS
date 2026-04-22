import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import FloatingParticles from '../components/FloatingParticles';
// Import assets
const imagesGlob = import.meta.glob('../assets/images/*.{png,svg,webp,jpeg,jpg}', { eager: true, as: 'url' });
const clientImages = Object.values(imagesGlob);
import {
  Lightbulb,
  Target,
  Rocket,
  CheckCircle,
  TrendingUp,
  Settings,
  BarChart,
  Users,
  Globe,
  ShieldCheck,
  Smartphone,
  Cpu,
  MessageSquare,
  Search
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const location = useLocation();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const [showAllFaqs, setShowAllFaqs] = React.useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        '.hero-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const faqs = [
    { q: 'When was AI Growth Exa founded?', a: 'We were founded in 2019 with a focus on AI-driven growth marketing.' },
    { q: 'Are you a traditional marketing agency?', a: 'No. We are a growth-focused, AI-first agency.' },
    { q: 'Do you work with international clients?', a: 'Yes. We work globally with a remote-first mindset.' },
    { q: 'What size companies do you work with?', a: 'From growth-stage startups to enterprise-level brands.' },
    { q: 'What makes your approach different?', a: 'We build systems, not just campaigns.' },
    { q: 'Is AI replacing human marketers?', a: 'No. AI supports smarter human decisions.' },
    { q: 'Do you provide reporting and insights?', a: 'Yes. Full transparency with actionable insights.' },
  ];

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-44 md:pb-28 text-center overflow-hidden bg-[#0f172a] text-white"
      >
        {/* Background Blobs - Reduced opacity/removed gradients */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="hero-text inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-white/80 text-xs font-bold uppercase tracking-widest mb-6 border border-primary/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            About Us
          </div>

          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6">
            Building{' '}
            <span className="text-primary-foreground/90">
              Growth Systems
            </span>
            <br />
            for the AI-First World
          </h1>

          <p className="hero-text text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
            At <span className="text-white font-bold">AI Growth Exa</span>, we don’t just market brands. We build intelligent growth systems designed for an AI-first world.<br /><br />
            Founded in 2019, AI Growth Exa was created with one clear belief: Marketing should be intelligent, measurable, and scalable — not guesswork.
          </p>
        </div>
      </section>

      {/* Success Story Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
              Our Success Story
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              The “Why” Behind <span className="text-primary">AI Growth Exa</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="mb-4 text-red-500">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">It Started With a Problem…</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Back in 2019, we noticed the same problem everywhere. Businesses were spending:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2 items-start"><span className="text-red-500 font-bold">•</span> Money on ads without clarity</li>
                <li className="flex gap-2 items-start"><span className="text-red-500 font-bold">•</span> Time on reports without insights</li>
                <li className="flex gap-2 items-start"><span className="text-red-500 font-bold">•</span> Energy on agencies promising “results” but delivering vanity metrics</li>
              </ul>
              <p className="mt-4 text-gray-600 font-medium italic">Traditional marketing was loud — but not smart.</p>
            </div>

            <div className="p-8 bg-primary/5 rounded-3xl border border-primary/10 hover:shadow-xl transition-all duration-300 relative">
              <div className="mb-4 text-primary">
                <Lightbulb size={40} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">The Turning Point</h3>
              <p className="text-primary/80 leading-relaxed mb-4">
                We asked one simple question: <strong>What if marketing could think before acting?</strong> That question changed everything.
              </p>
              <p className="text-primary/80 mb-2">We began experimenting with:</p>
              <ul className="space-y-2 text-primary/80">
                <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /> Data-driven decision systems</li>
                <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /> Predictive audience behaviour</li>
                <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /> Automation that actually converted</li>
              </ul>
            </div>

            <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 hover:shadow-xl transition-all duration-300 relative">
              <div className="mb-4 text-indigo-600">
                <Rocket size={40} />
              </div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-4">Enterprise-Level Growth</h3>
              <p className="text-indigo-800 leading-relaxed mb-4">
                What started as a solution for a few clients quickly became a repeatable growth framework. Today, we don’t just run marketing. <strong>We design growth ecosystems.</strong>
              </p>
              <ul className="space-y-2 text-indigo-800">
                <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" /> Handling complex funnels</li>
                <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" /> High-budget performance campaigns</li>
                <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" /> AI-powered systems for scaling brands</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Section */}
      <section className="relative py-20 bg-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <FloatingParticles theme="dark" />
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground/80 text-xs font-bold uppercase tracking-widest mb-4 border border-primary/30">
              How We Work
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              A Clear, Proven, <span className="text-primary-foreground">Scalable Growth Framework</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Growth without structure breaks. That’s why we follow a disciplined, system-led process.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: '1', title: 'Research & Data', desc: 'We deep-dive into your market, audience behaviour, competitors, and data signals.' },
              { step: '2', title: 'Strategy', desc: 'Every decision is backed by insights — not assumptions.' },
              { step: '3', title: 'Execution', desc: 'AI-powered ads, funnels, automation, and content go live.' },
              { step: '4', title: 'Optimization', desc: 'Continuous testing, learning, and performance improvement.' },
              { step: '5', title: 'Scaling', desc: 'We double down on what works and build systems for long-term growth.' }
            ].map((item, i) => (
              <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-primary transition-all duration-300 group">
                <div className="text-4xl font-black text-slate-600 mb-4 group-hover:text-primary transition-colors">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 bg-primary/10 p-4 rounded-xl border border-primary/20 inline-block w-full">
            <p className="text-white/80 font-semibold flex items-center justify-center gap-2">
              <CheckCircle size={20} /> This is how we turn ideas into measurable results.
            </p>
          </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="relative py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Why Choose <span className="text-primary">AI Growth Exa</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Because Growth Needs Focus — Not Fluff.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Performance-Driven Approach', desc: 'Every action is tied directly to ROI and outcomes.', icon: <TrendingUp size={32} />, color: 'bg-green-50 text-green-700 border-green-100' },
              { title: 'Automation-Focused Systems', desc: 'Less manual work. More efficiency and scale.', icon: <Settings size={32} />, color: 'bg-primary/5 text-primary border-primary/10' },
              { title: 'Transparent Reporting', desc: 'Clear numbers. No confusion. No hidden data.', icon: <BarChart size={32} />, color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
              { title: 'Dedicated Growth Team', desc: 'Strategists, analysts, and performance experts — aligned to your goals.', icon: <Users size={32} />, color: 'bg-orange-50 text-orange-700 border-orange-100' },
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-3xl border ${item.color} hover:shadow-lg transition-all duration-300 flex gap-6 items-start`}>
                <div className="p-4 bg-white rounded-2xl shadow-sm">{item.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="opacity-90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-gray-900 italic">"We don’t chase trends. We build systems that scale with you."</p>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="relative py-20 bg-[#1e1b4b] text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              <div className="mb-4 text-center flex justify-center text-primary-foreground/60">
                <Target size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-indigo-100">To help brands grow smarter and faster using AI-driven marketing systems that deliver real business impact.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              <div className="mb-4 text-center flex justify-center text-primary-foreground/60">
                <Globe size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-indigo-100">To become a global growth partner for brands in the AI-first economy — where marketing is intelligent, efficient, and scalable.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-left">
              <div className="mb-4 text-center flex justify-center text-primary-foreground/60">
                <Lightbulb size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Core Values</h3>
              <ul className="space-y-3 text-indigo-100">
                <li className="flex gap-3"><span className="font-bold text-white">Innovation</span> - We evolve with technology</li>
                <li className="flex gap-3"><span className="font-bold text-white">Data</span> - Decisions backed by truth</li>
                <li className="flex gap-3"><span className="font-bold text-white">Growth</span> - For our clients and ourselves</li>
                <li className="flex gap-3"><span className="font-bold text-white">Trust</span> - Long-term partnerships over short wins</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Marquee */}
      <section ref={statsRef} className="relative py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Our Growth in Numbers</h2>
        </div>

        <div className="relative w-full overflow-hidden mask-gradient-sides">
          <div className="flex w-max animate-marquee hover:pause-animation">
            {[
              ...[
                { value: '1600+', label: 'Clients Served' },
                { value: '95%+', label: 'Happy Clients' },
                { value: '98%', label: 'Project Success Ratio' },
                { value: '350+', label: 'SEO Projects Delivered' },
                { value: '571+', label: 'Websites Developed' },
                { value: '11+', label: 'Mobile Apps (Android & iOS)' },
                { value: '400+', label: 'Google & Meta Ad Campaigns' },
                { value: '750+', label: 'Social Media Campaigns' },
                { value: '151+', label: 'LLM & AI Growth Implementations' },
              ],
              ...[
                { value: '1600+', label: 'Clients Served' },
                { value: '95%+', label: 'Happy Clients' },
                { value: '98%', label: 'Project Success Ratio' },
                { value: '350+', label: 'SEO Projects Delivered' },
                { value: '571+', label: 'Websites Developed' },
                { value: '11+', label: 'Mobile Apps (Android & iOS)' },
                { value: '400+', label: 'Google & Meta Ad Campaigns' },
                { value: '750+', label: 'Social Media Campaigns' },
                { value: '151+', label: 'LLM & AI Growth Implementations' },
              ]
            ].map((stat, i) => (
              <div key={i} className="mx-4 flex-shrink-0 w-64 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:scale-105 transition-transform">
                <div className="text-4xl md:text-5xl font-black mb-2 text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-bold uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are & Partners */}
      <section className="relative py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-6">About The Company</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            AI Growth Exa is a growth marketing agency built for the new era of business — where AI, automation, and performance marketing work together.
          </p>

          <h3 className="text-2xl font-bold mb-8">We partner with:</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="mb-4 text-primary">
                <Rocket size={40} />
              </div>
              <h4 className="font-bold text-lg">Startups</h4>
              <p className="text-gray-500 text-sm">ready to scale</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="mb-4 text-primary">
                <TrendingUp size={40} />
              </div>
              <h4 className="font-bold text-lg">Growing Brands</h4>
              <p className="text-gray-500 text-sm">stuck with inconsistent leads</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="mb-4 text-primary">
                <Settings size={40} />
              </div>
              <h4 className="font-bold text-lg">Mature Businesses</h4>
              <p className="text-gray-500 text-sm">tired of ineffective marketing</p>
            </div>
          </div>
          <p className="mt-12 text-2xl font-black text-primary">
            Our mission is simple: Help brands grow faster, smarter, and sustainably.
          </p>
        </div>
      </section>


      {/* Testimonials - Marquee */}
      <section className="relative py-20 bg-white border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl mb-16 text-center">
          <h2 className="text-4xl font-black text-center">Happy Clients & Testimonials</h2>
        </div>

        <div className="relative w-full overflow-hidden mask-gradient-sides">
          <div className="flex w-max animate-marquee-fast hover:pause-animation">
            {[
              ...[
                { name: 'Rahul Sharma', review: 'PRIYANSHU SIR NE AND AI Growthexa TEAM ने हमारी ब्रांड पहचान पूरी तरह बदल दी। लोगो से लेकर मैसेजिंग तक, हर चीज़ में clarity और professionalism दिखता है। उनकी टीम ने हमारी सोच को सही रूप दिया। सच में, ऐसा लगा जैसे कोई अपना ही हमारे बिज़नेस को समझ रहा हो। Highly recommended!', stars: 5 },
                { name: 'Pooja Verma', review: 'Honestly, laga tha agency k sath kaam kr na bahot kaam chori bhara hoga but, AI Growthexa ke saath kaam karke bahut acha laga. Team ne sirf design nahi banaya, brand ko feel diya. Communication smooth tha aur output exactly wahi mila jo hum imagine kar rahe the. Totally worth it!', stars: 5 },
                { name: 'Amit Patel', review: 'AI Growthexa Team ne humare brand ko next level le aaye. Pehle sab scattered lagta tha, but ab har platform pe ek strong aur consistent identity hai. Creative bhi aur professional bhi. Dil se kaam karte hain, hamri website and seo dono pe kaam kia and timely reports di. Really Priyanshu helps a lot in this.', stars: 5 },
                { name: 'Neha Kapoor', review: 'Working with AI Growthexa was a great experience. They truly understood our brand vision and translated it into a strong visual and messaging identity. The team is creative, responsive, and genuinely invested in your growth. Highly Highly Highly recommended!', stars: 5 },
                { name: 'Rohit Malhotra', review: 'From last 7 months we are connected and Priyanshu sir strongly work on our SEO and SMO, meta ads & google ads all the reports are on time thankyou so much for all. AI Growthexa delivers more than just branding they deliver confidence. From strategy to execution, everything felt well thought out.', stars: 5 },
                { name: 'Kuldeep', review: 'Best IT & marketing AGENCY INDIA AI GrowthExa didn’t just improve our ads they fixed our entire growth system. We finally have predictable leads and scalable sales. Their AI-driven approach saved us time, money, and guesswork. LOT OF LOVE AND SUPPORT TO PRIYANSHU SIR.', stars: 5 },
              ],
              ...[
                { name: 'Rahul Sharma', review: 'PRIYANSHU SIR NE AND AI Growthexa TEAM ने हमारी ब्रांड पहचान पूरी तरह बदल दी। लोगो से लेकर मैसेजिंग तक, हर चीज़ में clarity और professionalism दिखता है। उनकी टीम ने हमारी सोच को सही रूप दिया। सच में, ऐसा लगा जैसे कोई अपना ही हमारे बिज़नेस को समझ रहा हो। Highly recommended!', stars: 5 },
                { name: 'Pooja Verma', review: 'Honestly, laga tha agency k sath kaam kr na bahot kaam chori bhara hoga but, AI Growthexa ke saath kaam karke bahut acha laga. Team ne sirf design nahi banaya, brand ko feel diya. Communication smooth tha aur output exactly wahi mila jo hum imagine kar rahe the. Totally worth it!', stars: 5 },
                { name: 'Amit Patel', review: 'AI Growthexa Team ne humare brand ko next level le aaye. Pehle sab scattered lagta tha, but ab har platform pe ek strong aur consistent identity hai. Creative bhi aur professional bhi. Dil se kaam karte hain, hamri website and seo dono pe kaam kia and timely reports di. Really Priyanshu helps a lot in this.', stars: 5 },
                { name: 'Neha Kapoor', review: 'Working with AI Growthexa was a great experience. They truly understood our brand vision and translated it into a strong visual and messaging identity. The team is creative, responsive, and genuinely invested in your growth. Highly Highly Highly recommended!', stars: 5 },
                { name: 'Rohit Malhotra', review: 'From last 7 months we are connected and Priyanshu sir strongly work on our SEO and SMO, meta ads & google ads all the reports are on time thankyou so much for all. AI Growthexa delivers more than just branding they deliver confidence. From strategy to execution, everything felt well thought out.', stars: 5 },
                { name: 'Kuldeep', review: 'Best IT & marketing AGENCY INDIA AI GrowthExa didn’t just improve our ads they fixed our entire growth system. We finally have predictable leads and scalable sales. Their AI-driven approach saved us time, money, and guesswork. LOT OF LOVE AND SUPPORT TO PRIYANSHU SIR.', stars: 5 },
              ]
            ].map((t, i) => (
              <div key={i} className="mx-4 flex-shrink-0 w-96 bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all duration-300">
                <div className="flex gap-1 text-yellow-500 mb-4 text-xl">{'★'.repeat(t.stars)}</div>
                <p className="text-gray-600 italic mb-6 leading-relaxed line-clamp-4">"{t.review}"</p>
                <div className="font-bold text-gray-900 border-t border-slate-200 pt-4 uppercase text-sm tracking-wide">{t.name}</div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .mask-gradient-sides {
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 50s linear infinite;
          }
          .animate-marquee-fast {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover, .animate-marquee-fast:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 bg-[#0f172a]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Company FAQs</h2>
            <p className="text-gray-500">Trust-Building & SEO-Focused</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'When was AI Growth Exa founded?', a: 'We were founded in 2019 with a focus on AI-driven growth marketing.' },
              { q: 'Are you a traditional marketing agency?', a: 'No. We are a growth-focused, AI-first agency.' },
              { q: 'Do you work with international clients?', a: 'Yes. We work globally with a remote-first mindset.' },
              { q: 'What size companies do you work with?', a: 'From growth-stage startups to enterprise-level brands.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Q{i + 1}: {faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 bg-grey-300 text-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <FloatingParticles theme="dark" />
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <p className="text-xl md:text-2xl text-primary mb-6 font-medium">Growth isn’t about doing more marketing.<br />It’s about doing the right things — smarter.</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary font-black mb-12">Ready to Build Intelligent Growth?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Let’s replace guesswork with clarity, systems, and scale.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              state={{ background: location }}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-xl shadow-primary/30 text-lg"
            >
              Book a Strategy Call
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 bg-transparent text-primary/80 font-bold rounded-xl border-2 border-primary hover:border-primary/80 hover:text-primary transition-all duration-300 text-lg"
            >
              Customize Your Growth Plan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
