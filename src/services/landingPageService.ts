/**
 * Landing Page & CMS Service for Education Platform
 * Handles fetching, creating, updating, and publishing modular dynamic landing pages.
 */

import { apiClient } from './apiClient';
import { 
  LandingPageData, 
  ApiResponse 
} from '../types/apiContracts';

export const landingPageService = {
  /**
   * Get all published landing pages (Public)
   */
  async getLandingPages(params?: { category?: string; status?: string }): Promise<ApiResponse<LandingPageData[]>> {
    return apiClient.get<LandingPageData[]>('/landing-pages', { params });
  },

  /**
   * Get a single landing page by its unique slug (Public)
   */
  async getLandingPageBySlug(slug: string): Promise<ApiResponse<LandingPageData>> {
    return apiClient.get<LandingPageData>(`/landing-pages/${slug}`);
  },

  // ==========================================
  // ADMIN CMS METHODS
  // ==========================================

  /**
   * Get all landing pages including drafts (Admin)
   */
  async getAdminLandingPages(params?: { page?: number; limit?: number; status?: string }): Promise<ApiResponse<LandingPageData[]>> {
    return apiClient.get<LandingPageData[]>('/admin/landing-pages', { params });
  },

  /**
   * Get a landing page by ID for editing (Admin)
   */
  async getAdminLandingPageById(id: string): Promise<ApiResponse<LandingPageData>> {
    return apiClient.get<LandingPageData>(`/admin/landing-pages/${id}`);
  },

  /**
   * Create a new landing page (Admin)
   */
  async createLandingPage(data: Partial<LandingPageData>): Promise<ApiResponse<LandingPageData>> {
    return apiClient.post<LandingPageData>('/admin/landing-pages', data);
  },

  /**
   * Update an existing landing page (Admin)
   */
  async updateLandingPage(id: string, data: Partial<LandingPageData>): Promise<ApiResponse<LandingPageData>> {
    return apiClient.put<LandingPageData>(`/admin/landing-pages/${id}`, data);
  },

  /**
   * Delete a landing page (Admin)
   */
  async deleteLandingPage(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/admin/landing-pages/${id}`);
  },

  /**
   * Toggle landing page published state (Admin)
   */
  async publishLandingPage(id: string, publish: boolean = true): Promise<ApiResponse<LandingPageData>> {
    return apiClient.post<LandingPageData>(`/admin/landing-pages/${id}/publish`, { publish });
  }
};

export default landingPageService;
