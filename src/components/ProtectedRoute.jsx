import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenicated } = useAuth();

  useEffect(
    function () {
      if (!isAuthenicated) navigate("/");
    },
    [isAuthenicated, navigate]
  );

  return <div>{isAuthenicated && children}</div>;
}

export default ProtectedRoute;
