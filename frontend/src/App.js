import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Start from "./components/Start";
import Home from "./components/Home";
import UserDashbord from "./components/Guid/GuideDashbord";
import Profile from "./components/Guid/Profile";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import Adminpage from "./components/Adminpage";
import GuidSignUpForm from "./components/GuideSignUp/GuidSignUpForm";
import Login from "./components/GuideLogin/Login";
import ForgotPasword from "./components/GuideSignUp/ForgotPassword";
import ResetPassword from "./components/GuideSignUp/ResetPassword";
import ContactGuid from "./components/User/ContactGuid";
import GuideDetaiils from "./components/User/GuideDetaiils";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<Start />} />
          <Route path="/home" element={ <Home />} />

          <Route path="/user-dashboard/:username" element={<UserDashbord/>}/>
          <Route path="/user-dashboard/:username/profile/:id" element={<Profile/>}/>
          <Route path="/contactguide/:id" element={<ContactGuid/>}/>
          <Route path="/guidedetails" element={[<NavBar />,<GuideDetaiils/>]} /> 
          <Route path="/login" element={[<NavBar />,<Login/>]} /> 
          <Route path="/register" element={[<NavBar />,<GuidSignUpForm/>]} />
          <Route path="/forgotpassword" element={[<NavBar />,<ForgotPasword/>]} />
          <Route path="/passwordreset/:resetToken" element={[<NavBar />,<ResetPassword/>]} />

          <Route path="/admin" element={<Adminpage />} />
         
     
      
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
