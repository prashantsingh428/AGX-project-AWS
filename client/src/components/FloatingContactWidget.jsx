import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X, Headset, PhoneCall } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../api/api';
import supportAvatar from '../assets/support_avatar.png';

const FloatingContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();

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

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
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
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all z-10"
              title="Close"
            >
              <X size={18} />
            </button>

            <div className="flex gap-4 md:gap-6 items-start">
              {/* Left Column: Form & Call Details */}
              <div className="flex-grow space-y-4 text-left max-w-[65%]">
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
                    Have questions about our services?
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm font-medium">
                    Our expert can answer all your questions.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none text-xs md:text-sm font-semibold transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl text-xs md:text-sm transition-colors shadow-lg shadow-slate-800/10 disabled:opacity-50"
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

              {/* Right Column: Avatar Illustration */}
              <div className="w-[35%] flex justify-center items-center shrink-0 self-center">
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
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 bg-[#e6b446] hover:bg-[#ffcc00] text-black rounded-full shadow-xl shadow-[#e6b446]/20 transition-colors focus:outline-none relative ml-auto"
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
