import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getRelations } from '../features/relation/relationSlice';
import { toast } from 'react-toastify';



const CategoryTable = ({ onView }) => {
    const handleUpdate = (id) => {
        toast.success("Category updated successfully");
    };

    const handleDelete = (id) => {
        toast.error("Category deleted successfully");
    };

    const handleView = (item, onView) => {
        onView(item); // Pass the selected item to the onView callback
        toast.info("Preview Retrieved successfully");
    };

    const columns = [
        {
            name: 'No.',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '50px',
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '90px'
        },
        {
            name: 'Description',
            selector: row => row.description || 'No description',
            sortable: true,
        },
        {
            name: 'Birthday Reminder',
            selector: row => (
                <span className={`badge ${row.birthdayReminder ? 'badge-success' : 'badge-danger'}`}>
                    {row.birthdayReminder ? 'Active' : 'Inactive'}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Created At',
            selector: row => new Date(row.createdAt).toLocaleString(),
            sortable: true,
        },
        {
            name: 'Updated At',
            selector: row => new Date(row.updatedAt).toLocaleString(),
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <div className="card-actions float-right">
                    <div className="d-inline-block dropdown show">
                        <a href="#" data-toggle="dropdown" data-display="static">
                            <svg style={{ width: "31px" }} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical align-middle"><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right min-1rem min-8rem"
                            style={{ padding: "0px", position: "absolute", right: "0px", top: "-30px" }}
                        >
                            <span>
                                <button type="button" className="btn btn-sm pr-1" onClick={() => handleUpdate(row._id)}>
                                    <i className="align-middle fas bg-primary py-2 px-2 fas text-white fa-pen"></i>
                                </button>
                            </span>
                            <span>
                                <button type="button" className="btn btn-sm pr-1" onClick={() => handleDelete(row._id)}>
                                    <i className="align-middle bg-danger py-2 px-2 fas text-white fa-trash"></i>
                                </button>
                            </span>
                            <span>
                                <button type="button" className="btn btn-sm pr-1" onClick={() => handleView(row, onView)}>
                                    <i className="align-middle fas bg-primary py-2 px-2 fas text-white fa-eye"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            ),
            width: '90px'
        }
    ];
    const dispatch = useDispatch();
    const { relations, status, error } = useSelector((state) => state.relations);

    useEffect(() => {
        dispatch(getRelations());
    }, [dispatch]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // if (status === 'loading') {
    //     return (
    //         <div className="col-12 col-xl-12 text-center">
    //             <div id="loader" className="loader"></div>
    //         </div>
    //     );
    // }

    if (status === 'failed') {
        return (
            <div className="col-12 text-center">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            {show && (
                <div className="modal fade show d-block absolute" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content border">
                            <div className="modal-header">
                                <h5 className="modal-title">ADD Relation</h5>
                                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body m-3">
                                <p className="mb-0">
                                    Add your custom content here for adding relations.
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
                </div>
            )}

            <div className="card">
                <div className="card-header">
                    <div className="card-actions float-right">
                        <div className="d-inline-block dropdown show">
                            {/* <a href="#" data-toggle="dropdown" data-display="static">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical align-middle"><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
                            </a> */}
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
                        data={relations}
                        responsive
                        defaultSortFieldId={1}
                    />
                </div>
            </div>
        </>
    );
};

export default CategoryTable;
