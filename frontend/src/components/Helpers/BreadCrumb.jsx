import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ title, breadcrumbItems }) => {
    return (
        <div className="header pl-3 pr-3 d-flex justify-content-between align-items-center">
            <div>
                <h1 className="header-title">{title}</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {breadcrumbItems.map((item, index) => (
                            <li
                                className={`breadcrumb-item ${index === breadcrumbItems.length - 1 ? 'active' : ''}`}
                                key={index}
                                aria-current={index === breadcrumbItems.length - 1 ? 'page' : undefined}
                            >
                                {item.link ? (
                                    <Link to={item.link}>{item.label}</Link>
                                ) : (
                                    <span>{item.label}</span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
            {/* <button className="btn btn-primary" onClick={onAddClick}>Add</button> */}
        </div>
    );
};

export default BreadCrumb;
