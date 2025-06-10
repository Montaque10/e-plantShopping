// src/App.jsx

import React, { useState, useEffect } from 'react'; // Import useEffect for scroll control
import { Provider } from 'react-redux';
import store from './store'; // Import the configured Redux store

import Header from './Header'; // Assuming Header.jsx is in the same directory
import LandingPage from './LandingPage'; // Assuming LandingPage.jsx is in the same directory
import ProductList from './ProductList'; // Assuming ProductList.jsx is in the same directory

// The main application component.
// It manages the current page view and provides the Redux store to its children.
export default function App() {
    // `currentPage` state determines which major section of the app is currently visible.
    // Possible values: 'landing', 'products', 'cart'.
    const [currentPage, setCurrentPage] = useState('landing');

    // `useEffect` hook to manage body scroll behavior based on the `currentPage`.
    // When on the 'landing' page, scrolling is disabled. Otherwise, it's enabled.
    useEffect(() => {
        if (currentPage === 'landing') {
            // Prevent scrolling on the landing page
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = '0';
            document.documentElement.style.overflow = 'hidden';
        } else {
            // Enable scrolling for other pages
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            document.documentElement.style.overflow = '';
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            document.documentElement.style.overflow = '';
        };
    }, [currentPage]); // Dependency array: this effect re-runs whenever `currentPage` changes.


    // `navigateTo` function updates the `currentPage` state and scrolls the window to the top.
    // This function is passed down to child components (like Header, LandingPage, ProductList)
    // to allow them to trigger page navigation.
    const navigateTo = (page) => {
        setCurrentPage(page);
        // A small delay ensures the page transition animation starts before scrolling.
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
        }, 100);
    };

    return (
        // The Redux `Provider` makes the Redux store accessible to all nested components.
        // This is essential for features like the shopping cart, where state needs to be global.
        <Provider store={store}>
            {/* Main container for the entire application.
                `relative` positioning is crucial for its children to use absolute positioning for transitions.
                `w-screen` and `min-h-screen` ensure it covers the full viewport width and minimum height.
                `overflow-x-hidden` prevents horizontal scrollbars that could appear during page transitions. */}
            <div className="relative w-screen min-h-screen overflow-x-hidden">
                {/* The Header component is fixed at the top of the viewport (`fixed top-0`).
                    It's always visible and uses a high `z-index` (`z-50`) to stay on top of other content.
                    `currentPage` and `navigateTo` are passed as props to manage its internal navigation state. */}
                <Header currentPage={currentPage} navigateTo={navigateTo} />

                {/* Conditional rendering and page transitions for each major section.
                    Each page (`LandingPage`, `ProductList`) is absolutely positioned
                    (`absolute top-0 left-0 w-full min-h-screen`).
                    They use CSS `transition-transform` for smooth sliding effects (`duration-700 ease-in-out`).
                    The `translate-y-` classes control whether the page is on-screen (`translate-y-0`)
                    or off-screen (`-translate-y-full` for above, `translate-y-full` for below). */}

                {/* Landing Page component:
                    Shown when `currentPage` is 'landing'. Slides up from off-screen top when navigating away. */}
                <div className={`absolute top-0 left-0 w-full min-h-screen transition-transform duration-700 ease-in-out ${currentPage === 'landing' ? 'translate-y-0' : '-translate-y-full'}`}>
                    <LandingPage navigateTo={navigateTo} />
                </div>

                {/* Product List/Cart Page component:
                    Shown when `currentPage` is 'products' or 'cart'. Slides down from off-screen bottom when navigating away.
                    This component internally handles displaying either the product grid or the cart view based on its own state
                    and the `currentPage` prop passed from `App`. */}
                <div className={`absolute top-0 left-0 w-full min-h-screen transition-transform duration-700 ease-in-out ${currentPage === 'products' || currentPage === 'cart' ? 'translate-y-0' : 'translate-y-full'}`}>
                    <ProductList navigateTo={navigateTo} currentPage={currentPage} />
                </div>
            </div>
        </Provider>
    );
}
