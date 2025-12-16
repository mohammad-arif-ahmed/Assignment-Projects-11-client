
import { useForm } from "react-hook-form";
import axios from "axios"; 
import useAxiosSecure from "../../hooks/useAxiosSecure"; 
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";


const AddContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure(); 
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY; 
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;


    const onSubmit = async (data) => {
        const contestInfo = {
            name: data.name,
            image: '', 
            prizeMoney: parseFloat(data.prizeMoney),
            contestPrice: parseFloat(data.contestPrice),
            description: data.description,
            deadline: data.deadline,
            contestType: data.contestType,
            instruction: data.instruction,
            creatorEmail: user.email, 
            status: 'pending', 
            participantsCount: 0, 
            createdAt: new Date(),
        };

        const imageFile = data.image[0];
        if (!imageFile) {
            toast.error("Contest image is required.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            
            const imageRes = await axios.post(imageHostingApi, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // ------------------------------------------------------------------

            if (imageRes.data.success) {
                contestInfo.image = imageRes.data.data.display_url;

                // 2. Post Contest Data to Backend (Using axiosSecure for Auth/Creator check)
                const contestRes = await axiosSecure.post('/contests', contestInfo);

                if (contestRes.data.insertedId) {
                    reset();
                    toast.success('Contest added successfully! Awaiting Admin approval.');
                } else {
                    toast.error('Failed to add contest to database.');
                }
            } else {
                toast.error('Image upload failed. Please try again.');
            }

        } catch (error) {
            console.error('Contest Submission Error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Submission failed.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-primary">
                Create a New Contest
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="card-body bg-base-100 shadow-xl rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* 1. Contest Name */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Contest Name*</span></label>
                        <input type="text" placeholder="e.g., Summer Photography Challenge" 
                                className="input input-bordered" 
                                {...register("name", { required: "Contest Name is required" })} />
                        {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                    </div>

                    {/* 2. Contest Type */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Contest Type*</span></label>
                        <select className="select select-bordered w-full" 
                                {...register("contestType", { required: "Contest Type is required" })}>
                            <option value="">Select Category</option>
                            <option value="Photography">Photography</option>
                            <option value="Writing">Writing</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Design">Web/Graphic Design</option>
                            <option value="Business">Business Idea</option>
                            {/* Add more types as needed */}
                        </select>
                        {errors.contestType && <span className="text-red-500 text-sm mt-1">{errors.contestType.message}</span>}
                    </div>

                    {/* 3. Prize Money */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Prize Money ($)*</span></label>
                        <input type="number" step="0.01" placeholder="e.g., 500" 
                                className="input input-bordered" 
                                {...register("prizeMoney", { 
                                    required: "Prize Money is required",
                                    valueAsNumber: true,
                                    min: { value: 1, message: "Must be greater than 0" }
                                })} />
                        {errors.prizeMoney && <span className="text-red-500 text-sm mt-1">{errors.prizeMoney.message}</span>}
                    </div>

                    {/* 4. Contest Price (Entry Fee) */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Contest Price (Entry Fee $)*</span></label>
                        <input type="number" step="0.01" placeholder="e.g., 5.00" 
                                className="input input-bordered" 
                                {...register("contestPrice", { 
                                    required: "Contest Price is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Cannot be negative" }
                                })} />
                        {errors.contestPrice && <span className="text-red-500 text-sm mt-1">{errors.contestPrice.message}</span>}
                    </div>

                    {/* 5. Deadline */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Submission Deadline*</span></label>
                        <input type="date" className="input input-bordered" 
                                {...register("deadline", { required: "Deadline is required" })} />
                        {errors.deadline && <span className="text-red-500 text-sm mt-1">{errors.deadline.message}</span>}
                    </div>

                    {/* 6. Image Input */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Contest Image*</span></label>
                        <input type="file" 
                                className="file-input file-input-bordered w-full"
                                accept="image/*" 
                                {...register("image", { required: "Contest Image is required" })} />
                        {errors.image && <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>}
                    </div>
                </div>
                
                {/* 7. Description (Full Width) */}
                <div className="form-control mt-4">
                    <label className="label"><span className="label-text font-semibold">Short Description*</span></label>
                    <textarea className="textarea textarea-bordered h-24" 
                              placeholder="Describe the contest and its rules..." 
                              {...register("description", { required: "Description is required" })}></textarea>
                    {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>}
                </div>

                {/* 8. Task Submission Instruction (Full Width) */}
                <div className="form-control mt-4">
                    <label className="label"><span className="label-text font-semibold">Task Submission Instruction*</span></label>
                    <textarea className="textarea textarea-bordered h-24" 
                              placeholder="e.g., Submit a single PDF file containing your design mockups." 
                              {...register("instruction", { required: "Submission instruction is required" })}></textarea>
                    {errors.instruction && <span className="text-red-500 text-sm mt-1">{errors.instruction.message}</span>}
                </div>

                <div className="form-control mt-8">
                    <button className="btn btn-primary text-xl">
                        Add Contest to Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddContest;