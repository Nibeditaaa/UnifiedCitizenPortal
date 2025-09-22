import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(null); // Initially null to indicate "checking..."
  const [loading, setLoading] = useState(true); // Track if check is in progress

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8082/auth/validate", {
          withCredentials: true, // Ensures HttpOnly cookie is sent
        });

        setAuthenticated(response.status === 200);
      } catch (error) {
        console.error(error)
        setAuthenticated(false);
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };

    checkAuth();
  }, []);

  return { authenticated, loading }; // Return both states
};

export default useAuth;
