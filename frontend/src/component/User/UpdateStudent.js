import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../Layout/Loader/Loader.js";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
// import MetaData from "../layout/MetaData";

function UpdateProfile1() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);



  const [user1, setUser] = useState({
    name: "",
    hostel: 8,
    nexthostel: 8,
    change: false,
  });
  //   const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const { name, hostel, change, nexthostel } = user1;

  // console.log(change);



  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      name: name,
      hostel: hostel,
      change: change,
      nexthostel: nexthostel,
    };


    // dispatch(register(myForm));
    dispatch(updateProfile(myForm));

  };
  const registerDataChange = (e) => {

    var checked = false;
    if (document.querySelector("#checkboxNoLabel:checked")) {
      checked = true;
    }
    // console.log(checked);
    setUser({ ...user1, [e.target.name]: e.target.value,change:checked });
  };

  useEffect(() => {
    if (user) {
      const data = {
        "name": user.name,
        "hostel": user.hostel,
        "change": user.change,
        "nexthostel": user.nexthostel
      };
      document.getElementById("checkboxNoLabel").checked = user.change;
      setUser(data);
      //   setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Your current status</h2>

              <form
                className="updateProfileForm"
                encType="application/json"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="updatedetail"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange} />
                </div>
                <div className="CurrentHostel">
                    <span>Alloted Hostel</span>
                    <select
                      id="ddlViewBy2"
                      className="mx-3"
                      name="hostel"
                      onChange={registerDataChange}
                    >
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                    </select>
                </div>
                <div className="CurrentHostel">
                    <span>Expected hostel </span>
                    <select
                      id="ddlViewBy3"
                      className="mx-3"
                      name="nexthostel"
                      onChange={registerDataChange}
                    >
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                    </select>
                </div>

                <div>
                  <span>Do you still want to change hostel ?</span>
                  <input
                    class="form-check-input"
                    name="change"
                    onChange={registerDataChange}
                    type="checkbox"
                    id="checkboxNoLabel"
                    value={change} />
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateProfile1;
