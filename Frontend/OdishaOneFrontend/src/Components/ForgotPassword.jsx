import axios from "axios";
import { useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";

export default function ForgotPassword() {
  const URL = "http://localhost:8082";
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setDisableSubmitBtn(true);
    axios
      .post(URL + "/auth/forgot-password", { email })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setAlertVariant("success");
          setDisableSubmitBtn(false);
        } else {
          setAlertVariant("warning");
        }
        setResponseMessage(res.data.message);
        setShowAlert(true);
      })
      

    console.log(email);
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <div className="rounded-5 bg-body-tertiary p-5 shadow-lg w-50">
          <h1>Did you forget your Password?</h1>
          {showAlert && (
            <Alert
              key={alertVariant}
              variant={alertVariant}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {responseMessage}
            </Alert>
          )}
          <Form onSubmit={handleSubmit} className="">
            <Form.Group>
              <Form.Label>Your email Address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Button
              className="mt-3 btn-warning"
              type="submit"
              disabled={disableSubmitBtn}
            >
              {disableSubmitBtn && (
                <>
                  <Spinner
                    style={{
                      width: "1em",
                      height: "1em",
                      marginRight: "0.5em",
                    }}
                    animation="border"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <span>Sending link</span>
                </>
              )}
              {!disableSubmitBtn && <span>Reset Password</span>}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}
