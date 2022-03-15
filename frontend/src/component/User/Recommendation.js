import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useEffect, useState } from 'react';
import RowComponet from "./RowComponet";

import { getRecommendationAction,deleteUser,getAllUsers,logout } from "../../actions/userAction";


function Recommendation() {
    const [index1, setindex] = useState(0);
    const { user } = useSelector((state) => state.user);
    const { users } = useSelector((state) => state.recommendation);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const recommendation = (e) => {
        e.preventDefault();
        navigate("/recommendation");
    }
    const suggestion = (e) => {
        e.preventDefault();
        navigate("/suggestion");
    }
    const changeStatus = (e) => {
        navigate("/me/update");
    }

    const deleteUser1 = (e) => {
        // console.log("delete");
        dispatch(deleteUser());
        dispatch(getAllUsers());
    }

    const logoutUser1 = (e) => {

        dispatch(logout());

    };
    const studentList= (e) => {
        navigate("/students");
    }

    useEffect(() => {
        try {
            dispatch(getRecommendationAction(user.hostel, user.nexthostel));
        }
        catch
        {
            alert.error("Error");
        }
    }, [alert, dispatch, user.hostel, user.nexthostel]);

    return (
        <div className="container-fluid fixed">
            <div className="row">
                <div className="col-md-10 col-12 mx-auto">
                    <div className="suggestion1">
                        <button
                            onClick={recommendation}
                            className="btn btn-secondary updateButton"
                        >
                            Recomendation
                        </button>
                      
                    </div>
                    <div className="details">
                        <button
                            onClick={studentList}
                            className="btn btn-primary updateButton"
                        >
                            Student List
                        </button>
                        <button
                            onClick={changeStatus}
                            className="btn btn-primary updateButton"
                        >
                            Update Status
                        </button>
                        <button
                            onClick={deleteUser1}
                            className="btn btn-primary updateButton"
                        >
                            Remove your name
                        </button>

                        <button
                            onClick={logoutUser1}
                            className="btn btn-danger updateButton"
                        >
                            Logout
                        </button>
                        <span className="badge rounded-pill bg-primary">
                            <a
                                rel="noreferrer"
                                href="https://www.linkedin.com/in/raushankumar43/"
                                target="_blank"
                            >
                                Admin
                            </a>
                        </span>
                    </div>
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name  Total : <span className="text-danger">{index1}</span> </th>

                                <th scope="col">Year/branch</th>
                                <th scope="col"> change ?</th>
                                <th scope="col">Alloted</th>
                                <th scope="col">Excepted</th>
                            </tr>

                            { (users &&users.data)? users.data.map((user, index) => (
                                <RowComponet userss={user} index={index} setindex={setindex} key={index} />
                            )):"Soryy there is no match for you "
                            }

                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Recommendation