import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner'; 
import Swal from 'sweetalert2'; 

const AdminContestReview = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: pendingContests = [], isLoading, isError } = useQuery({
        queryKey: ['pendingContests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests/pending');
            return res.data;
        },
        enabled: !!localStorage.getItem('access-token')
    });

    const { mutateAsync: updateStatusMutate } = useMutation({
        mutationFn: async ({ id, newStatus }) => {
            const res = await axiosSecure.patch(`/contests/${id}/status`, { status: newStatus });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pendingContests'] });
        },
    });

    const handleUpdateStatus = async (contestId, action) => {
        const newStatus = action === 'approve' ? 'Accepted' : 'Rejected';
        
        const result = await Swal.fire({
            title: `Are you sure to ${action}?`,
            text: `Contest ID: ${contestId} status will change to ${newStatus}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Yes, ${action} it!`,
        });

        if (result.isConfirmed) {
            try {
                await updateStatusMutate({ id: contestId, newStatus });
                Swal.fire({
                    title: 'Success!',
                    text: `Contest has been ${newStatus}.`,
                    icon: 'success',
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update contest status. Check server console.',
                    icon: 'error',
                });
            }
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div className="text-center text-red-500 py-10">Error loading pending contests.</div>;

    return (
        <div className="p-8">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-b pb-2">Contest Review ({pendingContests.length})</h2>
            
            {pendingContests.length === 0 ? (
                <div className="text-center text-gray-500 text-xl py-10 border rounded-lg bg-gray-50">All contests reviewed. No pending contests found.</div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-100">
                    <table className="table w-full">
                        <thead className="bg-gray-700 text-white sticky top-0">
                            <tr>
                                <th className="py-3 text-left pl-4 font-bold">#</th>
                                <th className="py-3 text-left font-bold">Name</th>
                                <th className="py-3 text-left font-bold">Type</th>
                                <th className="py-3 text-left font-bold">Price</th>
                                <th className="py-3 text-left font-bold">Creator Email</th>
                                <th className="py-3 text-left font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingContests.map((contest, index) => (
                                <tr key={contest._id} className="border-b hover:bg-gray-50">
                                    <th className="pl-4">{index + 1}</th>
                                    <td className="font-semibold text-gray-800">{contest.name}</td>
                                    <td>{contest.contestType}</td>
                                    <td className="font-medium text-green-600">${contest.price}</td>
                                    <td className="text-sm text-gray-600">{contest.creator}</td>
                                    <td className="space-x-2">
                                        <button 
                                            onClick={() => handleUpdateStatus(contest._id, 'approve')}
                                            className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-0"
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => handleUpdateStatus(contest._id, 'reject')}
                                            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-0"
                                        >
                                            Reject
                                        </button>
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

export default AdminContestReview;