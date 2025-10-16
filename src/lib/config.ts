// Environment configuration
export const config = {
  // Backend API Base URL
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://167.71.201.234/api/v1',
  
  
  // API Endpoints
  endpoints: {
    auth: {
      signin: '/auth/signin',
      customerAdminSignup: '/auth/customer-admin-signup',
      verifyEmail: '/auth/verify-email',
    },
    users: {
      invite: '/users/invite',
    },
    companies: {
      register: '/companies/register',
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
  };
  
  // Only include ngrok header when targeting an ngrok URL to avoid CORS issues elsewhere
  try {
    if (config.API_BASE_URL.includes('ngrok')) {
      headers['ngrok-skip-browser-warning'] = 'true';
    }
  } catch {}

  if (authToken) {
    headers['Authorization'] = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;
  }
  
  return headers;
};
