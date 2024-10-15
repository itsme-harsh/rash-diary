import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPeople, selectAllPeople, deletePerson } from '../../features/people/peopleSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmPopUp from '../Helpers/ConfirmPopUp'; // Import the modal

const MyDataTable = ({ onDelete, onUpdate }) => {
    const dispatch = useDispatch();
    const peopleData = useSelector(selectAllPeople);
    const loading = useSelector((state) => state.people.loading);
    const error = useSelector((state) => state.people.error);

    useEffect(() => {
        dispatch(getAllPeople());
    }, [dispatch]);

    const transformedData = useMemo(() =>
        peopleData.flatMap(relation =>
            relation.people.length > 0
                ? relation.people.map(person => ({
                    peopleId: person._id,
                    profile: person.profile || '',
                    relationName: relation.relationName,
                    personName: person.name,
                    dob: person.dob || '',
                    status: person.status || false,
                    reminder: person.reminder || false,
                    relationId: relation.relationId
                }))
                : []
        ), [peopleData]
    );

    const columns = [
        {
            name: 'Profile',
            selector: row => row.profile,
            cell: row => (
                row.profile ? (
                    <img src={`http://localhost:3000/${row.profile}`} alt="Profile" style={{ padding: "5px", width: '60px', height: '60px', borderRadius: '50%' }} />
                ) : 'No Image'
            ),
            sortable: true
        },
        { name: 'Name', selector: row => row.personName || "-", sortable: true },
        { name: 'Category', selector: row => row.relationName, sortable: true },
        { name: 'D.O.B', selector: row => row.dob || "-", sortable: true },
        { name: 'Status', selector: row => row.status ? "Active" : "Inactive", sortable: true },
        { name: 'Reminder', selector: row => row.reminder ? 'Yes' : 'No', sortable: true },
        {
            name: 'Action',
            cell: row => (
                <>
                    <button type="button" className="btn btn-sm pr-1" onClick={() => onUpdate(row.relationId, row.peopleId)}>
                        <i className="align-middle fas bg-primary py-2 px-2 fas text-white fa-pen"></i>
                    </button>
                    <button type="button" className="btn btn-sm pr-1" onClick={() => onDelete(row.relationId, row.peopleId)}>
                        <i className="align-middle bg-danger py-2 px-2 fas text-white fa-trash"></i>
                    </button>
                    <button type="button" className="btn btn-sm pr-1" onClick={() => handleView(row)}>
                        <i className="align-middle fas bg-primary py-2 px-2 fas text-white fa-eye"></i>
                    </button>
                </>
            )
        }
    ];

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={transformedData}
                    pagination
                    responsive
                    highlightOnHover
                    progressPending={loading}
                />
            )}
        </div>
    );
};

export default function PeopleContent() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    //modal show/off
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDelete = (relationId, peopleId) => {
        setSelectedPerson({ relationId, peopleId });
        setShowDeleteModal(true);
    };

    const handleUpdate = (relationId, peopleId) => {
        toast.info("Update functionality is currently not available.");
    };

    const handleConfirmDelete = () => {
        if (selectedPerson) {
            dispatch(deletePerson(selectedPerson));
            toast.success("Deleted successfully");
        }
        setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div className="container-fluid p-3 pt-5">
                <div className="header pl-2 hide-print d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="header-title">People</h1>
                        <nav aria-label="breadcrumb" className="d-inline-block">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    People
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <button className="btn btn-primary" onClick={handleShow}>Add</button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header flex" style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3 className="ml-0 m-2">People List</h3>
                                <button className='btn' id='print-p' style={{ outline: "1px solid #dadada", marginBottom: "10px" }} onClick={handlePrint}>
                                    <i className="align-middle mr-1 fas fa-fw fa-file-pdf"></i><span className="align-middle"> Print</span>
                                </button>
                            </div>
                            <div className="card-body">
                                <MyDataTable onDelete={handleDelete} onUpdate={handleUpdate} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* datatable  */}
                <ConfirmPopUp
                    isOpen={showDeleteModal}
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    message="Are you sure you want to delete this person? This action cannot be undone."
                />
                {/* datatable  */}
            </div>


            {/* add people modal content */}
            {show && (
                <div className="modal fade show d-block absolute" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content border">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Category</h5>
                                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form>

                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* add people modal content */}
        </>
    );
}
