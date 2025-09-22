import { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import "../../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import Register from "./Register";
import bgPng from "../../assets/Banner/login-banner.png";
import HeaderSection from "../HeaderSection";

const Login = () => {
  const URL = import.meta.env.VITE_URL
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const navigate = useNavigate();
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [loginStatusMessage, setLoginStatusMessage] = useState(null);

  //error
  const [loginError, setLoginError] = useState('');

  // Load CAPTCHA on component mount
  useEffect(() => {
    loadCaptchaEnginge(6); // Generates a 6-character CAPTCHA
  }, [showRegistration]);

  const handleCloseRegistration = () => setShowRegistration(false);
  const handleShowRegistration = () => setShowRegistration(true);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleFromChange = (event) => {
    setCredentials((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  const handleCaptchaInputChange = (event) => {
    setCaptchaError("");
    setCaptchaInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginDisabled(true);
    // Validate CAPTCHA before submitting
    if (!validateCaptcha(captchaInput)) {
      setCaptchaError("Invalid CAPTCHA. Please try again.");
      setCaptchaInput("");
      setLoginDisabled(false);
      return;
    }
    
    console.log("Login Credentials:", credentials);

    try {
      await axios.post(
        URL + "/auth/Login",
        credentials,
        {
          withCredentials: true,
        }
      );
      setLoginStatusMessage("success");
      handleShowLogin();
      setLoginDisabled(false);
    } catch (error) {
      console.error("Login Failed:", error);
      if (error.status == 401) {
        setLoginError("Please verify your email and password.")
      }else{
        setLoginError(error.response.data.error);
      }
      setLoginStatusMessage(null);
      handleShowLogin();
      setLoginDisabled(false);
    }

  };

  return (
    <>
      <Modal
        show={showLogin}
        onHide={handleCloseLogin}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          {loginStatusMessage === "success" ? (
            <div className="text-center text-success">
              <h3>Login Successfull !!</h3>
            </div>
          ) : (
            <div className="text-center text-danger">
              <h4>Oops! Looks like something’s off</h4>
              <p>{loginError}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {loginStatusMessage === "success" ? (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("/");
                  window.location.reload();
                }}
              >
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={handleCloseLogin}>
                Close
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <HeaderSection header={"Login"} bgPng={bgPng} />
      <Register show={showRegistration} handleClose={handleCloseRegistration} />
      <Container className="">
        <Row>
          <Col className="order-2 order-md-1" lg={7} md={6} sm={12}>
            <Col className="d-flex justify-content-center flex-column m-4 p-3 bg-light rounded-3 shadow">
              {/* Row for Text and Button */}
              <Row className="align-items-center">
                {/* Text Section */}
                <Col lg={5} md={6} sm={12}>
                  <p className="mb-0">
                    <em>If you are a new Citizen, Click Here for.</em>
                  </p>
                </Col>

                {/* Button Section */}
                <Col className="text-start">
                  <Button
                    className="register-btn"
                    onClick={handleShowRegistration}
                  >
                    Register
                  </Button>
                </Col>
              </Row>
              <hr />
              {/* Content Below */}
              <p>
                A unified citizen portal aims to provide citizens with convenient, 
                centralized access to various government services and information. 
                It typically includes features like user management, grievance filing, 
                content management, and a user-friendly interface for navigating services. 
                Examples include Odisha One portal, which integrates e-governance applications
                 and offers online services from multiple departments.
              </p>
            </Col>
          </Col>

          <Col lg={5} md={6} sm={12} className="order-1 order-md-2">
            <Col
              className="d-flex justify-content-center flex-column m-4 p-0 bg-light rounded-3 shadow"
              // style={{ maxWidth: "600px" }} // Ensures it doesn't overflow
            >
              <h5
                className="d-flex align-center justify-content-center align-items-center m-0 p-3 rounded-top-3"
                style={{ backgroundColor: "orange" }}
              >
                Log in to your Account
              </h5>
              <Col className="p-3">
                <Form onSubmit={handleSubmit} className="">
                  <Form.Group>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={credentials.email}
                      onChange={handleFromChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      value={credentials.password}
                      onChange={handleFromChange}
                      required
                    />
                  </Form.Group>
                  <hr />
                  <Form.Group className="mt-2">
                    {!showRegistration && <LoadCanvasTemplateNoReload />}
                    <Form.Control
                      type="text"
                      placeholder="Enter Captcha"
                      name="captchaInput"
                      onChange={handleCaptchaInputChange}
                      value={captchaInput}
                    />
                    {captchaError && (
                      <Form.Text className="text-danger">
                        {captchaError}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3"
                    disabled={loginDisabled}
                  >
                    {loginDisabled && (
                      <Spinner
                        animation="border"
                        style={{
                          width: "1em",
                          height: "1em",
                          marginRight: "0.5em",
                        }}
                      />
                    )}
                    Login
                  </Button>
                  <p className="mt-3 mb-0"><a href="" onClick={()=>{navigate("/forgotPassword")}}>forgot your password?</a></p>
                </Form>
              </Col>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
