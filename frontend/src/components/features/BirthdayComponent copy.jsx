import React, { useState } from 'react';
import BreadCrumb from "../Helpers/BreadCrumb";
import "./style.css";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addWish } from '../../features/feature/featureSlice';

export default function BirthdayComponent() {

    const dispatch = useDispatch();
    const [GeneratedWish, setGeneratedWish] = useState(null);

    const breadcrumbItems = [
        { label: 'Dashboard', link: '/dashboard' },
        { label: 'Birthday', link: null }
    ];

    const [name, setName] = useState('');
    const [relation, setRelation] = useState('');
    const [type, setType] = useState('');
    const [errors, setErrors] = useState({ name: '', relation: '', type: '' });

    // Validate name field
    const validateName = (name) => {
        const trimmedName = name.trim();
        const words = trimmedName.split(' ');

        // Check for empty input
        if (!trimmedName) return 'Name is required.';

        // Check for two words only
        if (words.length > 2) return 'Name must contain only 2 words.';

        // Check for word length and numbers
        for (const word of words) {
            if (word.length < 4) return 'Each word must be at least 4 characters long.';
            if (word.length > 15) return 'Each word must be 15 characters or less.';
            if (/\d/.test(word)) return 'Numbers are not allowed in the name.';
        }

        return ''; // No error
    };

    const validateField = (input, fieldName, minLength = 3, maxWords = 2) => {
        const trimmedInput = input.trim();
        const words = trimmedInput.split(' ');

        // Check for empty input
        if (!trimmedInput) return `${fieldName} is required.`;

        // Check for word count
        if (words.length > maxWords) return `${fieldName} must contain only ${maxWords} words.`;

        // Check for word length and numbers
        for (const word of words) {
            if (word.length < minLength) return `Each word in ${fieldName} must be at least ${minLength} characters long.`;
            if (/\d/.test(word)) return `Numbers are not allowed in the ${fieldName}.`;
        }

        return ''; // No error
    };





    const handleInputChange = (setter, validator, fieldName) => (e) => {
        const value = e.target.value;
        setter(value);

        // Validate the current value and pass fieldName to validator
        const error = validator(value, fieldName);
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameError = validateName(name);
        const relationError = validateField(relation, 'Relation');  // Pass 'relation' as the fieldName
        const typeError = validateField(type, 'Type');   // Pass 'type' as the fieldName


        // Set errors if any validation fails
        if (nameError || relationError || typeError) {
            setErrors({ name: nameError, relation: relationError, type: typeError });
            return; // Stop submission if there are errors
        }

        // Clear previous errors
        setErrors({ name: '', relation: '', type: '' });

        try {
            // Make API call here
            // Assuming you have an addWish function to call the API
            const wishData = { name, relation, type }; // Collect data for the wish
            const wish = await dispatch(addWish(wishData)); // Dispatch the addWish thunk

            if (addWish.fulfilled.match(wish)) {
                // Display success message
                toast.success(`Wish for ${name} generated successfully!`);
                // Store the generated wish message in state or display it
                setGeneratedWish(wish.payload); // Assuming you have a state for this
            }
            // Show success message after successful submission
            toast.success(`Wish for ${name} generated successfully!`);
        } catch (error) {
            // Handle any errors that occur during the API call
            toast.error("Failed to generate wish: " + error.message);
        }
    };


    return (
        <div className="container-fluid p-0 pt-5">
            <BreadCrumb title="BirthDay Wish Generator" breadcrumbItems={breadcrumbItems} />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header flex" style={{ display: "flex", justifyContent: "space-between" }}>
                            <h5 className="mb-0 card-title">Craft Your Perfect Wish</h5>
                        </div>

                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12">
                                    <div>

                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-row">
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="Name">Name</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.name ? 'is-invalid' : (name && !errors.name ? 'is-valid' : '')}`}
                                                            id="Name"
                                                            placeholder="e.g. John Doe"
                                                            value={name}
                                                            onChange={handleInputChange(setName, validateName, 'name')}
                                                        />
                                                        {errors.name && <small className="text-danger">{errors.name}</small>}
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="Relation">Relation</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.relation ? 'is-invalid' : (relation && !errors.relation ? 'is-valid' : '')}`}
                                                            id="Relation"
                                                            placeholder="e.g. brother, sister, friend"
                                                            value={relation}
                                                            onChange={handleInputChange(setRelation, validateField, 'relation')}
                                                        />
                                                        {errors.relation && <small className="text-danger">{errors.relation}</small>}
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="Type">Type</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.type ? 'is-invalid' : (type && !errors.type ? 'is-valid' : '')}`}
                                                            id="Type"
                                                            placeholder="e.g. funny, Heartfelt, friend, Short etc..."
                                                            value={type}
                                                            onChange={handleInputChange(setType, validateField, 'type')}
                                                        />
                                                        {errors.type && <small className="text-danger">{errors.type}</small>}
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Generate</button>
                                            </form>
                                        </div>
                                        <div className="card-header">
                                            <h5 className="card-title">Note<span className='text-danger'>*</span></h5>
                                            <h6 className="card-subtitle p-1 text-muted">1. Only names and surnames are permitted; entries exceeding two words will not be accepted.</h6>
                                            <h6 className="card-subtitle p-1 text-muted">2. Please define your relationship using a single word, such as brother, sister, or friend.</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
