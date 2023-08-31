
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsMobileScreen } from '../Slices/screenSlice';

const MOBILE_WIDTH = 768; 

const useMobileScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobileScreen(window.innerWidth <= MOBILE_WIDTH));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return null; 
};

export default useMobileScreen;
