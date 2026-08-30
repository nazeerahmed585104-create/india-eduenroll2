/**
 * Education Module & Course Service
 * Handles listing courses, module details, lessons, syllabus, and admin course management.
 */

import { apiClient } from './apiClient';
import { 
  EducationModule, 
  LessonItem, 
  ApiResponse 
} from '../types/apiContracts';

export interface ModuleQueryParams {
  category?: string;
  search?: string;
  level?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'popular' | 'rating' | 'newest' | 'price_asc' | 'price_desc';
}

export const moduleService = {
  /**
   * Get list of published education modules (Public)
   */
  async getModules(params?: ModuleQueryParams): Promise<ApiResponse<EducationModule[]>> {
    return apiClient.get<EducationModule[]>('/modules', { params: params as any });
  },

  /**
   * Get module details by unique slug (Public)
   */
  async getModuleBySlug(slug: string): Promise<ApiResponse<EducationModule>> {
    return apiClient.get<EducationModule>(`/modules/${slug}`);
  },

  /**
   * Get all lessons for a specific module (Public/Student)
   */
  async getModuleLessons(moduleId: string): Promise<ApiResponse<LessonItem[]>> {
    return apiClient.get<LessonItem[]>(`/modules/${moduleId}/lessons`);
  },

  // ==========================================
  // ADMIN MODULE METHODS
  // ==========================================

  /**
   * Get all modules for admin catalog management (Admin)
   */
  async getAdminModules(params?: ModuleQueryParams): Promise<ApiResponse<EducationModule[]>> {
    return apiClient.get<EducationModule[]>('/admin/modules', { params: params as any });
  },

  /**
   * Create a new education module (Admin)
   */
  async createModule(data: Partial<EducationModule>): Promise<ApiResponse<EducationModule>> {
    return apiClient.post<EducationModule>('/admin/modules', data);
  },

  /**
   * Update an existing module (Admin)
   */
  async updateModule(id: string, data: Partial<EducationModule>): Promise<ApiResponse<EducationModule>> {
    return apiClient.put<EducationModule>(`/admin/modules/${id}`, data);
  },

  /**
   * Delete a module (Admin)
   */
  async deleteModule(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/admin/modules/${id}`);
  }
};

export default moduleService;
