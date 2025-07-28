import { type Dispatch } from "redux";
import api from "../../utils/baseUrl";
import {
  GET_USERS_ADDRESS_REQUEST,
  GET_USERS_ADDRESS_SUCCESS,
  GET_USERS_ADDRESS_ERR,
} from "@/constant/orderConstant";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
}

// Define action types explicitly (optional, adjust based on your setup)
interface GetUsersAddressRequestAction {
  type: typeof GET_USERS_ADDRESS_REQUEST;
}

interface GetUsersAddressSuccessAction {
  type: typeof GET_USERS_ADDRESS_SUCCESS;
  payload: any; // Replace with your address data type if available
}

interface GetUsersAddressErrorAction {
  type: typeof GET_USERS_ADDRESS_ERR;
  payload: string;
}

export type AddressActionTypes =
  | GetUsersAddressRequestAction
  | GetUsersAddressSuccessAction
  | GetUsersAddressErrorAction;

// Thunk Action Creator
export const addressFetchAction = () => {
  return async (dispatch: Dispatch<AddressActionTypes>) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please login to continue");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      dispatch({ type: GET_USERS_ADDRESS_REQUEST });

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

      console.error("Error fetching address details:", errorMessage);
    }
  };
};
