import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType } from './AuthContex.types.ts';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

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

        success = true;


          // setTimeout(() => {
          //   refreshAccessToken(fetchedRefreshToken);
          // }, 1000);
           // testing the refresh token




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



  const logout = async () => {
  setAccessToken(null);
  setRefreshToken(null);
  setIsLoggedIn(false);

  try {
    await EncryptedStorage.removeItem('auth_tokens');
  } catch (error) {
  }
};

useEffect(() => {
  const loadTokens = async () => {
    try {
      const tokenData = await EncryptedStorage.getItem('auth_tokens');
      if (tokenData) {
        const { accessToken: storedAccessToken, refreshToken: storedRefreshToken } = JSON.parse(tokenData);
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
        setIsLoggedIn(true);
      }
    } catch (error) {
    }
  };

  loadTokens();
}, []);

  const verifyOTP = () => setIsVerified(true);

  const refreshAccessToken = async (token: string | null = null) => {
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

        await EncryptedStorage.setItem('auth_tokens', JSON.stringify({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        }));

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
    <AuthContext.Provider value={{ isLoggedIn, isVerified,accessToken, refreshToken, login, logout, verifyOTP, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
