/**
 * Category Service for Education Platform
 * Manages education course categories and taxonomies.
 */

import { apiClient } from './apiClient';
import { 
  ModuleCategory, 
  ApiResponse 
} from '../types/apiContracts';

export const categoryService = {
  /**
   * Get all active categories (Public)
   */
  async getCategories(): Promise<ApiResponse<ModuleCategory[]>> {
    return apiClient.get<ModuleCategory[]>('/categories');
  },

  /**
   * Get category details by slug (Public)
   */
  async getCategoryBySlug(slug: string): Promise<ApiResponse<ModuleCategory>> {
    return apiClient.get<ModuleCategory>(`/categories/${slug}`);
  },

  // ==========================================
  // ADMIN CATEGORY METHODS
  // ==========================================

  /**
   * Create a new category (Admin)
   */
  async createCategory(data: Partial<ModuleCategory>): Promise<ApiResponse<ModuleCategory>> {
    return apiClient.post<ModuleCategory>('/admin/categories', data);
  },

  /**
   * Update category (Admin)
   */
  async updateCategory(id: string, data: Partial<ModuleCategory>): Promise<ApiResponse<ModuleCategory>> {
    return apiClient.put<ModuleCategory>(`/admin/categories/${id}`, data);
  },

  /**
   * Delete category (Admin)
   */
  async deleteCategory(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/admin/categories/${id}`);
  }
};

export default categoryService;
