import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryTable from './CategoryTable';
import CategoryModal from '../Helpers/CategoryModal'; // Import the Modal component
import { useDispatch, useSelector } from 'react-redux';
import { createRelation, updateRelation, getRelations } from '../../features/relation/relationSlice';
import { toast } from 'react-toastify';

const CategoryContent = () => {
    const dispatch = useDispatch();
    const { relations, status, error } = useSelector((state) => state.relations);

    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Category');
    const [selectedItem, setSelectedItem] = useState(null);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(getRelations());
        }
    }, [dispatch, status]);

    const handleShow = () => {
        setSelectedItem(null); // Reset selected item for adding a new relation
        setModalTitle('Add Category');
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedItem(null); // Clear the selected item when closing
    };

    const handleSave = async (relationData) => {
        try {
            if (selectedItem) {
                // Update relation
                await dispatch(updateRelation({ ...relationData, _id: selectedItem._id })).unwrap();
                toast.success('Category updated successfully');
            } else {
                // Create new relation
                await dispatch(createRelation(relationData)).unwrap();
                toast.success('Category created successfully');
            }
            handleClose(); // Close the modal after saving
        } catch (error) {
            dispatch(getRelations());
            // Display error, but don't close the modal or reset the table
            toast.error(error || 'Failed to save category');
        }
    };


    return (
        <>
            <div className="container-fluid p-0 pt-5">
                <div className="header pl-3 pr-3 d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="header-title">Category</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active" aria-current="page"><span>Category</span></li>
                            </ol>
                        </nav>
                    </div>
                    <button className="btn btn-primary" onClick={handleShow}>Add</button>
                </div>
                <div className="row">
                    <div className="col-xxl-12">
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
                                <CategoryTable /> {/* Pass handleUpdate to CategoryTable */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Use the reusable Modal component */}
            <CategoryModal
                show={show}
                handleClose={handleClose}
                handleSave={handleSave}
                title={modalTitle}
                initialData={selectedItem} // Pass the selected item for editing
            />
        </>
    );
};

export default CategoryContent;
