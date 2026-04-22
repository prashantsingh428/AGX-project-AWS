import React from 'react';
import p11 from '../assets/p11.jpeg';

const FullImageSection = () => {
    return (
        <section className="w-full h-[600px] md:h-screen sticky top-0 z-0 overflow-hidden">
            <img
                src={p11}
                alt="Corporate Insights"
                className="w-full h-full object-cover object-center"
            />
            {/* Subtle blue overlay to tie into the site's theme */}
            <div className="absolute inset-0 bg-[#0c0e40]/10 mix-blend-multiply"></div>
        </section>
    );
};

export default FullImageSection;
