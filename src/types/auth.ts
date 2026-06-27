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