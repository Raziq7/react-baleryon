'use client'
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  CLEAR_CART,
  ADD_TO_CART_ERR,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_ERR,
} from '@/constant/cartConstants';
import { AppDispatch } from '@/store/store';
import api from '@/utils/baseUrl';
import { AxiosError } from 'axios';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  // Add other cart item properties as needed
}

interface CartData {
  productId: string;
  quantity: number;
}

interface CartResponse {
  items: CartItem[];
  message?: string;
}

interface ApiErrorResponse {
  message: string;
}

// Action to add a product to the cart
export const addToCartAction = (cartData: CartData) => async (dispatch: AppDispatch) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (token) {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await api.post<CartResponse>('/api/user/cart/', { cartData }, config);

      dispatch({
        type: ADD_TO_CART,
        payload: response.data,
      });
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      console.error("Error adding product to cart:", err);

      const errorMessage = err.response?.data?.message || err.message || 'An error occurred while adding to cart';

      dispatch({
        type: ADD_TO_CART_ERR,
        payload: errorMessage,
      });
    }
  } else {
    dispatch({
      type: ADD_TO_CART_ERR,
      payload: "User is not logged in, cart will not be synced.",
    });
    console.warn("User is not logged in, cart will not be synced.");
  }
};

// Action to fetch the user's cart
export const fetchCartAction = () => async (dispatch: AppDispatch) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  if (token) {
    try {
      dispatch({
        type: FETCH_CART_REQUEST,
      });

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await api.get<CartResponse>('/api/user/cart/', config);

      dispatch({
        type: FETCH_CART_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      console.error("Error fetching the cart:", err);

      const errorMessage = err.response?.data?.message || err.message || 'An error occurred while fetching the cart';

      dispatch({
        type: FETCH_CART_ERR,
        payload: errorMessage,
      });
    }
  } else {
    dispatch({
      type: FETCH_CART_ERR,
      payload: "User is not logged in, cart will not be fetched.",
    });
    console.warn("User is not logged in, cart will not be fetched.");
  }
};

// Action to remove a product from the cart
export const removeFromCartAction = (productId: string) => async (dispatch: AppDispatch) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (token) {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await api.delete<CartResponse>(`/api/user/cart/${productId}`, config);

      dispatch({
        type: REMOVE_FROM_CART,
        payload: response.data,
      });
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      console.error("Error removing product from cart:", err);

      dispatch({
        type: REMOVE_FROM_CART,
        payload: [],
      });
    }
  } else {
    console.warn("User is not logged in, cart will not be synced.");
  }
};

// Action to update the quantity of a product in the cart
export const updateCartItemAction = (
  cartId: string,
  productId: string,
  quantity: number
) => async (dispatch: AppDispatch) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (token) {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await api.put<CartResponse>(
        `/api/user/cart/${cartId}`,
        { productId, quantity },
        config
      );

      dispatch({
        type: UPDATE_CART_ITEM,
        payload: response.data,
      });
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      console.error("Error updating cart item:", err);
    }
  } else {
    console.warn("User is not logged in, cart will not be synced.");
  }
};

// Action to clear the entire cart
export const clearCartAction = () => async (dispatch: AppDispatch) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (token) {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await api.delete<CartResponse>('/api/user/cart/clear', config);

      dispatch({
        type: CLEAR_CART,
        payload: response.data,
      });
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      console.error("Error clearing cart:", err);
    }
  } else {
    console.warn("User is not logged in, cart will not be synced.");
  }
};
