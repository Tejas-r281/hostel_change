import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useEffect, useState } from 'react';
import RowComponet from "./RowComponet";

import { getRecommendationAction, deleteUser, getAllUsers, logout } from "../../actions/userAction";


function Recommendation() {

    const { user } = useSelector((state) => state.user);
    const { users } = useSelector((state) => state.recommendation);
    const [years, setyear] = useState(0);
    const [index1, setindex] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const recommendation = (e) => {
        e.preventDefault();
        navigate("/recommendation");
    }
    const selectyear = (e) => {
        // console.log(e.target.value);
        const val = e.target.value;
        setyear(parseInt(val));
    }

    const changeStatus = (e) => {
        navigate("/me/update");
    }
    const profile = (e) => {
        navigate("/profile");
    }

    const deleteUser1 = (e) => {
        // console.log("delete");
        dispatch(deleteUser());
        dispatch(getAllUsers());
    }

    const logoutUser1 = (e) => {

        dispatch(logout());

    };
    const studentList = (e) => {
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
    }, [alert, dispatch, user.hostel, user.nexthostel,years]);

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
                        <button
                            onClick={profile}
                            className="btn btn-secondary updateButton"
                        >
                            Profile
                        </button>


                    </div>
                    <div className="details">
                        <div>
                            <span> Category:Yearwise </span>
                            <select
                                id="ddlViewBy"
                                className="mx-3"
                                name="year"
                                onChange={selectyear}
                            >
                                <option value="">Select Year</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>

                            </select>
                        </div>
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

                    </div>

                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name  Total : <span className="text-danger">{}</span> </th>

                                <th scope="col">Year/branch</th>
                                <th scope="col"> change ?</th>
                                <th scope="col">Alloted</th>
                                <th scope="col">Excepted</th>
                            </tr>

                            {(users && users.data) ? (!years ? users.data.map((user, index) => (
                                <RowComponet userss={user} index={index}  key={index} setindex={setindex} />
                            )) :
                                users.data.filter(user => user.year === years).map((user, index) => (
                                    <RowComponet userss={user} index={index}  key={index} setindex={setindex} />
                                ))

                            ) : "Soryy there is no match for you "
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