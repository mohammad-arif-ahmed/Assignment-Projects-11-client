import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure'; 
import useAuth from '../../hooks/useAuth';             
import LoadingSpinner from '../../components/LoadingSpinner'; 
const MyContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myContests = [], isLoading, isError } = useQuery({
        queryKey: ['myCreatedContests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests/creator');
            return res.data;
        },
        enabled: !!user?.email, 
    });
    
    
    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div className="text-center text-red-500 py-10">Error loading created contests.</div>;

    return (
        <div className="p-8">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-b pb-2">My Created Contests ({myContests.length})</h2>
            
            {myContests.length === 0 ? (
                <div className="text-center text-gray-500 text-xl py-10 border rounded-lg bg-gray-50">You haven't created any contests yet.</div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-100">
                    <table className="table w-full">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="py-3 text-left pl-4 font-bold">#</th>
                                <th className="py-3 text-left font-bold">Name</th>
                                <th className="py-3 text-left font-bold">Status</th>
                                <th className="py-3 text-left font-bold">Submissions</th>
                                <th className="py-3 text-left font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myContests.map((contest, index) => (
                                <tr key={contest._id} className="border-b hover:bg-gray-50">
                                    <th className="pl-4">{index + 1}</th>
                                    <td className="font-semibold text-gray-800">{contest.name}</td>
                                    <td className={
                                        contest.status === 'Accepted' ? 'text-green-500 font-bold' : 
                                        contest.status === 'Rejected' ? 'text-red-500 font-bold' : 
                                        'text-yellow-500 font-bold'
                                    }>
                                        {contest.status}
                                    </td>
                                    <td>{contest.participantsCount || 0}</td> 
                                    <td className="space-x-2">
                                        <button className="btn btn-sm btn-info text-white">Edit</button>
                                        <button className="btn btn-sm btn-warning text-white">Submissions</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyContests;