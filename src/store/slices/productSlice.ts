// store/slices/productSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductDetail } from "../types/product";
import { fetchProductByIdThunk } from "../thunks/productThunks";
import type { RootState } from "@/store/store";

interface ProductState {
  product: ProductDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action: PayloadAction<ProductDetail>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load product";
      });
  },
});

export const selectProduct = (state: RootState) => state.product.product;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductError = (state: RootState) => state.product.error;

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
