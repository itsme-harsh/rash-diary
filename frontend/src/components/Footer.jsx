// src/components/Footer.jsx
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // Hide footer on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') return null;

  return (
    <footer className="bg-lightBg dark:bg-darkBg text-center p-4">
      <p className="text-gray-500 dark:text-gray-400">© 2024 My App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
