// import { getRelations } from '../features/relation/relationSlice';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
// import { useDispatch, useSelector } from "react-redux";

// Register Chart.js elements
Chart.register(ArcElement, Tooltip, Legend);

// Register Chart.js elements
const PieChart = ({ people }) => {
    // Prepare the data for the Pie chart
    const data = {
        labels: people.map(relation => relation.relationName), // Extract relation names for labels
        datasets: [
            {
                data: people.map(relation => relation.people.length), // Extract number of people for data
                backgroundColor: [
                    '#007bff', // Colors for the slices
                    '#ffc107',
                    '#dc3545',
                    '#E8EAED',
                    '#28a745', // Additional colors as needed
                ],
                borderColor: 'transparent',
            },
        ],
    };

    // Define chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%', // Donut style
        plugins: {
            legend: {
                display: false, // Hide legend
            },
        },
    };

    // Render the Pie chart
    return <Pie data={data} options={options} />;
};



const MainContent = ({ data, people }) => {

    const totalPeople = people.reduce((total, relation) => {
        return total + relation.people.length;
    }, 0);


    return (
        <div className="container-fluid p-0 pt-5">
            <div className="header pl-3">
                <h1 className="header-title">
                    Welcome to Rash-diary
                </h1>
                <p className="header-subtitle">Capture your ideas and create lasting memories.</p>
            </div>
            <div className="row">
                <div className="col-xl-12 col-xxl-12 d-flex">
                    <div className="w-100">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card">
                                    <Link to="/category2" style={{ textDecoration: "none" }}>
                                        <div className="card-body custom-card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Category</h5>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <i className="align-middle" data-feather="book"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">{data.length}</h1>
                                            <div className="mb-0">
                                                <span className="text-danger"> <i className="mdi mdi-arrow-bottom-right"></i></span>
                                                <span className="text-muted">Available categories, click to view</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card">
                                    <Link to="/" style={{ textDecoration: "none" }}>
                                        <div className="card-body custom-card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">People</h5>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <i className="align-middle" data-feather="user"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">{totalPeople}</h1>
                                            <div className="mb-0">
                                                <span className="text-danger"> <i className="mdi mdi-arrow-bottom-right"></i></span>
                                                <span className="text-muted">Available people, click to view</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card">
                                    <Link to="/" style={{ textDecoration: "none" }}>
                                        <div className="card-body custom-card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Notes</h5>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <i className="align-middle" data-feather="bookmark"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">0</h1>
                                            <div className="mb-0">
                                                <span className="text-success"> <i className="mdi mdi-arrow-bottom-right"></i> </span>
                                                <span className="text-muted">Available notes, click to view</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-xl-6 col-xxl-7">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <div className="card-actions float-right">
                                <a href="#" className="mr-1">
                                    <i className="align-middle" data-feather="refresh-cw"></i>
                                </a>
                                <div className="d-inline-block dropdown show">
                                    <a href="#" data-toggle="dropdown" data-display="static">
                                        <i className="align-middle" data-feather="more-vertical"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                            <h5 className="card-title mb-0">Recent Movement</h5>
                        </div>
                        <div className="card-body pt-2 pb-3"> */}
                {/* This is where you'd add a chart or other content */}
                {/* <div id="chart-container" style={{ height: 300 }}> */}
                {/* Chart or other visualization would go here */}
                {/* </div>
                        </div>
                    </div>
                </div> */}
            </div>

            <div className="row">
                {/* <div className="col-xl-6">
                    <div className="card flex-fill">
                        <div className="card-header">
                            <div className="card-actions float-right">
                                <a href="#" className="mr-1">
                                    <i className="align-middle" data-feather="refresh-cw"></i>
                                </a>
                                <div className="d-inline-block dropdown show">
                                    <a href="#" data-toggle="dropdown" data-display="static">
                                        <i className="align-middle" data-feather="more-vertical"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                            <h5 className="card-title mb-0">Top Selling Products</h5>
                        </div>
                        <table className="table table-hover my-0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th className="d-none d-xl-table-cell">Category</th>
                                    <th className="d-none d-xl-table-cell">Price</th>
                                    <th className="d-none d-md-table-cell">Sold</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Product 1</td>
                                    <td className="d-none d-xl-table-cell">Category 1</td>
                                    <td className="d-none d-xl-table-cell">$29.99</td>
                                    <td className="d-none d-md-table-cell">120</td>
                                    <td>$3,599.00</td>
                                </tr>
                                <tr>
                                    <td>Product 2</td>
                                    <td className="d-none d-xl-table-cell">Category 2</td>
                                    <td className="d-none d-xl-table-cell">$49.99</td>
                                    <td className="d-none d-md-table-cell">80</td>
                                    <td>$3,999.00</td>
                                </tr>
                                <tr>
                                    <td>Product 2</td>
                                    <td className="d-none d-xl-table-cell">Category 2</td>
                                    <td className="d-none d-xl-table-cell">$49.99</td>
                                    <td className="d-none d-md-table-cell">80</td>
                                    <td>$3,999.00</td>
                                </tr>
                                <tr>
                                    <td>Product 2</td>
                                    <td className="d-none d-xl-table-cell">Category 2</td>
                                    <td className="d-none d-xl-table-cell">$49.99</td>
                                    <td className="d-none d-md-table-cell">80</td>
                                    <td>$3,999.00</td>
                                </tr>
                                <tr>
                                    <td>Product 2</td>
                                    <td className="d-none d-xl-table-cell">Category 2</td>
                                    <td className="d-none d-xl-table-cell">$49.99</td>
                                    <td className="d-none d-md-table-cell">80</td>
                                    <td>$3,999.00</td>
                                </tr>
                                <tr>
                                    <td>Product 2</td>
                                    <td className="d-none d-xl-table-cell">Category 2</td>
                                    <td className="d-none d-xl-table-cell">$49.99</td>
                                    <td className="d-none d-md-table-cell">80</td>
                                    <td>$3,999.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}

                {/* <div className="col-xl-4">
                    <div className="card flex-fill">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Monthly Sales</h5>
                        </div>
                        <div className="card-body">
                            <div id="monthly-sales" style={{ height: 300 }}> */}
                {/* Add chart here */}
                {/* </div>
                        </div>
                    </div>
                </div> */}
            </div>

            <div className="row">
                <div className="col-12 col-lg-6 col-xxl-3 d-flex">
                    <div className="card flex-fill">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Category</h5>
                        </div>
                        <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                                <div className="py-3">
                                    <div className="chart chart-xs">
                                        {/* Add chart here */}
                                        <PieChart people={people} />
                                    </div>
                                </div>
                                <table className="table mb-0">
                                    <tbody>
                                        {
                                        people.map((relation) => {
                                            const peopleCount = relation.people.length;
                                            const percentage = totalPeople > 0 ? ((peopleCount / totalPeople) * 100).toFixed(2) : 0;

                                            return (
                                                <tr key={relation.relationId}>
                                                    <td>{relation.relationName}</td>
                                                    <td className="text-right">{percentage}%</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 col-xxl-3 d-flex">
                    <div className="card flex-fill">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Source / Medium</h5>
                        </div>
                        <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                                <div className="py-3">
                                    <div className="chart chart-xs">
                                        {/* Add chart here */}

                                    </div>
                                </div>
                                <table className="table mb-0">
                                    <tbody>
                                        <tr>
                                            <td>Organic Search</td>
                                            <td className="text-right">34%</td>
                                        </tr>
                                        <tr>
                                            <td>Direct</td>
                                            <td className="text-right">25%</td>
                                        </tr>
                                        <tr>
                                            <td>Referral</td>
                                            <td className="text-right">21%</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td className="text-right">20%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 col-xxl-3 d-flex">
                    <div className="card flex-fill">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Social Media Traffic</h5>
                        </div>
                        <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                                <div className="py-3">
                                    <div className="chart chart-xs">
                                        {/* Add chart here */}
                                    </div>
                                </div>
                                <table className="table mb-0">
                                    <tbody>
                                        <tr>
                                            <td>Facebook</td>
                                            <td className="text-right">42%</td>
                                        </tr>
                                        <tr>
                                            <td>Twitter</td>
                                            <td className="text-right">34%</td>
                                        </tr>
                                        <tr>
                                            <td>Instagram</td>
                                            <td className="text-right">22%</td>
                                        </tr>
                                        <tr>
                                            <td>LinkedIn</td>
                                            <td className="text-right">12%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 col-xxl-3 d-flex">
                    <div className="card flex-fill">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Audience Overview</h5>
                        </div>
                        <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                                <div className="py-3">
                                    <div className="chart chart-xs">
                                        {/* Add chart here */}
                                    </div>
                                </div>
                                <table className="table mb-0">
                                    <tbody>
                                        <tr>
                                            <td>Returning Visitors</td>
                                            <td className="text-right">57%</td>
                                        </tr>
                                        <tr>
                                            <td>New Visitors</td>
                                            <td className="text-right">43%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MainContent;
