import React from 'react';

export default function CategoryCard() {

    const handleUpdate = (id) => {
        alert(id + " updated");
    };

    const handleDelete = (id) => {
        alert(id + " deleted");
    };

    return (
        <div className="col-12 col-md-6 col-lg-3">
            <div className="card position-relative">
                <img className="card-img-top" src="https://dummyimage.com/1200x900/DDD/000&amp;text=harshharsh" alt="Unsplash" />
                <div className="position-absolute p-2" style={{ width: "25%", top: "0", right: "0" }}>
                    <button 
                        className="btn btn-light btn-sm me-1" 
                        onClick={() => handleUpdate(12)}
                    >
                        <i className="fas fa-edit"></i> 
                    </button>
                    <button 
                        className="btn btn-light btn-sm" 
                        onClick={() => handleDelete(12)}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
                <div className="card-header">
                    <h5 className="card-title mb-0">Card with image and links</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    );
}
