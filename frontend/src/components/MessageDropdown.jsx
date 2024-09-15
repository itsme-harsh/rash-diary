import React from "react";

function MessageDropdown() {
    return (
        <>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown active">
                    <a className="nav-link dropdown-toggle position-relative" href="#" id="messagesDropdown" data-toggle="dropdown">
                        <i className="align-middle fas fa-envelope-open"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right py-0" aria-labelledby="messagesDropdown">
                        <div className="dropdown-menu-header">
                            <div className="position-relative">4 New Messages</div>
                        </div>
                        <div className="list-group">
                            <a href="#" className="list-group-item">
                                <div className="row no-gutters align-items-center">
                                    <div className="col-2">
                                        <img src="img/avatars/avatar-5.jpg" className="avatar img-fluid rounded-circle" alt="Michelle Bilodeau" />
                                    </div>
                                    <div className="col-10 pl-2">
                                        <div className="text-dark">Michelle Bilodeau</div>
                                        <div className="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu tortor.</div>
                                        <div className="text-muted small mt-1">5m ago</div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="list-group-item">
                                <div className="row no-gutters align-items-center">
                                    <div className="col-2">
                                        <img src="img/avatars/avatar-3.jpg" className="avatar img-fluid rounded-circle" alt="Kathie Burton" />
                                    </div>
                                    <div className="col-10 pl-2">
                                        <div className="text-dark">Kathie Burton</div>
                                        <div className="text-muted small mt-1">Pellentesque auctor neque nec urna.</div>
                                        <div className="text-muted small mt-1">30m ago</div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="list-group-item">
                                <div className="row no-gutters align-items-center">
                                    <div className="col-2">
                                        <img src="img/avatars/avatar-2.jpg" className="avatar img-fluid rounded-circle" alt="Alexander Groves" />
                                    </div>
                                    <div className="col-10 pl-2">
                                        <div className="text-dark">Alexander Groves</div>
                                        <div className="text-muted small mt-1">Curabitur ligula sapien euismod vitae.</div>
                                        <div className="text-muted small mt-1">2h ago</div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="list-group-item">
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
                            </a>
                        </div>
                        <div className="dropdown-menu-footer">
                            <a href="#" className="text-muted">Show all messages</a>
                        </div>
                    </div>
                </li >
            </ul>
        </>
    );
}

export default MessageDropdown