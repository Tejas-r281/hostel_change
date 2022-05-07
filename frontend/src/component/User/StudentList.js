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
  const {user} = useSelector((state) => state.user);
  const { error, isDeleted } = useSelector((state) => state.profile);
  const [index1, setindex] = useState(0);
  const [years,setyear]=useState(0);
  // const { isAuthenticated } = useSelector(
  //   (state) => state.user
  // );
  const recommendation = (e) =>
  {
    e.preventDefault();
    navigate("/recommendation");
  }

  const changeStatus = (e) => {
    navigate("/me/update");
  }

  const profile=(e)=>
  {
    navigate("/profile");
  }
  const selectyear=(e)=>
  {
    // console.log(e.target.value);
    const val= e.target.value;
    setyear(parseInt(val));
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
  }, [error, alert, dispatch, isDeleted,years]);

  // console.log(years);

  return (
    <div className="container-fluid fixed">
      <div className="row">
        <div className="col-md-10 col-12 mx-auto">

          <div className=" py-2 my-2 alert alert-primary" role="alert">
            This is not an official portal of institute, it's created by a
            student for ease of exchanging
          </div>

            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>{user.name}!</strong>  After you have agreed with someone to exchange hostel, make sure
              to update your status in the portal.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>




            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>{user.name}!</strong> Once you click on REMOVE NAME, you will have to register again.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

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
                <th scope="col">Name  Total : <span className="text-danger">{index1}</span> </th>

                <th scope="col">Year/branch</th>
                <th scope="col"> change ?</th>

                <th scope="col">Alloted</th>
                <th scope="col">Excepted</th>
              </tr>
            </thead>
            <tbody>
              {!years?users.map((user, index) => (
                // setindex(index+1)

                <RowComponet userss={user} index={index} setindex={setindex} key={index} />
                // <button ref={Student} value={users.email} onClick={Emailsend} type="button" className="btn mx-2 btn-info">Send Request</button>

              )):
              // use filter and show only whose user year is year

              users.filter(user => user.year === years).map((user, index) => (
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
