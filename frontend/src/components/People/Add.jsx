import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getRelations } from '../../features/relation/relationSlice'; // Update with the correct path
import { addPerson } from '../../features/people/peopleSlice';

export default function Add() {
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

    // Fetch relations on component mount
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
            setSelectedFile(file)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({}); // Clear errors
    
        const data = new FormData();
        // Required fields
        data.append('name', formData.name);
        data.append('relationId', selectedCategory);
    
        // Conditionally add optional fields if they have a value
        if (formData.dob) {
            data.append('dob', formData.dob);
        }
        if (formData.city) {
            data.append('city', formData.city);
        }
        if (formData.type) {
            data.append('type', formData.type);
        }
    
        // Add boolean fields
        data.append('reminder', formData.reminder ? true : false);
        data.append('status', formData.active ? true : false);
    
        // Append the image file if it exists
        if (selectedFile) {
            data.append('profile', selectedFile); // Add the selected file to form data
        }
    
        // Log FormData entries
        for (const [key, value] of data.entries()) {
            console.log(key, value, typeof value);
        }
    
        // Dispatch the action with formData
        dispatch(addPerson(data))
            .unwrap()
            .then((result) => {
                toast.success(`Person ${formData.name} added successfully.`);
                handleReset();
            })
            .catch((error) => {
                toast.error(`${error.message}`);
            });
    };
    
    const handleReset = () => {
        // Resetting form data to initial values
        setFormData({
            name: '',
            dob: '',
            city: '',
            type: '',
            reminder: false,
            active: false,
        });
        setSelectedCategory(''); // Reset selected category
        setImagePreview('img/avatars/avatar.jpg'); // Reset image preview
        setErrors({}); // Clear errors
    };

    return (
        <div className="container-fluid p-3 pt-5">
            <div className="header pl-2">
                <div>
                    <h1 className="header-title">People</h1>
                    <nav aria-label="breadcrumb" className="d-inline-block">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Add People
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className='card-title'>Insert Form</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="container">
                                    <div className="row">
                                        {/* Left Column - Form Fields */}
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label htmlFor="inputName">Name <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                    id="inputName"
                                                    name="name"
                                                    placeholder="Enter Name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                />
                                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="inputCategory">Category <span className="text-danger">*</span></label>
                                                <select
                                                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                                    id="inputCategory"
                                                    value={selectedCategory}
                                                    onChange={handleCategoryChange}
                                                >
                                                    <option value="" disabled>Select Category</option>
                                                    {relations.map((relation, index) => (
                                                        <option key={index} value={relation._id}>
                                                            {relation.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="inputDOB">Date of Birth</label>
                                                <input
                                                    type="date"
                                                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                                    id="inputDOB"
                                                    name="dob"
                                                    value={formData.dob}
                                                    onChange={handleInputChange}
                                                />
                                                {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="inputSelectMenu">Type</label>
                                                <select
                                                    className="form-control"
                                                    id="inputSelectMenu"
                                                    name="type"
                                                    value={formData.type}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="" disabled>Select an Option</option>
                                                    <option value="Option1">Option 1</option>
                                                    <option value="Option2">Option 2</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="inputCity">City</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputCity"
                                                    name="city"
                                                    placeholder="Enter City"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        {/* Right Column - Image and Toggle Controls */}
                                        <div className="col-md-4 text-center">
                                            <div className="text-center mb-5 mb-md-4">
                                                <img alt="Uploaded Preview" src={imagePreview} className="rounded-circle img-responsive mt-2" width={128} height={128} />
                                                <div className="mt-2">
                                                    <input
                                                        type="file"
                                                        id="fileUpload"
                                                        className="d-none"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        multiple={false}
                                                    />
                                                    <button
                                                        type='button'
                                                        className="btn btn-primary"
                                                        onClick={() => document.getElementById('fileUpload').click()}
                                                    >
                                                        <i className="fas fa-upload"></i> Upload
                                                    </button>
                                                </div>
                                                <small className="text-muted">Only images are allowed. Please upload a valid image.</small>
                                            </div>

                                            <div className="form-row mb-4">
                                                <div className="form-group col-6">
                                                    <label htmlFor="toggleReminder">Reminder</label>
                                                    <div className="custom-control custom-switch">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input custom-radio"
                                                            id="toggleReminder"
                                                            name="reminder"
                                                            checked={formData.reminder}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label className="custom-control-label" htmlFor="toggleReminder"></label>
                                                    </div>
                                                    <small>Enable to receive email reminders.</small><br />
                                                    <small>(Includes birthday mails on mentaioned date of birth)</small>
                                                </div>

                                                <div className="form-group col-6">
                                                    <label htmlFor="toggleStatus">Active/Inactive</label>
                                                    <div className="custom-control custom-switch">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input custom-radio"
                                                            id="toggleStatus"
                                                            name="active"
                                                            checked={formData.active}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label className="custom-control-label" htmlFor="toggleStatus"></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <button className="btn btn-success mr-2" type="submit">Save</button>
                                                <button className="btn btn-danger" type="button" onClick={handleReset}>Reset</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
