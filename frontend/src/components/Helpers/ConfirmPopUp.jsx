import React from 'react';

export default function ConfirmPopUp({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;
    return (
        <div className="modal" style={modalStyle}>
            <div className="modals" style={modalContentStyle}>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Confirm Action</h4>
                <p>{message}</p>
                <hr />
                <div style={btnListStyle}>
                    <button className="btn btn-success" onClick={onConfirm}>
                        Okay
                    </button>
                    <button className="btn btn-danger" onClick={onClose}>
                        No, thanks
                    </button>
                </div>
            </div>
        </div>
    );
};

// Styles for the modal
const modalStyle = {
    position: "fixed",
    inset: "0px",
    top: "50px",
    padding: '0px 25px',
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
};

const btnListStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
};

