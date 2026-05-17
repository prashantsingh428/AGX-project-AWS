import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const regions = [
  {
    name: 'Americas',
    countries: [
      { name: 'Argentina', code: 'es' },
      { name: 'Brazil', code: 'pt' },
      { name: 'Canada', code: 'en', variants: ['En', 'Fr'] },
      { name: 'Costa Rica', code: 'es' },
      { name: 'El Salvador', code: 'es' },
      { name: 'Mexico', code: 'es' },
      { name: 'United States', code: 'en' },
    ]
  },
  {
    name: 'Europe',
    countries: [
      { name: 'Belgium', code: 'fr', variants: ['Fr', 'Nl', 'En'] },
      { name: 'Denmark', code: 'da' },
      { name: 'Finland', code: 'fi' },
      { name: 'France', code: 'fr' },
      { name: 'Germany', code: 'de' },
      { name: 'Hungary', code: 'hu' },
      { name: 'Italy', code: 'it' },
      { name: 'Latvia', code: 'lv' },
      { name: 'Lithuania', code: 'lt' },
      { name: 'Norway', code: 'no' },
      { name: 'Poland', code: 'pl' },
      { name: 'Portugal', code: 'pt' },
      { name: 'Romania', code: 'ro' },
      { name: 'Spain', code: 'es' },
      { name: 'Sweden', code: 'sv' },
      { name: 'Switzerland', code: 'fr', variants: ['Fr', 'En', 'De'] },
      { name: 'The Netherlands', code: 'nl' },
      { name: 'United Kingdom & Ireland', code: 'en' },
    ]
  },
  {
    name: 'Asia Pacific',
    countries: [
      { name: 'Australia', code: 'en' },
      { name: 'China', code: 'zh', variants: ['En', '中文'] },
      { name: 'Hong Kong SAR', code: 'zh' },
      { name: 'India', code: 'hi', variants: ['En', 'हिंदी'] },
      { name: 'Japan', code: 'ja', variants: ['日本語'] },
      { name: 'Malaysia', code: 'ms' },
      { name: 'New Zealand', code: 'en' },
      { name: 'Philippines', code: 'en' },
      { name: 'Singapore', code: 'en' },
      { name: 'Thailand', code: 'th' },
    ]
  }
];

const LanguageModal = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code.toLowerCase());
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col pointer-events-auto border border-slate-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Choose your region & language</h2>
                    <p className="text-sm text-slate-500">Select the version of AI Growth Exa relevant to you</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content - 3 Columns */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12">
                  {regions.map((region) => (
                    <div key={region.name} className="space-y-6">
                      <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                        {region.name}
                      </h3>
                      <div className="space-y-4">
                        {region.countries.map((country) => (
                          <div key={country.name} className="flex items-center justify-between group">
                            <button
                              onClick={() => handleLanguageChange(country.code)}
                              className="flex items-center gap-4 text-slate-700 hover:text-primary transition-all text-base font-semibold"
                            >
                              <span className="text-xl transition-all">
                                {getCountryFlag(country.name)}
                              </span>
                              <span>{country.name}</span>
                              {country.variants && (
                                <span className="text-sm font-medium text-slate-400 group-hover:text-primary/60">
                                  ( {country.variants.join(' | ')} )
                                </span>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Middle East & Global */}
                <div className="mt-16 pt-12 border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Middle East</h3>
                    <a href="/contact" className="flex items-center gap-3 text-slate-700 hover:text-primary transition-all font-bold group">
                      <Globe className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                      Visit our Regional Website
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all font-bold" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Helper function for flags (simplified for proof of concept)
const getCountryFlag = (name) => {
  const flags = {
    'Argentina': '🇦🇷',
    'Brazil': '🇧🇷',
    'Canada': '🇨🇦',
    'Costa Rica': '🇨🇷',
    'El Salvador': '🇸🇻',
    'Mexico': '🇲🇽',
    'United States': '🇺🇸',
    'Belgium': '🇧🇪',
    'Denmark': '🇩🇰',
    'Finland': '🇫🇮',
    'France': '🇫🇷',
    'Germany': '🇩🇪',
    'Hungary': '🇭🇺',
    'Italy': '🇮🇹',
    'Latvia': '🇱🇻',
    'Lithuania': '🇱🇹',
    'Norway': '🇳🇴',
    'Poland': '🇵🇱',
    'Portugal': '🇵🇹',
    'Romania': '🇷🇴',
    'Spain': '🇪🇸',
    'Sweden': '🇸🇪',
    'Switzerland': '🇨🇭',
    'The Netherlands': '🇳🇱',
    'United Kingdom & Ireland': '🇬🇧',
    'Australia': '🇦🇺',
    'China': '🇨🇳',
    'Hong Kong SAR': '🇭🇰',
    'India': '🇮🇳',
    'Japan': '🇯🇵',
    'Malaysia': '🇲🇾',
    'New Zealand': '🇳🇿',
    'Philippines': '🇵🇭',
    'Singapore': '🇸🇬',
    'Thailand': '🇹🇭',
  };
  return flags[name] || '🏳️';
};

export default LanguageModal;
