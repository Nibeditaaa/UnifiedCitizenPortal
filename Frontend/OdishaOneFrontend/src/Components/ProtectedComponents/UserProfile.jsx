import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Form, Spinner, Alert } from "react-bootstrap";

function UserProfile() {
  const URL = import.meta.env.VITE_URL;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL + "/userProfile", {
          withCredentials: true,
        });
        setUser(response.data);
        setUpdatedUser(response.data); // Initialize editable fields
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(URL + "/updateUser", updatedUser, {
        withCredentials: true,
      });
      setUser(updatedUser);
      setEditing(false);
      setLoading(false);
    } catch (err) {
      console.error("Error updating user profile:", err);
      setError("Failed to update user data.");
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-4">
      <Card className="shadow-lg p-4 w-50 bg-body-tertiary border-0">
        <Card.Body>
          <h2 className="text-center mb-4">Your Profile</h2>

          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && user && (
            <>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={updatedUser.firstName}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={updatedUser.lastName}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                    disabled={true}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={updatedUser.phoneNumber}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </Form.Group>
              </Form>

              <div className="d-flex justify-content-between mt-3">
                {!editing ? (
                  <Button variant="primary" onClick={() => setEditing(true)}>
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button variant="success" onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={() => setEditing(false)}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserProfile;
