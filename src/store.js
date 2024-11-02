import { configureStore, createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        vegItem: [
            { name: 'Tomato', price: 200.5 },
            { name: 'Potato', price: 100.8 },
        ],
        nonvegItem: [
            { name: 'Chicken', price: 1000.24 },
            { name: 'Fish', price: 800.00 },
        ],
    },
    reducers: {}
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {  
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    
                    return state.filter(cartItem => cartItem.name !== action.payload.name);
                }
            }
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item.name !== action.payload.name);
        }
    }
});

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        cart: cartSlice.reducer,
    }
});

// Export actions
export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;
export default store;
