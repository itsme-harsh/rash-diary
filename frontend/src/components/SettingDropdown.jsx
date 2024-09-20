import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice"; // Adjust the import path as necessary
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function SettingDropdown() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <>
            <ul className="navbar-nav">
                <li className="nav-item dropdown ml-lg-2">
                    <a className="nav-link dropdown-toggle position-relative" href="#" id="userDropdown" data-toggle="dropdown">
                        <i className="align-middle fas fa-cog"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#"><i className="align-middle mr-1 fas fa-fw fa-user"></i> View Profile</a>
                        <a className="dropdown-item" href="#"><i className="align-middle mr-1 fas fa-fw fa-cogs"></i> Settings</a>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" onClick={handleLogout}>
                            <i className="align-middle mr-1 fas fa-fw fa-arrow-alt-circle-right"></i> Sign out
                        </Link>
                    </div>
                </li>
            </ul>
        </>
    );
}

export default SettingDropdown;
