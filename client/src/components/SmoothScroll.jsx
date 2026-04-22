import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    const location = useLocation();
    const previousPath = useRef(location.pathname);

    
    useLayoutEffect(() => {
        if (previousPath.current !== location.pathname) {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.pin) {
                    trigger.kill(true);
                } else {
                    trigger.kill();
                }
            });

            gsap.killTweensOf("*");

            ScrollTrigger.clearScrollMemory();

            window.scrollTo(0, 0);
        }

        previousPath.current = location.pathname;
    }, [location.pathname]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
            gsap.killTweensOf("*");
        };
    }, [location.pathname]);

    return <>{children}</>;
};

export default SmoothScroll;
