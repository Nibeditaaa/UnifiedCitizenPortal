import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Download, Paperclip } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";

const GrievanceDetail = () => {
  const URL = import.meta.env.VITE_URL;
  const { id } = useParams();
  const [grievance, setGrievance] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
const [rejectionReason, setRejectionReason] = useState("");
  const [filesMetaData, setFilesMetaData] = useState([]);
  const updateStatus = async (status, rejectionReason = null) => {
  try {
    const params = new URLSearchParams();
    params.append("status", status);
    if (rejectionReason) {
      params.append("rejectionReason", rejectionReason);
    }

    const response = await axios.put(
      `${URL}/grievance/${id}/status?${params.toString()}`,
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      alert("Status updated successfully!");
      // Refresh grievance details after update
      setGrievance((prev) => ({
        ...prev,
        status,
        rejectionReason: rejectionReason || prev.rejectionReason,
      }));
    }
  } catch (error) {
    console.error("Error updating status:", error);
    alert("Failed to update status");
  }
};







  const downloadFile = async (fileId) => {
  try {
    const response = await axios.get(`${URL}/grievance/downloadFile/${fileId}`, {
      responseType: "blob", // important: tell axios to expect binary data
      withCredentials: true,
    });

    // Get filename from Content-Disposition header (backend already sets this)
    const contentDisposition = response.headers["content-disposition"];
    let fileName = "downloaded_file";
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+)"?/);
      if (match?.[1]) fileName = match[1];
    }

    // Create a download link
    const blob = new Blob([response.data], { type: response.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};



  useEffect(() => {
    console.log(id);
    axios
      .get(URL + `/getGrievance/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          setGrievance(res.data);
          //   setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching grievances:", error);
        // setLoading(false);
      });

    axios
      .get(URL + `/grievance/getFileMetaData/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          setFilesMetaData(res.data);
          //   setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching files meta data:", error);
        // setLoading(false);
      });
  }, []);


  if (!grievance) {
    return <div>Loading...</div>;
  }

  const statusColors = {
    Pending: "warning",
    InProgress: "info",
    Solved: "success",
    Closed: "danger",
  };

  return (
    <Container fluid className="rounded-5 shadow-lg p-5">
      <h1>Grievance Details</h1>
      
      <Form className="">
        <Row>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label className="help-required">Full Name:</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={grievance.fullName}
                disabled
              />
            </Form.Group>
          </Col>

          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label className="help-required">Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={grievance.email}
                disabled
              />
            </Form.Group>
          </Col>

          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={grievance.phone}
                disabled
              />
            </Form.Group>
          </Col>

          <Col lg={6} md={12} className="mb-3">
            <Form.Group>
              <Form.Label className="help-required">Address Line 1:</Form.Label>
              <Form.Control
                type="text"
                name="addressLine1"
                value={grievance.addressLine1}
                disabled
              />
            </Form.Group>
          </Col>

          <Col lg={6} md={12} className="mb-3">
            <Form.Group>
              <Form.Label>Address Line 2:</Form.Label>
              <Form.Control
                type="text"
                name="addressLine2"
                value={grievance.addressLine2}
                disabled
              />
            </Form.Group>
          </Col>

          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Landmark:</Form.Label>
              <Form.Control
                type="text"
                name="landmark"
                value={grievance.landmark}
                disabled
              />
            </Form.Group>
          </Col>

          <Col sm={6} md={3} className="mb-3">
            <Form.Group>
              <Form.Label className="help-required">City:</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={grievance.city}
                disabled
              />
            </Form.Group>
          </Col>

          <Col sm={6} md={3} className="mb-3">
            <Form.Group>
              <Form.Label className="help-required">State:</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={grievance.state}
                disabled
              />
            </Form.Group>
          </Col>

          <Col md={2} className="mb-3">
            <Form.Group>
              <Form.Label className="help-required">Pin Code:</Form.Label>
              <Form.Control
                type="text"
                name="pinCode"
                value={grievance.pinCode}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label className="help-required">Grievance Type:</Form.Label>
              <Form.Control
                type="text"
                name="grievanceType"
                value={grievance.grievanceType}
                disabled
              />
            </Form.Group>
          </Col>

          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label className="help-required">Sub-Type 1:</Form.Label>
              <Form.Control
                type="text"
                name="subType1"
                value={grievance.subType1}
                disabled
              />
            </Form.Group>
          </Col>

          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label className="help-required">Sub-Type 2:</Form.Label>
              <Form.Control
                type="text"
                name="subType2"
                value={grievance.subType2}
                disabled
              />
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
                value={grievance.description}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <h2>Associated Files</h2>
      <Container>
        <Row className="w-50">
          {filesMetaData.length > 0 && (
            <ListGroup className="mt-3">
              {filesMetaData.map((file) => (
                <ListGroup.Item
                  key={file.id}
                  className="d-flex align-items-center">
                  <Paperclip />
                  {file.fileName} — {(file.fileSize / 1024).toFixed(2)} KB
                  <Button
                    title="Remove File"
                    variant="primary"
                    size="sm"
                    onClick={() => downloadFile(file.id)}
                    className="rounded-5 d-flex justify-content-center align-items-center ms-auto">
                    <Download/>
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          {filesMetaData.length == 0 && <span>-- No files --</span>}
        </Row>
      </Container>
     {/* ✅ Status Badge */}
<div className="mt-4">
  {grievance.status === "Pending" && (
    <span className="badge bg-warning text-dark">Pending</span>
  )}
  {grievance.status === "InProgress" && (
    <span className="badge bg-primary">In Progress</span>
  )}
  {grievance.status === "Closed" && (
    <span className="badge bg-danger">Closed</span>
  )}
  {grievance.status === "Solved" && (
    <span className="badge bg-success">Solved</span>
  )}
</div>

{/* ✅ Accept / Reject Buttons */}
{(grievance.status === "Pending" || grievance.status === "InProgress") && (
  <div className="mt-3">
    <Button
      variant="success"
      className="me-2"
      onClick={() =>
        updateStatus(grievance.status === "Pending" ? "InProgress" : "Solved")
      }disabled={grievance.status === "Closed"}
    >
      {grievance.status === "Pending" ? "Accept" : "Mark as Solved"}
    </Button>

    <Button
      variant="danger"
      onClick={() => setShowRejectModal(true)}
      disabled={grievance.status === "Closed"}
    >
      Reject
    </Button>
  </div>
)}

{/* ✅ Always show rejection reason if Closed */}
{grievance.status === "Closed" && grievance.rejectionReason && (
  <div className="mt-3 alert alert-danger">
    <strong>Rejection Reason:</strong> {grievance.rejectionReason}
  </div>
)}


{/* Reject Modal */}
{showRejectModal && (
  <div className="modal show d-block" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Reject Grievance</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowRejectModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <Form.Group>
            <Form.Label>Please provide a reason for rejection:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="modal-footer">
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              updateStatus("Closed", rejectionReason);
              setShowRejectModal(false);
            }}
            disabled={!rejectionReason.trim()}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  </div>
)}




    </Container>
  );
};

export default GrievanceDetail;