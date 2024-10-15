import React, { useState } from 'react';
import BreadCrumb from "../Helpers/BreadCrumb";
import "./style.css";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addWish } from '../../features/feature/featureSlice';
import feather from 'feather-icons';

export default function BirthdayComponent() {
    const dispatch = useDispatch();
    const [generatedWish, setGeneratedWish] = useState(null);
    const [copied, setCopied] = useState(false); // State to manage copy status
    const [loading, setLoading] = useState(false);


    const breadcrumbItems = [
        { label: 'Dashboard', link: '/dashboard' },
        { label: 'Birthday', link: null }
    ];

    const [name, setName] = useState('');
    const [relation, setRelation] = useState('');
    const [type, setType] = useState('');
    const [errors, setErrors] = useState({ name: '', relation: '', type: '' });

    const validateName = (name) => {
        const trimmedName = name.trim();
        const words = trimmedName.split(' ');

        if (!trimmedName) return 'Name is required.';
        if (words.length > 2) return 'Name must contain only 2 words.';

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

        if (!trimmedInput) return `${fieldName} is required.`;
        if (words.length > maxWords) return `${fieldName} must contain only ${maxWords} words.`;

        for (const word of words) {
            if (word.length < minLength) return `Each word in ${fieldName} must be at least ${minLength} characters long.`;
            if (/\d/.test(word)) return `Numbers are not allowed in the ${fieldName}.`;
        }

        return ''; // No error
    };

    const handleInputChange = (setter, validator, fieldName) => (e) => {
        const value = e.target.value;
        setter(value);
        const error = validator(value, fieldName);
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
    };

    // Copy to clipboard function
    const copyToClipboard = () => {
        if (generatedWish) {
            // Create a temporary element to extract the plain text
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = generatedWish; // Set the HTML content
            const plainText = tempDiv.innerText; // Extract the text content

            // Check if the Clipboard API is available
            if (navigator.clipboard) {
                navigator.clipboard.writeText(plainText)
                    .then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    })
                    .catch((error) => {
                        console.error("Could not copy text: ", error);
                    });
            } else {
                // Fallback method using a temporary textarea
                const textArea = document.createElement('textarea');
                textArea.value = plainText; // Use plain text for the textarea
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy'); // Fallback for older browsers
                document.body.removeChild(textArea);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameError = validateName(name);
        const relationError = validateField(relation, 'Relation');
        const typeError = validateField(type, 'Type');

        // Set errors if any validation fails
        if (nameError || relationError || typeError) {
            setErrors({ name: nameError, relation: relationError, type: typeError });
            return; // Stop submission if there are errors
        }

        // Clear previous errors
        setErrors({ name: '', relation: '', type: '' });

        try {
            setLoading(true); // Start loading
            const wishData = { name, relation, type }; // Collect data for the wish
            const wish = await dispatch(addWish(wishData)); // Dispatch the addWish thunk

            if (addWish.fulfilled.match(wish)) {
                toast.success(`Wish for ${name} generated successfully!`);
                setGeneratedWish(wish.payload);
            }

            setLoading(false); // Stop loading after completion
        } catch (error) {
            toast.error("Failed to generate wish: " + error.message);
            setLoading(false); // Stop loading even on error
        }
    };


    return (
        <div className="container-fluid p-0 pt-5">
            <BreadCrumb title="Birthday Wish Generator" breadcrumbItems={breadcrumbItems} />
            <div className="row">
                <div className="col-12">
                    {/* <div className="card" style={{filter: loading ? 'blur(2px)' : 'none'}}> */}
                    <div className={`card`} style={{ filter: loading ? 'blur(2px)' : 'none' }}>

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
                                                            placeholder="e.g. funny, Heartfelt, Short etc..."
                                                            value={type}
                                                            onChange={handleInputChange(setType, validateField, 'type')}
                                                        />
                                                        {errors.type && <small className="text-danger">{errors.type}</small>}
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Generate</button>
                                            </form>
                                        </div>
                                        {generatedWish && (
                                            <div className="card-body" style={{ backgroundColor: '#f0f0f0', padding: '15px', margin: '10px 20px', position: 'relative' }}>
                                                <div style={{ paddingRight: "20px" }}>
                                                    {generatedWish}
                                                </div>
                                                <button
                                                    onClick={copyToClipboard}
                                                    style={{ position: 'absolute', right: '10px', top: '10px', border: 'none', background: 'transparent' }}
                                                    aria-label="Copy to clipboard"
                                                >
                                                    <span dangerouslySetInnerHTML={{ __html: feather.icons['copy'].toSvg() }} />
                                                </button>
                                                {copied && (
                                                    <div style={{ position: 'absolute', right: '10px', top: '-30px', background: '#fff', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                                        Copied!
                                                    </div>
                                                )}
                                            </div>
                                        )}
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
                        {/* Loader Section */}
                        {loading && (
                            <div className="circle-loading active">
                                <div className="circle-loading-icon"></div>
                            </div>

                        )}

                </div>
            </div>
        </div>
    );
}
