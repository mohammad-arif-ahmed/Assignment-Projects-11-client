
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import { Link } from "react-router-dom";
import LoadingSpinner from '../../../components/LoadingSpinner'; 

const PopularContests = () => {
    
    const axiosSecure = useAxiosSecure(); 
    
    // TanStack Query to fetch popular contests
    const { data: popularContests = [], isLoading, isError } = useQuery({
        queryKey: ['popularContests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/popular-contests'); 
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-10">Error loading contests.</div>;
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-5xl font-extrabold mb-4 text-primary">Popular Contests</h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    The most active and highly anticipated contests right now, based on participation.
                </p>

                {popularContests.length === 0 ? (
                    <p className="text-xl text-gray-500">No popular contests available yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {popularContests.map(contest => (
                            <div key={contest._id} className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                                <figure className="h-48 overflow-hidden">
                                    <img 
                                        src={contest.image} 
                                        alt={contest.name} 
                                        className="w-full h-full object-cover transition duration-300 hover:scale-105"
                                    />
                                </figure>
                                <div className="card-body p-5 text-left">
                                    <h3 className="card-title text-xl font-bold text-gray-800 line-clamp-2">{contest.name}</h3>
                                    <p className="text-sm text-gray-600">
                                        Participants: <span className="font-semibold text-primary">{contest.participantsCount}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 line-clamp-3">{contest.description}</p>
                                    <div className="card-actions justify-end mt-4">
                                        <Link to={`/contest/${contest._id}`} className="btn btn-sm btn-outline btn-primary">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* All Contests Link */}
                <Link to="/all-contests" className="btn btn-secondary mt-12 btn-lg">
                    View All Contests
                </Link>
            </div>
        </section>
    );
};

export default PopularContests;