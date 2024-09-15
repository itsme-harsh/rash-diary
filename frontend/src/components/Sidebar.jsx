import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import feather from 'feather-icons';

const Sidebar = ({ isOpen }) => {

    const { user } = useSelector(state => state.auth);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        feather.replace();
    }, []);

    return (
        <nav id="sidebar" className={`sidebar js-sidebar ${isOpen ? 'toggled' : ''}`}>
            <div className="sidebar-content js-simplebar">

                <Link className="sidebar-brand" to="/">
                    Rash-diary
                </Link>

                <div className="sidebar-user">
                    <img src="img/avatars/avatar.jpg" className="img-fluid rounded-circle mb-2" alt="Linda Miller" />
                    <div className="font-weight-bold">{user.username}</div>
                    <small>Front-end Developer</small>
                </div>

                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                        Dashboard
                    </li>

                    <li className="sidebar-item active">
                        <Link className="sidebar-link" to="/dashboard">
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Dashboard</span>
                        </Link>
                    </li>

                    <li className="sidebar-header">
                        Services
                    </li>

                    <li className="sidebar-item">
                        <Link className="sidebar-link" data-toggle="collapse" onClick={toggleDropdown}>
                            <i className="align-middle" data-feather="book"></i> <span className="align-middle">Tree</span>
                        </Link>
                        <ul id="services" className={`sidebar-dropdown list-unstyled collapse ${isDropdownOpen ? 'show' : ''}`} data-parent="#sidebar">
							<li className="sidebar-item"><Link className="sidebar-link" to="/category1">Category Table</Link></li>
                            <li className="sidebar-item"><Link className="sidebar-link" to="/category2">Category Cards</Link></li>
							<li className="sidebar-item"><Link className="sidebar-link" to="/">Add node</Link></li>
						</ul>

                    </li>

                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/">
                            <i className="align-middle" data-feather="check-square"></i> <span className="align-middle">Forms</span>
                        </Link>
                    </li>

                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/">
                            <i className="align-middle" data-feather="list"></i> <span className="align-middle">Tables</span>
                        </Link>
                    </li>

                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/">
                            <i className="align-middle" data-feather="grid"></i> <span className="align-middle">Cards</span>
                        </Link>
                    </li>

                    <li className="sidebar-header">
                        Extras
                    </li>

                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/">
                            <i className="align-middle" data-feather="settings"></i> <span className="align-middle">Settings</span>
                        </Link>
                    </li>

                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/">
                            <i className="align-middle" data-feather="user"></i> <span className="align-middle">Profile</span>
                        </Link>
                    </li>

                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/">
                            <i className="align-middle" data-feather="help-circle"></i> <span className="align-middle">Help</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
