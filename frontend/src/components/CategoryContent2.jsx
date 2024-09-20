import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createRelation, getRelations } from '../features/relation/relationSlice'; 
import CategoryCard from './CategoryCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CategoryContent() {
    const dispatch = useDispatch();
    const { relations, status, error } = useSelector((state) => state.relations);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [statusValue, setStatusValue] = useState('false');
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getRelations());
    }, [dispatch]);

    const renderedCards = useMemo(() => {
        return relations.map((relation) => (
            <CategoryCard key={relation._id} relation={relation} />
        ));
    }, [relations]);

    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
        setStatusValue('false');
        setErrors({});
    };
    
    const handleShow = () => setShow(true);

    const validateForm = () => {
        let formErrors = {};
        if (!name.trim()) {
            formErrors.name = 'Name is required';
        }
        return formErrors;
    };

    const handleSave = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const newRelation = {
                name,
                description,
                birthdayReminder: statusValue
            };
            setShow(false);
            dispatch(createRelation(newRelation))
                .unwrap()
                .then((data,err) => {
                    toast.success('Category created successfully');
                    handleClose();
                })
                .catch((err) => {
                    handleClose();
                    console.log(err)
                    // console.error('Error creating category:', err);
                    if (err.message.includes('409')) {
                        toast.error('Relation already exists');
                    } else if(err.message.includes('400')){
                        toast.error("Name must be at least 3 character long.");                        
                    }
                    else {
                        toast.error('Failed to create category');
                    }
                    // Dispatch getRelations to refresh the state
                    dispatch(getRelations());
                });
        } else {
            setErrors(validationErrors);
            // toast.error('Please fill in the required fields');
        }
    };
    
    

    return (
        <>
            <div className="container-fluid p-3 pt-5">
                <div className="header pl-2 d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="header-title">Category</h1>
                        <nav aria-label="breadcrumb" className="d-inline-block">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <span>category</span>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <button className="btn btn-primary" onClick={handleShow}>Add</button>
                </div>

                <div className="row">
                    {/* {status === 'loading' && (
                        <div className="col-12 text-center">
                            <div id="loader" className="loader"></div>
                        </div>
                    )} */}
                    {status === 'failed' && (
                        <div className="col-12 text-center">
                            <p>{error}</p>
                        </div>
                    )}
                    {status === 'succeeded' && renderedCards}
                </div>
            </div>

            {show && (
                <div className="modal fade show d-block absolute" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content border">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Category</h5>
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
                                    <button type="button" className="btn btn-primary" onClick={handleSave}>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
