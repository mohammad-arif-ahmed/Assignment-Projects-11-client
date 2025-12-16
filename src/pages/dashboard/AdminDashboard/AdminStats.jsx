import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner';

const AdminStats = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading, isError } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        },
        enabled: !!localStorage.getItem('access-token') // Ensure token exists before querying
    });

    // Destructure data for easy access
    const { totalUsers, totalContests, totalRevenue, totalParticipations } = stats;

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-10">Failed to load admin statistics. (Check Admin Role)</div>;
    }

    return (
        <div className="p-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Admin Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* 1. Total Users */}
                <div className="bg-blue-100 p-6 rounded-lg shadow-md border-b-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-800">Total Users</h3>
                    <p className="text-4xl font-extrabold text-blue-600 mt-2">{totalUsers}</p>
                </div>

                {/* 2. Total Contests */}
                <div className="bg-green-100 p-6 rounded-lg shadow-md border-b-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-800">Total Contests</h3>
                    <p className="text-4xl font-extrabold text-green-600 mt-2">{totalContests}</p>
                </div>

                {/* 3. Total Revenue */}
                <div className="bg-yellow-100 p-6 rounded-lg shadow-md border-b-4 border-yellow-500">
                    <h3 className="text-lg font-semibold text-yellow-800">Total Revenue</h3>
                    <p className="text-4xl font-extrabold text-yellow-600 mt-2">${totalRevenue ? totalRevenue.toFixed(2) : '0.00'}</p>
                </div>
                
                {/* 4. Total Participations */}
                <div className="bg-purple-100 p-6 rounded-lg shadow-md border-b-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-800">Total Participations</h3>
                    <p className="text-4xl font-extrabold text-purple-600 mt-2">{totalParticipations}</p>
                </div>
            </div>

            {/* You can add charts or other admin info here */}
        </div>
    );
};

export default AdminStats;