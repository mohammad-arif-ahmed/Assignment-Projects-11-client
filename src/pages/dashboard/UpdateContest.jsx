import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/LoadingSpinner';
import Swal from 'sweetalert2';

const UpdateContest = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // ১. নির্দিষ্ট কন্টেস্টের ডেটা আনা
    const { data: contest, isLoading } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/single/${id}`);
            return res.data;
        }
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const updatedData = {
            name: form.name.value,
            price: parseFloat(form.price.value),
            prizeMoney: parseFloat(form.prizeMoney.value),
            description: form.description.value,
            deadline: form.deadline.value,
            contestType: form.contestType.value,
        };

        try {
            const res = await axiosSecure.patch(`/contests/update/${id}`, updatedData);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success!", "Contest updated and sent for review.", "success");
                navigate('/dashboard/my-created-contests');
            }
        } catch (err) {
            Swal.fire("Error!", "Failed to update.", "error");
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-10 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">Update Contest: {contest?.name}</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" defaultValue={contest?.name} className="input input-bordered w-full" placeholder="Contest Name" />
                <input name="price" defaultValue={contest?.price} className="input input-bordered w-full" placeholder="Price" />
                {/* অন্যান্য ইনপুট ফিল্ডগুলো এখানে যোগ করুন (যেমন: Deadline, Description) */}
                <button type="submit" className="btn btn-primary col-span-2">Update Contest</button>
            </form>
        </div>
    );
};

export default UpdateContest;