import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Grievances() {
  const URL = import.meta.env.VITE_URL;
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const [statusCounts, setStatusCounts] = useState({
    Pending: 0,
    InProgress: 0,
    Closed: 0,
    Solved: 0,
  });
  useEffect(() => {
  setLoading(true);

  // Fetch grievances
  axios
    .get(URL + "/getAllGrievances", { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        setGrievances(res.data);
        setLoading(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching grievances:", error);
      setLoading(false);
    });

  // Fetch status counts
  axios
    .get(URL + "/grievance/statusCounts", { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        setStatusCounts(res.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching status counts:", error);
    });
}, []);




  const handleActionClick = (id) => {
    navigate(`/dashboard/grievances/${id}`);
  };

  if (loading) {
    return <p>Loading grievances...</p>;
  }

  return (
    <div>
      <h1 className="mb-5">Grievance Management System</h1>
      <div className="mb-4">
  <h5>Status Summary</h5>
  <div style={{ display: "flex", gap: "1rem" }}>
          <span className="badge" style={{ backgroundColor: "#CD853F"}}>
            Pending: {statusCounts.Pending}
          </span>
          <span className="badge" style={{ backgroundColor: "#003366"}}>
            InProgress: {statusCounts.InProgress}
          </span>
          <span className="badge bg-danger">
            Closed: {statusCounts.Closed}
          </span>
          <span className="badge bg-success">
            Solved: {statusCounts.Solved}
          </span>
        </div>
</div>

      <div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid black" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Grievance Type</th>
              <th>Sub Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((grievance) => {
  const randomId = Math.floor(100000 + Math.random() * 900000); // Generate here
  return (
    <tr key={grievance.id} style={{ borderBottom: "1px solid gray" }}>
      <td>{randomId}</td> {/* Random 6-digit ID */}
      <td>{grievance.fullName}</td>
      <td>{grievance.grievanceType}</td>
      <td>{grievance.subType1} - {grievance.subType2}</td>
      <td>
        <button
          className={
            "btn btn-sm disabled " +
            (grievance.status === "Pending"
              ? "btn-secondary"
              : grievance.status === "InProgress"
              ? "btn-info"
              : grievance.status === "Closed"
              ? "btn-danger"
              : grievance.status === "Solved"
              ? "btn-success"
              : "btn-dark")
          }
          disabled
        >
          {grievance.status}
        </button>
      </td>
      <td style={{ padding: "4px" }}>
        <button
          onClick={() => handleActionClick(grievance.id)}
          className="btn btn-warning"
        >
          Take Action
        </button>
      </td>
    </tr>
  );
})}

</tbody>
        </table>
      </div>
    </div>
    

  );
}
