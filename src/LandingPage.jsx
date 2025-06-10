// src/LandingPage.jsx

import React, { useRef, useMemo, Children, cloneElement, isValidElement, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutUs from './AboutUs'; // Import the AboutUs component
import { PLANTS_DATA } from './data'; // Import plant data for CardSwap

// Register GSAP plugins here to ensure they are available.
gsap.registerPlugin(ScrollTrigger);

// --- ScrollReveal Component (from your template, converted to Tailwind) ---
const ScrollReveal = ({
    children,
    scrollContainerRef, // Expected to be the ref of the main scrolling container
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = "",
    textClassName = "",
    rotationEnd = "bottom bottom",
    wordAnimationEnd = "bottom bottom"
}) => {
    const containerRef = useRef(null);

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <span className="inline-block" key={index}> {/* word class converted */}
                    {word}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Determine the scroller element: either provided ref or window
        const scroller = scrollContainerRef && scrollContainerRef.current
            ? scrollContainerRef.current
            : window;

        // Kill any existing ScrollTriggers tied to this element to prevent duplicates on re-render
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === el) {
                trigger.kill();
            }
        });

        // Animation for container rotation
        gsap.fromTo(
            el,
            { transformOrigin: '0% 50%', rotate: baseRotation },
            {
                ease: 'none',
                rotate: 0,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: 'top bottom',
                    end: rotationEnd,
                    scrub: true,
                },
            }
        );

        // Animation for individual words (opacity and blur)
        const wordElements = el.querySelectorAll('.inline-block'); // Select based on Tailwind classes

        gsap.fromTo(
            wordElements,
            { opacity: baseOpacity, willChange: 'opacity' },
            {
                ease: 'none',
                opacity: 1,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: 'top bottom-=20%',
                    end: wordAnimationEnd,
                    scrub: true,
                },
            }
        );

        if (enableBlur) {
            gsap.fromTo(
                wordElements,
                { filter: `blur(${blurStrength}px)` },
                {
                    ease: 'none',
                    filter: 'blur(0px)',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: el,
                        scroller,
                        start: 'top bottom-=20%',
                        end: wordAnimationEnd,
                        scrub: true,
                    },
                }
            );
        }

        return () => {
            // Clean up ScrollTriggers on component unmount
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === el) {
                    trigger.kill();
                }
            });
        };
    }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, children]); // Add children to dependencies

    return (
        <h2 ref={containerRef} className={`my-5 ${containerClassName}`}> {/* scroll-reveal margin converted */}
            <p className={`text-clamp-lg leading-snug font-semibold ${textClassName}`}> {/* scroll-reveal-text converted */}
                {splitText}
            </p>
        </h2>
    );
};


// --- Card Component (from your template, converted to Tailwind) ---
export const Card = forwardRef(
    ({ customClass, ...rest }, ref) => (
        <div
            ref={ref}
            {...rest}
            // Combines original 'card' styles with Tailwind classes
            className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black
            transform-gpu will-change-transform backface-hidden ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
        />
    )
);
Card.displayName = "Card";


// --- CardSwap Component (from your template, converted to Tailwind) ---
const makeSlot = (i, distX, distY, total) => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i,
});
const placeNow = (el, slot, skew) =>
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: "center center",
        zIndex: slot.zIndex,
        force3D: true,
    });

