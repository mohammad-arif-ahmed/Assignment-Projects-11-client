import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // 🔑 useMutation ও useQueryClient যোগ করুন
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner';
import Swal from 'sweetalert2';
const MyContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: myContests = [], isLoading, isError } = useQuery({
        queryKey: ['myCreatedContests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests/creator');
            return res.data;
        },
        enabled: !!user?.email,
    });
    const { mutateAsync: deleteContest } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/contests/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myCreatedContests', user?.email] });
        }
    });

    const handleDelete = async (id, name, status) => {
        if (status === 'Accepted') {
            return Swal.fire("Denied!", "Accepted contests cannot be deleted.", "error");
        }

        const result = await Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to delete "${name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await deleteContest(id);
                Swal.fire("Deleted!", "Your contest has been deleted.", "success");
            } catch (err) {
                Swal.fire("Error!", err.response?.data?.message || "Failed to delete.", "error");
            }
        }
    };


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
                                        <button
                                            onClick={() => handleDelete(contest._id, contest.name, contest.status)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            Delete
                                        </button>
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