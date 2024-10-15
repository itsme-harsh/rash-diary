import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getRelations, deleteRelation,updateRelation } from '../../features/relation/relationSlice';
import { toast } from 'react-toastify';
import ConfirmPopUp from '../Helpers/ConfirmPopUp';
import Modal from '../Helpers/CategoryModal'



const CategoryTable = () => {

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [modalData, setModalData] = useState(null);  // State for modal data
    const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility


    // Function to handle the update operation
    const handleUpdate = (id) => {
        const selectedRelation = relations.find((relation) => relation._id === id);
        setModalData(selectedRelation);  // Pass the selected relation data to modal
        setCurrentId(id);  // Set the current ID for the relation being updated
        setIsModalOpen(true);  // Open the modal
    };

    // Function to save the updated relation data from the modal
    const handleSave = (updatedData) => {
        if (currentId) {  // Ensure there's a category ID to update
            dispatch(updateRelation({ id: currentId, updatedData }))  // Dispatch the update action with the ID and updated data
                .unwrap()  // Unwrap to handle promises directly
                .then(() => {
                    toast.success("Category updated successfully");  // Show success message
                    setIsModalOpen(false);  // Close the modal after save
                })
                .catch((error) => {
                    dispatch(getRelations());
                    toast.error(error || 'Something went wrong while updating the relation');  // Show error message in case of failure
                });
        } else {
            toast.error("No category selected for update");  // Error if no category is selected
        }
    };


    // Function to open the confirmation popup
    const handleDeleteClick = (id) => {
        setCurrentId(id); // Set the id of the relation to be deleted
        setIsConfirmOpen(true); // Open the confirmation modal
    };

    // Function to confirm the deletion
    const handleDelete = () => {
        if (currentId) {
            dispatch(deleteRelation(currentId))
                .unwrap()
                .then(() => {
                    toast.success("Category deleted successfully");
                    // No need to dispatch getRelations again
                })
                .catch((error) => {
                    toast.error(`Error: ${error}`);
                });
        }
        setIsConfirmOpen(false);
    };


    const columns = [
        {
            name: 'No.',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '50px',
        },
        // {
        //     id: "id",
        //     selector: row => row._id,
        //     sortable: false,
        // },
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
                        <div className="dropdown-menu dropdown-menu-right min-1rem min-8rem option-position">
                            <span>
                                <button type="button" className="btn btn-sm pr-1" onClick={() => handleUpdate(row._id)}>
                                    <i className="align-middle fas bg-primary py-2 px-2 fas text-white fa-pen"></i>
                                </button>
                            </span>
                            <span>
                                <button type="button" className="btn btn-sm pr-1" onClick={() => handleDeleteClick(row._id)}>
                                    <i className="align-middle bg-danger py-2 px-2 fas text-white fa-trash"></i>
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
            {/* Update Modal */}
            <Modal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                handleSave={handleSave}
                title="Update Category"
                initialData={modalData}
            />

            <ConfirmPopUp
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)} // Close modal if user cancels
                onConfirm={handleDelete} // Confirm deletion
                message="Are you sure you want to delete this category?" // Message for confirmation
            />

        
                    <DataTable
                        columns={columns}
                        data={relations}
                        responsive
                        pagination
                        highlightOnHover
                        defaultSortFieldId={1}
                    />
              
        </>
    );
};

export default CategoryTable;
