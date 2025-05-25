import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Type-only import (important with verbatimModuleSyntax enabled)
import type { LoginRequest, OtpVerificationData, SignUpRequest } from "../types/auth";

// API function imports
import {
  signupUser,
  loginUser,
  verifyOtp,
  logoutUser
} from "../../api/authApi";

// --- Signup Thunk ---
export const signupUserThunk = createAsyncThunk(
  "auth/signup",
  async (userData: SignUpRequest, { rejectWithValue }) => {
    try {
      const response = await signupUser(userData);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Signup failed");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// --- Login Thunk ---
export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// --- OTP Verification Thunk ---
export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }: OtpVerificationData, { rejectWithValue }) => {
    try {
      const response = await verifyOtp(email, otp);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "OTP verification failed");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// --- Logout Thunk ---
export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();

      // Optional localStorage/sessionStorage cleanup
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      return {};
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Logout failed");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);