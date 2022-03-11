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
import { DELETE_USER_RESET, DELETE_USER } from "../constants/userConstant.js";
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
      dispatch(getAllUsers());
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


      //  if (isAuthenticated) {
         // history.push(redirect);
        //  navigate("/students");
        if(isDeleted)
        {
          alert.error("You are removed from this list");
            dispatch({
              type: DELETE_USER_RESET,

            });
            dispatch({
              type: DELETE_USER,
            });
          //  dispatch(getAllUsers());
        }

      //  }
    }, [error,alert,dispatch,isDeleted]);


  return (
    <div className="container-fluid fixed">
      <div className="row">
        <div className="col-md-10 col-12 mx-auto">
          <div
            className=" py-2  my-2 alert alert-primary d-flex align-items-center"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
              viewBox="0 0 16 16"
              role="img"
              aria-label="Warning:"
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div>
              After you have agreed with someone to exchange hostel, make sure
              to update your status in the portal.
            </div>
          </div>
          <div
            className=" py-2  my-2 alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
              viewBox="0 0 16 16"
              role="img"
              aria-label="Warning:"
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div>
              Once you click on REMOVE NAME, you will have to register again
            </div>
          </div>
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
