import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/LoadingSpinner';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form'; // 🔑 ফর্ম হ্যান্ডেল করার জন্য
import { useEffect } from 'react';

const UpdateContest = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    // ১. নির্দিষ্ট কন্টেস্টের ডেটা আনা
    const { data: contest, isLoading } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/single/${id}`);
            return res.data;
        }
    });

    // ২. ডেটা লোড হওয়ার পর ফর্মে ডিফল্ট ভ্যালু সেট করা
    useEffect(() => {
        if (contest) {
            reset(contest);
        }
    }, [contest, reset]);

    const onSubmit = async (data) => {
        const updatedData = {
            ...data,
            price: parseFloat(data.price),
            prizeMoney: parseFloat(data.prizeMoney),
            status: 'Pending' // এডিট করলে আবার পেন্ডিং হয়ে যাবে
        };

        try {
            const res = await axiosSecure.patch(`/contests/update/${id}`, updatedData);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: "Contest information has been updated.",
                    icon: "success",
                    timer: 2000
                });
                navigate('/dashboard/my-created-contests');
            }
        } catch (err) {
            Swal.fire("Error!", "Failed to update contest.", "error");
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-4 md:p-10 bg-gray-50 min-height-screen">
            <div className="max-w-4xl mx-auto bg-gray-400 p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Update Contest</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contest Name */}
                    <div className="form-control">
                        <label className="label font-semibold">Contest Name</label>
                        <input {...register("name")} className="input input-bordered focus:border-blue-500" required />
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label font-semibold">Image URL</label>
                        <input {...register("image")} className="input input-bordered" required />
                    </div>

                    {/* Contest Type */}
                    <div className="form-control">
                        <label className="label font-semibold">Contest Type</label>
                        <select {...register("contestType")} className="select select-bordered" required>
                            <option value="Business Contest">Business Contest</option>
                            <option value="Medical Contest">Medical Contest</option>
                            <option value="Article Writing">Article Writing</option>
                            <option value="Gaming">Gaming</option>
                        </select>
                    </div>

                    {/* Deadline */}
                    <div className="form-control">
                        <label className="label font-semibold">Deadline</label>
                        <input type="date" {...register("deadline")} className="input input-bordered" required />
                    </div>

                    {/* Registration Fee */}
                    <div className="form-control">
                        <label className="label font-semibold">Registration Fee ($)</label>
                        <input type="number" {...register("price")} className="input input-bordered" required />
                    </div>

                    {/* Prize Money */}
                    <div className="form-control">
                        <label className="label font-semibold">Prize Money ($)</label>
                        <input type="number" {...register("prizeMoney")} className="input input-bordered" required />
                    </div>

                    {/* Description */}
                    <div className="form-control md:col-span-2">
                        <label className="label font-semibold">Description</label>
                        <textarea {...register("description")} className="textarea textarea-bordered h-32" required></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="md:col-span-2 flex gap-4 mt-6">
                        <button type="submit" className="btn btn-primary flex-1">Update & Submit for Review</button>
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-outline flex-1">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateContest;