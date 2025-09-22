import React, { useEffect, useState } from "react";
import { Container, Button, Form, Modal, Accordion } from "react-bootstrap";
import "../../../css/Sidebar_Announcement.css";
import axios from "axios";

const Sidebar_Announcement = () => {
  const URL = "http://localhost:9090";
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome!",
      date_posted: "2025-04-01",
      body: "This is your new dashboard. Check back for updates!",
    },
  ]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [editForm, setEditForm] = useState({ id: 0, title: "", body: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchAnnouncements = () => {
    axios
      .get(URL + "/getAnnouncement", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setAnnouncements(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = () => {
    if (form.title.trim() && form.body.trim()) {
      const newAnnouncement = {
        title: form.title.trim(),
        body: form.body.trim(),
      };
      axios
        .post(URL + "/addAnnouncement", newAnnouncement, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          fetchAnnouncements();
        })
        .catch((err) => {
          console.error(err);
        });
      setForm({ title: "", body: "" });
    }
  };

  const handleEdit = (index) => {
    const { id, title, body } = announcements[index];
    setEditForm({ id, title, body });
    setShowModal(true);
  };

  const handleUpdate = () => {
    axios
      .put(URL + "/updateAnnouncement", editForm, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        fetchAnnouncements();
      })
      .catch((err) => {
        console.error(err);
      });
    setShowModal(false);
  };

  const handleDelete = (index) => {
    const deleteAnnouncement = announcements[index];
    console.log(deleteAnnouncement);
    axios
      .delete(URL + `/deleteAnnouncement/${deleteAnnouncement.id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        fetchAnnouncements();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container className="sidebar-announcement">
      <h4>Manage Announcements</h4>

      <Form className="my-3">
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            placeholder="Enter title"
            value={form.title}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="body"
            placeholder="Enter announcement content"
            value={form.body}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Button
          onClick={handleAdd}
          disabled={!form.title.trim() || !form.body.trim()}
        >
          Add Announcement
        </Button>
      </Form>

      <h5 className="mt-5">Announcements</h5>
      <Accordion alwaysOpen>
        {announcements.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <strong>{item.title}</strong>
                <span
                  className="text-muted me-2"
                  style={{ fontSize: "0.8rem" }}
                >
                  Posted on: {item.date_posted}
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <p>{item.body}</p>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={editForm.title}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                rows={3}
                value={editForm.body}
                onChange={handleEditFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Sidebar_Announcement;
