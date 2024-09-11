import { Switch } from '@headlessui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ darkMode, setDarkMode }) => {
  const { logout } = useAuth();
  const location = useLocation();

  // Hide header on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') return null;

  return (
    <header className="bg-lightBg dark:bg-darkBg p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary dark:text-white">My App</h1>
      <div className="flex items-center">
        {/* Theme Toggle */}
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          className={`${darkMode ? 'bg-blue-600' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              darkMode ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>

        <button
          onClick={logout}
          className="ml-4 px-4 py-2 bg-secondary text-white rounded-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
