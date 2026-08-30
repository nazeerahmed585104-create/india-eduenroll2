/**
 * Student & User Dashboard Service
 * Handles user learning history, progress tracking, certificates, bookmarks, and personal profile.
 */

import { apiClient } from './apiClient';
import { 
  UserDashboardData, 
  UserModuleProgress, 
  UserCertificateRecord, 
  UserBookmarkItem, 
  UserNotificationItem, 
  UserProfile, 
  ApiResponse 
} from '../types/apiContracts';

export const userService = {
  /**
   * Get student dashboard overview data (Protected - Student/User)
   */
  async getDashboard(): Promise<ApiResponse<UserDashboardData>> {
    return apiClient.get<UserDashboardData>('/user/dashboard');
  },

  /**
   * Get enrolled modules and courses (Protected - Student/User)
   */
  async getMyModules(): Promise<ApiResponse<UserModuleProgress[]>> {
    return apiClient.get<UserModuleProgress[]>('/user/modules');
  },

  /**
   * Get active learning sessions and continue learning queue (Protected - Student/User)
   */
  async getMyLearning(): Promise<ApiResponse<UserModuleProgress[]>> {
    return apiClient.get<UserModuleProgress[]>('/user/learning');
  },

  /**
   * Get learning progress across all enrolled subjects (Protected - Student/User)
   */
  async getProgress(): Promise<ApiResponse<{
    overallProgress: number;
    totalHoursSpent: number;
    modules: UserModuleProgress[];
  }>> {
    return apiClient.get('/user/progress');
  },

  /**
   * Update module progress when completing lessons (Protected - Student/User)
   */
  async updateLessonProgress(moduleId: string, lessonId: string, completed: boolean = true): Promise<ApiResponse<{
    progressPercentage: number;
    completed: boolean;
  }>> {
    return apiClient.post(`/user/modules/${moduleId}/lessons/${lessonId}/progress`, { completed });
  },

  /**
   * Get earned statutory course completion certificates (Protected - Student/User)
   */
  async getCertificates(): Promise<ApiResponse<UserCertificateRecord[]>> {
    return apiClient.get<UserCertificateRecord[]>('/user/certificates');
  },

  /**
   * Get saved module bookmarks and favorites (Protected - Student/User)
   */
  async getBookmarks(): Promise<ApiResponse<UserBookmarkItem[]>> {
    return apiClient.get<UserBookmarkItem[]>('/user/bookmarks');
  },

  /**
   * Toggle save/bookmark for a module or lesson (Protected - Student/User)
   */
  async toggleBookmark(referenceId: string, type: 'MODULE' | 'LESSON' | 'ARTICLE', title: string, slug: string): Promise<ApiResponse<{
    bookmarked: boolean;
  }>> {
    return apiClient.post('/user/bookmarks/toggle', { referenceId, type, title, slug });
  },

  /**
   * Get user notifications and alerts (Protected - Student/User)
   */
  async getNotifications(): Promise<ApiResponse<UserNotificationItem[]>> {
    return apiClient.get<UserNotificationItem[]>('/user/notifications');
  },

  /**
   * Mark notification as read (Protected - Student/User)
   */
  async markNotificationAsRead(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.post(`/user/notifications/${id}/read`);
  },

  /**
   * Get user profile details (Protected - Student/User)
   */
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    return apiClient.get<UserProfile>('/user/profile');
  },

  /**
   * Update user profile information (Protected - Student/User)
   */
  async updateProfile(data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    return apiClient.put<UserProfile>('/user/profile', data);
  }
};

export default userService;
