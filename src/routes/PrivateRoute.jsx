import {
  Navigate,
  useLocation,
} from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {

  const {
    user,
    loading,
  } = useAuth();

  const location = useLocation();

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        <span className="loading loading-spinner loading-lg"></span>

      </div>

    );

  }

  if (!user) {

    return (
      <Navigate
        to="/login"
        state={location.pathname}
      />
    );

  }

  return children;

};

export default PrivateRoute;