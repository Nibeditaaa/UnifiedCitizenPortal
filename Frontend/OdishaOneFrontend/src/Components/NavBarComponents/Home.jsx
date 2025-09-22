import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../../assets/banner-001.png";
import banner2 from "../../assets/hockey-english.jpg";
import banner3 from "../../assets/ov-english.jpg";
import banner4 from "../../assets/utkarsh-odisha-english.png";
import "../../css/Home.css";
import HomeChart from "./HomeComponents/HomeChart";
import Announcement from "./HomeComponents/Announcements";

const Home = () => {
  

  return (
    <>
      <Container fluid className="px-0 shadow-sm">
        <Carousel data-bs-theme="dark">
          <Carousel.Item interval={5000}>
            <img
              src={banner1}
              alt="Odisha One"
              className="d-block w-100"
              style={{ objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              src={banner2}
              alt="Odisha One"
              className="d-block w-100"
              style={{ objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              src={banner3}
              alt="Odisha One"
              className="d-block w-100"
              style={{ objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              src={banner4}
              alt="Odisha One"
              className="d-block w-100"
              style={{ objectFit: "cover" }}
            />
          </Carousel.Item>
        </Carousel>
      </Container>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
      >
        <Announcement />
      </div>
      <Container fluid className="p-0">
        <HomeChart />
      </Container>
    </>
  );
};

export default Home;
