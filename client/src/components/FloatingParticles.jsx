import React, { useEffect, useRef } from 'react';

const FloatingParticles = ({ theme = 'auto' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let isMounted = true;

        const resizeCanvas = () => {
            if (!isMounted) return;
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 4 + 1;
                this.speedX = Math.random() * 1.5 - 0.75;
                this.speedY = Math.random() * 1.5 - 0.75;
                this.baseOpacity = Math.random() * 0.2 + 0.05;
                this.opacity = this.baseOpacity;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulseDir = 1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                this.opacity += this.pulseSpeed * this.pulseDir;
                if (this.opacity > this.baseOpacity + 0.2 || this.opacity > 1) this.pulseDir = -1;
                if (this.opacity < this.baseOpacity - 0.1 || this.opacity < 0.1) this.pulseDir = 1;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                const isLight = theme === 'auto'
                    ? !document.documentElement.classList.contains('dark')
                    : theme === 'light';

                const color = isLight ? 'rgba(37, 99, 235, ' : 'rgba(59, 130, 246, ';
                ctx.fillStyle = `${color}${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const createParticles = () => {
            const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        createParticles();

        const animate = () => {
            if (!isMounted) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });


            const isLight = theme === 'auto'
                ? !document.documentElement.classList.contains('dark')
                : theme === 'light';

            const connectionColor = isLight ? 'rgba(59, 130, 246, ' : 'rgba(59, 130, 246, ';
            const opacityMultiplier = isLight ? 0.15 : 0.15;

            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `${connectionColor}${opacityMultiplier * (1 - distance / 150)})`;
                        ctx.lineWidth = isLight ? 0.8 : 0.8;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            isMounted = false;
            resizeObserver.disconnect();
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-10 dark:opacity-5"
        />
    );
};

export default FloatingParticles;
