/**
 * Offers & Scholarships Service
 * Handles fetching, verifying, and managing discount offers, scholarships, and coupon codes.
 */

import { apiClient } from './apiClient';
import { 
  EducationOffer, 
  ApiResponse 
} from '../types/apiContracts';

export const offerService = {
  /**
   * Get all active public offers (Public)
   */
  async getOffers(params?: { categoryId?: string; activeOnly?: boolean }): Promise<ApiResponse<EducationOffer[]>> {
    return apiClient.get<EducationOffer[]>('/offers', { params });
  },

  /**
   * Get single offer details by slug (Public)
   */
  async getOfferBySlug(slug: string): Promise<ApiResponse<EducationOffer>> {
    return apiClient.get<EducationOffer>(`/offers/${slug}`);
  },

  /**
   * Validate a coupon code for an application / purchase (Public)
   */
  async validateCoupon(code: string, amount?: number): Promise<ApiResponse<{
    valid: boolean;
    discountAmount: number;
    description: string;
    payableAmount: number;
  }>> {
    return apiClient.post('/razorpay/validate-coupon', { code, amount });
  },

  // ==========================================
  // ADMIN OFFER METHODS
  // ==========================================

  /**
   * Get all offers for admin management (Admin)
   */
  async getAdminOffers(): Promise<ApiResponse<EducationOffer[]>> {
    return apiClient.get<EducationOffer[]>('/admin/offers');
  },

  /**
   * Create a new offer (Admin)
   */
  async createOffer(data: Partial<EducationOffer>): Promise<ApiResponse<EducationOffer>> {
    return apiClient.post<EducationOffer>('/admin/offers', data);
  },

  /**
   * Update an existing offer (Admin)
   */
  async updateOffer(id: string, data: Partial<EducationOffer>): Promise<ApiResponse<EducationOffer>> {
    return apiClient.put<EducationOffer>(`/admin/offers/${id}`, data);
  },

  /**
   * Delete an offer (Admin)
   */
  async deleteOffer(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/admin/offers/${id}`);
  }
};

export default offerService;
