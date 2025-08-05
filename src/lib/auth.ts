export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const addCacheBuster = (url: string) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_t=${Date.now()}`;
};

// Clear any cached auth data
export const clearAuthCache = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
};

// Mock login for development/testing
export const mockLogin = async () => {
  console.log('🔐 Attempting mock login...');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";
  console.log('🌐 Using API URL:', apiUrl);
  
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'john.doe@example.com',
      password: 'password123',
    }),
  });

  console.log('📡 Login response status:', response.status);
  
  if (response.ok) {
    const data = await response.json();
    console.log('✅ Login successful, user:', data.user?.firstName);
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('💾 Token saved to localStorage');
    }
    return data;
  }
  
  const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
  console.error('❌ Login failed:', response.status, errorData.message);
  throw new Error(`Login failed: ${errorData.message}`);
};