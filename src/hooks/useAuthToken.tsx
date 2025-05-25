import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store'; // Update this path if needed

const useAuthToken = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
    } catch (err) {
      console.error('Error accessing localStorage:', err);
      setIsLogin(false);
    }
  }, [user]);

  return isLogin;
};

export default useAuthToken;
