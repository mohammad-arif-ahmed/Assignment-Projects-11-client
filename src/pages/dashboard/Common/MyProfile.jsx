import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats } = useQuery({
        queryKey: ['user-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-stats/${user?.email}`);
            return res.data;
        }
    });

    return (
        <div className="p-10 flex flex-col items-center">
            <div className="avatar mb-5">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} alt="profile" />
                </div>
            </div>
            <h2 className="text-2xl font-bold">{user?.displayName}</h2>
            <p className="text-gray-500 mb-8">{user?.email}</p>
            
            <div className="stats shadow bg-blue-50">
                <div className="stat">
                    <div className="stat-title">Participation</div>
                    <div className="stat-value text-primary">{stats?.participation || 0}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Wins</div>
                    <div className="stat-value text-secondary">{stats?.wins || 0}</div>
                </div>
            </div>
        </div>
    );
};
export default MyProfile;