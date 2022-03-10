import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../Layout/Loader/Loader.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
// import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  login,
  register,
  getAllUsers,
} from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
      name: "",
      email: "",
      year: 1,
      branch: "IT",
      password: "",
      hostel: "",
      nexthostel: "",
      change: false,
    });

    const { name, email, year, branch,password, hostel, change,nexthostel } = user;
      //  console.table(user);


    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        // const myForm = new FormData();

        // myForm.set("name", name);
        // myForm.set("email", email);
        // myForm.set("password", password);
        // myForm.set("hostel", hostel);
        // myForm.set("change", change);
        // myForm.set("avatar", avatar);
        const myForm =
        {
          "name": name,
          "email": email,
          "branch": branch,
          "year": year,
          "password": password,
          "hostel": hostel,
          "change": change,
          "nexthostel": nexthostel
        };


        // console.log(myForm);
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        // if (e.target.name === "avatar") {
        //   const reader = new FileReader();

        //   reader.onload = () => {
        //     if (reader.readyState === 2) {
        //       setAvatarPreview(reader.result);
        //       setAvatar(reader.result);
        //     }
        //   };

        //   reader.readAsDataURL(e.target.files[0]);
        // } else {
             var checked = false;
             if (document.querySelector("#checkboxNoLabel:checked")) {
               checked = true;
             }




            //  console.log(strUser);
            //   console.log(strUser1);



            // console.log(checked);
        setUser({ ...user, [e.target.name]: e.target.value,change:checked });
        // }
    };
    // console.log(location);
    // const redirect = location.search ? location.search.split("=")[1] : "/account";
    //  console.log(redirect);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            // history.push(redirect);
            navigate("/students");
            dispatch(getAllUsers());
        }
    }, [dispatch, error, alert, navigate,  location, isAuthenticated]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="LoginSignUpContainer">
              <div className="LoginSignUpBox">
                <div>
                  <div className="login_signUp_toggle">
                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                  </div>
                  <button ref={switcherTab}></button>
                </div>
                <form
                  className="loginForm"
                  ref={loginTab}
                  onSubmit={loginSubmit}
                >
                  <div className="loginEmail">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>

                  <input type="submit" value="Login" className="loginBtn" />
                </form>
                <form
                  className="signUpForm"
                  ref={registerTab}
                  encType="application/json"
                  onSubmit={registerSubmit}
                >
                  <div className="signUpName">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpEmail">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div>
                    <span> Year </span>
                    <select
                      id="ddlViewBy"
                      className="mx-3"
                      name="year"
                      onChange={registerDataChange}
                    >
                      <option value="1">1</option>
                      <option value="2">
                        2
                      </option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div>
                    <span>Branch </span>
                    <select
                      id="ddlViewBy1"
                      className="mx-3"
                      name="branch"
                      onChange={registerDataChange}
                    >
                      <option value="IT">IT</option>
                      <option value="CST" >
                        CST
                      </option>
                      <option value="ETC">ETC</option>
                      <option value="EE">EE</option>
                      <option value="AE">AE</option>
                      <option value="MIN">MIN</option>
                      <option value="MET">MET</option>
                      <option value="ME">ME</option>
                      <option value="CE">CE</option>
                    </select>
                  </div>
                  <div className="signUpPassword">
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="CurrentHostel">
                    <input
                      type="number"
                      placeholder="Current Hostel No"
                      required
                      name="hostel"
                      value={hostel}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="CurrentHostel">
                    <input
                      type="number"
                      placeholder="which hostel do you want to go ?"
                      // required
                      name="nexthostel"
                      value={nexthostel}
                      onChange={registerDataChange}
                    />
                  </div>

                  <div>
                    <span>Do you want to change hostel ?</span>
                    <input
                      class="form-check-input"
                      name="change"
                      onChange={registerDataChange}
                      type="checkbox"
                      id="checkboxNoLabel"
                      value={change}
                    />
                  </div>

                  <input type="submit" value="Register" className="signUpBtn" />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
};

export default LoginSignUp;