const CardSwap = ({
    width = 300, // Adjusted default width for better fit on landing page
    height = 250, // Adjusted default height
    cardDistance = 40, // Adjusted distance
    verticalDistance = 50, // Adjusted vertical distance
    delay = 2000, // <<<<<<<<<<<< Adjusted to 2000ms (2 seconds) for quicker swap
    pauseOnHover = true, // Enable pause on hover
    onCardClick,
    skewAmount = 6,
    easing = "elastic",
    children,
}) => {
    const config =
        easing === "elastic"
            ? {
                ease: "elastic.out(0.6,0.9)",
                durDrop: 2,
                durMove: 2,
                durReturn: 2,
                promoteOverlap: 0.9,
                returnDelay: 0.05,
            }
            : {
                ease: "power1.inOut",
                durDrop: 0.8,
                durMove: 0.8,
                durReturn: 0.8,
                promoteOverlap: 0.45,
                returnDelay: 0.2,
            };

    const childArr = useMemo(() => Children.toArray(children), [children]);
    const refs = useMemo(
        () => childArr.map(() => React.createRef()),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [childArr.length]
    );

    const order = useRef(
        Array.from({ length: childArr.length }, (_, i) => i)
    );

    const tlRef = useRef(null);
    const intervalRef = useRef();
    const container = useRef(null);

    useEffect(() => {
        const total = refs.length;
        refs.forEach((r, i) =>
            placeNow(
                r.current,
                makeSlot(i, cardDistance, verticalDistance, total),
                skewAmount
            )
        );

        const swap = () => {
            if (order.current.length < 2) return;

            const [front, ...rest] = order.current;
            const elFront = refs[front].current;
            const tl = gsap.timeline();
            tlRef.current = tl;

            tl.to(elFront, {
                y: "+=500",
                duration: config.durDrop,
                ease: config.ease,
            });

            tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
            rest.forEach((idx, i) => {
                const el = refs[idx].current;
                const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
                tl.set(el, { zIndex: slot.zIndex }, "promote");
                tl.to(
                    el,
                    {
                        x: slot.x,
                        y: slot.y,
                        z: slot.z,
                        duration: config.durMove,
                        ease: config.ease,
                    },
                    `promote+=${i * 0.15}`
                );
            });

            const backSlot = makeSlot(
                refs.length - 1,
                cardDistance,
                verticalDistance,
                refs.length
            );
            tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
            tl.call(
                () => {
                    gsap.set(elFront, { zIndex: backSlot.zIndex });
                },
                undefined,
                "return"
            );
            tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
            tl.to(
                elFront,
                {
                    y: backSlot.y,
                    duration: config.durReturn,
                    ease: config.ease,
                },
                "return"
            );

            tl.call(() => {
                order.current = [...rest, front];
            });
        };

        // Initial swap call and interval setup
        swap();
        intervalRef.current = window.setInterval(swap, delay);

        // Pause/resume on hover functionality
        if (pauseOnHover) {
            const node = container.current;
            const pause = () => {
                tlRef.current?.pause();
                clearInterval(intervalRef.current);
            };
            const resume = () => {
                tlRef.current?.play();
                intervalRef.current = window.setInterval(swap, delay);
            };
            node.addEventListener("mouseenter", pause);
            node.addEventListener("mouseleave", resume);
            return () => {
                node.removeEventListener("mouseenter", pause);
                node.removeEventListener("mouseleave", resume);
                clearInterval(intervalRef.current);
            };
        }
        return () => clearInterval(intervalRef.current); // Cleanup interval on unmount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cardDistance,
        verticalDistance,
        delay,
        pauseOnHover,
        skewAmount,
        easing,
    ]);

    const rendered = childArr.map((child, i) =>
        isValidElement(child)
            ? cloneElement(child, {
                key: i, // Use index as key for now, if children don't have stable keys
                ref: refs[i],
                style: { width, height, ...(child.props.style ?? {}) },
                onClick: (e) => {
                    child.props.onClick?.(e);
                    onCardClick?.(i);
                },
            }) : child
    );

    return (
        <div
            ref={container}
            // Styling from CardSwap.css converted to Tailwind. Adjusted for responsiveness.
            className="relative overflow-visible transform-gpu origin-bottom-right md:translate-x-[5%] md:translate-y-[20%] lg:translate-x-[15%] lg:translate-y-[25%]"
            style={{ width, height, perspective: '900px' }} // Perspective added inline
        >
            {rendered}
        </div>
    );
};


// --- LandingPage Component (Now including AboutUs and templates) ---
const LandingPage = ({ navigateTo }) => {
    const backgroundImageUrl = 'https://cdn.pixabay.com/photo/2017/07/13/08/59/greenhouse-2499758_1280.jpg';
    const scrollContainerRef = useRef(null); // Ref for the scrolling container, used by ScrollReveal

    return (
        <div
            ref={scrollContainerRef} // Assign ref for ScrollReveal to observe
            // Styling from LandingPage.css converted to Tailwind
            className="relative w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center text-white overflow-hidden" // overflow-hidden ensures no internal scrolling
            style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
        >
            {/* Background image overlay with brightness filter */}
            <div className="absolute inset-0 bg-black bg-opacity-50" style={{ filter: 'brightness(0.8)' }}></div>

            {/* Content areas for main title/button and About Us */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full w-full gap-8 p-6 pt-24 md:pt-6">

                {/* Left Section: Company Name, Tagline, Get Started Button */}
                <div className="flex flex-col items-center justify-center text-center max-w-sm w-full p-6 bg-green-950 bg-opacity-70 rounded-xl shadow-2xl backdrop-blur-sm h-auto md:h-[450px] border border-green-700">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-green-300">
                        {/* ScrollReveal applied to the main title */}
                        <ScrollReveal scrollContainerRef={scrollContainerRef}>Welcome To Paradise Nursery</ScrollReveal>
                    </h1>
                    {/* Divider element */}
                    <div className="w-16 h-1 bg-green-500 my-4"></div>
                    <p className="text-2xl font-light mb-8 text-green-100">
                        {/* ScrollReveal applied to the tagline */}
                        <ScrollReveal scrollContainerRef={scrollContainerRef} baseOpacity={0.2} baseRotation={-5} blurStrength={3}>Where Green Meets Serenity</ScrollReveal>
                    </p>
                    <button
                        onClick={() => navigateTo('products')}
                        // Styling from get-started-button converted to Tailwind
                        className="py-4 px-10 text-xl font-bold rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                    >
                        Get Started
                    </button>
                </div>

                {/* Right Section: About Us Content (rendered using the AboutUs component) */}
                <AboutUs />

                {/* CardSwap Component - Featured Plants (positioned absolutely) */}
                <div className="absolute bottom-4 right-4 z-20 hidden md:block"> {/* Hidden on small screens */}
                    <CardSwap>
                        {/* Display first 3 plants as cards from the data.js */}
                        {PLANTS_DATA.slice(0, 3).map(plant => (
                            <Card key={plant.id} className="flex flex-col items-center justify-center p-4 bg-green-800 text-white">
                                <img
                                    src={plant.image}
                                    alt={plant.name}
                                    className="w-24 h-24 object-cover rounded-full mb-2 border border-green-400"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/CCCCCC/666666?text=Img'; }}
                                />
                                <span className="text-lg font-bold text-green-100">{plant.name}</span>
                                <span className="text-sm opacity-80">${plant.price.toFixed(2)}</span>
                            </Card>
                        ))}
                    </CardSwap>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
