import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // إذا لم يكن هناك توكن، انتقل لصفحة تسجيل الدخول
    }
  }, [navigate]);

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedRoute;
