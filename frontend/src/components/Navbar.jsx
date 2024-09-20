import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logger } from '../features/auth/authSlice';
import MessageDropdown from "./MessageDropdown";
import AlertDropdown from './AlertDropdown';
import SettingDropdown from './SettingDropdown';
import FullScreen from './FullScreen';

const Navbar = ({ toggleSidebar }) => {
    const dispatch = useDispatch();
    const logs = useSelector((state) => state.auth.logs);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user._id : null;

        // Log the user action only if userId exists
        if (userId) {
            dispatch(logger(userId)).then(() => {
                setLoading(false); // Set loading to false once the action is complete
            });
        } else {
            setLoading(false); // If no userId, set loading to false
        }
    }, [dispatch]);

    // If loading, show a loading indicator or placeholder
    if (loading) {
        return (
            <nav className="navbar navbar-expand navbar-theme">
                <a className="sidebar-toggle d-flex mr-2" onClick={toggleSidebar}>
                    <i className="hamburger align-self-center"></i>
                </a>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </nav>
        );
    }

    return (
        <nav className="navbar navbar-expand navbar-theme">
            <a className="sidebar-toggle d-flex mr-2" onClick={toggleSidebar}>
                <i className="hamburger align-self-center"></i>
            </a>
            <form className="form-inline d-none d-sm-inline-block">
                <input className="form-control form-control-lite" type="text" placeholder="Search projects..." />
            </form>
            <div className="navbar-collapse collapse">
                <FullScreen />
                <MessageDropdown data={logs} />
                <AlertDropdown />
                <SettingDropdown />
            </div>
        </nav>
    );
};

export default Navbar;
