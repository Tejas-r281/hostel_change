import React from 'react'
import "./AdminLanding.css";
import { useNavigate } from "react-router-dom";

function AdminLanding() {
    const navigate = useNavigate();
    const allusers=(e)=>
    {
        e.preventDefault();
        navigate("showall");
    }

    const deleteall=(e)=>
    {
        e.preventDefault();
        navigate("deleteall");
    }

    return (
        <div className="container-fluid fixed ">
            <div className="row">
                <div className="col-md-10 col-12 mx-auto">
                     <div className="twolist">
                        <div className="showall"> <button
                            onClick={allusers}
                            className="btn btn-success updateButton"
                        >
                         All Users
                        </button></div>
                        <div className="deleteall"> <button
                            onClick={deleteall}
                            className="btn btn-danger updateButton"
                        >
                            Delete All Users
                        </button></div>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLanding