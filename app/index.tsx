import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from '@/components/AppNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token on app start
    AsyncStorage.getItem('userToken').then(token => {
      if (token) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  return <AppNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
}