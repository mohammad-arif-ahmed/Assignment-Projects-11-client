import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/LoadingSpinner';

const ContestSubmissions = () => {
    const axiosSecure = useAxiosSecure();

    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ['creatorSubmissions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/submissions/creator');
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Contest Submissions</h2>
            
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table w-full">
                    <thead className="bg-slate-700 text-white">
                        <tr>
                            <th>#</th>
                            <th>Participant Email</th>
                            <th>Contest Name</th>
                            <th>Submitted Link</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub, index) => (
                            <tr key={sub._id} className="hover:bg-gray-50">
                                <td>{index + 1}</td>
                                <td>{sub.participantEmail}</td>
                                <td className="font-medium">{sub.contestName}</td>
                                <td>
                                    <a href={sub.submittedLink} target="_blank" className="text-blue-500 underline">
                                        View Work
                                    </a>
                                </td>
                                <td>
                                    {/* 💡 পরে এখানে 'Declare Winner' বাটন যোগ করা যাবে */}
                                    <button className="btn btn-xs btn-success text-white">Declare Winner</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContestSubmissions;