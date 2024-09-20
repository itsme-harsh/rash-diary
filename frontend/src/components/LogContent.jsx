import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logger } from "../features/auth/authSlice";

export default function LogContent() {
    const dispatch = useDispatch();
    const logs = useSelector((state) => state.auth.logs);

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 4; // Adjust the number of logs per page
    const [filteredLogs, setFilteredLogs] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?._id;

        if (userId) {
            dispatch(logger(userId)).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        if (logs[0]) {
            setFilteredLogs(logs[0]);
        }
    }, [logs]);

    const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="content">
            <div className="container-fluid">
                <div className="header">
                    <h1 className="header-title">All Logs</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item"><Link to="/">Settings</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">All Logs</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="ml-0 m-2">Log history</h3>
                            </div>
                            <div className="card-body">
                                <div className="my-2">
                                    {filteredLogs.length === 0 ? (
                                        <div>No logs available.</div>
                                    ) : (
                                        currentLogs.map((log, index) => (
                                            <div className='my-2' key={index}>
                                                <i className="ion ion-ios-time mx-2"></i>
                                                {new Date(log.timestamp).toLocaleString()}
                                                <br />
                                                <i className="ion ion-ios-arrow-round-forward mx-2"></i>
                                                {log.action}
                                                <br />
                                                <i className="ion ion-ios-arrow-round-forward mx-2"></i>
                                                From: {log.ipAddress}
                                                <br />
                                                <i className="ion ion-ios-arrow-round-forward mx-2"></i>
                                                User Agent: {log.userAgent}
                                                <hr />
                                            </div>
                                        ))
                                    )}
                                </div>
                                
                                {/* Pagination Controls */}
                                <div className="pagination">
                                    <span className='' onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}>
                                        <i className="ion ion-ios-arrow-dropleft-circle mx-2"></i>
                                    </span>
                                   
                                    <span> Page {currentPage} of {totalPages} </span>

                                    <span onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}>
                                        <i className="ion icon-lg ion-ios-arrow-dropright-circle mx-2"></i>
                                    </span>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
