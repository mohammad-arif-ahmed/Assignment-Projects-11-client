
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
    // Access the context value (user, loading, signIn, logOut, etc.)
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;