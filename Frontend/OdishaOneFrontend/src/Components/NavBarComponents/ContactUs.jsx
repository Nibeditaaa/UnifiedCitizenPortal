import { Col, Container, Row } from "react-bootstrap";
import bgPng from "../../assets/Banner/contact-banner.png";
import HeaderSection from "../HeaderSection";
import contactUsImg from "../../assets/contact-us.png";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";

const ContactUs = () => {
  return (
    <>
      <HeaderSection header={"Contact Us"} bgPng={bgPng} />
      <Container fluid className="p-5">
        <Container className="rounded-5 bg-body-tertiary p-5 shadow-lg">
          <Row>
            <Col
              xs={6}
              className="d-flex justify-content-center align-items-center"
            >
              <div>
                <h1>Have a query?</h1>
                <p>The right move at the right time saves your time.</p>
                <p><FaPhoneAlt /> +91 8249508835</p>
                <p><MdOutlineEmail/> support.gov@nic.com</p>
                <div className="d-flex justify-content-center">
                  <FaMapLocationDot className="mt-1"/>&nbsp;
                  <div>Sachivalaya Marg, OSHB Ln, Opposite to, Bhouma Nagar, Bhubaneswar, Odisha 751001</div>
                </div>
              </div>
            </Col>
            <Col xs={6}>
              <img src={contactUsImg} alt="" width="500px" />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default ContactUs;
