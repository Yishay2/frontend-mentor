import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import products from '../../../data.json';

export interface Product {
    image: {
        thumbnail: string,
        mobile: string,
        tablet: string,
        desktop: string
    },
    name: string,
    category: string,
    price: number
}

const initialState: Product[] = products;

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {}
});

export default productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products