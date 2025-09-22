import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../css/Footer.css"

const Footer = () => {
  return (
    <footer className="footer mt-4">
      <Container>
        <Row className="py-4 text-white">
          <Col md={3} sm={6} className="mb-3">
            <h5>Odisha</h5>
            <p>© 2025 NIC, Meity</p>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Features</Nav.Link>
              <Nav.Link href="#">Pricing</Nav.Link>
              <Nav.Link href="#">FAQs</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
            </Nav>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <h5>Resources</h5>
            <Nav className="flex-column">
              <Nav.Link href="#">Blog</Nav.Link>
              <Nav.Link href="#">Support</Nav.Link>
              <Nav.Link href="#">Privacy Policy</Nav.Link>
              <Nav.Link href="#">Terms of Service</Nav.Link>
            </Nav>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#" className="me-3">
                <FaFacebookF />
              </a>
              <a href="#" className="me-3">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
