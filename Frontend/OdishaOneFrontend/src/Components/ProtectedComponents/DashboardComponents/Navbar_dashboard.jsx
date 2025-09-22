import { useNavigate } from "react-router-dom"
import userProfileImg from "../../../assets/profile.png";
import { Button, Container, Navbar, NavDropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const NavBar_dashboard = ({showSidebar, setShowSidebar, handleShowLogout}) => {
    const navigate = useNavigate();
    return (
        <Navbar className="navbar-custom">
            <Container fluid>
              <div className="d-flex gap-3 align-items-center">
                <Button
                  variant="outline-dark"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  <FaBars />
                </Button>
                <h5 className="m-0">Admin Dashboard</h5>
              </div>
              <NavDropdown
                title={
                  <img
                    src={userProfileImg}
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
            </Container>
          </Navbar>
    )
}

export default NavBar_dashboard;