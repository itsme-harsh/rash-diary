import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPeople, selectAllPeople, deletePerson } from '../../features/people/peopleSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmPopUp from '../Helpers/ConfirmPopUp'; // Import the modal
import PeopleModal from '../Helpers/PeopleModal'; // Import the CategoryModal

const MyDataTable = ({ onDelete, onUpdate }) => {
    const dispatch = useDispatch();
    const peopleData = useSelector(selectAllPeople);
    const loading = useSelector((state) => state.people.loading);
    const error = useSelector((state) => state.people.error);

    // Step 1: Add state for search term
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getAllPeople());
    }, [dispatch]);

    const transformedData = useMemo(() => {
        return peopleData.flatMap(relation =>
            relation.people.map(person => ({
                peopleId: person._id,
                profile: person.profile || '',
                relationName: relation.relationName,
                personName: person.name,
                dob: person.dob || '-',
                status: person.status || false,
                reminder: person.reminder || false,
                relationId: relation.relationId,
                city: person.city || '-',
                type: person.type || '-'
            }))
        ).sort((a, b) => a.personName.localeCompare(b.personName)); // Sort by name
    }, [peopleData]);

    // Step 2: Implement filtering logic
    const filteredData = useMemo(() => {
        return transformedData.filter(person =>
            person.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.relationName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [transformedData, searchTerm]);

    const columns = [
        {
            name: 'Profile',
            selector: row => row.profile,
            cell: row => (
                row.profile ? (
                    <img src={`${import.meta.env.VITE_API_URL}/${row.profile}`} alt="Profile" style={{ padding: "5px", width: '60px', height: '60px', borderRadius: '50%' }} />
                ) : 'No Image'
            ),
            sortable: true
        },
        { name: 'Name', selector: row => row.personName || "-", sortable: true },
        { name: 'Category', selector: row => row.relationName, sortable: true },
        { name: 'D.O.B', selector: row => new Date(row.dob).toLocaleDateString() || "-", sortable: true },
        { name: 'City', selector: row => row.city, sortable: true },
        { name: 'Type', selector: row => row.type, sortable: true },
        {
            name: 'Status',
            selector: row => (
                <span className={`badge ${row.status ? 'badge-success' : 'badge-danger'}`}>
                    {row.status ? 'Active' : 'Inactive'}
                </span>
            ),
            sortable: true
        },
        { name: 'Reminder', selector: row => row.reminder ? 'Yes' : 'No', sortable: true },
        {
            name: 'Action',
            cell: row => (
                <div className="card-actions float-right">
                    <div className="d-inline-block dropdown show">
                        <a href="#" data-toggle="dropdown" data-display="static">
                            <svg
                                style={{ width: "31px" }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-more-vertical align-middle"
                            >
                                <circle cx={12} cy={12} r={1} />
                                <circle cx={12} cy={5} r={1} />
                                <circle cx={12} cy={19} r={1} />
                            </svg>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right min-1rem min-8rem" style={{ padding: "0px", position: "absolute", right: "0px", top: "-30px" }}>
                            <span>
                                <button type="button" className="btn btn-sm pr-1" onClick={() => onUpdate(row.relationId, row.peopleId)}>
                                    <i className="align-middle fas bg-primary py-2 px-2 text-white fa-pen"></i>
                                </button>
                            </span>
                            <span>
                                <button type="button" className="btn btn-sm pr-1" onClick={() => onDelete(row.relationId, row.peopleId)}>
                                    <i className="align-middle bg-danger py-2 px-2 fas text-white fa-trash"></i>
                                </button>
                            </span>
                            {/* <span>
                                <button type="button" className="btn btn-sm pr-1" onClick={() => handleView(row)}>
                                    <i className="align-middle fas bg-primary py-2 px-2 text-white fa-eye"></i>
                                </button>
                            </span> */}
                        </div>
                    </div>
                </div>
            ),
            width: '90px'
        }
    ];

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    {/* Step 3: Add a search input field */}
                    <input
                        className='hide-print'
                        type="text"
                        placeholder="Search by Name, Category or Type"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ border: "none", marginBottom: '10px', padding: '5px', width: '100%' }}
                    />
                    <DataTable
                        keyField="peopleId"
                        columns={columns}
                        data={filteredData}
                        pagination
                        responsive
                        highlightOnHover
                        progressPending={loading}
                        defaultSortFieldId="personName" // Specify the default sort field
                        defaultSortAsc={true} // Set the default sort order
                    />

                </div>
            )}
        </div>
    );
};

export default function PeopleContent() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [initialData, setInitialData] = useState(null);
    const [showPeopleModal, setShowPeopleModal] = useState(false);
    const peopleData = useSelector(selectAllPeople);

    const dispatch = useDispatch();

    // const handleUpdate = (relationId, peopleId) => {
        
    //     console.log(relationId, peopleId)
    //     const relation = peopleData.find(rel => rel.relationId === relationId);

    //     // If the relation exists, find the person within that relation
    //     const personData = relation?.people.find(person => person._id === peopleId);
    // console.log(personData)
    //     // If personData is found, set it to the state and show the modal
    //     if (personData) {
    //         setInitialData(personData);
    //         setShowPeopleModal(true);
    //     } else {
    //         toast.error("Person not found."); // Optional: handle case where person is not found
    //     }
    // };
    
    
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

    const handleModalClose = () => {
        setShowPeopleModal(false);
        setInitialData(null); // Reset initial data when modal closes
    };

    return (
        <>
            <div className="container-fluid p-3 pt-5">
                <div className="header pl-3 hide-print d-flex justify-content-between align-items-center">
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
                    {/* <button className="btn btn-primary" onClick={handleShow}>Add</button> */}
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
                 {/* <PeopleModal
                      show={showPeopleModal}       // Pass the show prop
                      handleClose={handleModalClose} // Pass the handleClose function
                      title="Edit Person"           // Pass the title for the modal
                      initialData={initialData}     // Pass the initial data
                       
                /> */}
            </div>
        </>
    );
}
