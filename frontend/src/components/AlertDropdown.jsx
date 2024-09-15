import React from "react";

function AlertDropdown() {
    return (
        <>
            <ul className="navbar-nav">
                <li className="nav-item dropdown ml-lg-2">
                    <a className="nav-link dropdown-toggle position-relative" href="#" id="alertsDropdown" data-toggle="dropdown">
                        <i className="align-middle fas fa-bell"></i>
                        <span className="indicator"></span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right py-0" aria-labelledby="alertsDropdown">
                        <div className="dropdown-menu-header">4 New Notifications</div>
                        <div className="list-group">
                            <a href="#" className="list-group-item">
                                <div className="row no-gutters align-items-center">
                                    <div className="col-2">
                                        <i className="ml-1 text-danger fas fa-fw fa-bell"></i>
                                    </div>
                                    <div className="col-10">
                                        <div className="text-dark">Update completed</div>
                                        <div className="text-muted small mt-1">Restart server 12 to complete the update.</div>
                                        <div className="text-muted small mt-1">2h ago</div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="list-group-item">
                                <div className="row no-gutters align-items-center">
                                    <div className="col-2">
                                        <i className="ml-1 text-warning fas fa-fw fa-envelope-open"></i>
                                    </div>
                                    <div className="col-10">
                                        <div className="text-dark">Lorem ipsum</div>
                                        <div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
                                        <div className="text-muted small mt-1">6h ago</div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="list-group-item">
                                <div className="row no-gutters align-items-center">
                                    <div className="col-2">
                                        <i className="ml-1 text-primary fas fa-fw fa-building"></i>
                                    </div>
                                    <div className="col-10">
                                        <div className="text-dark">Login from 192.186.1.1</div>
                                        <div className="text-muted small mt-1">8h ago</div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="list-group-item">
                                <div className="row no-gutters align-items-center">
                                    <div className="col-2">
                                        <i className="ml-1 text-success fas fa-fw fa-bell-slash"></i>
                                    </div>
                                    <div className="col-10">
                                        <div className="text-dark">New connection</div>
                                        <div className="text-muted small mt-1">Anna accepted your request.</div>
                                        <div className="text-muted small mt-1">12h ago</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="dropdown-menu-footer">
                            <a href="#" className="text-muted">Show all notifications</a>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    );
}

export default AlertDropdown