import React from 'react'
import {  useRef } from "react";
import {useDispatch} from 'react-redux'
import {deleteUser} from "../../actions/adminAction"
import {
    // deleteUser,
    getAllUsers,


} from "../../actions/userAction";
function MakeRow({users}) {
    const dispatch = useDispatch();
    // const alert = useAlert();

    const buttonDetail = useRef(0);
   const deleteBtn = async(e) => {
    e.preventDefault();
    // console.log("delete");
    // console.log(buttonDetail.current.id);
    await dispatch(deleteUser(buttonDetail.current.id));
    await  dispatch(getAllUsers());
    }

    return (
        <>
            <tr>


                <td>{users.name}

                </td>
                <td>
                    {users.year}/{users.branch}
                </td>

                {users.change === true ? (
                    <td className="text-primary">YES</td>
                ) : (
                    <td className="text-danger">NO</td>
                )}

                <td>{users.hostel}</td>
                <td>{users.nexthostel === 0 ? "Not applicable" : users.nexthostel}</td>
                <td>
                    <button className="btn btn-danger" ref={buttonDetail}  id={users._id} onClick={deleteBtn}>Delete </button>
                </td>
            </tr>
        </>
    )
}

export default MakeRow