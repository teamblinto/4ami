// Environment configuration
export const config = {
  // Backend API Base URL
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://167.71.201.234',
  
  // API Endpoints
  endpoints: {
    auth: {
      signin: '/api/v1/auth/signin',
      customerAdminSignup: '/api/v1/auth/customer-admin-signup',
      verifyEmail: '/api/v1/auth/verify-email',
    },
    users: {
      invite: '/api/v1/users/invite',
    }
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${config.API_BASE_URL}${endpoint}`;
};

// Helper function to get auth headers
export const getAuthHeaders = (authToken?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // For ngrok
  };
  
  if (authToken) {
    headers['Authorization'] = authToken;
  }
  
  return headers;
};
