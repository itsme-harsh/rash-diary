import React from 'react'

export default function CategoryUser() {
  return (
    <div className="card">
            <div className="card-header">
                <div className="card-actions float-right">
                    {/* <a href="#" className="mr-1">
                        <i className="align-middle" data-feather="refresh-cw"></i>
                    </a> */}
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
                <h5 className="card-title mb-0">Angelica Ramos</h5>
            </div>
            <div className="card-body">
                <div className="row no-gutters">
                    <div className="col-sm-3 col-xl-12 col-xxl-4 text-center">
                        <img src="img/avatars/avatar-3.jpg" width="64" height="64" className="rounded-circle mt-2" alt="Angelica Ramos" />
                    </div>
                    <div className="col-sm-9 col-xl-12 col-xxl-8">
                        <strong>About me</strong>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
                    </div>
                </div>

                <table className="table table-sm my-2">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>Angelica Ramos</td>
                        </tr>
                        <tr>
                            <th>Company</th>
                            <td>Helping Hand</td>
                        </tr>
                        <tr>
                            <th>Occupation</th>
                            <td>Desktop Publisher</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>angelica@ramos.com</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>+123456789</td>
                        </tr>
                        <tr>
                            <th>Website</th>
                            <td>helpinghand.com</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td><span className="badge badge-success">Active</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
