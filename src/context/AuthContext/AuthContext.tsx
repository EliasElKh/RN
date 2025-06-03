import React, { createContext, useState, ReactNode, useRef, useCallback } from 'react';
// import { AppState } from 'react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { AuthContextType } from './AuthContex.types.ts';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Add a default expiry (e.g., 14 min = 840000 ms)
const ACCESS_TOKEN_EXPIRE_TIME = 14 * 60 * 1000;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Call this to clear timers on logout or app close
  const clearLogoutTimer = useCallback(() => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  }, []);

  // Start logout/refresh timer when tokens are set
  const startTokenTimer = () => {
    clearLogoutTimer();
    logoutTimer.current = setTimeout(async () => {
      try {
        const tokensString = await EncryptedStorage.getItem('auth_tokens');
        console.log(tokensString);
        if (tokensString) {
          const token = JSON.parse(tokensString);
          const refreshFetchedToken = token.refreshToken;
          refreshAccessToken(refreshFetchedToken);
        }
      } catch (error) {
        console.error('Failed to retrieve tokens', error);
      }

    }, ACCESS_TOKEN_EXPIRE_TIME);
  };

  // Handle App Close: Log out & clear tokens when app is closed
    const logout = useCallback(async () => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsLoggedIn(false);
    clearLogoutTimer();
    try {
      await EncryptedStorage.removeItem('auth_tokens');
    } catch (error) { }
  }, [clearLogoutTimer]);

   const login = async (email: string, password: string) => {
    let attempt = 0;
    const maxRetries = 5;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        const response = await axios.post('https://backend-practice.eurisko.me/api/auth/login', {
          email,
          password,
        });

        if (response.data.success) {
          const { accessToken: fetchedAccessToken, refreshToken: fetchedRefreshToken } = response.data.data;
          setAccessToken(fetchedAccessToken);
          setRefreshToken(fetchedRefreshToken);
          setIsLoggedIn(true);
          await EncryptedStorage.setItem('auth_tokens', JSON.stringify({ accessToken: fetchedAccessToken, refreshToken: fetchedRefreshToken }));

          startTokenTimer();

          success = true;
        } else {
          throw new Error(response.data.message || 'Login failed.');
        }
      } catch (error) {
        attempt++;
        if (attempt >= maxRetries) {
          throw error;
        }
      }
    }
  };


  const verifyOTP = () => setIsVerified(true);

   const refreshAccessToken = async (token: string | null = null) => {
    console.log('fetching');
  const rt = token ?? refreshToken;
  if (!rt) {
    throw new Error('No refresh token available');
  }

  const maxRetries = 5;
  let attempt = 0;
  let success = false;

  while (attempt < maxRetries && !success) {
    try {
      const response = await axios.post(
        'https://backend-practice.eurisko.me/api/auth/refresh-token',
        {
          refreshToken: rt,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        console.log('fetched');

        await EncryptedStorage.setItem('auth_tokens', JSON.stringify({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        }));
        startTokenTimer();
        success = true;

        return;
      } else {
        throw new Error(response.data.message || 'Refresh token failed.');
      }
    } catch (error) {
      attempt++;

      if (attempt >= maxRetries) {
        await logout();
        throw error;
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
};


  return (
    <AuthContext.Provider value={{ isLoggedIn, isVerified, accessToken, refreshToken, login, logout, verifyOTP, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
