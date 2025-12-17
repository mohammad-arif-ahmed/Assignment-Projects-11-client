import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner';

const MyWinningContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: winnings = [], isLoading } = useQuery({
        queryKey: ['my-winnings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/creator`); // এটি পরে ফিল্টার হবে ইউজার ইমেইল দিয়ে
            return res.data.filter(sub => sub.participantEmail === user?.email && sub.status === 'Winner');
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-green-600">🏆 My Winning Contests</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full border">
                    <thead className="bg-green-100">
                        <tr>
                            <th>#</th>
                            <th>Contest Name</th>
                            <th>Prize Money</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winnings.map((win, index) => (
                            <tr key={win._id}>
                                <th>{index + 1}</th>
                                <td>{win.contestName}</td>
                                <td>Success</td>
                                <td className="font-bold text-green-600">WINNER</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default MyWinningContests;