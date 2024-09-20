import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import LogContent from "../components/LogContent"

export default function Log() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    return (
        <div className="wrapper">
            <Sidebar isOpen={sidebarOpen} />
            <div className="main">
                <Navbar toggleSidebar={toggleSidebar} />
                <LogContent />
            </div>
        </div>
    )
}
