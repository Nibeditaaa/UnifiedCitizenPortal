import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { TfiAlignJustify } from "react-icons/tfi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/NavBar.css";
import axios from "axios";
import profile from "../assets/profile.png";

const NavBar = () => {
  const URL = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(`/`);
  };
  const [expanded, setExpanded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleCloseLogout = () => {setShowLogout(false)}
  const handleShowLogout = () => {setShowLogout(true)}

  const handleLogout = async () => {
    try {
      await axios.post(URL + "/auth/logout", {}, { withCredentials: true });
      setAuthenticated(false);
      navigate("/");
      window.location.reload(); // Ensures navbar updates after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    axios
      .get(URL + "/auth/validate", { withCredentials: true }) // No need for Authorization header
      .then((res) => {
        if (res.status === 200) {
          setAuthenticated(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching data at home :", err);
        if (err.response?.status === 401) {
          setAuthenticated(false);
          console.error("Session expired. Please log in again.");
          // navigate("/login"); // Redirect to login page
        }
      });
  }, []);

  return (
    <>
      <Modal show={showLogout} onHide={handleCloseLogout}>
        <Modal.Header>
          Do you really want to logout?
        </Modal.Header>
        <Modal.Footer>
          <Button className="btn-secondary" onClick={handleCloseLogout}>Close</Button>
          <Button className="btn-warning" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
      <Navbar expand="lg" className="bg-body-tertiary shadow-sm py-0">
        <Container>
          {/* Brand on the left */}
          <Navbar.Brand
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
            className="merienda-logo icon-gradient-text"
          >
            Odisha
          </Navbar.Brand>

          {/* Toggle button for small screens */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          >
            <TfiAlignJustify />
          </Navbar.Toggle>

          {/* Navbar collapse */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-lg-flex align-items-center">
              <NavLink to="/" className="nav-link" end>
                Home
              </NavLink>
              <NavLink to="/AboutUs" className="nav-link">
                About Us
              </NavLink>
              <NavLink to="/ContactUs" className="nav-link">
                Contact Us
              </NavLink>
              <NavLink to="/UserGuide" className="nav-link">
                User Guide
              </NavLink>
              <NavLink to="/Help" className="nav-link">
                Help
              </NavLink>
              {authenticated ? (
                <NavDropdown
                  title={
                    <img
                      src={profile}
                      alt="Profile"
                      style={{ width: "40px", borderRadius: "50%" }}
                    />
                  }
                  id="profile-dropdown"
                  align="end"
                  className=""
                >
                  <NavDropdown.Item onClick={() => navigate("/profile")}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleShowLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    `btn ms-3 px-4 rounded-5 ${
                      isActive ? "btn-orange" : "btn-outline-success"
                    }`
                  }
                  to="/login"
                >
                  LOGIN
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>

        {/* Full-width dropdown for small screens */}
        {/* {expanded && (
        <div className="bg-body-tertiary w-100 position-absolute top-100 start-0 p-3">
          <Nav className="flex-column text-center">
            <Nav.Link name="" onClick={handleClick}>
              Home
            </Nav.Link>
            <Nav.Link name="AboutUs" onClick={handleClick}>
              About Us
            </Nav.Link>
            <Nav.Link name="ContactUs" onClick={handleClick}>
              Contact Us
            </Nav.Link>
            <Nav.Link name="UserGuide" onClick={handleClick}>
              User Guide
            </Nav.Link>
            <Button
              variant="outline-success"
              onClick={handleClick}
              name="login"
            >
              Login
            </Button>
          </Nav>
        </div>
      )} */}
      </Navbar>
    </>
  );
};

export default NavBar;
