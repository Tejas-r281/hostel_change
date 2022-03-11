import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoginSignUp from "./component/User/LoginSignUp.js";
import { getAllUsers,loadUser } from "./actions/userAction.js";
// import UserList from "./Component/Admin/UsersList.js";
// import UpdateUser from "./component/Admin/UpdateUser.js";
import StudentList from "./component/StudentList.js";
import NotFound from "./component/Layout/Notfound/NotFound.js";
import UpdateStudent from "./component/User/UpdateStudent.js"
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
// import { useSelector } from "react-redux";

function App() {

   const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
      store.dispatch(getAllUsers());
     store.dispatch(loadUser());
  }, []);
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
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
