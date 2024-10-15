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
                            {data[0] && data[0].length > 0 ? (
                                data[0].slice(0, 3).map((log, index) => (
                                    <a href="#" className="list-group-item" key={log.id || index}> {/* Prefer log.id if it exists */}
                                        <div className="row no-gutters align-items-center">
                                            <div className="col-10 pl-2">
                                                <div className="text-dark">{log.action}</div>
                                                <div className="text-muted small mt-1">{new Date(log.timestamp).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <div className="row align-items-center justify-content-xl-center p-2">
                                    <p>No logs available</p> 
                                </div>
                            )}
                           
                        </div>
                        <div className="dropdown-menu-footer" style={{borderTop: "1px solid #dee2e6"}}>
                            <Link to="/log" className="text-muted">Show all logs</Link>
                        </div>
                    </div>
                </li >
            </ul>
        </>
    );
}

export default MessageDropdown