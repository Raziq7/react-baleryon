'use client'
import { 
  SUBMIT_LOGIN_DATA_REQUEST, 
  SUBMIT_LOGIN_DATA_SUCCESS, 
  SUBMIT_LOGIN_DATA_ERR, 
  OTP_VERIFIED_REQUEST,
  OTP_VERIFIED_SUCCESS,
  OTP_VERIFIED_ERR,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_ERR
} from '../../constant/authConstant';
import type { AppDispatch } from '../../store/store';
import api from '../../utils/baseUrl';
import { AxiosError } from 'axios';

interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
}

interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

interface LoginFormData {
  email: string;
  password?: string;
  // isSignUp: boolean;
  // Add other login form fields as needed
}

interface OtpFormData {
  email: string,
  otp: string,
  firstName: string,
  lastName: string,
  mobile: string, 
  password: string,
  gender: string,
}

interface ApiErrorResponse {
  message: string;
}

// Action for submitting login data (login or signup)
export const submitLoginAction = (formData: LoginFormData) => async (dispatch: AppDispatch) => {
  console.log("submitLoginAction");
  
  try {
    dispatch({ type: SUBMIT_LOGIN_DATA_REQUEST });

    const endpoint = '/api/user/auth';
    const { data } = await api.post<AuthResponse>(endpoint, formData);

    dispatch({
      type: SUBMIT_LOGIN_DATA_SUCCESS,
      payload: data,
    });

    if (data.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } 
      
    }

    window.location.reload();

  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    const errorMessage = err.response?.data?.message || err.message || 'An error occurred while authenticating';

    dispatch({
      type: SUBMIT_LOGIN_DATA_ERR,
      payload: errorMessage,
    });

    console.error('Error during authentication:', errorMessage);
  }
};

// Action for submitting OTP verification data
export const submitOtpAction = (formData: OtpFormData) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: OTP_VERIFIED_REQUEST });

    const endpoint = '/api/user/auth/verify-otp';
    const { data } = await api.post<AuthResponse>(endpoint, formData);

    console.log('OTP verified successfully:', data);
    dispatch({
      type: OTP_VERIFIED_SUCCESS,
      payload: data,
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    } 
   
    // Redirect to the desired page after successful OTP verification
    window.location.href = '/';

  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    const errorMessage = err.response?.data?.message || err.message || 'An error occurred during OTP verification';

    dispatch({
      type: OTP_VERIFIED_ERR,
      payload: errorMessage,
    });

    console.error('Error during OTP verification:', errorMessage);
  }
};

// Action for logout user 
export const logoutAction = () => async (dispatch: AppDispatch) => {
  try {
    localStorage.removeItem('user'); 
    localStorage.removeItem('token'); 
    
    dispatch({ type: USER_LOGOUT_REQUEST });

    const response = await api.get<{ message: string }>('/api/user/auth/logout');

    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: response.data,
    });

    window.location.reload()

  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    const errorMessage = err.response?.data?.message || err.message || 'An error occurred during logout';

    dispatch({
      type: USER_LOGOUT_ERR,
      payload: errorMessage,
    });

    console.error('Error during logout:', errorMessage);
  }
};