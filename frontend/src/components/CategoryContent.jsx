import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryTable from './CategoryTable';
import CategoryUser from './CategoryUser';

const CategoryContent = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className="container-fluid p-0 pt-5">
            <div className="header pl-2">
                <h1 className="header-title">
                    Category
                </h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"><span>Category</span></li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-xxl-9">
                    <CategoryTable onView={setSelectedItem} />
                </div>
                <div className="col-xxl-3">
                    <CategoryUser item={selectedItem} />
                </div>
            </div>
        </div>
    );
};

export default CategoryContent;
