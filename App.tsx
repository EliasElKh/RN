import React from 'react';
import { Navigator } from './src/Navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext/ThemeContext';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
          <Navigator />
      </ThemeProvider>
    </AuthProvider>
  );
}
