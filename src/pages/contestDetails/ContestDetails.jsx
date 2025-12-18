import { Link, useLoaderData } from "react-router-dom";
import { FaCalendarAlt, FaDollarSign, FaUsers, FaTrophy } from "react-icons/fa";

const ContestDetails = () => {
    // Routes.jsx এর loader থেকে ডেটা রিসিভ করা হচ্ছে
    const contest = useLoaderData();

    // ডেটা না থাকলে লোডিং মেসেজ (সেফটি চেক)
    if (!contest) {
        return <div className="text-center p-20 text-2xl font-bold text-red-600">Contest Not Found!</div>;
    }

    const { _id, contestName, image, description, price, participantCount, winnerName, deadline, status } = contest;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* কন্টেস্ট ব্যানার ইমেজ */}
                <div className="relative h-96 w-full">
                    <img src={image} alt={contestName} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4">
                        <span className={`badge p-4 font-bold uppercase ${status === 'Accepted' ? 'badge-success' : 'badge-warning'}`}>
                            {status}
                        </span>
                    </div>
                </div>

                {/* কন্টেন্ট সেকশন - হাই কন্ট্রাস্ট টেক্সট ব্যবহার করা হয়েছে */}
                <div className="p-8 md:p-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        {contestName}
                    </h2>
                    
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed border-l-4 border-primary pl-4">
                        {description}
                    </p>

                    {/* ইনফরমেশন গ্রিড */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <FaDollarSign className="text-3xl text-blue-600 mr-4" />
                            <div>
                                <p className="text-sm text-blue-500 font-semibold uppercase">Registration Fee</p>
                                <p className="text-2xl font-bold text-slate-800">${price}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <FaCalendarAlt className="text-3xl text-orange-600 mr-4" />
                            <div>
                                <p className="text-sm text-orange-500 font-semibold uppercase">Deadline</p>
                                <p className="text-2xl font-bold text-slate-800">{deadline}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                            <FaUsers className="text-3xl text-purple-600 mr-4" />
                            <div>
                                <p className="text-sm text-purple-500 font-semibold uppercase">Participants</p>
                                <p className="text-2xl font-bold text-slate-800">{participantCount || 0} Joined</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-100">
                            <FaTrophy className="text-3xl text-green-600 mr-4" />
                            <div>
                                <p className="text-sm text-green-500 font-semibold uppercase">Winner</p>
                                <p className="text-2xl font-bold text-slate-800">{winnerName || "TBA"}</p>
                            </div>
                        </div>
                    </div>

                    {/* পেমেন্ট পেজে যাওয়ার বাটন */}
                    <div className="flex flex-col items-center border-t pt-8">
                        <p className="text-slate-500 mb-4 font-medium italic">Click below to participate in this contest</p>
                        <Link 
                            to="/dashboard/payment" 
                            state={{ price: price, contestId: _id }} // পেমেন্ট পেজে ডেটা পাঠানো হচ্ছে
                            className="w-full"
                        >
                            <button className="btn btn-primary btn-lg w-full text-white font-bold text-xl rounded-2xl hover:scale-[1.02] transition-transform">
                                Register & Pay Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;