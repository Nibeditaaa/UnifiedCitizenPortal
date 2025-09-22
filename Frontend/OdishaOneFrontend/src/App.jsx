import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/NavBarComponents/Home";
import Login from "./Components/NavBarComponents/Login";
import AboutUs from "./Components/NavBarComponents/AboutUs";
import ContactUs from "./Components/NavBarComponents/ContactUs";
import UserGuide from "./Components/NavBarComponents/UserGuide";
import Help from "./Components/NavBarComponents/Help";
import NoPage from "./Components/NoPage";
import Footer from "./Components/Footer";
import MarqueeOrgName from "./Components/marqueeOrgNames";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Components/ProtectedComponents/Dashboard";
import UserProfile from "./Components/ProtectedComponents/UserProfile";
import Authenticated from "./Authenticated";
import "./App.css";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes that include Navbar and Footer */}
          <Route path="/" element={<LayoutWithNav />}>
            <Route index element={<Home />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="contactUs" element={<ContactUs />} />
            <Route path="userGuide" element={<UserGuide />} />
            <Route path="help" element={<Help />} />
            <Route element={<Authenticated />}>
              <Route path="login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<UserProfile />} />
            </Route>
            <Route path="forgotPassword" element={<ForgotPassword />}></Route>
            <Route path="reset-password" element={<ResetPassword />}></Route>
            <Route path="*" element={<NoPage />} />
          </Route>

          {/* Protected routes (No Navbar & Footer) */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const LayoutWithNav = () => (
  <div className="wrapper">
    <NavBar />
    <div className="content">
      <Outlet /> {/* Renders nested routes here */}
    </div>
    <MarqueeOrgName />
    <Footer />
  </div>
);

export default App;
