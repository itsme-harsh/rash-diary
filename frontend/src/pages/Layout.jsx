import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function Category1() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="wrapper">
      <Sidebar isOpen={sidebarOpen} />
      <div className="main">
        <Navbar toggleSidebar={toggleSidebar} />
      
      </div>
    </div>
  )
}
