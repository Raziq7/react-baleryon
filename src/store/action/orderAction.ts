'use client'
import {
  GET_USERS_ADDRESS_REQUEST,
  GET_USERS_ADDRESS_SUCCESS,
  GET_USERS_ADDRESS_ERR,
} from "@/constant/orderConstant.js";
import api from "@/utils/baseUrl";
import { AppDispatch } from "../store.js";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
}

// getProductDetailsAction
export const addressFetchAction = () => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User not authenticated. Please login to continue");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token for authentication
        "Content-Type": "application/json",
      },
    };

    dispatch({ type: GET_USERS_ADDRESS_REQUEST });

    // Make API call to get product details
    const { data } = await api.get("/api/user/order/address", config);

    dispatch({
      type: GET_USERS_ADDRESS_SUCCESS,
      payload: data,
    });

    console.log("Address data fetched successfully:", data);
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while fetching the address details";

    dispatch({
      type: GET_USERS_ADDRESS_ERR,
      payload: errorMessage,
    });

    console.error("Error fetching product details:", errorMessage);
  }
};
