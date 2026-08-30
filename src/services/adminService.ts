/**
 * Admin Service for Platform Management & RBAC
 * Handles platform KPIs, user management, audit logs, media uploads, and SEO settings.
 */

import { apiClient } from './apiClient';
import { 
  AdminDashboardStats, 
  AdminAuditLogRecord, 
  AdminMediaAsset, 
  SEOConfig, 
  UserProfile, 
  ApiResponse 
} from '../types/apiContracts';

export const adminService = {
  /**
   * Get main admin dashboard statistics and telemetry (Admin)
   */
  async getDashboardStats(): Promise<ApiResponse<AdminDashboardStats>> {
    return apiClient.get<AdminDashboardStats>('/admin/dashboard');
  },

  /**
   * Get list of users with role filtering (Admin)
   */
  async getUsers(params?: { role?: string; search?: string; page?: number; limit?: number }): Promise<ApiResponse<UserProfile[]>> {
    return apiClient.get<UserProfile[]>('/admin/users', { params });
  },

  /**
   * Update user role or verification status (Admin)
   */
  async updateUser(userId: string, data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    return apiClient.put<UserProfile>(`/admin/users/${userId}`, data);
  },

  /**
   * Delete user account (Admin)
   */
  async deleteUser(userId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/admin/users/${userId}`);
  },

  /**
   * Get immutable system audit logs (Admin)
   */
  async getAuditLogs(params?: { search?: string; severity?: string; page?: number; limit?: number }): Promise<ApiResponse<AdminAuditLogRecord[]>> {
    return apiClient.get<AdminAuditLogRecord[]>('/admin/audit-logs', { params });
  },

  /**
   * Get platform analytics (Admin)
   */
  async getAnalytics(): Promise<ApiResponse<{
    revenueData: Array<{ month: string; amount: number }>;
    enrollmentTrends: Array<{ category: string; count: number }>;
    retentionRate: number;
    activeUsersToday: number;
  }>> {
    return apiClient.get('/admin/analytics');
  },

  /**
   * Get uploaded media assets (Admin)
   */
  async getMediaAssets(): Promise<ApiResponse<AdminMediaAsset[]>> {
    return apiClient.get<AdminMediaAsset[]>('/admin/media');
  },

  /**
   * Get platform global SEO settings (Admin)
   */
  async getSEOSettings(): Promise<ApiResponse<SEOConfig>> {
    return apiClient.get<SEOConfig>('/admin/seo');
  },

  /**
   * Update platform global SEO settings (Admin)
   */
  async updateSEOSettings(data: Partial<SEOConfig>): Promise<ApiResponse<SEOConfig>> {
    return apiClient.put<SEOConfig>('/admin/seo', data);
  }
};

export default adminService;
