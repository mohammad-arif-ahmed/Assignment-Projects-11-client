import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import LoadingSpinner from '../components/LoadingSpinner';

const ContestDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    // ১. কন্টেস্টের ডিটেইলস ফেচ করা
    const { data: contest = {}, isLoading } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contests/single/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const { 
        _id, name, image, description, price, 
        prizeMoney, contestType, deadline, participantsCount 
    } = contest;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="md:flex">
                    {/* বাম পাশ: ইমেজ */}
                    <div className="md:w-1/2">
                        <img className="h-full w-full object-cover" src={image} alt={name} />
                    </div>

                    {/* ডান পাশ: ইনফরমেশন */}
                    <div className="p-8 md:w-1/2">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {contestType}
                        </div>
                        <h1 className="mt-2 text-4xl font-bold text-gray-900 leading-tight">
                            {name}
                        </h1>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            {description}
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-xl">
                                <p className="text-sm text-blue-600 font-bold">Prize Pool</p>
                                <p className="text-2xl font-black">${prizeMoney}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl">
                                <p className="text-sm text-green-600 font-bold">Registration Fee</p>
                                <p className="text-2xl font-black">${price}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-2">
                            <p className="text-gray-700 font-medium">📅 Deadline: <span className="font-bold text-red-500">{deadline}</span></p>
                            <p className="text-gray-700 font-medium">👥 Participants: <span className="font-bold">{participantsCount || 0} Joined</span></p>
                        </div>

                        {/* 🔑 পেমেন্ট পেজে যাওয়ার বাটন */}
                        <div className="mt-10">
                            <Link to="/dashboard/payment" state={{ contest: contest }}>
                                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition duration-300 transform hover:scale-105 shadow-lg">
                                    Register & Pay Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;