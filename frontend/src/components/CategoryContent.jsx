import React from 'react'
import { Link } from 'react-router-dom'
import CategoryTable from './CategoryTable'
import CategoryUser from './CategoryUser'

export default function CategoryContent() {
    return (
        <div className="container-fluid p-0 pt-5">
            <div className="header pl-2">
                <h1 className="header-title">
                    Category
                </h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"><span>category</span></li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-xxl-9">
                    <CategoryTable />
                </div>
                <div className="col-xxl-3">
                    <CategoryUser />
                </div>
            </div>
        </div>
    )
}
