import React from "react";

function SettingDropdown() {
    return (
        <>
            <ul className="navbar-nav">
                <li className="nav-item dropdown ml-lg-2">
                    <a className="nav-link dropdown-toggle position-relative" href="#" id="userDropdown" data-toggle="dropdown">
                        <i className="align-middle fas fa-cog"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#"><i className="align-middle mr-1 fas fa-fw fa-user"></i> View Profile</a>
                        <a className="dropdown-item" href="#"><i className="align-middle mr-1 fas fa-fw fa-comments"></i> Contacts</a>
                        <a className="dropdown-item" href="#"><i className="align-middle mr-1 fas fa-fw fa-chart-pie"></i> Analytics</a>
                        <a className="dropdown-item" href="#"><i className="align-middle mr-1 fas fa-fw fa-cogs"></i> Settings</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#"><i className="align-middle mr-1 fas fa-fw fa-arrow-alt-circle-right"></i> Sign out</a>
                    </div>
                </li>
            </ul>
        </>
    );
}

export default SettingDropdown