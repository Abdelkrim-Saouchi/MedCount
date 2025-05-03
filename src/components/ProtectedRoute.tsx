import { Outlet } from "react-router";
import Login from "./Login";

const ProtectedRoute = ({
  isAuthenticated,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!isAuthenticated) {
    return <Login setAuthenticated={setIsAuthenticated} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
