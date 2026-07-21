import api from "../utils/axios";

export const login = (data) =>
  api.post("/auth/login", data);

export const forgotPassword = (data) =>
  api.post("/auth/forgot-password", data);

export const verifyOtp = (data) =>
  api.post("/auth/verify-otp", data);

export const resetPassword = (data) =>
  api.post("/auth/reset-password", data);