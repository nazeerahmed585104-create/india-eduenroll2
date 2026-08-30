/**
 * Alerts & Statutory Notifications Service
 * Handles platform notices, admission deadlines, UGC/AICTE notifications, and system alerts.
 */

import { apiClient } from './apiClient';
import { 
  PlatformAlert, 
  ApiResponse 
} from '../types/apiContracts';

export const alertService = {
  /**
   * Get all active platform alerts (Public)
   */
  async getAlerts(params?: { category?: string; targetAudience?: string }): Promise<ApiResponse<PlatformAlert[]>> {
    return apiClient.get<PlatformAlert[]>('/alerts', { params });
  },

  /**
   * Get alert by ID (Public)
   */
  async getAlertById(id: string): Promise<ApiResponse<PlatformAlert>> {
    return apiClient.get<PlatformAlert>(`/alerts/${id}`);
  },

  // ==========================================
  // ADMIN ALERT METHODS
  // ==========================================

  /**
   * Get all alerts including expired/drafts (Admin)
   */
  async getAdminAlerts(): Promise<ApiResponse<PlatformAlert[]>> {
    return apiClient.get<PlatformAlert[]>('/admin/alerts');
  },

  /**
   * Create a new alert notice (Admin)
   */
  async createAlert(data: Partial<PlatformAlert>): Promise<ApiResponse<PlatformAlert>> {
    return apiClient.post<PlatformAlert>('/admin/alerts', data);
  },

  /**
   * Update an existing alert notice (Admin)
   */
  async updateAlert(id: string, data: Partial<PlatformAlert>): Promise<ApiResponse<PlatformAlert>> {
    return apiClient.put<PlatformAlert>(`/admin/alerts/${id}`, data);
  },

  /**
   * Delete an alert notice (Admin)
   */
  async deleteAlert(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/admin/alerts/${id}`);
  }
};

export default alertService;
