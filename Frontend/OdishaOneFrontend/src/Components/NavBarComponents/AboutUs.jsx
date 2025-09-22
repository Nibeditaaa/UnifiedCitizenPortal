import { Container } from "react-bootstrap";
import HeaderSection from "../HeaderSection.jsx";
import bgPng from "../../assets/Banner/about-banner.png";
import "../../css/AboutUs.css"

const AboutUs = () => {
  return (
    <>
      <HeaderSection header={"About Us"} bgPng={bgPng} />
      <Container className="about-us-container mt-4">
        <h1>National Informatics Centre (NIC) - India</h1>
        <p>
          <strong>National Informatics Centre (NIC)</strong> is a premier Indian
          government organization under the{" "}
          <strong>
            Ministry of Electronics and Information Technology (MeitY)
          </strong>
          . It plays a crucial role in providing e-Governance solutions,
          infrastructure, and digital services across India.
        </p>

        <h3>Establishment and Objective</h3>
        <p>
          NIC was established in 1976 to provide technology-driven
          governance and digital transformation for the Indian government.
          It supports various government initiatives through IT services and
          software applications.
        </p>

        <h3>Key Functions of NIC</h3>
        <ul>
          <li>
            Developing and maintaining government websites and portals.
          </li>
          <li>Providing cloud computing and data center services.</li>
          <li>
            Enabling e-Governance initiatives like DigiLocker, eOffice, and
            eCourts.
          </li>
          <li>
            Offering cybersecurity solutions and digital certificates.
          </li>
          <li>
            Supporting state and central government projects with IT
            solutions.
          </li>
        </ul>

        <h3>Major Initiatives</h3>
        <ul>
          <li>
            <strong>DigiLocker:</strong> A cloud-based document storage
            platform.
          </li>
          <li>
            <strong>eOffice:</strong> A digital workplace solution for
            government offices.
          </li>
          <li>
            <strong>eHospital:</strong> An online health information system.
          </li>
          <li>
            <strong>eCourts:</strong> Digital solutions for judiciary
            operations.
          </li>
        </ul>

        <h3>Significance of NIC</h3>
        <p>
          NIC is instrumental in India’s Digital India mission, ensuring
          secure, scalable, and high-quality digital solutions for the
          government. It connects ministries, departments, and citizens
          through innovative IT services.
        </p>
      </Container>
    </>
  );
};

export default AboutUs;
