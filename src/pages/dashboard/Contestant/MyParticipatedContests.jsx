import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner';

const MyParticipatedContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myContests = [], isLoading } = useQuery({
        queryKey: ['my-participated', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-participated-contests/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">My Participated Contests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myContests.map(contest => (
                    <div key={contest._id} className="card bg-base-100 shadow-xl border">
                        <div className="card-body">
                            <h2 className="card-title text-blue-600">{contest.contestName}</h2>
                            <p className="text-sm font-semibold text-gray-500">Transaction ID: {contest.transactionId}</p>
                            <p className="text-sm">Price Paid: ${contest.price}</p>
                            <div className="badge badge-outline mt-2">{contest.status || 'Registered'}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MyParticipatedContests;