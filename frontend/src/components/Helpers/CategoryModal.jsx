import React, { useState, useEffect } from 'react';

const CategoryModal = ({ show, handleClose, handleSave, title, initialData }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [statusValue, setStatusValue] = useState('false');
    const [errors, setErrors] = useState({});

    // Reset form fields when modal is shown or initialData changes
    useEffect(() => {
        if (show) {
            setName(initialData?.name || '');
            setDescription(initialData?.description || '');
            setStatusValue(initialData?.birthdayReminder ? 'true' : 'false');
            setErrors({});
        }
    }, [show, initialData]);

    const validateForm = () => {
        let formErrors = {};
        if (!name.trim()) {
            formErrors.name = 'Name is required';
        }
        return formErrors;
    };

    const onSave = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            handleSave({ name, description, birthdayReminder: statusValue });
            handleClose(); // Close the modal
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        show && (
            <div className="modal fade show d-block absolute" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content border">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body m-1">
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label className="col-form-label col-sm-2 text-sm-right">
                                            Name <span className="text-danger">*</span>
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            {errors.name && (
                                                <span className="text-danger pt-2">{errors.name}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-form-label col-sm-2 text-sm-right">Description</label>
                                        <div className="col-sm-10">
                                            <textarea
                                                className="form-control"
                                                placeholder="Write a description..."
                                                rows={3}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <fieldset className="form-group">
                                        <div className="row">
                                            <label className="col-form-label col-sm-2 text-sm-right pt-sm-0">Status</label>
                                            <div className="col-sm-10">
                                                <div className="custom-controls-stacked">
                                                    <label className="custom-control custom-radio">
                                                        <input
                                                            name="status"
                                                            type="radio"
                                                            className="custom-control-input"
                                                            value="true"
                                                            checked={statusValue === 'true'}
                                                            onChange={(e) => setStatusValue(e.target.value)}
                                                        />
                                                        <span className="custom-control-label">true</span>
                                                    </label>
                                                    <label className="custom-control custom-radio">
                                                        <input
                                                            name="status"
                                                            type="radio"
                                                            className="custom-control-input"
                                                            value="false"
                                                            checked={statusValue === 'false'}
                                                            onChange={(e) => setStatusValue(e.target.value)}
                                                        />
                                                        <span className="custom-control-label">false</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleClose}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={onSave}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default CategoryModal;
