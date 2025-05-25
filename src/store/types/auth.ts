// AuthResponse.ts
export interface AuthResponse {
    token: string; // The JWT token returned upon successful login
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      mobileNo: string;
      gender: string;
      createdAt: string;
      updatedAt: string;
    };
  }

  // SignUpRequest.ts
export interface SignUpRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  gender: string;
}


  // SignUpResponse.ts
export interface SignUpResponse {
    message: string; // Message indicating the result of the signup action
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      mobileNo: string;
      gender: string;
      createdAt: string;
      updatedAt: string;
    };
  }


  // Define this inline or create a new file `OtpVerificationData.ts`
export interface OtpVerificationData {
  email: string;
  otp: string;
}
  
  // OtpSubmitResponse.ts
export interface OtpSubmitResponse {
    message: string; // Message indicating the result of the OTP verification
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      mobileNo: string;
      gender: string;
      createdAt: string;
      updatedAt: string;
    };
  }

  // ApiErrorResponse.ts
export interface ApiErrorResponse {
  message: string; // Error message from the server
  statusCode: number; // HTTP status code
  error: string; // Type of error (e.g., "BadRequest", "Unauthorized")
}

  // LoginRequest.ts

export interface LoginRequest {
  email: string;
  password: string;
}
