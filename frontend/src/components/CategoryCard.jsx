import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import feather from 'feather-icons';

const CategoryCard = React.memo(({ relation }) => {

    useEffect(() => {
        feather.replace();
    }, []);

    const [showAlert, setShowAlert] = useState(false);

    const handleUpdate = (id) => {
        // alert(id + " updated");
        toast.success("Updated successfully")
        setShowAlert(false);
    };

    const handleDelete = (id) => {
        setShowAlert(true);
    };

    const handleConfirmDelete = (id) => {
        // alert(id + " deleted");
        toast.success("Deleted successfully")
        setShowAlert(false);
        // Add your actual delete logic here (e.g., dispatch a delete action)
    };

    const handleCancelDelete = () => {
        setShowAlert(false);
    };

    const alertStyle = {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1050, // Ensure it's above other content
        maxWidth: '90%', // Adjust as needed
        width: '400px', // Set a fixed width or adjust as needed
        backgroundColor: 'white', // Or any other background color
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
    };

    const btnListStyle = {
        marginTop: '20px',
    };

    const btnStyle = {
        margin: '0 5px',
    };

    return (
        <div className="col-12 col-md-6 col-lg-3">
            <div className="card position-relative">
                <img className="card-img-top" src={`https://dummyimage.com/1200x900/EEE/000&text=${relation.name.charAt(0).toUpperCase() + relation.name.slice(1).toLowerCase()}`} alt="Unsplash" />
                <div className="position-absolute p-2" style={{ width: "25%", top: "0", right: "0" }}>
                    <button
                        className="btn btn-light btn-sm me-1"
                        onClick={() => handleUpdate(relation._id)}
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                    <button
                        className="btn btn-light btn-sm"
                        onClick={() => handleDelete(relation._id)}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
                <div className="card-header" style={{ display: "flex", justifyContent: 'space-between' }}>
                    <h3 className="mb-0" style={{ textTransform: "capitalize" }}>{relation.name}</h3>
                    {
                        relation.birthdayReminder ?
                            <i className="align-left" data-feather="bell"></i>
                            :
                            <i className="align-left" data-feather="bell-off"></i>
                    }
                </div>
                <div className="card-body">
                    <p className="card-text">{relation.description ? relation.description : "Description isn't available"}</p>
                </div>
            </div>

            {showAlert && (
                <div style={alertStyle}>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Confirm Deletion</h4>
                    <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                    <hr />
                    <div style={btnListStyle}>
                        <button style={btnStyle} className="btn btn-success" type="button" onClick={() => handleConfirmDelete(relation._id)}>
                            Okay
                        </button>
                        <button style={btnStyle} className="btn btn-danger" type="button" onClick={handleCancelDelete}>
                            No, thanks
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default CategoryCard;
