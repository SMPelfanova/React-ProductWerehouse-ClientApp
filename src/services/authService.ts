import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = 'https://localhost:7092/api/account';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const authService = {
  login: async (email: string, password: string): Promise<any> => {
    try {
      const response = await axios.post<Tokens>(`${API_URL}/login`, { email, password });
      const { accessToken, refreshToken } = response.data;
      authService.setTokens(accessToken, refreshToken);
      return jwtDecode(accessToken);
    } catch (error) {
      throw new Error('Login failed');
    }
  },
  logout: (): void => {
    authService.clearTokens();
  },
  refreshToken: async (): Promise<any> => {
    try {
      const refreshToken = authService.getRefreshToken();
      const response = await axios.post<Tokens>(`${API_URL}/refresh-token`, { refreshToken });
      const { accessToken } = response.data;
      authService.setAccessToken(accessToken);
      return jwtDecode(accessToken);
    } catch (error) {
      authService.clearTokens();
      throw new Error('Token refresh failed');
    }
  },
  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
  setAccessToken: (accessToken: string): void => {
    localStorage.setItem('accessToken', accessToken);
  },
  clearTokens: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
  getAccessToken: (): string | null => localStorage.getItem('accessToken'),
  getRefreshToken: (): string | null => localStorage.getItem('refreshToken'),
};

export default authService;
