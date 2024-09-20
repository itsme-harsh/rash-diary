import React from 'react'

export default function CategoryUser({ item }) {
    if (!item) {
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="mb-0">Preview</h4>
                    <span>Click view button from action</span>
                </div>
            </div>
        );
    }
    // console.log(item)
    return (
        <div className="card">
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
                <h5 className="card-title mb-0">Preview</h5>
                {/* <span>
                    <button type="button" className="btn btn-sm pr-1">
                        <i className="align-middle fas bg-primary py-2 px-2 fas text-white fa-pen"></i>
                    </button>
                    <button type="button" className="btn btn-sm pr-1">
                        <i className="align-middle bg-danger py-2 px-2 fas text-white fa-trash"></i>
                    </button>
                </span> */}
            </div>
            <div className="card-body">
                <div className="position-absolute p-2 " style={{ width: "28%", top: "0px", right: "0px" }}>
                    <button className="btn btn-sm bg-primary mr-2"><i className="fas fa-edit text-white"></i></button>
                    <button className="btn btn-sm bg-danger"><i className="fas fa-trash text-white"></i></button>
                </div>
                {/* <div className="row no-gutters">
                    <div className="col-sm-3 col-xl-12 col-xxl-4 text-center">
                        <img src="img/avatars/avatar-3.jpg" width="64" height="64" className="rounded-circle mt-2" alt="Angelica Ramos" />
                    </div>
                    <div className="col-sm-9 col-xl-12 col-xxl-8">
                        <strong>About me</strong>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
                    </div>
                </div> */}

                <table className="table table-sm my-2">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{item.name}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{item.description ? item.description : "No description"}</td>
                        </tr>
                        <tr>
                            <th>Created At</th>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <th>Updated At</th>
                            <td>{new Date(item.updatedAt).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <th>Birthday Reminder</th>
                            <td><span className={`badge ${item.birthdayReminder ? 'badge-success' : 'badge-danger'}`}>
                                {item.birthdayReminder ? 'Active' : 'Inactive'}
                            </span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
