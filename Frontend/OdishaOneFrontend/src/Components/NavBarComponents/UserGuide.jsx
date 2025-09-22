import { Container } from "react-bootstrap";
import bgPng from "../../assets/Banner/userguide-banner.png";
import HeaderSection from "../HeaderSection";

const UserGuide = () => {
  return (
    <>
      <HeaderSection header={"User Guide"} bgPng={bgPng} />
      <Container>
        <h1>User Guide</h1>
      </Container>
    </>
  );
};

export default UserGuide;
