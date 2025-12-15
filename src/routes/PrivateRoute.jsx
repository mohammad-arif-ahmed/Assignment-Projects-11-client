
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth"; 

const PrivateRoute = ({ children }) => {
    // Access auth state
    const { user, loading } = useAuth();
    const location = useLocation(); 

    // 1. Show Loading State (Very Important)
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span> 
            </div>
        );
    }

    // 2. If user is logged in, show the requested page (children)
    if (user) {
        return children;
    }

    return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default PrivateRoute;