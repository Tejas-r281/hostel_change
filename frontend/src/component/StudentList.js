import React from "react";
import {useEffect} from "react";
import "./StudentList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUser,
  getAllUsers,
  clearErrors,
  logout,

} from "../actions/userAction";
import { useAlert } from "react-alert";
import {

  DELETE_USER_RESET,
} from "../constants/userConstant.js";
function StudentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { users } = useSelector((state) => state.allUsers);
  const {error,isDeleted} =useSelector((state) => state.profile);
    // const { isAuthenticated } = useSelector(
    //   (state) => state.user
    // );
    const changeStatus=(e)=>
    {
       navigate("/me/update");
    }

    const deleteUser1=(e)=>
    {
      // console.log("delete");
      dispatch(deleteUser());
      // dispatch(getAllUsers());
    }

      const logoutUser1 = (e) => {
        // console.log("delete");
        //  navigate("/");
        dispatch(logout());
        // dispatch(getAllUsers());
      };

    useEffect(() => {
      if (error) {
        alert.error("You are already out of this list");
        dispatch(clearErrors());
      }
      // console.log("yeah user is deleted");
      // console.log(isDeleted);
      // if(isDeleted)
      // {
      //    alert.error("You are removed from this list");
      // }

      //  if (isAuthenticated) {
         // history.push(redirect);
        //  navigate("/students");
        if(isDeleted)
        {
          alert.error("You are removed from this list");
            dispatch({
              type: DELETE_USER_RESET,
              // type: LOGOUT_SUCCESS,
            });
           dispatch(getAllUsers());
        }

      //  }
    }, [error,alert,dispatch,isDeleted]);


  return (
    <div className="container-fluid fixed">
      <div className="row">
        <div className="col-md-10 col-12 mx-auto">
          <div className="details">
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
            <button className="btn btn-primary updateButton">
              <a
                href="https://www.linkedin.com/in/raushankumar43/"
                target="_blank"
              >
                Created by
              </a>
            </button>
          </div>

          <table class="table">
            <thead class="table-light">
              {" "}
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Year/branch</th>
                <th scope="col"> change ?</th>

                <th scope="col">Alloted</th>
                <th scope="col">Excepted</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {users.map((user, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>
                    {user.year}/{user.branch}
                  </td>

                  {user.change === true ? (
                    <td className="text-primary">YES</td>
                  ) : (
                    <td className="text-danger">NO</td>
                  )}

                  <td>{user.hostel}</td>
                  <td>
                    {user.nexthostel === 0 ? "Not applicable" : user.nexthostel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
