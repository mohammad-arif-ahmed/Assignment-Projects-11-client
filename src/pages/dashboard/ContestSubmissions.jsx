import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/LoadingSpinner';
import Swal from 'sweetalert2';

const ContestSubmissions = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // ১. ক্রিয়েটরের কন্টেস্টগুলোতে আসা সব সাবমিশন ফেচ করা
    const { data: submissions = [], isLoading, isError } = useQuery({
        queryKey: ['creatorSubmissions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/submissions/creator');
            return res.data;
        }
    });

    // ২. উইনার ঘোষণা করার জন্য Mutation
    const { mutateAsync: makeWinner } = useMutation({
        mutationFn: async (subData) => {
            // সার্ভারের /submissions/declare-winner/:id রুট কল করা
            const res = await axiosSecure.patch(`/submissions/declare-winner/${subData._id}`, {
                contestId: subData.contestId,
                participantEmail: subData.participantEmail,
                participantName: subData.participantName,
                participantImage: subData.participantImage
            });
            return res.data;
        },
        onSuccess: () => {
            // লিস্ট রিফ্রেশ করা
            queryClient.invalidateQueries({ queryKey: ['creatorSubmissions'] });
            Swal.fire({
                title: "Winner Declared!",
                text: "The participant has been notified as the winner.",
                icon: "success"
            });
        }
    });

    // উইনার হ্যান্ডলার ফাংশন
    const handleDeclareWinner = async (sub) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to declare ${sub.participantName || sub.participantEmail} as the winner?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Confirm Winner!'
        });

        if (result.isConfirmed) {
            try {
                await makeWinner(sub);
            } catch (err) {
                Swal.fire("Error!", "Could not declare winner.", "error");
            }
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div className="text-center text-red-500 py-10">Failed to load submissions.</div>;

    return (
        <div className="p-8">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-b pb-2">Contest Submissions</h2>
            
            {submissions.length === 0 ? (
                <div className="text-center text-gray-500 text-xl py-10 border rounded-lg bg-gray-50">
                    No submissions found for your contests.
                </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-100">
                    <table className="table w-full">
                        <thead className="bg-slate-800 text-white text-lg">
                            <tr>
                                <th className="py-4 font-bold">#</th>
                                <th className="py-4 font-bold">Participant</th>
                                <th className="py-4 font-bold">Contest Name</th>
                                <th className="py-4 font-bold">Link</th>
                                <th className="py-4 font-bold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((sub, index) => (
                                <tr key={sub._id} className="border-b hover:bg-gray-50 transition-colors">
                                    <th className="pl-4">{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <img src={sub.participantImage || 'https://i.ibb.co/mRpg6Ph/user.png'} alt="User" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{sub.participantName || "Anonymous"}</div>
                                                <div className="text-sm opacity-60">{sub.participantEmail}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-semibold text-gray-700">{sub.contestName}</td>
                                    <td>
                                        <a 
                                            href={sub.submittedLink} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="btn btn-xs btn-outline btn-info"
                                        >
                                            View Work
                                        </a>
                                    </td>
                                    <td className="text-center">
                                        {/* যদি সাবমিশনটি ইতিমধ্যে উইনার হয়ে থাকে তবে ব্যাজ দেখাবে */}
                                        {sub.status === 'Winner' ? (
                                            <div className="badge badge-success gap-2 p-4 text-white font-bold">
                                                🏆 WINNER
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => handleDeclareWinner(sub)}
                                                className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-0"
                                            >
                                                Declare Winner
                                            </button>
                                        )}
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

export default ContestSubmissions;