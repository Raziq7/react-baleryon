// import {
//   GET_PRODUCT_DETAILS_REQUEST,
//   GET_PRODUCT_DETAILS_SUCCESS,
//   GET_PRODUCT_DETAILS_ERR,
//   GET_ALL_PRODUCTS_REQUEST,
//   GET_ALL_PRODUCTS_SUCCESS,
//   GET_ALL_PRODUCTS_ERR
// } from '@/constant/productConstant';
// import api from '@/utils/baseUrl';
// import { AppDispatch, RootState } from '../store';
// import { AxiosError } from 'axios';

// interface ApiErrorResponse {
//   message: string;
// }

// // getProductDetailsAction
// export const getProductDetailsAction = (id: string) => async (dispatch: AppDispatch) => {
//   try {

//       dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

//     // Make API call to get product details
//     const { data } = await api.get(`/api/user/product/getProductDetails?id=${id}`);

//     dispatch({
//       type: GET_PRODUCT_DETAILS_SUCCESS,
//       payload: data,
//     });

//     console.log('Product data fetched successfully:', data);

//   } catch (err) {
//     const error = err as AxiosError<ApiErrorResponse>;
//     const errorMessage =
//       error.response?.data?.message ||
//       error.message || 'An error occurred while fetching the product details';

//     dispatch({
//       type: GET_PRODUCT_DETAILS_ERR,
//       payload: errorMessage,
//     });

//     console.error('Error fetching product details:', errorMessage);
//   }
// };

// // getAllProductsAction with pagination
// export const getAllProductsAction = (page = 1) => async (dispatch: AppDispatch, getState: () => RootState) => {
//   try {
//     dispatch({ type: GET_ALL_PRODUCTS_REQUEST });

//     const limit = 10;
//     const { data } = await api.get(`/api/user/product/getProducts?page=${page}&limit=${limit}`);

//     const existingProducts = getState().product.products || [];

//     dispatch({
//       type: GET_ALL_PRODUCTS_SUCCESS,
//       payload: {
//         products: page === 1 ? data.products : [...existingProducts, ...data.products],
//         totalPages: data.totalPages,
//         totalProducts: data.totalProducts,
//         page: page,
//       },
//     });

//     console.log('All products fetched successfully:', data);
//   } catch (err) {
//     const error = err as AxiosError<ApiErrorResponse>;
//     const errorMessage =
//       error.response?.data?.message ||
//       error.message || 'An error occurred while fetching all products';

//     dispatch({
//       type: GET_ALL_PRODUCTS_ERR,
//       payload: errorMessage,
//     });

//     console.error('Error fetching all products:', errorMessage);
//   }
// };

