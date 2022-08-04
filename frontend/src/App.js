import "./App.css";
import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";
import store from "./store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoginSignUp from "./component/User/LoginSignUp.js";
import { getAllUsers,loadUser,getRecommendationAction } from "./actions/userAction.js";
// import UserList from "./Component/Admin/UsersList.js";
// import UpdateUser from "./component/Admin/UpdateUser.js";
import StudentList from "./component/User/StudentList.js";
import NotFound from "./component/Layout/Notfound/NotFound.js";
import UpdateStudent from "./component/User/UpdateStudent.js"
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Recommendation from "./component/User/Recommendation.js";
import Suggestion from "./component/User/Suggestion.js";
import Profile from "./component/User/Profile.js";
import ShowAll from "./component/Admin/ShowAll";
import AdminLanding from "./component/Admin/AdminLanding.js"
// import { useSelector } from "react-redux";
import {
  // addcomment,
  getallcomment
} from "./actions/suggestionAction";

function App() {
//  const navigate1 = useNavigate();
   const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    try
    {

      store.dispatch(getAllUsers());
      store.dispatch(loadUser());
      store.dispatch(getRecommendationAction(user.hostel, user.nexthostel));
      store.dispatch(getallcomment());
    }
    catch
    {
      alert("Error");
    }


  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Routes>
        {isAuthenticated && (
          <Route exact path="/students" element={<StudentList />} />
        )}
        <Route exact path="/" element={<LoginSignUp />} />
        {isAuthenticated && (
          <Route exact path="/me/update" element={<UpdateStudent />} />
        )}
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
        <Route  exact path="/recommendation" element={<Recommendation />} />
        <Route  exact path="/suggestion" element={<Suggestion />} />
        <Route  exact path="/profile" element={<Profile />} />
        <Route exact path ="/admin" element={<AdminLanding />} />
        <Route exact path ="/admin/showall" element={<ShowAll />} />
        <Route exact path="/loginsignup" element={<LoginSignUp />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
