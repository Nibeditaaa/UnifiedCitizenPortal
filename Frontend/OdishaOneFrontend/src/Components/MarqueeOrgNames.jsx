import { Container } from "react-bootstrap";
import "../css/MarqueeOrgNames.css"
import footerLogo1 from "../assets/FooterLogo/footer-01.png";
import footerLogo2 from "../assets/FooterLogo/footer-02.png";
import footerLogo3 from "../assets/FooterLogo/footer-03.png";
import footerLogo4 from "../assets/FooterLogo/footer-04.png";
import footerLogo5 from "../assets/FooterLogo/footer-05.png";
import footerLogo6 from "../assets/FooterLogo/footer-06.png";

const images = [
  footerLogo1,
  footerLogo2,
  footerLogo3,
  footerLogo4,
  footerLogo5,
  footerLogo6,
];

function Marquee() {
  return (
    <Container className="mt-4">
      <div className="marquee-container">
        <div className="marquee-content">
          {/* Original list */}
          {images.map((img, index) => (
            <div className="marquee-item" key={`original-${index}`}>
              <img src={img} alt="Odisha Govt Logo" />
            </div>
          ))}
          {/* Duplicate list for seamless scrolling */}
          {images.map((img, index) => (
            <div className="marquee-item" key={`duplicate-${index}`}>
              <img src={img} alt="Odisha Govt Logo" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Marquee;
