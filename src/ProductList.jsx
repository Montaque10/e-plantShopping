// src/ProductList.jsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, increaseQuantity, decreaseQuantity } from './CartSlice'; // Import Redux actions
import { CATEGORIES, PLANTS_DATA } from './data'; // Import data

// --- Placeholder Icons (copied for self-containment) ---
const ShoppingCartIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);
const PlusIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5L12 19"></path><path d="M5 12L19 12"></path></svg>
);
const MinusIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12L19 12"></path></svg>
);
const XCircleIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><path d="M15 9L9 15"></path><path d="M9 9L15 15"></path></svg>
);


// --- PlantCard Component (Individual Product Display, now internal to ProductList) ---
const PlantCard = ({ plant }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    // Check if the current plant is already in the cart to disable the button
    const isInCart = cartItems.some(item => item.id === plant.id);

    // Dispatches the addItem action to Redux when the button is clicked
    const handleAddToCart = () => {
        dispatch(addItem(plant));
        console.log(`PlantCard: Dispatched addItem for: ${plant.name} (ID: ${plant.id})`);
    };

    return (
        // Styled with Tailwind CSS classes for responsiveness and visual appeal
        <div className="flex flex-col items-center p-5 bg-white border border-gray-200 rounded-xl shadow-md text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                    w-full sm:w-[calc(50%-20px)] md:w-[calc(33.33%-20px)] lg:w-[calc(25%-20px)] max-w-sm">
            {/* Plant image with an error fallback */}
            <img
                src={plant.image}
                alt={plant.name}
                className="max-w-full h-48 object-cover rounded-md mb-4"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/CCCCCC/666666?text=Image+Error'; }}
            />
            {/* Plant name */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">{plant.name}</h3>
            {/* Plant price, formatted to two decimal places */}
            <p className="text-lg text-green-700 font-semibold mb-4">${plant.price.toFixed(2)}</p>
            {/* Add to Cart button, disabled if item is already in cart */}
            <button
                onClick={handleAddToCart}
                disabled={isInCart} // Button is disabled if the item is already in the cart
                className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md flex items-center justify-center gap-2
                    ${isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
                <ShoppingCartIcon size={18} />
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
        </div>
    );
};


// --- CartItem Component (Refactored from your CartItem.jsx and integrated here) ---
const CartItem = ({ navigateTo }) => {
    // Selects the current cart items from the Redux store
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Log cart items whenever the component re-renders or `cartItems` changes
    useEffect(() => {
        console.log("CartItem: Component rendered/updated. Current cart items from Redux:", cartItems);
    }, [cartItems]);

    // Calculates the total amount for all products in the cart
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    // Calculates the total cost for a specific item based on its quantity
    const calculateTotalCost = (item) => {
        return (item.price * item.quantity).toFixed(2);
    };

    // Handlers for cart item quantity control and removal
    const handleIncrement = (itemId) => {
        dispatch(increaseQuantity(itemId));
    };

    const handleDecrement = (itemId) => {
        dispatch(decreaseQuantity(itemId));
    };

    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId));
    };

    // Handles the "Checkout" button click by displaying a message box (as alert() is disallowed)
    const handleCheckout = () => {
        const messageBox = document.createElement('div');
        messageBox.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50';
        messageBox.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-xl text-center text-gray-800 max-w-sm mx-4">
                <p class="text-2xl font-bold mb-4">Checkout</p>
                <p class="text-lg mb-6">This feature is coming soon!</p>
                <button id="closeMessageBox" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors">
                    Got it!
                </button>
            </div>
        `;
        document.body.appendChild(messageBox);
        document.getElementById('closeMessageBox').onclick = () => document.body.removeChild(messageBox);
    };

    return (
        // Main cart container, styled with Tailwind for centering and spacing
        <div className="flex flex-col items-center justify-center gap-5 mt-5 px-4">
            {/* Total cart amount display */}
            <h2 className="text-black text-2xl font-bold">Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div className="w-full max-w-xl"> {/* Container for cart items */}
                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-600 text-xl p-8 bg-white rounded-xl shadow-lg">
                        <p className="mb-4">Your cart is empty. Time to add some green!</p>
                        <button
                            className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            onClick={() => navigateTo('products')} // Navigate back to products
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    // Map through cart items and display each one
                    cartItems.map(item => {
                        console.log("CartItem: Displaying item:", item); // Log each item being displayed
                        return (
                            // Styling for individual cart items, responsive layout
                            <div className="flex flex-col sm:flex-row border-b border-gray-300 py-4 last:border-b-0 bg-white rounded-lg shadow-sm mb-4 p-4 items-center justify-between" key={item.id}>
                                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                    {/* Item image with error fallback */}
                                    <img className="w-24 h-24 object-cover rounded-lg shadow-md" src={item.image} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/CCCCCC/666666?text=Img+Error'; }} />
                                    {/* Item details */}
                                    <div>
                                        <div className="text-xl font-bold text-gray-800">{item.name}</div>
                                        <div className="text-gray-600 my-1">Unit Price: ${item.price.toFixed(2)}</div>
                                        <div className="text-lg font-medium text-gray-700">Total: ${calculateTotalCost(item)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {/* Quantity control buttons */}
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-l-lg transition-colors" onClick={() => handleDecrement(item.id)}>
                                            <MinusIcon size={20} />
                                        </button>
                                        <span className="px-4 text-lg font-semibold text-gray-800">{item.quantity}</span>
                                        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-r-lg transition-colors" onClick={() => handleIncrement(item.id)}>
                                            <PlusIcon size={20} />
                                        </button>
                                    </div>
                                    {/* Delete button */}
                                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleRemove(item.id)}>
                                        <XCircleIcon size={24} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 w-full max-w-xl">
                <button
                    className="py-3 px-6 text-xl font-bold rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800 shadow-lg transition-all duration-300"
                    onClick={() => navigateTo('products')} // Navigate back to products
                >
                    Continue Shopping
                </button>
                <button
                    className="py-3 px-6 text-xl font-bold rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-300 hover:scale-105"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};


// --- ProductList Component (main logic from your ProductList.jsx) ---
function ProductList({ navigateTo, currentPage }) {
    // `showCart` state determines whether to display the product grid or the cart view.
    const [showCart, setShowCart] = useState(false);

    // `useEffect` hook to update `showCart` based on the `currentPage` prop received from `App.jsx`.
    // This ensures that clicking "Cart" in the header correctly switches the view within ProductList.
    useEffect(() => {
        if (currentPage === 'cart') {
            setShowCart(true);
            console.log("ProductList: currentPage is 'cart'. Setting showCart to TRUE.");
        } else if (currentPage === 'products') {
            setShowCart(false);
            console.log("ProductList: currentPage is 'products'. Setting showCart to FALSE.");
        }
        console.log("ProductList: `currentPage` prop received:", currentPage);
    }, [currentPage]); // Dependency array: re-run effect when `currentPage` changes.


    return (
        <div className="min-h-screen bg-gray-100 py-10 pt-24"> {/* Added pt-24 for header clearance */}
            <div className="container mx-auto px-4">
                {/* Conditional rendering based on `showCart` state:
                    If `showCart` is false, display the product categories and individual PlantCards.
                    If `showCart` is true, display the CartItem component. */}
                {!showCart ? (
                    <>
                        {/* Main heading for the product collection, only shown when not in cart view */}
                        <h2 className="text-5xl font-extrabold text-center text-green-800 mb-12 tracking-tight">
                            Our Houseplant Collection
                        </h2>
                        <div className="product-grid"> {/* Grid container for products */}
                            {Object.entries(CATEGORIES).map(([categoryName, plantsInCategory]) => (
                                <section key={categoryName} className="mb-12">
                                    {/* Category heading */}
                                    <h3 className="text-4xl font-bold text-green-700 mb-8 text-center sm:text-left rounded-lg bg-green-50 p-4 shadow-sm">
                                        {categoryName}
                                    </h3>
                                    {/* Flex container for plants within the current category */}
                                    <div className="flex flex-wrap justify-center gap-8 px-4">
                                        {plantsInCategory.map(plant => (
                                            <PlantCard key={plant.id} plant={plant} />
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </>
                ) : (
                    // Render CartItem if showCart is true, passing `navigateTo` for "Continue Shopping" button.
                    <CartItem navigateTo={navigateTo} />
                )}
            </div>
        </div>
    );
}

export default ProductList;
