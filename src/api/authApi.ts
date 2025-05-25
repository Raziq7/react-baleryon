// api/auth.ts
import type { SignUpResponse } from "@/store/types/auth";
import api from "../utils/baseUrl"; // Assuming you have an axios instance set up

// API call for user signup (sending OTP to email)
export const signupUser = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
}) => {
  const response = await api.post<SignUpResponse>("/api/user/auth", {
    ...userData,
    isSignUp: true,
  });
  return response.data;
};

// API call for user login
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/api/user/auth", {
    ...credentials,
    isSignUp: false,
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }  
  return response.data;
};

// API call for OTP verification
export const verifyOtp = async (email: string, otp: string) => {
  const response = await api.post("/api/user/verify-otp", { email, otp });
  return response.data;
};

// API call to logout the user
// API call to logout the user
export const logoutUser = async () => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/api/user/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.data.token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
  }

  return response.data;
};
