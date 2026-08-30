/**
 * Authentication Service for Education Platform
 * Manages user login, registration, password resets, token storage, and session validation.
 */

import { apiClient } from './apiClient';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponseData, 
  UserProfile, 
  ForgotPasswordRequest, 
  ResetPasswordRequest, 
  VerifyAccountRequest,
  ApiResponse 
} from '../types/apiContracts';

export const authService = {
  /**
   * Log in user with email and password
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponseData>> {
    const response = await apiClient.post<AuthResponseData>('/auth/login', credentials, { skipAuth: true });
    if (response.success && response.data?.accessToken) {
      apiClient.setAuthToken(response.data.accessToken);
    }
    return response;
  },

  /**
   * Register a new student or user
   */
  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponseData>> {
    const response = await apiClient.post<AuthResponseData>('/auth/register', data, { skipAuth: true });
    if (response.success && response.data?.accessToken) {
      apiClient.setAuthToken(response.data.accessToken);
    }
    return response;
  },

  /**
   * Log out user and revoke active session
   */
  async logout(): Promise<ApiResponse<{ message: string }>> {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore network errors during logout
    } finally {
      apiClient.clearAuth();
    }
    return {
      success: true,
      data: { message: 'Logged out successfully' },
    };
  },

  /**
   * Get current authenticated user profile
   */
  async getCurrentUser(): Promise<ApiResponse<UserProfile>> {
    return apiClient.get<UserProfile>('/auth/me');
  },

  /**
   * Request a password reset link for email
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post('/auth/forgot-password', data, { skipAuth: true });
  },

  /**
   * Reset password with valid reset token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post('/auth/reset-password', data, { skipAuth: true });
  },

  /**
   * Verify newly registered account token
   */
  async verifyAccount(data: VerifyAccountRequest): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post('/auth/verify', data, { skipAuth: true });
  },

  /**
   * Check if user currently has an access token stored
   */
  isAuthenticated(): boolean {
    return Boolean(apiClient.getAuthToken());
  }
};

export default authService;
