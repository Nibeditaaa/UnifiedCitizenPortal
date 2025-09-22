import React, { useEffect, useState } from "react";
import "../../../css/Announcements.css";
import announcementsPng from "../../../assets/announcements.png";
import axios from "axios";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const URL = "http://localhost:9091";

  

  // Simulate fetching data
  useEffect(() => {
    axios
      .get(URL + "/getAnnouncement", { withCredentials: true })
      .then((res) => {
      console.log(res.data);
        
        setAnnouncements(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="announcements-container">
      <div className="d-flex align-items-center justify-content-center gap-1">
        <img
          src={announcementsPng}
          className="announcement-img"
          alt="Announcements"
        />
        <h2 className="announcements-heading m-0">Announcements</h2>
      </div>
      <hr className="mb-0" />
      <div className="announcements-viewport">
        <div className="announcements-scrollArea">
          {announcements.map((item, index) => (
  <div key={index} className="announcements-card">
    <div className="announcements-title">{item.title}</div>
    <div className="announcements-date">{item.date_posted}</div>
    <div className="announcements-body">{item.body}</div>
  </div>
))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
