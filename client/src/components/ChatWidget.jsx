import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, Sparkles, ChevronRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import gsap from 'gsap';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'bot', content: "Hi there! 👋 I'm your AI Growth assistant. How can I help you scale your brand today?" }
    ]);
    const chatRef = useRef(null);
    const messagesEndRef = useRef(null);

    const whatsappNumber = "+919279772321"; // Replace with actual number

    // ── KNOWLEDGE BASE ────────────────────────────────────────────────────────
    // Path A: Rule-Based Brain (Extensively Trained Keywords)
    const KNOWLEDGE_BASE = {
        greetings: {
            keywords: ['hi', 'hello', 'hey', 'greetings', 'who are you', 'how are you', 'good morning', 'good evening', 'sup'],
            response: "Hello! I'm the GrowthExa AI Assistant. I can tell you about our AI services, our founder Priyanshu, our results, or help you book a strategy call. What can I help you with today?"
        },
        services: {
            keywords: ['service', 'what do you do', 'seo', 'ads', 'marketing', 'development', 'web', 'app', 'ai', 'intelligence', 'offering'],
            response: "We design high-performance growth systems! Our core services include: \n1. **AI & Intelligence** (GenAI, LLM implementations & Data Strategy)\n2. **Digital Engineering** (Modern Web & App Ecosystems)\n3. **Growth & Performance** (SEO, Google Ads, Meta Ads).\nWhich one interests you?"
        },
        founder: {
            keywords: ['founder', 'priyanshu', 'who started', 'ceo', 'owner', 'srivastava', 'visionary'],
            response: "GrowthExa was founded by **Priyanshu Srivastava**, a growth strategist and AI architect with over 5.8 years of experience managing multi-million dollar ad budgets. He started the agency to replace 'guesswork' marketing with data-driven systems."
        },
        contact: {
            keywords: ['contact', 'call', 'book', 'talk', 'whatsapp', 'phone', 'email', 'reach', 'address', 'meeting', 'appointment'],
            response: "You can reach us directly on **WhatsApp at +91 9279772321** or email us at contact@aigrowthexa.com. Would you like me to open the WhatsApp chat for you right now?"
        },
        pricing: {
            keywords: ['price', 'cost', 'how much', 'fee', 'charge', 'budget', 'expensive', 'investment'],
            response: "Our pricing is customized based on your business goals and scale. We focus on ROI-driven growth rather than fixed fees. I recommend booking a strategy call to get a personalized quote!"
        },
        careers: {
            keywords: ['job', 'career', 'hiring', 'work', 'join', 'intern', 'opening', 'vacancy', 'apply'],
            response: "We're always looking for top talent in AI, Marketing, and Development! Check our Careers page or send your CV to careers@aigrowthexa.com. We value innovators who want to scale brands."
        },
        results: {
            keywords: ['result', 'success', 'metric', 'roas', 'growth', 'case study', 'track record', 'performance'],
            response: "Our numbers speak for themselves: **1600+ projects delivered**, **98% success ratio**, and managed millions in ad spend with consistent improvements in ROAS and CPL for our clients."
        },
        technology: {
            keywords: ['tech', 'stack', 'react', 'next', 'node', 'python', 'llm', 'gpt', 'gemini', 'cloud', 'aws'],
            response: "We use a cutting-edge tech stack including **React, Next.js, and Node.js** for web, and **Python/PyTorch** for AI implementations. We are experts in GPT, Gemini, and custom LLM integrations."
        },
        process: {
            keywords: ['how you work', 'steps', 'workflow', 'strategy', 'plan', 'framework'],
            response: "We follow a proven **5-Step Growth Framework**: \n1. Data Audit & Research \n2. System Strategy \n3. Rapid Execution \n4. AI Optimization \n5. Scaled Growth."
        },
        location: {
            keywords: ['where', 'office', 'located', 'india', 'city', 'remote'],
            response: "We are a remote-first growth agency with a strong presence in India, serving enterprise clients globally. Most of our strategy calls happen via Zoom or Google Meet."
        },
        testimonials: {
            keywords: ['review', 'testimonial', 'happy client', 'feedback', 'what people say', 'reliable', 'trust'],
            response: "Clients love us! We have a **95%+ customer satisfaction rate**. People often praise Priyanshu and the team for their transparency and the ability to turn complex data into actual sales."
        },
        ai_implementation: {
            keywords: ['implement ai', 'build ai', 'automate', 'genai', 'custom ai', 'chatbot', 'automation', 'machine learning'],
            response: "We specialize in building custom AI systems that actually drive revenue. Whether it's custom chatbots, predictive analytics, or automated lead nurturing, we ensure AI solves a real business problem."
        },
        industries: {
            keywords: ['healthcare', 'real estate', 'saas', 'enterprise', 'e-commerce', 'ecommerce', 'b2b', 'b2c', 'finance', 'it services'],
            response: "We have deep experience across multiple sectors: \n- **Healthcare**: Patient acquisition systems \n- **Real Estate**: High-net lead systems \n- **SaaS**: Subscription growth & funnels \n- **E-commerce**: Scaling ROAS & creative strategy."
        },
        platforms: {
            keywords: ['google', 'meta', 'facebook', 'instagram', 'linkedin', 'tiktok', 'snapchat', 'youtube', 'search', 'social media'],
            response: "We management multi-channel growth. We are experts in **Google Search/Display**, **Meta (FB/IG)**, and high-convert **LinkedIn Ads** for B2B. We also handle TikTok/Snapchat for younger demographics."
        },
        timeframe: {
            keywords: ['how long', 'fast', 'duration', 'speed', 'timeline', 'quick', 'when will i see results'],
            response: "Growth is a process, but we focus on **Quick Wins**! Usually, we see significant technical audit results in 2-4 weeks, and performance marketing shifts within the first month of optimized spend."
        },
        audit: {
            keywords: ['audit', 'check', 'analyze', 'look at my site', 'review my ads', 'report'],
            response: "We offer a **Free Growth Audit** for qualifying brands. We'll look at your current funnels, ad accounts, and tech stack to find 'leaking' revenue. Interested? Drop your URL and book a call!"
        },
        security: {
            keywords: ['safe', 'secure', 'privacy', 'data', 'protect', 'confidential', 'nda'],
            response: "Your data is 100% secure with us. We handle sensitive enterprise data with strict privacy protocols and are happy to sign NDAs before deep-diving into your strategy."
        },
        pain_points: {
            keywords: ['no leads', 'high cpc', 'expensive ads', 'slow growth', 'stuck', 'low conversion', 'dying'],
            response: "Being 'stuck' is exactly why we exist. We fix broken funnels, optimize high-CPC ad accounts, and build systems that turn traffic into profit. Let's fix your growth leaks together."
        }
    };

    const getBotResponse = (input) => {
        const lowerInput = input.toLowerCase();

        // Find matching category
        for (const category in KNOWLEDGE_BASE) {
            if (KNOWLEDGE_BASE[category].keywords.some(keyword => lowerInput.includes(keyword))) {
                return KNOWLEDGE_BASE[category].response;
            }
        }

        // Fallback response
        return "That's an interesting question! I'm still learning, but I'd love for one of our experts to give you a detailed answer. Should we move this conversation to WhatsApp for a faster response?";
    };
    // ──────────────────────────────────────────────────────────────────────────

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isOpen]);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(chatRef.current,
                { opacity: 0, x: 50, scale: 0.9, transformOrigin: 'center right' },
                { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }, [isOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newUserMessage = { role: 'user', content: message };
        setChatHistory(prev => [...prev, newUserMessage]);

        // "Brain" logic processing
        const botAnswer = getBotResponse(message);

        // Simulate bot thinking
        setTimeout(() => {
            setChatHistory(prev => [...prev, {
                role: 'bot',
                content: botAnswer
            }]);
        }, 600);

        setMessage('');
    };

    const handleWhatsAppRedirect = () => {
        const lastUserMsg = chatHistory.filter(m => m.role === 'user').pop()?.content || "";
        const waMsg = encodeURIComponent(`Hi! I'm interested in scaling my brand with AI. ${lastUserMsg ? `Question: ${lastUserMsg}` : ""}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${waMsg}`, '_blank');
    };

    return (
        <div className="fixed right-0 top-[60%] -translate-y-1/2 z-[9999] flex flex-row-reverse items-center group/widget">
            {/* Chat Window */}
            {isOpen && (
                <div
                    ref={chatRef}
                    className="mr-2 w-[360px] max-w-[calc(100vw-80px)] h-[500px] bg-gray-900 border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col backdrop-blur-xl"
                >
                    {/* Header */}
                    <div className="p-5 bg-gradient-to-r from-primary to-indigo-700 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-white">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                                <Sparkles size={20} className="text-primary-foreground/60" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm leading-none mb-0.5 tracking-tight">GrowthExa AI Assistant</h3>
                                <div className="flex items-center gap-1.5 ">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    <span className="text-[10px] text-white/70 font-medium uppercase tracking-widest opacity-80">Online now</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-black/10 rounded-full text-white/80 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-gray-900/50">
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-primary' : 'bg-gray-800 border border-white/5'}`}>
                                        {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-primary" />}
                                    </div>
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick CTA */}
                    {chatHistory.length > 2 && (
                        <div className="px-5 pt-2 pb-0">
                            <button
                                onClick={handleWhatsAppRedirect}
                                className="w-full py-3 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#25D366]/20 transition-all uppercase tracking-widest"
                            >
                                <FaWhatsapp size={14} /> Continue on WhatsApp
                            </button>
                        </div>
                    )}

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-gray-900/80 border-t border-white/5 flex items-center gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                        <button
                            type="submit"
                            className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
                            disabled={!message.trim()}
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Trigger FAB - Thin and Lengthy Hanging Tab */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-8 h-20 rounded-l-xl flex flex-col items-center justify-center shadow-[-5px_0_20px_rgba(0,0,0,0.3)] transition-all duration-500 hover:w-10 active:scale-95 group ${isOpen ? 'bg-gray-800' : 'bg-primary'}`}
            >
                {!isOpen && (
                    <>
                        <div className="absolute inset-0 rounded-l-2xl bg-primary/30 animate-pulse"></div>
                        <div className="absolute right-full mr-4 bg-white text-gray-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 whitespace-nowrap border-b-2 border-primary/20">
                            Chat with AI Assistant
                            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
                        </div>
                    </>
                )}
                {isOpen ? <X size={20} className="text-white" /> : <MessageSquare size={20} className="text-white" />}
            </button>
        </div>
    );
};

export default ChatWidget;
