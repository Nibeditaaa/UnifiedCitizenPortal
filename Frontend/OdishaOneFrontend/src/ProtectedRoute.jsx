import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { Container, Spinner } from "react-bootstrap";

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (<Container fluid className="d-flex align-items-center justify-content-center" style={{"height":"100vh"}}>
      <Spinner animation="border" />
    </Container>); // Show loading message while checking auth
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
