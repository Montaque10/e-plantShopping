// src/CartSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
    },
    reducers: {
        addItem: (state, action) => {
            const plant = action.payload; // action.payload is the plant object
            console.log('CartSlice: addItem dispatched. Payload:', plant);
            const existingItem = state.items.find(item => item.id === plant.id);
            if (existingItem) {
                existingItem.quantity++;
                console.log('CartSlice: Item already in cart, incrementing quantity:', existingItem.name, existingItem.quantity);
            } else {
                state.items.push({ ...plant, quantity: 1 });
                console.log('CartSlice: New item added to cart:', plant.name);
            }
            console.log('CartSlice: Current cart state after addItem:', state.items);
        },
        removeItem: (state, action) => {
            const plantId = action.payload; // action.payload is the plantId
            console.log('CartSlice: removeItem dispatched. Payload (plantId):', plantId);
            state.items = state.items.filter(item => item.id !== plantId);
            console.log('CartSlice: Current cart state after removeItem:', state.items);
        },
        increaseQuantity: (state, action) => {
            const plantId = action.payload;
            console.log('CartSlice: increaseQuantity dispatched. Payload (plantId):', plantId);
            const item = state.items.find(item => item.id === plantId);
            if (item) {
                item.quantity++;
                console.log('CartSlice: Item quantity increased for:', item.name, 'to', item.quantity);
            }
            console.log('CartSlice: Current cart state after increaseQuantity:', state.items);
        },
        decreaseQuantity: (state, action) => {
            const plantId = action.payload;
            console.log('CartSlice: decreaseQuantity dispatched. Payload (plantId):', plantId);
            const itemIndex = state.items.findIndex(item => item.id === plantId);
            if (itemIndex !== -1) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity--;
                    console.log('CartSlice: Item quantity decreased for:', state.items[itemIndex].name, 'to', state.items[itemIndex].quantity);
                } else {
                    // This is where an item is removed if quantity becomes 0 or less
                    state.items.splice(itemIndex, 1);
                    console.log('CartSlice: Item removed from cart due to quantity <= 1:', plantId);
                }
            }
            console.log('CartSlice: Current cart state after decreaseQuantity:', state.items);
        },
    },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
