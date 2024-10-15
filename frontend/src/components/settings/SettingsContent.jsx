import React from 'react'
import SideTabList from './SideTabList'

export default function settingsContent() {
    return (
        <main className="content">
            <div className="container-fluid">
                <div className="header">
                    <h1 className="header-title">
                        Settings
                    </h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="dashboard-default.html">Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Settings</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-3 col-xl-2">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Profile Settings</h5>
                            </div>
                           <SideTabList/>
                        </div>
                    </div>
                    <div className="col-md-9 col-xl-10">
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
                                        <h5 className="card-title mb-0">Public info</h5>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <div className="form-group">
                                                        <label htmlFor="inputUsername">Username</label>
                                                        <input type="text" className="form-control" id="inputUsername" placeholder="Username" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputUsername">Biography</label>
                                                        <textarea rows={2} className="form-control" id="inputBio" placeholder="Tell something about yourself" defaultValue={""} />
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-4">
                                                    <div className="text-center">
                                                        <img alt="Chris Wood" src="img/avatars/avatar.jpg" className="rounded-circle img-responsive mt-2" width={128} height={128} />
                                                        <div className="mt-2">
                                                            <span className="btn btn-primary"><i className="fas fa-upload" /> Upload</span>
                                                        </div>
                                                        <small>For best results, use an image at least 128px by 128px in .jpg
                                                            format</small>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <button type="submit" className="btn btn-primary">Save changes</button>
                                        </form>
                                    </div>
                                </div>
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
                                        <h5 className="card-title mb-0">Private info</h5>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputFirstName">First name</label>
                                                    <input type="text" className="form-control" id="inputFirstName" placeholder="First name" />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputLastName">Last name</label>
                                                    <input type="text" className="form-control" id="inputLastName" placeholder="Last name" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputEmail4">Email</label>
                                                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputAddress">Address</label>
                                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputAddress2">Address 2</label>
                                                <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputCity">City</label>
                                                    <input type="text" className="form-control" id="inputCity" />
                                                </div>
                                                {/* <div className="form-group col-md-4">
                                                    <label htmlFor="inputState">State</label>
                                                    <select id="inputState" className="form-control">
                                                        <option selected>Choose...</option>
                                                        <option>...</option>
                                                    </select>
                                                </div> */}
                                                <div className="form-group col-md-2">
                                                    <label htmlFor="inputZip">Zip</label>
                                                    <input type="text" className="form-control" id="inputZip" />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Save changes</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="password" role="tabpanel">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Password</h5>
                                        <form>
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
                                            <button type="submit" className="btn btn-primary">Save changes</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
