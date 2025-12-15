
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"; // Icons for password visibility
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth"; 
import { useState } from "react";

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const navigate = useNavigate();
    
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false); 

    // 1. Registration Handler
    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        // Reset any previous errors or warnings
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least one uppercase letter.');
            return;
        }
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
            toast.error('Password must contain at least one special character.');
            return;
        }

        // 2. Create User in Firebase
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                
                // 3. Update User Profile (Name & Photo)
                updateUserProfile(name, photo)
                    .then(() => {
                        toast.success("Registration successful! Profile updated.");
                        // Navigate to Home or Dashboard after registration
                        navigate('/'); 
                    })
                    .catch(error => {
                        console.error('Profile update failed:', error);
                        toast.error("Profile update failed.");
                    });
            })
            .catch(error => {
                console.error(error);
                // Display specific Firebase error messages
                toast.error(error.message || "Registration failed.");
            });
    };
    
    // 4. Google Sign In (for quick registration)
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                toast.success("Google registration successful!");
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                toast.error("Google registration failed!");
            });
    };

    return (
        <div className="hero min-h-screen">
            <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                <h2 className="text-3xl font-bold text-center pt-8">Register Now</h2>
                <form onSubmit={handleRegister} className="card-body">
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Full Name</span></label>
                        <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                    </div>
                    {/* Photo URL Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Photo URL</span></label>
                        <input type="url" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                    </div>
                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    {/* Password Field with Toggle */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder="password" 
                                className="input input-bordered w-full" 
                                required 
                            />
                            {/* Password Visibility Toggle Button */}
                            <span 
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoEyeOffOutline className="text-xl"/> : <IoEyeOutline className="text-xl"/>}
                            </span>
                        </div>
                    </div>
                    
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
                
                {/* Social Login */}
                <div className="px-8 pb-8">
                    <p className="text-center mb-4">Or Register with</p>
                    <button onClick={handleGoogleSignIn} className="btn btn-outline w-full gap-2">
                        <FaGoogle />
                        Google
                    </button>
                    <p className="mt-4 text-center">
                        Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;