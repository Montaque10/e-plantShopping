// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Assuming CartSlice.jsx is in the same directory

const store = configureStore({
    reducer: {
        cart: cartReducer, // The 'cart' slice will manage the cart state
    },
});

export default store;
