/**
 * Standardized HTTP API Client for Education Platform
 * Handles authentication headers, error serialization, timeouts, and REST requests.
 */

import { ApiResponse, ApiErrorResponse } from '../types/apiContracts';

export interface RequestOptions extends RequestInit {
  timeout?: number;
  params?: Record<string, string | number | boolean | undefined>;
  skipAuth?: boolean;
}

const DEFAULT_TIMEOUT_MS = 15000;
const BASE_URL = '/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Initialize token from localStorage safely if in browser
    if (typeof window !== 'undefined') {
      try {
        this.token = localStorage.getItem('edu_access_token');
      } catch (e) {
        // Ignore storage exceptions
      }
    }
  }

  /**
   * Set authentication access token for subsequent API requests
   */
  public setAuthToken(token: string | null): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      try {
        if (token) {
          localStorage.setItem('edu_access_token', token);
        } else {
          localStorage.removeItem('edu_access_token');
        }
      } catch (e) {
        // Ignore storage exceptions
      }
    }
  }

  /**
   * Get current auth token
   */
  public getAuthToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      try {
        this.token = localStorage.getItem('edu_access_token');
      } catch (e) {
        // Ignore storage exceptions
      }
    }
    return this.token;
  }

  /**
   * Clears auth token on logout
   */
  public clearAuth(): void {
    this.setAuthToken(null);
  }

  /**
   * Execute generic HTTP request
   */
  public async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const {
      timeout = DEFAULT_TIMEOUT_MS,
      params,
      skipAuth = false,
      headers = {},
      ...customConfig
    } = options;

    // Build URL with query parameters
    let url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          searchParams.append(key, String(val));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
      }
    }

    // Prepare Request Headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(headers as Record<string, string>),
    };

    // Attach Bearer Token if available
    const token = this.getAuthToken();
    if (!skipAuth && token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Setup Timeout Abort Controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...customConfig,
        headers: requestHeaders,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parse JSON response safely
      let data: any = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch {
          data = null;
        }
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }
      }

      if (!response.ok) {
        const errorMsg = data?.error || data?.message || `HTTP ${response.status} ${response.statusText}`;
        return {
          success: false,
          error: errorMsg,
          statusCode: response.status,
          timestamp: new Date().toISOString(),
          data: data?.data || data,
        };
      }

      // Check if response is already wrapped in ApiResponse standard
      if (data && typeof data === 'object' && ('success' in data || 'data' in data)) {
        return {
          success: data.success !== undefined ? data.success : true,
          data: data.data !== undefined ? data.data : data,
          message: data.message,
          statusCode: response.status,
          timestamp: data.timestamp || new Date().toISOString(),
        };
      }

      return {
        success: true,
        data: data as T,
        statusCode: response.status,
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      clearTimeout(timeoutId);

      const isTimeout = err.name === 'AbortError';
      const errorMessage = isTimeout 
        ? `Request timed out after ${timeout / 1000}s` 
        : err.message || 'Network request failed';

      return {
        success: false,
        error: errorMessage,
        statusCode: isTimeout ? 408 : 500,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Convenience methods
  public get<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public post<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public put<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public patch<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public delete<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
