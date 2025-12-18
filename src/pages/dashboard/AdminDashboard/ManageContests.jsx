import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // ১. সব কন্টেস্ট ফেচ করা
    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['all-contests-admin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-contests'); // সার্ভারে সব কন্টেস্ট পাওয়ার রুট
            return res.data;
        }
    });

    // ২. স্ট্যাটাস আপডেট করার Mutation (Approve/Reject)
    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/contests/status/${id}`, { status });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['all-contests-admin']);
            Swal.fire("Updated!", "Contest status has been changed.", "success");
        }
    });

    const handleStatus = async (id, status) => {
        await updateStatus({ id, status });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-8 border-b-4 border-orange-500 w-fit pb-2">
                Pending Contests Review
            </h2>

            <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl border border-gray-200">
                <table className="table w-full">
                    <thead className="bg-slate-800 text-white">
                        <tr className="text-lg">
                            <th className="py-5 pl-6">#</th>
                            <th>Contest Name</th>
                            <th>Creator</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700">
                        {contests.map((contest, index) => (
                            <tr key={contest._id} className="hover:bg-orange-50 transition-colors border-b">
                                <th className="pl-6">{index + 1}</th>
                                <td className="font-bold text-slate-900">{contest.name}</td>
                                <td className="text-slate-600 font-medium">{contest.creator}</td>
                                <td>
                                    <span className={`badge p-3 font-bold ${
                                        contest.status === 'Accepted' ? 'badge-success text-white' : 
                                        contest.status === 'Rejected' ? 'badge-error text-white' : 'badge-warning'
                                    }`}>
                                        {contest.status}
                                    </span>
                                </td>
                                <td className="flex justify-center gap-2 py-4">
                                    <button 
                                        disabled={contest.status === 'Accepted'}
                                        onClick={() => handleStatus(contest._id, 'Accepted')}
                                        className="btn btn-sm btn-success text-white"
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        disabled={contest.status === 'Rejected'}
                                        onClick={() => handleStatus(contest._id, 'Rejected')}
                                        className="btn btn-sm btn-error text-white"
                                    >
                                        Reject
                                    </button>
                                    {/* ডিলিট বাটন (অপশনাল) */}
                                    <button className="btn btn-sm btn-outline btn-neutral">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContests;