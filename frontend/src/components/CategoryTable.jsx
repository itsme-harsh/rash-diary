import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

// Sample data
const clients = [
    { id: 1, name: 'Garrett Winters', company: 'Good Guys', email: 'garrett@winters.com', status: 'Active' },
    { id: 2, name: 'Ashton Cox', company: 'Levitz Furniture', email: 'ashton@cox.com', status: 'Active' },
    { id: 3, name: 'Sonya Frost', company: 'Child World', email: 'sonya@frost.com', status: 'Inactive' },
    { id: 4, name: 'Jena Gaines', company: 'Helping Hand', email: 'jena@gaines.com', status: 'Inactive' },
    { id: 5, name: 'Garrett Winters', company: 'Good Guys', email: 'garrett@winters.com', status: 'Active' },
    { id: 6, name: 'Ashton Cox', company: 'Levitz Furniture', email: 'ashton@cox.com', status: 'Active' },
    { id: 7, name: 'Sonya Frost', company: 'Child World', email: 'sonya@frost.com', status: 'Inactive' },
    { id: 8, name: 'Jena Gaines', company: 'Helping Hand', email: 'jena@gaines.com', status: 'Inactive' },
    // { id: 8, name: 'Jena Gaines', company: 'Helping Hand', email: 'jena@gaines.com', status: 'Inactive', avatar: 'img/avatars/avatar.jpg' },
];

const handleUpdate = (id) =>{
    alert(id)
}

const handleDelete = (id) =>{
    alert(id)
}

const columns = [
    {
        name: 'No.',
        selector: row => row.id,
        sortable: true,
        width: '80px'
    },
    // {
    //     name: '#',
    //     cell: row => (
    //         <img
    //             src={row.avatar}
    //             width="32"
    //             height="32"
    //             className="rounded-circle my-n1"
    //             alt="Avatar"
    //         />
    //     ),
    //     width: '60px'
    // },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Company',
        selector: row => row.company,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Status',
        cell: row => (
            <span className={`badge badge-${row.status === 'Active' ? 'success' :  'danger' }`}>
                {row.status}
            </span>
        ),
        sortable: true,
    },
    {
        name: 'action',
        cell: row => (
            <>
            <button
                type="button"
                className="btn btn-sm"
                onClick={() => handleUpdate(row.id)} // Replace with your delete handler
            >
                <i className="align-middle fas fa-fw fa-pen"></i>
            </button>
            &nbsp;&nbsp;
            <button
                type="button"
                className="btn btn-sm"
                onClick={() => handleDelete(row.id)} // Replace with your delete handler
            >
                <i className="align-middle fas fa-fw fa-trash"></i>
            </button>
            </>
        )
    }
];

const CategoryTable = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            {show ? <><div className="modal fade show d-block absolute" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content border">
                        <div className="modal-header">
                            <h5 className="modal-title">ADD Node</h5>
                            <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body m-3">
                            <p className="mb-0">
                                Use Bootstrap’s JavaScript modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div></> : ""}



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
                            <div className="dropdown-menu dropdown-menu-right" style={{ position: "absolute", right: "15px", top: "3px" }}>
                                <a className="dropdown-item" onClick={handleShow} href="#">ADD</a>
                            </div>
                        </div>
                    </div>
                    <h5 className="card-title mb-0">Clients</h5>
                </div>
                <div className="card-body">
                    <DataTable
                        columns={columns}
                        data={clients}
                        responsive
                        defaultSortFieldId={1} // Sorting by the second column by default
                    />
                </div>
            </div>
        </>
    );
}

export default CategoryTable;
