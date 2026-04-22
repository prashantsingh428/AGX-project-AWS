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

    const whatsappNumber = "+918979779337"; // Replace with actual number

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isOpen]);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(chatRef.current,
                { opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }, [isOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newUserMessage = { role: 'user', content: message };
        setChatHistory(prev => [...prev, newUserMessage]);

        // Simulate bot thinking
        setTimeout(() => {
            setChatHistory(prev => [...prev, {
                role: 'bot',
                content: "That sounds like a great challenge! Let's discuss this further on WhatsApp for a personalized strategy."
            }]);
        }, 1000);

        setMessage('');
    };

    const handleWhatsAppRedirect = () => {
        const lastUserMsg = chatHistory.filter(m => m.role === 'user').pop()?.content || "";
        const waMsg = encodeURIComponent(`Hi! I'm interested in scaling my brand with AI. ${lastUserMsg ? `Question: ${lastUserMsg}` : ""}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${waMsg}`, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div
                    ref={chatRef}
                    className="mb-4 w-[360px] max-w-[calc(100vw-48px)] h-[500px] bg-gray-900 border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col backdrop-blur-xl"
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

            {/* Trigger FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-110 active:scale-95 group ${isOpen ? 'bg-gray-800 rotate-90' : 'bg-primary'}`}
            >
                {!isOpen && (
                    <>
                        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
                        <div className="absolute -top-12 right-0 bg-white text-gray-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 whitespace-nowrap border-b-2 border-primary/20">
                            Chat with AI Assistant
                            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white rotate-45"></div>
                        </div>
                    </>
                )}
                {isOpen ? <X size={28} className="text-white" /> : <MessageSquare size={28} className="text-white" />}
            </button>
        </div>
    );
};

export default ChatWidget;
