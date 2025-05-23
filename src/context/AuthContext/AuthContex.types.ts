
export interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isVerified: boolean;
  verifyOTP: () => void;
  accessToken: string | null;
  refreshToken: string | null;
  refreshAccessToken: () => Promise<void>;
}
