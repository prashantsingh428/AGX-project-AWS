import React, { forwardRef } from 'react';

const StarBorder = forwardRef(({
    as: Component = 'button',
    className = '',
    color = 'white',
    speed = '6s',
    thickness = 1,
    innerClassName = '',
    children,
    ...rest
}, ref) => {
    return (
        <Component
            ref={ref}
            className={`group/star relative inline-block overflow-hidden rounded-[20px] ${className}`}
            style={{
                padding: `${thickness}px 0`,
                ...rest.style
            }}
            {...rest}
        >
            <div
                className="star-trail-bottom absolute w-[300%] h-[50%] opacity-0 bottom-[-11px] right-[-250%] rounded-full z-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed
                }}
            ></div>
            <div
                className="star-trail-top absolute w-[300%] h-[50%] opacity-0 top-[-10px] left-[-250%] rounded-full z-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed
                }}
            ></div>
            <div className={`relative z-[1] bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px] ${innerClassName}`}>
                {children}
            </div>
            <style>{`
                @keyframes star-movement-bottom {
                    0% { transform: translate(0%, 0%); opacity: 1; }
                    100% { transform: translate(-100%, 0%); opacity: 0; }
                }
                @keyframes star-movement-top {
                    0% { transform: translate(0%, 0%); opacity: 1; }
                    100% { transform: translate(100%, 0%); opacity: 0; }
                }
                .star-trail-bottom {
                    animation: star-movement-bottom linear infinite alternate;
                }
                .star-trail-top {
                    animation: star-movement-top linear infinite alternate;
                }
                .group\\/star:hover .star-trail-bottom,
                .group\\/star:hover .star-trail-top {
                    opacity: 0.7;
                }
            `}</style>
        </Component>
    );
});

StarBorder.displayName = 'StarBorder';

export default StarBorder;
