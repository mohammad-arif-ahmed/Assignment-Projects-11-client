import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleRoleChange = async (id, newRole) => {
        try {
            const res = await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
            if (res.data.modifiedCount > 0) {
                queryClient.invalidateQueries(['users']);
                Swal.fire("Success", `User role updated to ${newRole}`, "success");
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to update role.", "error");
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-8 border-b-4 border-primary w-fit pb-2">
                Manage All Users
            </h2>
            
            <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl border border-gray-200">
                <table className="table w-full">
                    {/* টেবিল হেডার */}
                    <thead className="bg-slate-800 text-white">
                        <tr className="text-lg">
                            <th className="py-5 pl-6">#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700 font-medium">
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-blue-50 transition-colors border-b border-gray-100">
                                <th className="pl-6">{index + 1}</th>
                                <td className="text-slate-900 font-bold">{user.name}</td>
                                <td className="text-slate-600">{user.email}</td>
                                <td>
                                    <span className={`badge p-3 font-bold uppercase ${
                                        user.role === 'admin' ? 'badge-primary' : 
                                        user.role === 'creator' ? 'badge-secondary' : 'badge-ghost'
                                    }`}>
                                        {user.role || 'user'}
                                    </span>
                                </td>
                                <td className="flex justify-center gap-3 py-4">
                                    <button 
                                        disabled={user.role === 'admin'}
                                        onClick={() => handleRoleChange(user._id, 'admin')} 
                                        className="btn btn-sm btn-primary text-white"
                                    >
                                        Make Admin
                                    </button>
                                    <button 
                                        disabled={user.role === 'creator'}
                                        onClick={() => handleRoleChange(user._id, 'creator')} 
                                        className="btn btn-sm btn-secondary text-white"
                                    >
                                        Make Creator
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;