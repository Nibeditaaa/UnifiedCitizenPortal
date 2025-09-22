import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { Container, Spinner } from "react-bootstrap";

//Checks if user is authenticated, if yes returns to home else routes to login
const Authenticated = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (<Container fluid className="d-flex align-items-center justify-content-center" style={{"height":"100vh"}}>
      <Spinner animation="border" />
    </Container>);
  }

  return authenticated ? <Navigate to="/" /> : <Outlet />;
};

export default Authenticated;
