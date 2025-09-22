import {
  LoadCanvasTemplateNoReload,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useState } from "react";
import "../../css/Register.css";
import axios from "axios";
import { Button, Form, Modal, Spinner } from "react-bootstrap";

const Register = ({ show, handleClose }) => {
  const URL = import.meta.env.VITE_URL;
  const formIntialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(formIntialState);
  const [retypePass, setRetypePass] = useState("");
  const [showPassNotMatching, setShowPassNotMatching] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [registrationDisabled, setRegistrationDisabled] = useState(false);

  const handleFormChange = (event) => {
    setFormData((currData) => ({
      ...currData,
      [event.target.name]: event.target.value,
    }));
  };

  const checkRetypedPassword = (event) => {
    const value = event.target.value;
    setRetypePass(value);
    setShowPassNotMatching(value !== formData.password);
  };

  const handleCaptchaInputChange = (event) => {
    setCaptchaError("");
    setCaptchaInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegistrationDisabled(true);

    if (!validateCaptcha(captchaInput)) {
      setCaptchaError("Invalid CAPTCHA. Please try again.");
      setRegistrationDisabled(false);
      return;
    }

    try {
      const response = await axios.post(URL + "/auth/Register", formData);
      setStatusMessage("success");
      setFormData(formIntialState);
      setRetypePass("");
      setTimeout(() => {
        setStatusMessage(null);
        handleClose();
        setRegistrationDisabled(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      setStatusMessage("failed");
      setRegistrationDisabled(false);
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton={!registrationDisabled}>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {statusMessage === "success" ? (
          <div className="text-center text-success">
            <h5>Registration Successful</h5>
            <p>Redirecting to login ...</p>
          </div>
        ) : statusMessage === "failed" ? (
          <div className="text-center text-danger">
            <h5>Registration Failed</h5>
            <p>Something went wrong, Please try again.</p>
            <Button
              variant="danger"
              onClick={() => {
                setStatusMessage(null);

                //temporary solution for error when registration fails and user clicks close then on register as the captcha unmounts
                window.location.reload();
              }}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            <Form.Group>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Retype Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Retype Password"
                value={retypePass}
                onChange={checkRetypedPassword}
                required
              />
              {showPassNotMatching && (
                <Form.Text className="text-danger">
                  Passwords do not match.
                </Form.Text>
              )}
            </Form.Group>
            <hr />
            <Form.Group className="mt-2">
              <LoadCanvasTemplateNoReload />
              <Form.Control
                type="text"
                placeholder="Enter Captcha"
                name="captchaInput"
                onChange={handleCaptchaInputChange}
                value={captchaInput}
              />
              {captchaError && (
                <Form.Text className="text-danger">{captchaError}</Form.Text>
              )}
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {statusMessage ? (
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        ) : (
          <>
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={registrationDisabled}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={registrationDisabled}
            >
              {registrationDisabled && (
                <Spinner
                  animation="border"
                  style={{ width: "1em", height: "1em", marginRight: "0.5em" }}
                />
              )}
              Register
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Register;
