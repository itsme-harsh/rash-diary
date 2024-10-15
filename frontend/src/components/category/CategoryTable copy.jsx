import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getRelations, deleteRelation } from '../../features/relation/relationSlice';
import { toast } from 'react-toastify';
import ConfirmPopUp from '../Helpers/ConfirmPopUp';

const CategoryTable = () => {
    const dispatch = useDispatch();
    const { relations, status, error } = useSelector((state) => state.relations);

    // State variables
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]); // Holds selected row IDs

    // Load relations on component mount
    useEffect(() => {
        dispatch(getRelations());
    }, [dispatch]);

    // Function to handle single record deletion
    const handleDeleteClick = (id) => {
        setCurrentId(id);
        setIsConfirmOpen(true);
    };

    // Function to confirm deletion of a single record
    const handleDelete = () => {
        if (currentId) {
            dispatch(deleteRelation(currentId))
                .unwrap()
                .then(() => {
                    toast.success("Category deleted successfully");
                })
                .catch((error) => {
                    toast.error(`Error: ${error}`);
                });
        }
        setIsConfirmOpen(false);
    };

    // Function to handle deletion of selected records
    const handleDeleteSelected = () => {
        if (selectedRows.length === 0) {
            toast.warn("No records selected for deletion.");
            return;
        }
        setIsConfirmOpen(true);
    };

    // Function to handle row selection
    const handleRowSelect = (id) => {
        setSelectedRows(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(selectedId => selectedId !== id); // Deselect
            } else {
                return [...prevSelected, id]; // Select
            }
        });
    };

    // Function to handle select all checkbox
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            // Select all rows
            setSelectedRows(relations.map(relation => relation._id));
        } else {
            // Deselect all rows
            setSelectedRows([]);
        }
    };

    // Function to confirm deletion of selected records
    const confirmDeleteSelected = () => {
        // Get names of the categories being deleted
        const categoriesToDelete = relations.filter(relation => selectedRows.includes(relation._id)).map(relation => relation.name);
    
        // Delete each selected category
        selectedRows.forEach((id) => {
            dispatch(deleteRelation(id))
                .unwrap()
                .then(() => {
                    toast.success(`Category: ${categoriesToDelete.shift()} deleted successfully`); // Use the category name
                })
                .catch((error) => {
                    toast.error(`Error deleting category: ${error}`);
                });
        });
        setIsConfirmOpen(false);
        setSelectedRows([]); // Clear selection after deletion
    };

    // Columns for DataTable
    const columns = [
        {
            name: <input type="checkbox" checked={selectedRows.length === relations.length} onChange={handleSelectAll} />,
            cell: row => (
                <input
                    type="checkbox"
                    checked={selectedRows.includes(row._id)}
                    onChange={() => handleRowSelect(row._id)}
                />
            ),
            width: '50px',
            ignoreRowClick: true,
            selector: () => true,
        },
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
            width: '90px',
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
                    <button type="button" className="btn btn-sm pr-1" onClick={() => handleUpdate(row._id)}>
                        <i className="align-middle fas bg-primary py-2 px-2 fas text-white fa-pen"></i>
                    </button>
                    <button type="button" className="btn btn-sm pr-1" onClick={() => handleDeleteClick(row._id)}>
                        <i className="align-middle bg-danger py-2 px-2 fas text-white fa-trash"></i>
                    </button>
                </div>
            ),
            width: '90px',
        }
    ];

    if (status === 'failed') {
        return (
            <div className="col-12 text-center">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            <ConfirmPopUp
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={selectedRows.length ? confirmDeleteSelected : handleDelete} // Use selectedRows for confirmation
                message={selectedRows.length ? "Are you sure you want to delete the selected categories?" : "Are you sure you want to delete this category?"}
            />

            <div className="card">
                <div className="card-header">
                    <div className="card-actions float-right">
                        <button
                            className="btn btn-danger"
                            onClick={handleDeleteSelected}
                            style={{ opacity: selectedRows.length === 0 ? 0.5 : 1 }} // Set opacity based on selection
                            disabled={selectedRows.length === 0} // Disable button when no rows are selected
                        >
                            Delete All
                        </button>
                    </div>
                    <h5 className="card-title mb-0">Clients</h5>
                </div>
                <div className="card-body">
                    <DataTable
                        columns={columns}
                        data={relations}
                        responsive
                        pagination
                        highlightOnHover
                        defaultSortFieldId={1}
                    />
                </div>
            </div>
        </>
    );
};

export default CategoryTable;
