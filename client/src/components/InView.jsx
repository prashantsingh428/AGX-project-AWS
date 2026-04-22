import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const InView = ({
    children,
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '100px 0px',
    placeholderHeight = '100px'
}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (triggerOnce) {
                        if (ref.current) observer.unobserve(ref.current);
                        observer.disconnect();
                    }
                } else if (!triggerOnce) {
                    setInView(false);
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [threshold, triggerOnce, rootMargin]);

    return (
        <Box ref={ref} sx={{ minHeight: inView ? 'auto' : placeholderHeight, width: '100%' }}>
            {inView ? children : null}
        </Box>
    );
};

export default InView;
