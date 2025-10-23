import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleRedirect } from '../utils/redirects';

const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = handleRedirect(location.pathname);
    if (redirectPath) {
      // Use replace to avoid adding to history stack (301 redirect behavior)
      navigate(redirectPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default RedirectHandler;