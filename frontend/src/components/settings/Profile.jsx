import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const postData = async (url) => {
    const token = localStorage.getItem('Token'); // Ensure 'accessToken' is the correct key used
    try {
        const response = await fetch(url, {
            method: 'GET', // Specify the method
            headers: {
                'Content-Type': 'application/json', // Specify the content type
                'Authorization': `Bearer ${token}`, // Include the authorization token
            },
        });
        const result = await response.json(); // Parse the JSON response
        return result; // Return the result
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await postData("http://192.168.0.126:3000/api/v1/users/current-user");
            setUserData(data.data);
            console.log(data); // You can remove this if you don't need it in the console
        };
        fetchData();
    }, []);

    return (
        <main className="content">
            <div className="container-fluid">
                <div className="header">
                    <h1 className="header-title">Settings</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/dashboard">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/profile">Settings</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Profile</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-5 col-xl-5">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="account" role="tabpanel">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-actions float-right">
                                            <a href="#" className="mr-1">
                                                <i className="align-middle" data-feather="refresh-cw" />
                                            </a>
                                            <div className="d-inline-block dropdown show">
                                                <a href="#" data-toggle="dropdown" data-display="static">
                                                    <i className="align-middle" data-feather="more-vertical" />
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="card-title mb-0">Password info</h5>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="inputPasswordCurrent">Current password</label>
                                                        <input type="password" className="form-control" id="inputPasswordCurrent" />
                                                        <small><a href="#">Forgot your password?</a></small>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputPasswordNew">New password</label>
                                                        <input type="password" className="form-control" id="inputPasswordNew" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputPasswordNew2">Verify password</label>
                                                        <input type="password" className="form-control" id="inputPasswordNew2" />
                                                    </div>

                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Save changes</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7 col-xl-7'>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-actions float-right">
                                    <a href="#" className="mr-1">
                                        <i className="align-middle" data-feather="refresh-cw" />
                                    </a>
                                    <div className="d-inline-block dropdown show">
                                        <a href="#" data-toggle="dropdown" data-display="static">
                                            <i className="align-middle" data-feather="more-vertical" />
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <h5 className="card-title mb-0">Personal info</h5>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputLastName">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputLastName"
                                                placeholder="Email"
                                                defaultValue={userData?.username || ''}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail4">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="inputEmail4"
                                            placeholder="Email"
                                            defaultValue={userData?.email || ''}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail4">Account created At: </label><br />
                                        <span className='px-2 py-1' style={{ display: "block", color: "#495057", width: "100%", border: "1px solid #ced4da", borderRadius: "0.2rem" }}> {new Date(userData?.createdAt).toLocaleString()} </span>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
