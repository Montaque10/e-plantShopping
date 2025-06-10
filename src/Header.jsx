// src/Header.jsx

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { gsap } from 'gsap'; // Assuming GSAP is installed
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Assuming ScrollTrigger is installed

// Register GSAP plugins (ensure this is done once in your main app entry or where GSAP is first used)
// For this segmented file output, assume GSAP is registered globally if this is a separate file.
// If not, it needs to be registered once at a higher level (e.g., in App.jsx or main.jsx if they exist).
// For this immersive, we include it here, but in a real project, it's typically done once.
gsap.registerPlugin(ScrollTrigger);

// --- Placeholder Icons (copied for self-containment, these should be from a shared utility) ---
const ShoppingCartIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);
const HomeIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
const LeafyGreenIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path><path d="M10 16.5c.5-1 2-2.5 3.5-3.5"></path><path d="M10 16.5c-1 0-2-1.5-2.5-3.5"></path><path d="M14 7.5c.5 1-2 2.5-3.5 3.5"></path><path d="M14 7.5c1 0 2 1.5 2.5 3.5"></path></svg>
);


// --- GooeyNav Component (Integrated within Header, uses global CSS for animations) ---
const GooeyNav = ({
    items, // { label: string, href: string, page: string }[]
    animationTime = 600,
    particleCount = 15,
    particleDistances = [90, 10],
    particleR = 100,
    timeVariance = 300,
    // Using explicit hex colors for consistency with Tailwind
    colors = ['#c0efff', '#c0ffc0', '#ffc0c0', '#c0efff', '#c0ffc0', '#ffc0c0', '#c0efff', '#fff'],
    initialActiveIndex = 0,
    onNavigate // Function to handle navigation received from App.jsx
}) => {
    const containerRef = useRef(null);
    const navRef = useRef(null);
    const filterRef = useRef(null);
    const textRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

    // Update active index if initialActiveIndex prop changes (e.g., when page changes via navigateTo)
    useEffect(() => {
        setActiveIndex(initialActiveIndex);
    }, [initialActiveIndex]);

    const noise = (n = 1) => n / 2 - Math.random() * n;

    const getXY = (distance, pointIndex, totalPoints) => {
        const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
        return [distance * Math.cos(angle), distance * Math.sin(angle)];
    };

    const createParticle = (i, t, d, r) => {
        let rotate = noise(r / 10);
        return {
            start: getXY(d[0], particleCount - i, particleCount),
            end: getXY(d[1] + noise(7), particleCount - i, particleCount),
            time: t,
            scale: 1 + noise(0.2),
            color: colors[Math.floor(Math.random() * colors.length)],
            rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
        };
    };

    const makeParticles = (element) => {
        const d = particleDistances;
        const r = particleR;
        const bubbleTime = animationTime * 2 + timeVariance;
        element.style.setProperty("--time", `${bubbleTime}ms`);

        for (let i = 0; i < particleCount; i++) {
            const t = animationTime * 2 + noise(timeVariance * 2);
            const p = createParticle(i, t, d, r);
            element.classList.remove("active");

            setTimeout(() => {
                const particle = document.createElement("span");
                const point = document.createElement("span");
                // Tailwind classes for particle & point
                particle.className = `absolute top-1/2 left-1/2 rounded-full opacity-0 block`; // Equivalent to .particle
                point.className = `block rounded-full opacity-100`; // Equivalent to .point
                // Apply inline styles for CSS variables directly
                particle.style.setProperty("--start-x", `${p.start[0]}px`);
                particle.style.setProperty("--start-y", `${p.start[1]}px`);
                particle.style.setProperty("--end-x", `${p.end[0]}px`);
                particle.style.setProperty("--end-y", `${p.end[1]}px`);
                particle.style.setProperty("--time", `${p.time}ms`);
                particle.style.setProperty("--scale", `${p.scale}`);
                particle.style.setProperty("--color", p.color); // Use actual color value
                particle.style.setProperty("--rotate", `${p.rotate}deg`);
                point.style.backgroundColor = p.color; // Using the direct color
                point.style.width = '20px'; // Set width/height directly
                point.style.height = '20px';

                particle.appendChild(point);
                element.appendChild(particle);

                // Add animation class (defined in index.html global style)
                requestAnimationFrame(() => {
                    element.classList.add("active");
                    particle.classList.add('animate-particle');
                    point.classList.add('animate-point');
                });

                setTimeout(() => {
                    try {
                        element.removeChild(particle);
                    } catch (err) {
                        console.error("Error removing particle:", err);
                    }
                }, t);
            }, 30);
        }
    };

    const updateEffectPosition = (element) => {
        if (!containerRef.current || !filterRef.current || !textRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const pos = element.getBoundingClientRect();

        const styles = {
            left: `${pos.x - containerRect.x}px`,
            top: `${pos.y - containerRect.y}px`,
            width: `${pos.width}px`,
            height: `${pos.height}px`,
        };
        Object.assign(filterRef.current.style, styles);
        Object.assign(textRef.current.style, styles);
        textRef.current.innerText = element.innerText;
    };

    const handleClick = (e, index, pageName) => {
        const liEl = e.currentTarget;
        // Only update if clicking a different item
        if (activeIndex === index) {
            onNavigate(pageName); // Still navigate even if already active
            return;
        }

        setActiveIndex(index);
        updateEffectPosition(liEl);

        if (filterRef.current) {
            // Clear existing particles before making new ones
            const particles = filterRef.current.querySelectorAll(".particle");
            particles.forEach((p) => filterRef.current.removeChild(p));
        }

        if (textRef.current) {
            textRef.current.classList.remove("active");
            void textRef.current.offsetWidth; // Trigger reflow for animation reset
            textRef.current.classList.add("active");
        }

        if (filterRef.current) {
            makeParticles(filterRef.current);
        }
        onNavigate(pageName); // Call the navigation function
    };

    // Initial positioning and resize observer
    useEffect(() => {
        if (!navRef.current || !containerRef.current) return;
        const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
        if (activeLi) {
            updateEffectPosition(activeLi);
            textRef.current?.classList.add("active");
        }

        const resizeObserver = new ResizeObserver(() => {
            const currentActiveLi = navRef.current?.querySelectorAll("li")[activeIndex];
            if (currentActiveLi) {
                updateEffectPosition(currentActiveLi);
            }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, [activeIndex]);


    return (
        <div className="relative" ref={containerRef}>
            <nav className="flex relative translate-z-[0.01px]"> {/* Tailwind for transform3d */}
                <ul ref={navRef} className="flex gap-8 list-none p-0 px-4 m-0 relative z-30 text-white shadow-text">
                    {items.map((item, index) => (
                        <li
                            key={item.label} // Use item.label as key for stability
                            className={`py-2.5 px-4 rounded-full relative cursor-pointer transition-colors duration-300 shadow-custom-nav-item ${activeIndex === index ? "text-black bg-white shadow-none" : "hover:bg-white hover:bg-opacity-20"}`}
                            onClick={(e) => handleClick(e, index, item.page)}
                            tabIndex="0" // Make clickable with keyboard
                            onKeyDown={(e) => { // Handle keyboard navigation
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleClick(e, index, item.page);
                                }
                            }}
                        >
                            <a href={item.href} className="focus:outline-none">{item.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Effect elements using global CSS for filter and animation classes */}
            <span className="effect filter absolute left-0 top-0 w-0 h-0 opacity-100 pointer-events-none grid place-items-center z-10 filter-blur-7 contrast-100 mix-blend-lighten" ref={filterRef} />
            <span className="effect text absolute left-0 top-0 w-0 h-0 opacity-100 pointer-events-none grid place-items-center z-10 text-white transition-colors duration-300" ref={textRef} />
        </div>
    );
};


// --- Header Component ---
const Header = ({ currentPage, navigateTo }) => {
    const cartItems = useSelector(state => state.cart.items);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const navItems = [
        { label: 'Home', href: '#home', page: 'landing' },
        { label: 'Plants', href: '#products', page: 'products' },
        { label: `Cart`, href: '#cart', page: 'cart', isCart: true }, // Label fixed, count added dynamically by GooeyNav's item map
    ];

    const currentActiveIndex = navItems.findIndex(item => item.page === currentPage);


    return (
        <header className="fixed top-0 left-0 w-full bg-green-700 text-white p-4 shadow-lg z-50 rounded-b-lg">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
                {/* Company Logo and Name */}
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Paradise Nursery Logo" className="h-14 w-14 rounded-full shadow-md" />
                    <button onClick={() => navigateTo('landing')} className="text-left focus:outline-none">
                        <h3 className="text-3xl font-bold">Paradise Nursery</h3>
                        <i className="text-sm italic">Where Green Meets Serenity</i>
                    </button>
                </div>

                {/* Navigation Links with GooeyNav */}
                <GooeyNav
                    items={navItems.map(item => ({
                        // Dynamically update cart label with count here for GooeyNav
                        label: item.isCart ? `Cart (${cartItemCount})` : item.label,
                        href: item.href,
                        page: item.page
                    }))}
                    initialActiveIndex={currentActiveIndex !== -1 ? currentActiveIndex : 0}
                    onNavigate={navigateTo} // Pass the navigation function down
                />
            </div>
        </header>
    );
};

export default Header;
