import { Button, Container, Row } from "react-bootstrap";
import "../css/HeaderSection.css";
import { useNavigate } from "react-router-dom";

export default function HeaderSection({ header, bgPng }) {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(0deg, white, rgb(255, 215, 140)), url(${bgPng})`,
    backgroundPositionX: "55% !important",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundBlendMode: "overlay",
  };

  const navigate = useNavigate();
  
  return (
    <>
      <section className="section-box">
        <div className="banner-hero" style={backgroundStyle}>
          <Container className="h-100 d-flex align-items-center p-3">
            <Row>
              <div className="box-banner-left">
                <div className="block-2">
                  {/* <img
                    alt="All the best"
                    src="./assets/"
                  /> */}
                </div>
                <span className="brand-name text-nowrap">Unified Citizen Portal</span>
                <h3 className="header-h3">{header}</h3>
                <Button
                  className="header-back-btn"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Go Back
                </Button>
              </div>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}
