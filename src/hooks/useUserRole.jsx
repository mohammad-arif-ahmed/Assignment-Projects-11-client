
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure(); 
    
    // Check if the user is authenticated and not currently loading auth state
    const isReady = !!user && !loading;

    // Use TanStack Query to fetch the user's role from the backend
    const { data: role = 'contestant', isLoading: isRoleLoading } = useQuery({
        // 1. Query Key: Should be unique and include user email
        queryKey: ['userRole', user?.email], 
        
        // 2. Enable Query: Only run if the user is logged in
        enabled: isReady, 
        
        // 3. Query Function: Call the secure API
        queryFn: async () => {
            // This API endpoint (e.g., /users/role/:email) should be created in your backend
            const res = await axiosSecure.get(`/users/role/${user.email}`); 
            return res.data.role; // Assuming the backend returns { role: 'admin' }
        }
    });

    // We return the role, and the loading state of the role fetch
    return [role, isRoleLoading];
};

export default useUserRole;