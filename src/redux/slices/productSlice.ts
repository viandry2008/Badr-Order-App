import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await apiClient.get('/products');
        return response.data.data; // Sesuai format API
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: null,
    } as ProductState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default productSlice.reducer;
