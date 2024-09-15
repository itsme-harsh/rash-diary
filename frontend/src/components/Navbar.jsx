import React from 'react';
import MessageDropdown from "./MessageDropdown"
import AlertDropdown from './AlertDropdown';
import SettingDropdown from './SettingDropdown';


const Navbar = ({ toggleSidebar }) => {

    return (
        <nav className="navbar navbar-expand navbar-theme">
            <a className="sidebar-toggle d-flex mr-2" onClick={toggleSidebar}>
                <i className="hamburger align-self-center"></i>
            </a>
            <form className="form-inline d-none d-sm-inline-block">
                <input className="form-control form-control-lite" type="text" placeholder="Search projects..." />
            </form>
            <div className="navbar-collapse collapse">
                
                    <MessageDropdown />

                    <AlertDropdown />

                    <SettingDropdown />
                
            </div>
        </nav>
    );
};

export default Navbar;
