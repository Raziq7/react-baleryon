'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const useAuthToken = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      setIsLogin(!!token);
    } catch (err) {
      console.error('Error accessing localStorage:', err);
      setIsLogin(false);
    }
  }, [user]);

  return isLogin;
};

export default useAuthToken;
