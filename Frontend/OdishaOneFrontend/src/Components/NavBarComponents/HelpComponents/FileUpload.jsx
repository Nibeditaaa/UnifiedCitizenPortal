import React, { useState } from "react";
import { Form, Alert, ListGroup, Button } from "react-bootstrap";
import { XLg, Paperclip } from "react-bootstrap-icons"; // Optional: or use FontAwesome/any icon set

export default function FileUpload({ onFilesSelected }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const MAX_FILES = 5;
  const MAX_SIZE_MB = 1;

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...files];

    // Check total count
    if (updatedFiles.length + newFiles.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }

    // Check each file
    for (const file of newFiles) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setShow(true);
        setError(`File ${file.name} exceeds ${MAX_SIZE_MB}MB.`);
        return;
      }
      if (
        updatedFiles.find((f) => f.name === file.name && f.size === file.size)
      ) {
        setShow(true);
        setError(`File "${file.name}" already added.`);
        return;
      }
      updatedFiles.push(file);
    }

    setError("");
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles); // Send to parent
    e.target.value = ""; // reset input so same file can be reselected if removed
  };

  const handleRemoveFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesSelected(updated);
  };

  return (
    <Form.Group className="mb-4">
      <Form.Label>Upload Files (Max: <span className="text-danger">5</span>, ≤<span className="text-danger">1MB</span> each)</Form.Label>
      <Form.Control
        type="file"
        multiple
        id="fileUpload"
        onChange={handleFileChange}
        accept="image/*,.pdf,.doc,.docx"
        className="d-none"
      />
      <label htmlFor="fileUpload" className="btn btn-secondary ms-3 rounded-5">
        Choose Files
      </label>

      {show && (
        <Alert variant="danger" className="mt-2" onClose={() => setShow(false)} dismissible>
          {error}
        </Alert>
      )}

      {files.length > 0 && (
        <ListGroup className="mt-3">
          {files.map((file, idx) => (
            <ListGroup.Item
              key={idx}
              className="d-flex align-items-center"
            >
              <Paperclip/>{file.name} — {(file.size / 1024).toFixed(2)} KB
              <Button
                title="Remove File"
                variant="outline-danger"
                size="sm"
                onClick={() => handleRemoveFile(idx)}
                className="rounded-5 d-flex justify-content-center align-items-center ms-auto"
              >
                <XLg />
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Form.Group>
  );
}
