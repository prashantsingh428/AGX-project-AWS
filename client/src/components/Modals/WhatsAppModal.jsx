import React from 'react';
import { X, Phone } from 'lucide-react';

const WhatsAppModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md" onClick={onClose}>
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 p-6 relative" onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-50 rounded-full"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center text-center mt-2">
                    <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm mb-6 w-full flex justify-center">
                        <img
                            src="/assets/whatsapp-qr.png"
                            alt="WhatsApp QR Code"
                            className="w-64 h-auto object-contain"
                        />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Add me as a contact on WhatsApp.
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        Scan this code using the WhatsApp camera to get my number
                    </p>

                    <a
                        href="https://wa.me/message/OUMPIAT35KYIC1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#128C7E] transition-all shadow-lg shadow-green-500/20 active:scale-95 flex items-center gap-2 w-full justify-center"
                    >
                        <Phone className="w-5 h-5" />
                        Connect on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppModal;
