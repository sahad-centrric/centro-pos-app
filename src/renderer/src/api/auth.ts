import api from '../services/api'

// Frappe login credentials interface
interface LoginCredentials {
  username: string;
  password: string;
}

interface FrappeLoginResponse {
  message: string;          
  user_id: string;          
  full_name: string;        
  session_id: string;       
  user_type: string;       
}

interface SessionResponse {
  message: string;
  full_name: string;
  user_id?: string;
}

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<FrappeLoginResponse> => {
    try {
      const response = await api.post('/login', {
        usr: credentials.username,
        pwd: credentials.password,
      });

    // ✅ Add this logging to see the response
      console.log('Login Response:', response.data);
      console.log('Session ID:', response.data.session_id);
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // ✅ Add this function
  getCurrentUser: async (): Promise<SessionResponse> => {
    try {
      const response = await api.get('/frappe.auth.get_logged_user');
      return response.data;
    } catch (error) {
      console.error('Session validation error:', error);
      throw error;
    }
  },
};

export type { LoginCredentials, FrappeLoginResponse };