// src/components/Sidebar.jsx
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  // Hide sidebar on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') return null;

  return (
    <aside className="bg-lightBg dark:bg-darkBg w-64 p-4 shadow-md">
      <nav>
        <ul>
          <li className="py-2">
            <a href="/dashboard" className="text-primary dark:text-white">Dashboard</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
