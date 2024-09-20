import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import CategoryContent2 from '../components/CategoryContent2';

export default function Category1() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Change loading state after 1 second
    }, 100);
    return () => clearTimeout(timer); // Cleanup to avoid memory leaks
  }, []);

  return (
    <div className="wrapper">
      <Sidebar isOpen={sidebarOpen} />
      <div className="main">
        <Navbar toggleSidebar={toggleSidebar} />
        {loading ?
          <div className="splash active">
            <div className="splash-icon"></div>
          </div>
          :
          <CategoryContent2 />}
      </div>
    </div>
  )
}
