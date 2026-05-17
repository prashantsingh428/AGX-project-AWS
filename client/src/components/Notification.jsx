import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Notification = () => {
    const { notifications, removeNotification } = useNotification();

    const typeConfig = {
        success: {
            title: 'Request Submitted',
            border: 'border-blue-900/10',
            stripe: 'bg-[#000048]',
            progress: 'bg-[#000048]',
        },
        error: {
            title: 'Submission Failed',
            border: 'border-red-900/10',
            stripe: 'bg-red-600',
            progress: 'bg-red-600',
        },
        info: {
            title: 'Notification',
            border: 'border-slate-900/10',
            stripe: 'bg-slate-800',
            progress: 'bg-slate-800',
        }
    };

    return (
        <div className="fixed top-24 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-md w-full">
            <AnimatePresence>
                {notifications.map((n) => (
                    <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 36, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 24, scale: 0.98, transition: { duration: 0.2 } }}
                        className="pointer-events-auto"
                    >
                        {(() => {
                            const config = typeConfig[n.type] || typeConfig.info;
                            return (
                                <div className={`relative overflow-hidden rounded-xl border ${config.border} bg-white p-5 shadow-[0_20px_50px_rgba(0,0,72,0.1)]`}>
                                    <div className={`absolute left-0 top-0 h-full w-1.5 ${config.stripe}`} />

                                    <div className="flex items-start gap-4 pl-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-black tracking-[0.2em] text-[#000048] uppercase opacity-60">
                                                {config.title}
                                            </p>
                                            <p className="mt-1 text-[15px] text-slate-800 leading-relaxed font-bold">
                                                {n.message}
                                            </p>
                                        </div>

                                        <button 
                                            onClick={() => removeNotification(n.id)}
                                            className="text-slate-400 hover:text-[#000048] transition-colors p-1 rounded-full hover:bg-slate-100"
                                            aria-label="Dismiss notification"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <motion.div 
                                        initial={{ width: "100%" }}
                                        animate={{ width: "0%" }}
                                        transition={{ duration: 4, ease: "linear" }}
                                        className={`absolute bottom-0 left-0 h-[3px] ${config.progress} opacity-20`}
                                    />
                                </div>
                            );
                        })()}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Notification;
