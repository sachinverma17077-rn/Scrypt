// src/types/auth.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  data: User;
}
export interface CheckUserRequest {
  email: string;
  userName: string;
  phoneNumber: string;
}

export interface CheckUserResponse {
  success: boolean;
  messafe: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  checked: boolean;
  userName: string
}

export interface RegisterResponse {
  success:boolean;
  message:string;
  token:string;
  data:User
}

export interface SendOTPRequest {
  phoneNumber:string;
}
export interface SendOTPResponse {
  success: boolean;
  messafe: string;
}

export interface VerifyOTPRequest {
  otp:string;
}
export interface VerifyOTPResponse {
  success: boolean;
  messafe: string;
}