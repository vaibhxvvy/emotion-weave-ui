// API Configuration and Service Layer
// Update API_BASE_URL to your Flask backend URL

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface GenerateArtRequest {
  prompt: string;
  mode: 'text' | 'voice';
  emotion?: string;
}

interface GenerateArtResponse {
  image_url: string;
  emotion: string;
  emotion_intensity: number;
  prompt: string;
  created_at: string;
  id: string;
}

interface Artwork {
  id: string;
  image_url: string;
  emotion: string;
  prompt: string;
  created_at: string;
}

interface HistoryResponse {
  artworks: Artwork[];
  total: number;
  limit: number;
  offset: number;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return sessionStorage.getItem('emotic_token');
};

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

// Generate art from emotion
export const generateArt = async (request: GenerateArtRequest): Promise<ApiResponse<GenerateArtResponse>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/generate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate art');
    }

    return data;
  } catch (error) {
    console.error('Generate art error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate art',
    };
  }
};

// Get user's art history
export const getHistory = async (limit = 20, offset = 0): Promise<ApiResponse<HistoryResponse>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        error: 'Authentication required',
      };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/v1/history?limit=${limit}&offset=${offset}`,
      {
        headers: getAuthHeaders(),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch history');
    }

    return data;
  } catch (error) {
    console.error('Get history error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch history',
    };
  }
};

// Get user's library
export const getLibrary = async (limit = 20, offset = 0): Promise<ApiResponse<HistoryResponse>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        error: 'Authentication required',
      };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/v1/library?limit=${limit}&offset=${offset}`,
      {
        headers: getAuthHeaders(),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch library');
    }

    return data;
  } catch (error) {
    console.error('Get library error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch library',
    };
  }
};

// Login
export const login = async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Store token and user data
    if (data.success && data.token) {
      sessionStorage.setItem('emotic_token', data.token);
      sessionStorage.setItem('emotic_user', JSON.stringify(data.user));
      sessionStorage.removeItem('emotic_guest'); // Remove guest mode
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Login failed',
    };
  }
};

// Signup
export const signup = async (name: string, email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    // Store token and user data
    if (data.success && data.token) {
      sessionStorage.setItem('emotic_token', data.token);
      sessionStorage.setItem('emotic_user', JSON.stringify(data.user));
      sessionStorage.removeItem('emotic_guest'); // Remove guest mode
    }

    return data;
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Signup failed',
    };
  }
};

// Logout
export const logout = () => {
  sessionStorage.removeItem('emotic_token');
  sessionStorage.removeItem('emotic_user');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Get current user
export const getCurrentUser = () => {
  const userStr = sessionStorage.getItem('emotic_user');
  return userStr ? JSON.parse(userStr) : null;
};
