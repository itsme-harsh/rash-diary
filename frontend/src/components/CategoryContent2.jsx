import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createRelation, getRelations } from '../features/relation/relationSlice';
import CategoryCard from './CategoryCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryModal from '../components/Helpers/CategoryModal'; // Import the new Modal component

export default function CategoryContent() {
    const dispatch = useDispatch();
    const { relations, status, error } = useSelector((state) => state.relations);

    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Category');

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
    };

    const handleShow = () => {
        setShow(true);
        setModalTitle('Add Category'); // Reset the modal title
    };

    const handleSave = (newRelation) => {
        dispatch(createRelation(newRelation))
            .unwrap()
            .then(() => {
                toast.success('Category created successfully');
                handleClose();
            })
            .catch((error) => {
                handleClose();
                toast.error(error)
                dispatch(getRelations());
            });
    };

    return (
        <>
            <div className="container-fluid p-3 pt-5">
                <div className="header pl-3 d-flex justify-content-between align-items-center">
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
                    {status === 'failed' && (
                        <div className="col-12 text-center">
                            <p>{error}</p>
                        </div>
                    )}
                    {status === 'succeeded' && renderedCards}
                </div>
            </div>

            {/* Use the reusable Modal component */}
            <CategoryModal
                show={show}
                handleClose={handleClose}
                handleSave={handleSave}
                title={modalTitle}
            />
        </>
    );
}
