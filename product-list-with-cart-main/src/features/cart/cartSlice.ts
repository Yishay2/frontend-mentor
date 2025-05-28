import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { Product } from '../products/productsSlice'

export interface CartItem extends Product {
    quantity: number
    force?: boolean
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 })
            }
        },
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            const existingIdx = state.findIndex(item => item.name === action.payload.name);
            if (existingIdx != -1) {
                if (state[existingIdx].quantity <= 1 || action.payload.force) {
                    state.splice(existingIdx, 1)
                } else {
                    state[existingIdx].quantity--;
                }
            }
        },
        clearCart: () => [],
    }
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;