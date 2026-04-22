
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import FloatingParticles from '../components/FloatingParticles';

gsap.registerPlugin(Draggable);

const testimonials = [
    {
        name: "Rahul Sharma",
        review: "PRIYANSHU SIR NE AND AI Growthexa TEAM ने हमारी ब्रांड पहचान पूरी तरह बदल दी। लोगो से लेकर मैसेजिंग तक, हर चीज़ में clarity और professionalism दिखता है। उनकी टीम ने हमारी सोच को सही रूप दिया। सच में, ऐसा लगा जैसे कोई अपना ही हमारे बिज़नेस को समझ रहा हो। Highly recommended!",
        rating: 5
    },
    {
        name: "Pooja Verma",
        review: "Honestly,laga tha agency k sath kaam kr na bahot kaam chori bhara hoga but , AI Growthexa ke saath kaam karke bahut acha laga. Team ne sirf design nahi banaya, brand ko feel diya. Communication smooth tha aur output exactly wahi mila jo hum imagine kar rahe the. Totally worth it!",
        rating: 5
    },
    {
        name: "Amit Patel",
        review: "AI Growthexa Team ne humare brand ko next level le aaye. Pehle sab scattered lagta tha, but ab har platform pe ek strong aur consistent identity hai. Creative bhi aur professional bhi. Dil se kaam karte hain ,hamri website and seo dono pe kaam kia and timely reports di and accurate repost banai hai , really priyanshu helps a lot in this , and team is too good",
        rating: 5
    },
    {
        name: "Neha Kapoor",
        review: "Working with AI Growthexa was a great experience. They truly understood our brand vision and translated it into a strong visual and messaging identity. The team is creative, responsive, and genuinely invested in your growth. Highly Highly Highly recommended! To connect with priyanshu sir and with ai growth exa team for marketing and it projects",
        rating: 5
    },
    {
        name: "Rohit Malhotra",
        review: "From last 7 months we are connected and priyanshu sir strongly work on or seo and smo , meta ads & google ads all the reports are on time thanku so much for all , AI Growthexa delivers more than just branding they deliver confidence. From strategy to execution, everything felt well thought out and aligned with our goals. Our brand now feels clear, strong, and future-ready.",
        rating: 5
    },
    {
        name: "Kuldeep",
        review: "Best IT & marketing AGENCY INDIA AI GrowthExa didn’t just improve our ads they fixed our entire growth system. We finally have predictable leads and scalable sales. Their AI-driven approach saved us time, money, and guesswork. LOT OF LOVE AND SUPPORT TO PRIYANSHU SIR,for helping us",
        rating: 5
    }
];

