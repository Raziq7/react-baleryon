// src/store/thunks/productThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ProductDetail } from "../types/product";
import { fetchProductById, fetchAllProducts } from "../../api/productApi";

// Fetch a single product by ID
export const fetchProductByIdThunk = createAsyncThunk<
  ProductDetail,
  string,
  { rejectValue: string }
>("product/fetchProductById", async (productId, { rejectWithValue }) => {
  try {
    const data = await fetchProductById(productId);
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// (Optional) Fetch all products
export const fetchAllProductsThunk = createAsyncThunk<
  ProductDetail[],
  void,
  { rejectValue: string }
>("product/fetchAllProducts", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchAllProducts();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});