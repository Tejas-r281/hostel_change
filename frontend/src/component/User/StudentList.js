import React from "react";
import { useEffect, useState } from "react";
import "./StudentList.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  getAllUsers,
  clearErrors,
  logout,

} from "../../actions/userAction";
import { useAlert } from "react-alert";
import RowComponet from "./RowComponet";
import { DELETE_USER_RESET, DELETE_USER } from "../../constants/userConstant.js";
function StudentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const ref=
  const alert = useAlert();
  // const inputEl = useRef(null);
  const { users } = useSelector((state) => state.allUsers);
  const { error, isDeleted } = useSelector((state) => state.profile);
  const [index1, setindex] = useState(0);
  // const { isAuthenticated } = useSelector(
  //   (state) => state.user
  // );
  const recommendation = (e) =>
  {
    e.preventDefault();
    navigate("/recommendation");
  }
  const suggestion = (e) =>
  {
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

  useEffect(() => {
    if (error) {
      alert.error("You are already out of this list");
      dispatch(clearErrors());
    }

    if (isDeleted) {
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
  }, [error, alert, dispatch, isDeleted]);


  return (
    <div className="container-fluid fixed">
      <div className="row">
        <div className="col-md-10 col-12 mx-auto">

          <div className=" py-2 my-2 alert alert-primary" role="alert">
            This is not an official portal of institute, it's created by a
            student for ease of exchanging
          </div>
          <div
            className=" py-2  my-2 alert alert-primary d-flex align-items-center"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
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
              className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
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
            </thead>
            <tbody>
              {users.map((user, index) => (
                // setindex(index+1)

                <RowComponet userss={user} index={index} setindex={setindex} key={index} />
                // <button ref={Student} value={users.email} onClick={Emailsend} type="button" className="btn mx-2 btn-info">Send Request</button>

              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
