import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Modal } from "react-bootstrap";
import "../../css/Dashboard.css";
import axios from "axios";
import Sidebar from "./DashboardComponents/Sidebar";
import Breadcrumbs from "./DashboardComponents/breadcrumb";
import NavBar_dashboard from "./DashboardComponents/Navbar_dashboard";
import Content from "./DashboardComponents/Content";
import Home from "../NavBarComponents/Home";
import Analytics from "./DashboardComponents/Analytics";
import Sidebar_Announcement from "./SideBarComponents/Sidebar_Announcement";
import Grievances from "./SideBarComponents/Grievances";
import GrievanceDetail from "./SideBarComponents/GrievancesDetail";

const Dashboard = () => {
  const URL = import.meta.env.VITE_URL;
  const [showSidebar, setShowSidebar] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleCloseLogout = () => {
    setShowLogout(false);
  };
  const handleShowLogout = () => {
    setShowLogout(true);
  };

  const handleLogout = async () => {
    try {
      await axios.post(URL + "/auth/logout", {}, { withCredentials: true });
      navigate("/");
      window.location.reload(); // Ensures navbar updates after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Modal show={showLogout} onHide={handleCloseLogout}>
        <Modal.Header>Do you really want to logout?</Modal.Header>
        <Modal.Footer>
          <Button className="btn-secondary" onClick={handleCloseLogout}>
            Close
          </Button>
          <Button className="btn-warning" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex">
        <Sidebar show={showSidebar} />
        <div
          className={`dashboard-content ${
            showSidebar
              ? "dashboard-content-shrink"
              : "dashboard-content-expand"
          }`}
        >
          <NavBar_dashboard
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            handleShowLogout={handleShowLogout}
          />
          <Breadcrumbs />
          <Container className="dashboard-scrollable-content">
            <Routes>
              <Route index element={<Content />} />
              <Route path="announcement" element={<Sidebar_Announcement />} /> 
              <Route path="grievances" element={<Grievances />} /> 
              <Route path="grievances/:id" element={<GrievanceDetail />} /> 
              <Route path="analytics" element={<Analytics />} />
              <Route path="user-management" element={<Home />} />
              <Route path="settings" element={<Home />} />
              <Route path="notifications" element={<Home />} />
              <Route path="integrations" element={<Home />} />
              <Route path="support" element={<Home />} />
              <Route path="billing" element={<Home />} />
            </Routes>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