const TestimonialsSection = () => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const boxes = cardsRef.current.filter(Boolean);

        if (!wrapper || boxes.length === 0) return;

        let loop = null;
        let draggableInstance = null;

        const handleMouseEnter = () => {
            if (loop) loop.pause();
        };

        const handleMouseLeave = () => {
            if (loop && !draggableInstance?.isDragging) {
                loop.play();
            }
        };

        function horizontalLoop(items, config) {
            items = gsap.utils.toArray(items);
            config = config || {};
            let tl = gsap.timeline({
                repeat: -1,
                paused: config.paused,
                defaults: { ease: "none" },
                onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
            }),
                length = items.length,
                startX = items[0].offsetLeft,
                times = [],
                widths = [],
                xPercents = [],
                curIndex = 0,
                pixelsPerSecond = (config.speed || 1) * 100,
                snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
                totalWidth, curX, distanceToStart, distanceToLoop, item, i;

            gsap.set(items, {
                xPercent: (i, el) => {
                    let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                    return xPercents[i];
                }
            });
            gsap.set(items, { x: 0 });
            totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
            for (i = 0; i < length; i++) {
                item = items[i];
                curX = xPercents[i] / 100 * widths[i];
                distanceToStart = item.offsetLeft + curX - startX;
                distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                    .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                    .add("label" + i, distanceToStart / pixelsPerSecond);
                times[i] = distanceToStart / pixelsPerSecond;
            }
            function toIndex(index, vars) {
                vars = vars || {};
                (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
                let newIndex = gsap.utils.wrap(0, length, index),
                    time = times[newIndex];
                if (time > tl.time() !== index > curIndex) {
                    vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                    time += tl.duration() * (index > curIndex ? 1 : -1);
                }
                curIndex = newIndex;
                vars.overwrite = true;
                return tl.tweenTo(time, vars);
            }
            tl.next = vars => toIndex(curIndex + 1, vars);
            tl.previous = vars => toIndex(curIndex - 1, vars);
            tl.current = () => curIndex;
            tl.toIndex = (index, vars) => toIndex(index, vars);
            tl.times = times;
            tl.progress(1, true).progress(0, true);
            if (config.reversed) {
                tl.vars.onReverseComplete();
                tl.reverse();
            }
            if (config.draggable && typeof (Draggable) === "function") {
                let proxy = document.createElement("div"),
                    wrap = gsap.utils.wrap(0, 1),
                    ratio, startProgress,
                    align = () => tl.progress(wrap(startProgress + (draggableInstance.startX - draggableInstance.x) * ratio));

                draggableInstance = Draggable.create(proxy, {
                    trigger: items[0].parentNode,
                    type: "x",
                    onPress() {
                        startProgress = tl.progress();
                        tl.progress(0);
                        tl.progress(startProgress);
                        tl.pause();
                        ratio = 1 / totalWidth;
                    },
                    onDrag: align,
                    onThrowUpdate: align,
                    overshootTolerance: 0,
                    inertia: true,
                    snap: function (value) {
                        if (Math.abs(startProgress / ratio - this.x) < 10) return this.x + 0.001;
                        return Math.round(value / totalWidth) * totalWidth;
                    },
                    onRelease() {
                        if (!this.tween || !this.tween.isActive()) {
                            tl.play();
                        }
                    },
                    onClick() {
                        tl.play();
                    }
                })[0];
            }
            return tl;
        }

        try {
            loop = horizontalLoop(boxes, {
                paused: false,
                draggable: true,
                speed: 0.5,
                repeat: -1,
                paddingRight: parseFloat(gsap.getProperty(boxes[0], "marginRight", "px")) || 0
            });

            wrapper.addEventListener("mouseenter", handleMouseEnter);
            wrapper.addEventListener("mouseleave", handleMouseLeave);
        } catch (error) {
            console.debug('TestimonialsSection animation setup error:', error.message);
        }

        return () => {
            wrapper.removeEventListener("mouseenter", handleMouseEnter);
            wrapper.removeEventListener("mouseleave", handleMouseLeave);

            if (draggableInstance) {
                draggableInstance.kill();
            }

            if (loop) {
                loop.kill();
            }

            gsap.killTweensOf(boxes);
        };
    }, []);

    return (
        <section className="py-20 bg-white overflow-hidden relative">
            {/* Neuron Particle Effect Background */}
            <FloatingParticles theme="light" />

            <div className="container mx-auto px-6 mb-12 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-primary mb-2 tracking-tight">
                    TESTIMONIALS
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/40 mx-auto rounded-full"></div>
            </div>

            <div className="relative w-full" ref={containerRef}>
                {/* Gradient Masks for smooth fade out */}
                <div className="absolute top-0 left-0 w-20 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-20 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div
                    ref={wrapperRef}
                    className="flex w-max items-center cursor-grab active:cursor-grabbing"
                    style={{ x: 0 }}
                >
                    {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="w-[350px] md:w-[450px] mx-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group flex-shrink-0 select-none"
                        >
                            <div className="flex items-center gap-1 mb-4 text-yellow-400">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                ))}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                {testimonial.name}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-6">
                                {testimonial.review}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
