import HeaderSection from "../HeaderSection";
import bgPng from "../../assets/Banner/help-banner.png";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import "../../css/Help.css";
import FileUpload from "./HelpComponents/FileUpload";
import { states, grievanceOptions } from "./HelpComponents/HelpData";
import { WarningMsg } from "./HelpComponents/HelperFunction";
import axios from "axios";

const Help = () => {
  const URL = import.meta.env.VITE_URL;
  const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pinCode: "",
    grievanceType: "",
    subType1: "",
    subType2: "",
    description: "",
  }
  //Main
  const [formData, setFormData] = useState(initialFormData);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  //utility
  const [subType1Options, setSubType1Options] = useState([]);
  const [subType2Options, setSubType2Options] = useState([]);
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [timeoutId, setTimeoutId] = useState(false);

  useEffect(() => {
    if (formData.grievanceType) {
      setSubType1Options(Object.keys(grievanceOptions[formData.grievanceType]));
      setFormData((prev) => ({ ...prev, subType1: "", subType2: "" }));
      setSubType2Options([]);
    }
  }, [formData.grievanceType]);

  useEffect(() => {
    if (formData.grievanceType && formData.subType1) {
      const options =
        grievanceOptions[formData.grievanceType][formData.subType1];
      setSubType2Options(options);
      setFormData((prev) => ({ ...prev, subType2: "" }));
    }
  }, [formData.subType1]);

  const handleChange = (e) => {
    setFormData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //utility
    setSubmiting(true);
    setError("");
    setShow(false);
    console.log(formData);

    const grievanceData = new FormData();

    if (uploadedFiles) {
      uploadedFiles.forEach((file) => {
        if (file) {
          grievanceData.append("files", file);
        }
      });
    }

    // Append form data as JSON in a Blob
    grievanceData.append(
      "data",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    axios
      .post(URL + "/newGrievance", grievanceData)
      .then((res) => {
        if (res.status == 200) {
          alert("Grievance submitted successfully");
        }
        // console.log(res.data);
        setSubmiting(false);
        setFormData(initialFormData);
        setUploadedFiles([]);
      })
      .catch((err) => {
        console.error(err);
        setShow(true);
        setError(err.message);
        const tId = setTimeout(() => {
          setError("");
          setShow(false);
        }, 15000);
        setTimeoutId(tId);
        setSubmiting(false);
      });
  };

  let handleInput = (event) => {
    // Clear the custom validation message when the user starts typing
    event.target.setCustomValidity("");
  };

  let handleInvalid = (event) => {
    // Set a custom validation message if the field is invalid
    const val = event.target.value;
    if (val.length > 0) {
      event.target.setCustomValidity(WarningMsg(event.target.name));
    }
  };

  return (
    <>
      <HeaderSection header={"Help"} bgPng={bgPng} />
      <Container className="mt-5 mb-5 rounded-5 bg-light shadow-lg p-4 ">
        <h2 className="text-center mb-4">Citizen Grievance Form</h2>
        <Form onSubmit={handleSubmit} className="">
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label className="help-required">Full Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  maxLength={30}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label className="help-required">Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Phone Number:</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="^[0-9]{10}$"
                  maxLength={10}
                  onInput={handleInput}
                  onInvalid={handleInvalid}
                />
              </Form.Group>
            </Col>

            <Col lg={6} md={12} className="mb-3">
              <Form.Group>
                <Form.Label className="help-required">
                  Address Line 1:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={6} md={12} className="mb-3">
              <Form.Group>
                <Form.Label>Address Line 2:</Form.Label>
                <Form.Control
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  maxLength={100}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Landmark:</Form.Label>
                <Form.Control
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  maxLength={100}
                />
              </Form.Group>
            </Col>

            <Col sm={6} md={3} className="mb-3">
              <Form.Group>
                <Form.Label className="help-required">City:</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  maxLength={30}
                />
              </Form.Group>
            </Col>

            <Col sm={6} md={3} className="mb-3">
              <Form.Group>
                <Form.Label className="help-required">State:</Form.Label>
                <Form.Select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option selected value="" disabled>
                    -- Select State --
                  </option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2} className="mb-3">
              <Form.Group>
                <Form.Label className="help-required">Pin Code:</Form.Label>
                <Form.Control
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  pattern="^[1-9][0-9]{5}$"
                  onInput={handleInput}
                  onInvalid={handleInvalid}
                  maxLength={6}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label className="help-required">
                  Grievance Type:{" "}
                </Form.Label>
                <Form.Select
                  name="grievanceType"
                  value={formData.grievanceType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    -- Select grievance type --
                  </option>
                  {Object.keys(grievanceOptions).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label className="help-required">Sub-Type 1:</Form.Label>
                <Form.Select
                  name="subType1"
                  value={formData.subType1}
                  onChange={handleChange}
                  disabled={!subType1Options.length}
                  required
                >
                  <option selected value="" disabled>
                    -- Select Sub-Type 1 --
                  </option>
                  {subType1Options.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label className="help-required">Sub-Type 2:</Form.Label>
                <Form.Select
                  name="subType2"
                  value={formData.subType2}
                  onChange={handleChange}
                  disabled={!subType2Options.length}
                  required
                >
                  <option selected disabled value="">
                    -- Select Sub-Type 2 --
                  </option>
                  {subType2Options.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={12} className="mb-3">
              <Form.Group>
                <Form.Label className="help-required">
                  Description of grievance:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col sm={6} className="mb-4">
              <FileUpload onFilesSelected={setUploadedFiles} />
            </Col>
          </Row>

          <div className="w-auto">
            {show && (
              <Alert
                variant="danger"
                onClose={() => {
                  setShow(false);
                  clearTimeout(timeoutId);
                }}
                dismissible
              >
                {error}
              </Alert>
            )}
            <Button type="submit" variant="primary" disabled={submiting}>
              {!submiting && <>Submit Grievance</>}
              {submiting && (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Submitting...
                </>
              )}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Help;
