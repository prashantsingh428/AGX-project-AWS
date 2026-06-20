import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X, Headset, Sparkles, Send } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../api/api';
import supportAvatar from '../assets/support_avatar.png';

const FloatingContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('callback'); // 'callback' | 'chat'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();
  const hasInteractedRef = useRef(false);

  // Chat States
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am Exa, your AI growth assistant. How can I help you scale your brand today?'
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, activeTab]);

  // Auto-open 5 seconds after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteractedRef.current) {
        setIsOpen(true);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || chatInput;
    if (!text || text.trim() === '') return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    if (!textToSend) setChatInput('');
    setIsTyping(true);

    // Simulated AI response logic
    setTimeout(() => {
      let reply = "I'm not sure about that one, but our human growth experts will be happy to assist! Feel free to request a callback in the 'Call Back' tab above.";
      const query = text.toLowerCase();

      if (query.includes('service') || query.includes('offer') || query.includes('what do you do') || query.includes('solution')) {
        reply = "We build intelligent growth systems designed for the AI-first economy. Our main services are: Custom AI Agents, Generative AI Strategy, Cloud & Data Infrastructure, DevOps, and Performance Marketing.";
      } else if (query.includes('contact') || query.includes('phone') || query.includes('call') || query.includes('email')) {
        reply = "You can call us directly at +91 8585858585, email us at contact@aigrowthexa.com, or leave your phone number in the 'Call Back' tab above!";
      } else if (query.includes('founder') || query.includes('priyanshu') || query.includes('ceo') || query.includes('who runs')) {
        reply = "AI Growth Exa was founded in 2019 by Priyanshu Srivastava. He is dedicated to helping brands automate and scale profitability via AI funnels.";
      } else if (query.includes('price') || query.includes('cost') || query.includes('pricing') || query.includes('free')) {
        reply = "We customize our pricing based on your brand's unique needs. We offer tailormade plans and custom agent builds. Request a callback to get a free growth roadmap consultation!";
      } else if (query.includes('timeline') || query.includes('how long') || query.includes('time')) {
        reply = "Timeline varies by scope: initial strategy audits take 1-2 weeks, custom AI POCs take 3-4 weeks, and enterprise deployments are scoped dynamically.";
      } else if (query.includes('hello') || query.includes('hi ') || query.includes('hey')) {
        reply = "Hello there! How can I help you explore our AI and growth services today?";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 8) {
      showNotification('Please enter a valid phone number.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/connect', {
        name: 'Quick Callback Request',
        email: 'callback@aigrowthexa.com',
        phone: phoneNumber,
        company: 'Requested via Homepage Floating Widget',
        message: 'The visitor requested an urgent callback via the floating helper widget on the homepage.',
      });
      showNotification('Request received! We will call you shortly.', 'success');
      setPhoneNumber('');
      setIsOpen(false);
    } catch (error) {
      console.error('Callback request error:', error);
      showNotification('Failed to submit request. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const suggestions = [
    'AI Services',
    'Pricing info',
    'How to Contact',
    'Who is the Founder?'
  ];

  return (
    <div className="fixed bottom-28 right-8 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100 w-[340px] xs:w-[380px] md:w-[480px] mb-4 relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                hasInteractedRef.current = true;
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all z-20"
              title="Close"
            >
              <X size={18} />
            </button>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-100 mb-4 pb-2 mr-8 text-xs md:text-sm font-bold gap-3">
              <button
                onClick={() => setActiveTab('callback')}
                className={`pb-1 px-1 transition-all ${activeTab === 'callback'
                  ? 'text-slate-800 border-b-2 border-slate-800'
                  : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                Call Back
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`pb-1 px-1 transition-all flex items-center gap-1.5 ${activeTab === 'chat'
                  ? 'text-slate-800 border-b-2 border-slate-800'
                  : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                <Sparkles size={14} className="text-[#e6b446]" />
                Chat with AI
              </button>
            </div>

            <div className="flex gap-4 md:gap-6 items-stretch">
              {/* Content Panel */}
              <div className="flex-grow flex flex-col justify-between text-left max-w-[65%] min-h-[200px]">
                {activeTab === 'callback' ? (
                  // Callback Form Tab
                  <div className="space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg md:text-xl font-black text-slate-800 leading-tight">
                        Have questions about our services?
                      </h3>
                      <p className="text-slate-500 text-xs font-medium">
                        Our expert can answer all your questions.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2.5">
                      <input
                        type="tel"
                        required
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none text-xs md:text-sm font-semibold transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs md:text-sm transition-colors shadow-lg shadow-slate-800/10 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Requesting...' : 'Get a call from us'}
                      </button>
                    </form>

                    <div className="pt-2 border-t border-slate-100">
                      <a
                        href="tel:+918585858585"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors text-xs md:text-sm font-bold"
                      >
                        <Phone size={14} className="text-[#e6b446]" />
                        <span>Or call us <span className="underline">+91 8585858585</span></span>
                      </a>
                    </div>
                  </div>
                ) : (
                  // AI Chat Tab
                  <div className="flex flex-col flex-grow justify-between h-[230px]">
                    {/* Message Area */}
                    <div className="flex-grow overflow-y-auto space-y-2 pr-1 text-xs max-h-[140px] scrollbar-thin">
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                        >
                          <div
                            className={`p-2.5 rounded-2xl max-w-[90%] leading-relaxed ${msg.sender === 'user'
                              ? 'bg-slate-800 text-white rounded-tr-none'
                              : 'bg-slate-100 text-slate-700 rounded-tl-none border border-slate-100'
                              }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-slate-100 text-slate-400 italic p-2 rounded-2xl rounded-tl-none border border-slate-100 flex gap-1 items-center animate-pulse">
                            <span>Exa is typing</span>
                            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestion Chips */}
                    {messages.length === 1 && !isTyping && (
                      <div className="flex flex-wrap gap-1.5 py-1.5 border-t border-slate-50">
                        {suggestions.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(sug)}
                            className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-full hover:bg-slate-100 hover:border-slate-300 transition-colors"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Input Bar */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex gap-1.5 mt-2 border-t border-slate-100 pt-2"
                    >
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-slate-400 text-slate-800 placeholder-slate-400 font-medium"
                      />
                      <button
                        type="submit"
                        className="bg-slate-800 text-white p-2 rounded-xl hover:bg-slate-700 transition-colors flex-shrink-0"
                      >
                        <Send size={14} />
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Right Side: Avatar Illustration */}
              <div className="w-[35%] flex flex-col justify-center items-center shrink-0 self-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-pink-100 bg-pink-50/50 shadow-inner">
                  <img
                    src={supportAvatar}
                    alt="Support Avatar"
                    className="w-full h-full object-cover scale-105"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Bubble */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          hasInteractedRef.current = true;
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 bg-[#e6b446] hover:bg-[#ffcc00] text-black rounded-full shadow-xl shadow-[#e6b446]/20 transition-colors focus:outline-none relative ml-auto cursor-target"
        title="Have Questions?"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <Headset size={24} />
              {/* Pulsating Ping Notification Badge */}
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-slate-900 border-2 border-[#e6b446]"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingContactWidget;
