import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import CategoryCard from './CategoryCard'

export default function CategoryContent() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <div className="container-fluid p-3 pt-5">
            <div className="header pl-2 d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="header-title"> Category </h1>
                    <nav aria-label="breadcrumb" className="d-inline-block">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item active" aria-current="page"><span>category</span></li>
                        </ol>
                    </nav>
                </div>
                <button className="btn btn-primary" onClick={handleShow}>Add</button>
            </div>

            <div className="row">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
        </div>








{
        show ? <><div className="modal fade show d-block absolute" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content border">
                    <div className="modal-header">
                        <h5 className="modal-title">ADD Node</h5>
                        <button type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body m-3">
                        <p className="mb-0">
                            Use Bootstrap’s JavaScript modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div></> : ""
    }
    </>
    )
}
