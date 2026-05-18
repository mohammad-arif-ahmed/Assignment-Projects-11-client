import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import useRole from "../hooks/useRole";

const CreatorRoute = ({ children }) => {

  const { user, loading } = useAuth();

  const [role, isLoading] = useRole();

  if (loading || isLoading) {

    return (
      <div className="flex justify-center items-center min-h-screen">

        <span className="loading loading-spinner loading-lg"></span>

      </div>
    );

  }

  if (user && role === "creator") {

    return children;

  }

  return <Navigate to="/" />;

};

export default CreatorRoute;