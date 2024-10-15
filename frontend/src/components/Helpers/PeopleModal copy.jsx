import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getRelations } from '../../features/relation/relationSlice'; // Update with the correct path
import { addPerson } from '../../features/people/peopleSlice';
import './style.css'
import CustomDropdown from './CustomDropdown'; // Adjust the import path accordingly

// Inside your PeopleModal component
const typeOptions = [
    { value: 'Option1', label: 'Option 1' },
    { value: 'Option2', label: 'Option 2' },
];


const PeopleModal = ({ show, handleClose, handleSave, title, initialData }) => {
    const dispatch = useDispatch();
    const relations = useSelector(state => state.relations.relations);
    const status = useSelector(state => state.relations.status);
    

    const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
    const [imagePreview, setImagePreview] = useState('img/avatars/avatar.jpg'); // Default image
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        city: '',
        type: '',
        reminder: false,
        active: false,
    });

    const [errors, setErrors] = useState({}); // State to hold error messages

    // Reset form fields when modal is shown or initialData changes
    useEffect(() => {
        if (show) {
            setFormData({
                name: initialData?.name || '',
                dob: initialData?.dob || '',
                city: initialData?.city || '',
                type: initialData?.type || '',
                reminder: initialData?.birthdayReminder || false,
                active: initialData?.status || false,
            });
            setSelectedCategory(initialData?.relationId || '');
            setImagePreview('img/avatars/avatar.jpg'); // Reset image preview
            setErrors({}); // Clear errors
        }
    }, [show, initialData]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getRelations());
        }
    }, [dispatch, status]);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0]; // Get the first file
        if (file) {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                toast.error('Please upload a valid image file.'); // Alert for invalid file type
                return; // Exit if the file is not an image
            }

            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl); // Update the image preview state
            setSelectedFile(file);
        }
    }, []);

    const handleCategoryChange = useCallback((e) => {
        setSelectedCategory(e.target.value);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'dob') {
            const today = new Date();
            const selectedDate = new Date(value);
            if (selectedDate > today) {
                setErrors(prev => ({ ...prev, dob: 'Date of Birth cannot be in the future.' }));
            } else {
                setErrors(prev => ({ ...prev, dob: '' })); // Clear the error if the date is valid
            }
        }

        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Name is required.';
        }
        if (!selectedCategory) {
            newErrors.category = 'Category is required.';
        }
        if (new Date(formData?.dob) > new Date()) {
            newErrors.dob = 'Date of Birth cannot be in the future.';
        }

        return newErrors;
    };

    const onSave = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('relationId', selectedCategory);
            if (formData.dob) data.append('dob', formData.dob);
            if (formData.city) data.append('city', formData.city);
            if (formData.type) data.append('type', formData.type);
            data.append('reminder', formData.reminder ? true : false);
            data.append('status', formData.active ? true : false);
            if (selectedFile) {
                data.append('profile', selectedFile);
            }

            // Dispatch the action with formData
            dispatch(addPerson(data))
                .unwrap()
                .then((result) => {
                    toast.success(`Person ${formData.name} added successfully.`);
                    handleClose(); // Close the modal after saving
                })
                .catch((error) => {
                    toast.error(`${error.message}`);
                });
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
                                        <label className="col-form-label col-sm-2 text-sm-right">Profile Picture</label>
                                        <div className="col-sm-10 text-center">
                                            <img alt="Uploaded Preview" src={imagePreview} className="rounded-circle img-responsive mt-2" width={128} height={128} />
                                            <div className="mt-2">
                                                <input
                                                    type="file"
                                                    id="fileUpload"
                                                    className="d-none"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                                <button
                                                    type='button'
                                                    className="btn btn-primary"
                                                    onClick={() => document.getElementById('fileUpload').click()}
                                                >
                                                    <i className="fas fa-upload"></i> Upload
                                                </button>
                                            </div>
                                            <small className="text-muted">Only images are allowed.</small>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-form-label col-sm-2 text-sm-right">
                                            Name <span className="text-danger">*</span>
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                placeholder="Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
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
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-form-label col-sm-2 text-sm-right">Category<span className="text-danger">*</span></label>
                                        <div className="col-sm-10">
                                            <select
                                                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                                value={selectedCategory}
                                                onChange={handleCategoryChange}
                                            >
                                                <option value="" disabled>Select Category</option>
                                                {relations.map((relation) => (
                                                    <option key={relation._id} value={relation._id}>
                                                        {relation.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-form-label col-sm-2 text-sm-right">Date of Birth</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="date"
                                                className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleInputChange}
                                            />
                                            {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-form-label col-sm-2 text-sm-right">City</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter City"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                        <label className="col-form-label col-sm-2 text-sm-right">Type</label>
                                        <div className="col-sm-10">
                                            <select
                                                className="form-control"
                                                name="type"
                                                value={formData.type}
                                                onChange={handleInputChange}
                                            >
                                                <option value="" disabled>Select an Option</option>
                                                <option value="Option1">Option 1</option>
                                                <option value="Option2">Option 2</option>
                                            </select>
                                        </div>
                                    </div> */}
                                    <div className="form-group row">
                                        <label className="col-form-label col-sm-2 text-sm-right">Type</label>
                                        <div className="col-sm-10">
                                            <CustomDropdown
                                                options={typeOptions}
                                                value={formData.type}
                                                onChange={(selectedType) => handleInputChange({ target: { name: 'type', value: selectedType } })}
                                                // label="Type"
                                                error={errors.type}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group mb-4">
                                        <div className='form-row pl-3'>
                                            <div className='col-6 form-row'>
                                                <label className="col-form-label text-sm-right">Reminder</label>
                                                <div className='col-sm-10'>
                                                    <div className="custom-control custom-switch">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="toggleReminder"
                                                            name="reminder"
                                                            checked={formData.reminder}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label className="custom-control-label" htmlFor="toggleReminder"></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <label className="col-form-label col-sm-2 text-sm-right">Status</label>
                                                <div className='col-sm-10'>
                                                    <div className="custom-control custom-switch">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="toggleStatus"
                                                            name="active"
                                                            checked={formData.active}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label className="custom-control-label" htmlFor="toggleStatus"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleClose}>Close</button>
                                <button type="button" className="btn btn-success" onClick={onSave}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default PeopleModal;
