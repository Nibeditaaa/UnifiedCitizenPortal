import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";

const ResetPassword = () => {
  const URL = "http://localhost:8082";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(URL + "/auth/reset-password", {
        token,
        password,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage("Invalid or expired token");
      console.error(err);
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <div className="rounded-5 bg-body-tertiary p-5 shadow-lg w-50">
          <h2>Reset Your Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Type your new password :</Form.Label>
              <Form.Control
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Re-type password :</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Form.Text>{message && <p>{message}</p>}</Form.Text>
            </Form.Group>
            <Button type="submit" className="btn-warning mt-3">
              Update Password
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
