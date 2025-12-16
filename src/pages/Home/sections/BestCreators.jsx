
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import LoadingSpinner from '../../../components/LoadingSpinner'; 

const BestCreators = () => {
    const axiosSecure = useAxiosSecure(); 
    
    const { data: bestCreators = [], isLoading, isError } = useQuery({
        queryKey: ['bestCreators'],
        queryFn: async () => {
            const res = await axiosSecure.get('/creators/best'); 
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-10">Error loading creators.</div>;
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-5xl font-extrabold mb-4 text-secondary">Our Top Contest Creators</h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    Meet the creators whose contests have received the highest engagement and participation.
                </p>

                {bestCreators.length === 0 ? (
                    <p className="text-xl text-gray-500">No top creators found yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {bestCreators.map((creator, index) => (
                            <div key={creator.creatorEmail} className="card bg-gray-50 p-6 shadow-lg rounded-xl transition duration-300 transform hover:scale-[1.02]">
                                <div className="avatar mb-4">
                                    <div className="w-24 rounded-full mx-auto ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={creator.image} alt={creator.name} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">{creator.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{creator.creatorEmail}</p>
                                
                                <div className="divider"></div>
                                
                                <div className="flex justify-between text-lg font-semibold">
                                    <p className="text-gray-700">Contests: <span className="text-secondary">{creator.contestsCount}</span></p>
                                    <p className="text-gray-700">Participants: <span className="text-primary">{creator.totalParticipation}</span></p>
                                </div>
                                
                                {/* Badge for recognition */}
                                {index === 0 && (
                                    <span className="badge badge-lg badge-secondary absolute top-3 right-3">⭐ TOP CREATOR</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
};

export default BestCreators;