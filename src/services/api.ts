/**
 * PAWIN API Client
 * Connects frontend to Laravel backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle Laravel validation errors
        if (response.status === 422 && data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(', ');
          return {
            error: 'Validation failed',
            message: errorMessages,
          };
        }

        return {
          error: data.error || `HTTP error! status: ${response.status}`,
          message: data.message,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.token) {
      this.token = response.data.token;
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  async register(name: string, email: string, password: string, passwordConfirmation?: string) {
    const payload: any = { name, email, password };
    if (passwordConfirmation) {
      payload.password_confirmation = passwordConfirmation;
    }

    const response = await this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (response.data?.token) {
      this.token = response.data.token;
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  async verifyToken() {
    return this.request<{ valid: boolean; user: any }>('/auth/verify');
  }

  async logout() {
    const response = await this.request('/auth/logout', {
      method: 'POST',
    });
    
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    
    return response;
  }

  // Applications (Join Modal)
  async submitApplication(data: {
    name: string;
    email: string;
    interest: string;
    message?: string;
  }) {
    return this.request<{ application_id: number; status: string }>('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getApplications(filters?: { status?: string; interest?: string; search?: string }) {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.interest) queryParams.append('interest', filters.interest);
    if (filters?.search) queryParams.append('search', filters.search);
    
    const queryString = queryParams.toString();
    const endpoint = `/applications${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{
      data: any[];
      current_page: number;
      total: number;
      per_page: number;
    }>(endpoint);
  }

  async updateApplication(id: number, data: { status: string; notes?: string }) {
    return this.request(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Content (for dynamic loading)
  async getContent(type: string, filters?: { limit?: number; offset?: number }) {
    const queryParams = new URLSearchParams();
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    if (filters?.offset) queryParams.append('offset', filters.toString());
    
    const queryString = queryParams.toString();
    const endpoint = `/content/${type}${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{
      data: any[];
      current_page: number;
      total: number;
      per_page: number;
    }>(endpoint);
  }

  async getInnovators() {
    return this.getContent('innovator_profiles');
  }

  async getInvestors() {
    return this.getContent('investor_profiles');
  }

  async getEvents() {
    return this.getContent('community_events');
  }

  async getDeals() {
    return this.getContent('investment_deals');
  }

  // Health check
  async checkStatus() {
    return this.request<{
      status: string;
      message: string;
      timestamp: string;
      php_version: string;
      laravel_version: string;
      environment: string;
    }>('/status');
  }
}

// Create singleton instance
export const api = new ApiClient(API_BASE_URL);

// Export types
export type { ApiResponse };