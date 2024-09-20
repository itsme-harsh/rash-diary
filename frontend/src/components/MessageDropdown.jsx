import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function MessageDropdown({ data }) {

    if (!Array.isArray(data)) {
        return null; // or handle error appropriately
    }

    return (
        <>
            <ul className="navbar-nav">
                <li className="nav-item dropdown active">
                    <a className="nav-link dropdown-toggle position-relative" href="#" id="messagesDropdown" data-toggle="dropdown">
                        <i className="align-middle fas fa-user-clock"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right py-0" aria-labelledby="messagesDropdown">
                        <div className="dropdown-menu-header">
                            <div className="position-relative">Logs</div>
                        </div>
                        <div className="list-group">
                           {data[0].slice(0, 3).map((log,index) => (
                            <a href="#" className="list-group-item" key={index}> {/* Use log.id for a unique key */}
                                <div className="row no-gutters align-items-center">
                                    <div className="col-10 pl-2" >
                                        <div className="text-dark">{log.action}</div>
                                        <div className="text-muted small mt-1">{new Date(log.timestamp).toLocaleString()}</div>
                                    </div>
                                </div>
                            </a>
                        ))}
                            {/* <a href="#" className="list-group-item">
                                <div className="row no-gutters align-items-center">
                                    <div className="col-2">
                                        <img src="img/avatars/avatar-4.jpg" className="avatar img-fluid rounded-circle" alt="Daisy Seger" />
                                    </div>
                                    <div className="col-10 pl-2">
                                        <div className="text-dark">Daisy Seger</div>
                                        <div className="text-muted small mt-1">Aenean tellus metus, bibendum sed, posuere ac, mattis non.</div>
                                        <div className="text-muted small mt-1">5h ago</div>
                                    </div>
                                </div>
                            </a> */}
                        </div>
                        <div className="dropdown-menu-footer">
                            <Link to="/log" className="text-muted">Show all logs</Link>
                        </div>
                    </div>
                </li >
            </ul>
        </>
    );
}

export default MessageDropdown