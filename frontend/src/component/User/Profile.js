import React from 'react'
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";

import SentEmail from "./SentEmail";

function Profile() {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    console.log(user.sentEmail);
    return (
        <div className="container-fluid fixed ">
            <div className="row">
                <div className="col-md-10 col-12 mx-auto">
                    <h4 className="name">{user.name} details</h4>
                   <div className="profiles">

                        <table class="table">

                            <tbody>

                                <tr>
                                    <td className="name">Name</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td className="name">Hostel change</td>
                                    <td>{user.change?"YES":"NO"}</td>
                                </tr>
                                <tr>
                                    <td className="name">Email</td>
                                    <td>{user.email}</td>
                                </tr>

                                <tr>
                                    <td className="name">Alloted</td>
                                    <td>{user.hostel}</td>
                                </tr>
                                <tr>
                                    <td className="name">Expected</td>
                                    {user.nexthostel === 0 ? "Not applicable" : user.nexthostel}
                                </tr>

                            </tbody>
                        </table>


                   </div>
                    <h4 className="name">You have requested following  student to change the hostel</h4>
                    <table class="table one1">

                        <tbody>


                               {
                                 user.sentEmail.map((item, index) => {
                                     return (<tr> <SentEmail key={index} ekobject={item} /></tr> )
                                    })
                               }


                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    )
}

export default Profile