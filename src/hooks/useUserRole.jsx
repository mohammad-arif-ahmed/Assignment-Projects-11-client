import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth'; 
import useAxiosSecure from './useAxiosSecure'; 

const useUserRole = () => {
    const { user, loading } = useAuth(); 
    const axiosSecure = useAxiosSecure();

    const { data: userRole = 'Participant', isLoading: isRoleLoading, isError } = useQuery({
        queryKey: ['userRole', user?.email], 
        
        enabled: !loading && !!user?.email, 
        
        queryFn: async () => {
            if (!user?.email) {
                return 'Participant';
            }
            
            const res = await axiosSecure.get(`/users/role/${user.email}`); 
            
            return res.data.role; 
        },
        onError: (err) => {
            console.error("Error fetching user role:", err);
            return 'Participant';
        }
    });

    return {
        userRole,
        isLoading: isRoleLoading || loading, 
        isAdmin: userRole === 'Admin',
        isCreator: userRole === 'Creator',
        isParticipant: userRole === 'Participant',
        isError,
    };
};

export default useUserRole;